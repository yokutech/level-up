import { format, isToday, parseISO, differenceInDays } from 'date-fns';
import type { Habit, HabitStats } from '@/types/habit';

export const useHabitUtils = () => {
  // Check if a habit is completed today
  const isCompletedToday = (habit: Habit): boolean => {
    const today = format(new Date(), 'yyyy-MM-dd');
    return habit.completedDates.includes(today);
  };

  // Calculate current streak
  const calculateStreak = (completedDates: string[]): number => {
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
    if (daysDiff === 1 && isToday(today)) {
      // Yesterday was completed but not today - check if we should count it
      // For now, we consider the streak active if yesterday was completed
    }

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
  };

  // Calculate longest streak
  const calculateLongestStreak = (completedDates: string[]): number => {
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
  };

  // Get habit statistics
  const getHabitStats = (habit: Habit): HabitStats => {
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
      id: habit.id,
      name: habit.name,
      currentStreak,
      longestStreak,
      totalCompletions,
      completionRate: Math.min(100, Math.round(completionRate))
    };
  };

  return {
    isCompletedToday,
    calculateStreak,
    calculateLongestStreak,
    getHabitStats
  };
};
