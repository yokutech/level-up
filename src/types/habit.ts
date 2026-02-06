export interface Habit {
  id: string;
  name: string;
  description?: string;
  createdAt: string; // ISO date string
  completedDates: string[]; // Array of ISO date strings
  color?: string; // Optional color for visual distinction
}

export interface HabitStats {
  id: string;
  name: string;
  currentStreak: number;
  longestStreak: number;
  totalCompletions: number;
  completionRate: number; // percentage
}

export interface Quote {
  text: string;
  author: string;
}
