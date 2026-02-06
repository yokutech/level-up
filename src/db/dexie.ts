import Dexie, { type EntityTable } from 'dexie';

// Define TypeScript interfaces for our tables
export interface Habit {
  id?: number;
  name: string;
  description?: string;
  createdAt: string; // ISO date string
  color?: string;
}

export interface Completion {
  id?: number;
  habitId: number;
  date: string; // ISO date string (YYYY-MM-DD format)
  completed: boolean;
}

// Create the Dexie database class
class HabitTrackerDB extends Dexie {
  // Declare tables with proper types
  habits!: EntityTable<Habit, 'id'>;
  completions!: EntityTable<Completion, 'id'>;

  constructor() {
    super('HabitTrackerDB');

    // Define database schema
    this.version(1).stores({
      habits: '++id, name, createdAt',
      completions: '++id, habitId, date, [habitId+date]' // Compound index for efficient queries
    });
  }
}

// Create and export a singleton instance
export const db = new HabitTrackerDB();

// Export types for use in other files
export type { Habit as DBHabit, Completion as DBCompletion };
