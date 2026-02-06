import { useState } from 'react';
import type { HabitWithCompletions } from '@/hooks/useHabitsDB';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, Flame } from 'lucide-react';
import { useHabitStats } from '@/hooks/useHabitStatsDB';import { getHabitColorClasses } from '@/utils/habitColors';
import { cn } from '@/lib/utils';
import { DeleteHabitDialog } from './DeleteHabitDialog';
interface HabitCardProps {
  habit: HabitWithCompletions;
  onToggle: (id: number) => void;
  onEdit?: (habit: HabitWithCompletions) => void;
  onDelete?: (id: number) => void;
  showActions?: boolean;
}

export function HabitCard({ habit, onToggle, onEdit, onDelete, showActions = true }: HabitCardProps) {
  const { isCompletedToday, getHabitStats } = useHabitStats();
  const stats = getHabitStats(habit);
  const completed = isCompletedToday(habit);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  if (!habit.id) return null;

  // Get color classes
  const borderColorClass = getHabitColorClasses(habit.color, 'border');
  const bgColorClass = getHabitColorClasses(habit.color, 'bg');
  const badgeColorClass = getHabitColorClasses(habit.color, 'badge');

  const handleDeleteConfirm = () => {
    if (onDelete && habit.id) {
      onDelete(habit.id);
    }
  };

  return (
    <Card className={cn(
      'transition-all hover:shadow-lg hover:border-primary/50 border-l-4',
      completed ? 'bg-muted/30' : '',
      borderColorClass || 'border-l-transparent',
      bgColorClass
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
            <Checkbox
              id={`habit-${habit.id}`}
              checked={completed}
              onCheckedChange={() => onToggle(habit.id!)}
              className="mt-1 shrink-0"
            />
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <label
                  htmlFor={`habit-${habit.id}`}
                  className={`cursor-pointer text-base sm:text-lg font-semibold transition-all ${
                    completed ? 'line-through text-muted-foreground' : ''
                  }`}
                >
                  {habit.name}
                </label>
                {stats.currentStreak > 0 && (
                  <Badge 
                    variant="secondary" 
                    className={cn(
                      "flex items-center gap-1 shrink-0",
                      badgeColorClass || ''
                    )}
                  >
                    <Flame className="h-3 w-3 text-orange-500" />
                    <span className="font-semibold">{stats.currentStreak}</span>
                  </Badge>
                )}
              </div>
              {habit.description && (
                <CardDescription className="text-sm">{habit.description}</CardDescription>
              )}
            </div>
          </div>
          {showActions && (
            <div className="flex gap-1 shrink-0">
              {onEdit && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(habit)}
                  aria-label="Edit habit"
                  className="h-8 w-8"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              )}
              {onDelete && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowDeleteDialog(true)}
                  aria-label="Delete habit"
                  className="h-8 w-8 hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}
        </div>
      </CardHeader>
      {(stats.currentStreak > 0 || stats.totalCompletions > 0) && (
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div>
              <span className="font-semibold text-foreground">{stats.totalCompletions}</span> total
            </div>
            <div>
              <span className="font-semibold text-foreground">{stats.longestStreak}</span> best
            </div>
            <div>
              <span className="font-semibold text-foreground">{stats.completionRate}%</span> rate
            </div>
          </div>
        </CardContent>
      )}
      <DeleteHabitDialog 
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDeleteConfirm}
        habitName={habit.name}
      />
    </Card>
  );
}
