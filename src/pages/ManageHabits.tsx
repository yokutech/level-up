import { useState } from "react";
import type { HabitWithCompletions } from "@/hooks/useHabitsDB";
import { HabitList } from "@/components/habits/HabitList";
import { HabitForm } from "@/components/habits/HabitForm";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionCard } from "@/components/layout/SectionCard";
import { Button } from "@/components/ui/button";
import { Plus, Settings } from "lucide-react";
import { toast } from "sonner";

interface ManageHabitsProps {
  habits: HabitWithCompletions[];
  onAdd: (name: string, description?: string, color?: string) => Promise<void>;
  onUpdate: (
    id: number,
    updates: Partial<HabitWithCompletions>,
  ) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  onToggle: (id: number) => Promise<void>;
}

export function ManageHabits({
  habits,
  onAdd,
  onUpdate,
  onDelete,
  onToggle,
}: ManageHabitsProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<HabitWithCompletions | null>(
    null,
  );

  const handleFormSubmit = async (
    name: string,
    description?: string,
    color?: string | null,
  ) => {
    try {
      if (editingHabit) {
        await onUpdate(editingHabit.id!, {
          name,
          description,
          color: color || undefined,
        });
        toast.success("Habit updated successfully!");
        setEditingHabit(null);
      } else {
        await onAdd(name, description, color || undefined);
        toast.success("Habit created successfully!");
      }
    } catch (error) {
      toast.error("Failed to save habit. Please try again.");
    }
  };

  const handleEdit = (habit: HabitWithCompletions) => {
    setEditingHabit(habit);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await onDelete(id);
      toast.success("Habit deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete habit. Please try again.");
    }
  };

  const handleFormClose = (open: boolean) => {
    setIsFormOpen(open);
    if (!open) {
      setEditingHabit(null);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <PageHeader
        title="Manage Habits"
        description="Create, edit, and organize your habits"
        action={
          <Button
            onClick={() => setIsFormOpen(true)}
            size="default"
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">New Habit</span>
            <span className="sm:hidden">New</span>
          </Button>
        }
      />

      {/* Habits List */}
      <SectionCard
        title="Your Habits"
        description={
          habits.length > 0
            ? `Managing ${habits.length} habit${habits.length === 1 ? "" : "s"}`
            : undefined
        }
        icon={<Settings className="h-5 w-5 text-primary" />}
      >
        <HabitList
          habits={habits}
          onToggle={onToggle}
          onEdit={handleEdit}
          onDelete={handleDelete}
          showActions={true}
          emptyMessage="No habits yet. Click 'New Habit' to create your first one!"
          emptyAction={{
            label: "Create Your First Habit",
            onClick: () => setIsFormOpen(true),
          }}
        />
      </SectionCard>

      {/* Form Dialog */}
      <HabitForm
        key={editingHabit?.id || "new"}
        habit={editingHabit}
        open={isFormOpen}
        onOpenChange={handleFormClose}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}
