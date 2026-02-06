import { format } from 'date-fns';
import type { HabitWithCompletions } from '@/hooks/useHabitsDB';
import { HabitList } from '@/components/habits/HabitList';
import { MotivationalQuote } from '@/components/MotivationalQuote';
import { EmptyState } from '@/components/EmptyState';
import { PageHeader } from '@/components/layout/PageHeader';
import { SectionCard } from '@/components/layout/SectionCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, TrendingUp, Award, CheckCircle2, Plus } from 'lucide-react';

interface DashboardProps {
  habits: HabitWithCompletions[];
  onToggle: (id: number) => void;
  stats: {
    todayCompleted: number;
    totalHabits: number;
    activeStreaks: number;
    completionRate: number;
  };
}

export function Dashboard({ habits, onToggle, stats }: DashboardProps) {
  const today = format(new Date(), 'EEEE, MMMM d, yyyy');

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header Section */}
      <PageHeader 
        title="Dashboard" 
        description={today}
      />

      {/* Stats Grid */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="border-2 hover:border-primary/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Progress</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold">
              {stats.todayCompleted} / {stats.totalHabits}
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              {stats.totalHabits > 0 
                ? `${Math.round((stats.todayCompleted / stats.totalHabits) * 100)}% complete`
                : 'No habits yet'}
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-primary/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Streaks</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold">{stats.activeStreaks}</div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Keep the momentum going!
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-primary/50 transition-colors sm:col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Rate</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold">{stats.completionRate}%</div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Average completion rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Motivational Quote */}
      <MotivationalQuote />

      {/* Today's Habits Section */}
      <SectionCard 
        title="Today's Habits" 
        description="Check off your habits as you complete them"
        icon={<CheckCircle2 className="h-5 w-5 text-primary" />}
      >
        {habits.length === 0 ? (
          <EmptyState
            icon={<Plus className="h-8 w-8 text-muted-foreground" />}
            title="No habits yet"
            description="Get started by creating your first habit in the Manage Habits section"
          />
        ) : (
          <HabitList 
            habits={habits} 
            onToggle={onToggle}
            showActions={false}
          />
        )}
      </SectionCard>
    </div>
  );
}
