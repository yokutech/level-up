import { useCallback } from 'react';
import { format } from 'date-fns';
import { db, type DBHabit, type DBCompletion } from '@/db/dexie';
import { useLiveQuery } from 'dexie-react-hooks';

export interface HabitWithCompletions extends DBHabit {
  completedDates: string[];
}

export const useHabits = () => {
  // Use Dexie's live query to automatically re-render when data changes
  const habits = useLiveQuery(() => db.habits.toArray()) || [];
  const completions = useLiveQuery(() => db.completions.toArray()) || [];

  // Combine habits with their completion dates
  const habitsWithCompletions = habits.map(habit => {
    const habitCompletions = completions
      .filter(c => c.habitId === habit.id && c.completed)
      .map(c => c.date);

    return {
      ...habit,
      completedDates: habitCompletions
    } as HabitWithCompletions;
  });

  // Add a new habit
  const addHabit = useCallback(async (name: string, description?: string, color?: string) => {
    const newHabit: DBHabit = {
      name,
      description,
      createdAt: format(new Date(), 'yyyy-MM-dd'),
      color
    };

    const id = await db.habits.add(newHabit);
    return { ...newHabit, id } as HabitWithCompletions & { id: number };
  }, []);

  // Update a habit
  const updateHabit = useCallback(async (id: number, updates: Partial<Omit<DBHabit, 'id' | 'createdAt'>>) => {
    await db.habits.update(id, updates);
  }, []);

  // Delete a habit (and all its completions)
  const deleteHabit = useCallback(async (id: number) => {
    await db.transaction('rw', [db.habits, db.completions], async () => {
      await db.habits.delete(id);
      await db.completions.where('habitId').equals(id).delete();
    });
  }, []);

  // Toggle habit completion for a specific date
  const toggleHabitCompletion = useCallback(async (habitId: number, date?: string) => {
    const targetDate = date || format(new Date(), 'yyyy-MM-dd');

    // Check if completion already exists
    const existing = await db.completions
      .where('[habitId+date]')
      .equals([habitId, targetDate])
      .first();

    if (existing) {
      // Toggle completion status
      await db.completions.update(existing.id!, { completed: !existing.completed });
    } else {
      // Create new completion record
      await db.completions.add({
        habitId,
        date: targetDate,
        completed: true
      });
    }
  }, []);

  // Check if habit is completed on a specific date
  const isCompletedOnDate = useCallback((habitId: number, completions: DBCompletion[], date?: string) => {
    const targetDate = date || format(new Date(), 'yyyy-MM-dd');
    return completions.some(
      c => c.habitId === habitId && c.date === targetDate && c.completed
    );
  }, []);

  return {
    habits: habitsWithCompletions,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleHabitCompletion,
    isCompletedOnDate: (habitId: number, date?: string) => 
      isCompletedOnDate(habitId, completions, date)
  };
};
