import { useCallback } from 'react';
import { parseISO, differenceInDays, isToday } from 'date-fns';
import type { HabitWithCompletions } from './useHabitsDB';

export interface HabitStats {
  id: number;
  name: string;
  currentStreak: number;
  longestStreak: number;
  totalCompletions: number;
  completionRate: number;
}

export const useHabitStats = () => {
  // Check if a habit is completed today
  const isCompletedToday = useCallback((habit: HabitWithCompletions): boolean => {
    return habit.completedDates.some(date => {
      const completedDate = parseISO(date);
      return isToday(completedDate);
    });
  }, []);

  // Calculate current streak
  const calculateStreak = useCallback((completedDates: string[]): number => {
    if (completedDates.length === 0) return 0;

    const sortedDates = [...completedDates]
      .map(date => parseISO(date))
      .sort((a, b) => b.getTime() - a.getTime());

    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if today or yesterday is completed
    const mostRecent = sortedDates[0];
    const daysDiff = differenceInDays(today, mostRecent);
    
    if (daysDiff > 1) return 0; // Streak is broken

    let currentDate = sortedDates[0];
    streak = 1;

    for (let i = 1; i < sortedDates.length; i++) {
      const prevDate = sortedDates[i];
      const diff = differenceInDays(currentDate, prevDate);

      if (diff === 1) {
        streak++;
        currentDate = prevDate;
      } else {
        break;
      }
    }

    return streak;
  }, []);

  // Calculate longest streak
  const calculateLongestStreak = useCallback((completedDates: string[]): number => {
    if (completedDates.length === 0) return 0;

    const sortedDates = [...completedDates]
      .map(date => parseISO(date))
      .sort((a, b) => a.getTime() - b.getTime());

    let maxStreak = 1;
    let currentStreak = 1;

    for (let i = 1; i < sortedDates.length; i++) {
      const diff = differenceInDays(sortedDates[i], sortedDates[i - 1]);

      if (diff === 1) {
        currentStreak++;
        maxStreak = Math.max(maxStreak, currentStreak);
      } else {
        currentStreak = 1;
      }
    }

    return maxStreak;
  }, []);

  // Get comprehensive stats for a habit
  const getHabitStats = useCallback((habit: HabitWithCompletions): HabitStats => {
    const currentStreak = calculateStreak(habit.completedDates);
    const longestStreak = calculateLongestStreak(habit.completedDates);
    const totalCompletions = habit.completedDates.length;
    
    // Calculate completion rate (percentage of days since creation)
    const daysSinceCreation = differenceInDays(
      new Date(),
      parseISO(habit.createdAt)
    ) + 1;
    const completionRate = daysSinceCreation > 0 
      ? (totalCompletions / daysSinceCreation) * 100 
      : 0;

    return {
      id: habit.id!,
      name: habit.name,
      currentStreak,
      longestStreak,
      totalCompletions,
      completionRate: Math.min(100, Math.round(completionRate))
    };
  }, [calculateStreak, calculateLongestStreak]);

  return {
    isCompletedToday,
    calculateStreak,
    calculateLongestStreak,
    getHabitStats
  };
};
