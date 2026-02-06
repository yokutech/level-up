import type { HabitWithCompletions } from '@/hooks/useHabitsDB';
import { HabitCard } from './HabitCard';
import { EmptyState } from '@/components/EmptyState';
import { ListTodo } from 'lucide-react';

interface HabitListProps {
  habits: HabitWithCompletions[];
  onToggle: (id: number) => void;
  onEdit?: (habit: HabitWithCompletions) => void;
  onDelete?: (id: number) => void;
  showActions?: boolean;
  emptyMessage?: string;
  emptyAction?: {
    label: string;
    onClick: () => void;
  };
}

export function HabitList({ 
  habits, 
  onToggle, 
  onEdit, 
  onDelete, 
  showActions = true,
  emptyMessage = "No habits yet. Create your first habit to get started!",
  emptyAction
}: HabitListProps) {
  if (habits.length === 0) {
    return (
      <EmptyState
        icon={<ListTodo className="h-12 w-12 text-muted-foreground" />}
        title="No habits yet"
        description={emptyMessage}
        action={emptyAction}
      />
    );
  }

  return (
    <div className="grid gap-3 sm:gap-4">
      {habits.map(habit => (
        <HabitCard
          key={habit.id}
          habit={habit}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
          showActions={showActions}
        />
      ))}
    </div>
  );
}
