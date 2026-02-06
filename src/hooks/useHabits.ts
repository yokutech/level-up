import { useCallback } from 'react';
import { format } from 'date-fns';
import type { Habit } from '@/types/habit';
import { useLocalStorage } from './useLocalStorage';
import { useHabitUtils } from './useHabitUtils';

const HABITS_STORAGE_KEY = 'habit-tracker-habits';

export const useHabits = () => {
  const [habits, setHabits] = useLocalStorage<Habit[]>(HABITS_STORAGE_KEY, []);
  const { isCompletedToday, getHabitStats } = useHabitUtils();

  // Add a new habit
  const addHabit = useCallback((name: string, description?: string, color?: string) => {
    const newHabit: Habit = {
      id: crypto.randomUUID(),
      name,
      description,
      createdAt: format(new Date(), 'yyyy-MM-dd'),
      completedDates: [],
      color
    };
    setHabits(prev => [...prev, newHabit]);
    return newHabit;
  }, [setHabits]);

  // Update a habit
  const updateHabit = useCallback((id: string, updates: Partial<Omit<Habit, 'id' | 'createdAt' | 'completedDates'>>) => {
    setHabits(prev => 
      prev.map(habit => 
        habit.id === id ? { ...habit, ...updates } : habit
      )
    );
  }, [setHabits]);

  // Delete a habit
  const deleteHabit = useCallback((id: string) => {
    setHabits(prev => prev.filter(habit => habit.id !== id));
  }, [setHabits]);

  // Toggle habit completion for today
  const toggleHabitToday = useCallback((id: string) => {
    const today = format(new Date(), 'yyyy-MM-dd');
    setHabits(prev => 
      prev.map(habit => {
        if (habit.id !== id) return habit;

        const isCompleted = habit.completedDates.includes(today);
        const completedDates = isCompleted
          ? habit.completedDates.filter(date => date !== today)
          : [...habit.completedDates, today];

        return { ...habit, completedDates };
      })
    );
  }, [setHabits]);

  // Get all habit statistics
  const getHabitsStats = useCallback(() => {
    return habits.map(habit => getHabitStats(habit));
  }, [habits, getHabitStats]);

  return {
    habits,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleHabitToday,
    isCompletedToday,
    getHabitStats,
    getHabitsStats
  };
};
