import { useState, useEffect } from 'react';
import type { HabitWithCompletions } from '@/hooks/useHabitsDB';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { HabitColorPicker } from '@/components/habits/HabitColorPicker';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface HabitFormProps {
  habit?: HabitWithCompletions | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (name: string, description?: string, color?: string | null) => void;
}

export function HabitForm({ habit, open, onOpenChange, onSubmit }: HabitFormProps) {
  const [name, setName] = useState(habit?.name || '');
  const [description, setDescription] = useState(habit?.description || '');
  const [color, setColor] = useState<string | null>(habit?.color || null);

  // Reset form when dialog opens/closes or habit changes
  useEffect(() => {
    if (open) {
      setName(habit?.name || '');
      setDescription(habit?.description || '');
      setColor(habit?.color || null);
    }
  }, [open, habit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    onSubmit(name.trim(), description.trim() || undefined, color);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{habit ? 'Edit Habit' : 'Create New Habit'}</DialogTitle>
            <DialogDescription>
              {habit 
                ? 'Update your habit details below.' 
                : 'Add a new habit to track. Give it a meaningful name and optional description.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Morning Exercise"
                required
                autoFocus
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g., 30 minutes of cardio"
              />
            </div>
            <HabitColorPicker value={color} onChange={setColor} />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!name.trim()}>
              {habit ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
