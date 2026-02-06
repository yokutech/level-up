// Predefined color palette for habits
export interface HabitColor {
  id: string;
  name: string;
  value: string;
  // Light theme classes
  light: {
    border: string;
    bg: string;
    text: string;
    badge: string;
  };
  // Dark theme classes
  dark: {
    border: string;
    bg: string;
    text: string;
    badge: string;
  };
}

export const HABIT_COLORS: HabitColor[] = [
  {
    id: 'blue',
    name: 'Blue',
    value: '#3b82f6',
    light: {
      border: 'border-l-blue-500',
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      badge: 'bg-blue-100 text-blue-700 border-blue-200',
    },
    dark: {
      border: 'dark:border-l-blue-400',
      bg: 'dark:bg-blue-950/30',
      text: 'dark:text-blue-300',
      badge: 'dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-800',
    },
  },
  {
    id: 'green',
    name: 'Green',
    value: '#10b981',
    light: {
      border: 'border-l-green-500',
      bg: 'bg-green-50',
      text: 'text-green-700',
      badge: 'bg-green-100 text-green-700 border-green-200',
    },
    dark: {
      border: 'dark:border-l-green-400',
      bg: 'dark:bg-green-950/30',
      text: 'dark:text-green-300',
      badge: 'dark:bg-green-900/40 dark:text-green-300 dark:border-green-800',
    },
  },
  {
    id: 'purple',
    name: 'Purple',
    value: '#a855f7',
    light: {
      border: 'border-l-purple-500',
      bg: 'bg-purple-50',
      text: 'text-purple-700',
      badge: 'bg-purple-100 text-purple-700 border-purple-200',
    },
    dark: {
      border: 'dark:border-l-purple-400',
      bg: 'dark:bg-purple-950/30',
      text: 'dark:text-purple-300',
      badge: 'dark:bg-purple-900/40 dark:text-purple-300 dark:border-purple-800',
    },
  },
  {
    id: 'orange',
    name: 'Orange',
    value: '#f97316',
    light: {
      border: 'border-l-orange-500',
      bg: 'bg-orange-50',
      text: 'text-orange-700',
      badge: 'bg-orange-100 text-orange-700 border-orange-200',
    },
    dark: {
      border: 'dark:border-l-orange-400',
      bg: 'dark:bg-orange-950/30',
      text: 'dark:text-orange-300',
      badge: 'dark:bg-orange-900/40 dark:text-orange-300 dark:border-orange-800',
    },
  },
  {
    id: 'pink',
    name: 'Pink',
    value: '#ec4899',
    light: {
      border: 'border-l-pink-500',
      bg: 'bg-pink-50',
      text: 'text-pink-700',
      badge: 'bg-pink-100 text-pink-700 border-pink-200',
    },
    dark: {
      border: 'dark:border-l-pink-400',
      bg: 'dark:bg-pink-950/30',
      text: 'dark:text-pink-300',
      badge: 'dark:bg-pink-900/40 dark:text-pink-300 dark:border-pink-800',
    },
  },
  {
    id: 'teal',
    name: 'Teal',
    value: '#14b8a6',
    light: {
      border: 'border-l-teal-500',
      bg: 'bg-teal-50',
      text: 'text-teal-700',
      badge: 'bg-teal-100 text-teal-700 border-teal-200',
    },
    dark: {
      border: 'dark:border-l-teal-400',
      bg: 'dark:bg-teal-950/30',
      text: 'dark:text-teal-300',
      badge: 'dark:bg-teal-900/40 dark:text-teal-300 dark:border-teal-800',
    },
  },
  {
    id: 'indigo',
    name: 'Indigo',
    value: '#6366f1',
    light: {
      border: 'border-l-indigo-500',
      bg: 'bg-indigo-50',
      text: 'text-indigo-700',
      badge: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    },
    dark: {
      border: 'dark:border-l-indigo-400',
      bg: 'dark:bg-indigo-950/30',
      text: 'dark:text-indigo-300',
      badge: 'dark:bg-indigo-900/40 dark:text-indigo-300 dark:border-indigo-800',
    },
  },
  {
    id: 'yellow',
    name: 'Yellow',
    value: '#eab308',
    light: {
      border: 'border-l-yellow-500',
      bg: 'bg-yellow-50',
      text: 'text-yellow-700',
      badge: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    },
    dark: {
      border: 'dark:border-l-yellow-400',
      bg: 'dark:bg-yellow-950/30',
      text: 'dark:text-yellow-300',
      badge: 'dark:bg-yellow-900/40 dark:text-yellow-300 dark:border-yellow-800',
    },
  },
  {
    id: 'red',
    name: 'Red',
    value: '#ef4444',
    light: {
      border: 'border-l-red-500',
      bg: 'bg-red-50',
      text: 'text-red-700',
      badge: 'bg-red-100 text-red-700 border-red-200',
    },
    dark: {
      border: 'dark:border-l-red-400',
      bg: 'dark:bg-red-950/30',
      text: 'dark:text-red-300',
      badge: 'dark:bg-red-900/40 dark:text-red-300 dark:border-red-800',
    },
  },
  {
    id: 'cyan',
    name: 'Cyan',
    value: '#06b6d4',
    light: {
      border: 'border-l-cyan-500',
      bg: 'bg-cyan-50',
      text: 'text-cyan-700',
      badge: 'bg-cyan-100 text-cyan-700 border-cyan-200',
    },
    dark: {
      border: 'dark:border-l-cyan-400',
      bg: 'dark:bg-cyan-950/30',
      text: 'dark:text-cyan-300',
      badge: 'dark:bg-cyan-900/40 dark:text-cyan-300 dark:border-cyan-800',
    },
  },
];

/**
 * Get color definition by ID
 */
export function getHabitColor(colorId: string | null | undefined): HabitColor | null {
  if (!colorId) return null;
  return HABIT_COLORS.find(c => c.id === colorId) || null;
}

/**
 * Get Tailwind classes for habit color
 */
export function getHabitColorClasses(
  colorId: string | null | undefined,
  type: 'border' | 'bg' | 'text' | 'badge' = 'border'
): string {
  const color = getHabitColor(colorId);
  if (!color) return '';

  const lightClass = color.light[type];
  const darkClass = color.dark[type];

  return `${lightClass} ${darkClass}`;
}

/**
 * Get CSS color value for charts
 */
export function getHabitColorValue(colorId: string | null | undefined): string | null {
  const color = getHabitColor(colorId);
  return color?.value || null;
}

/**
 * Get all available color IDs
 */
export function getAvailableColorIds(): string[] {
  return HABIT_COLORS.map(c => c.id);
}
