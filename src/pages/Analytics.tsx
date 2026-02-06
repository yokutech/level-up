import type { HabitWithCompletions } from '@/hooks/useHabitsDB';
import type { HabitStats } from '@/hooks/useHabitStatsDB';
import { WeeklyChart } from '@/components/charts/WeeklyChart';
import { MonthlyChart } from '@/components/charts/MonthlyChart';
import { PageHeader } from '@/components/layout/PageHeader';
import { SectionCard } from '@/components/layout/SectionCard';
import { EmptyState } from '@/components/EmptyState';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Flame, Award, TrendingUp, BarChart3, ListChecks } from 'lucide-react';

interface AnalyticsProps {
  habits: HabitWithCompletions[];
  habitsStats: HabitStats[];
}

export function Analytics({ habits, habitsStats }: AnalyticsProps) {
  const topStreak = habitsStats.reduce((max, stat) => 
    stat.currentStreak > max.currentStreak ? stat : max
  , { currentStreak: 0, name: 'None' });

  const bestPerformer = habitsStats.reduce((max, stat) => 
    stat.completionRate > max.completionRate ? stat : max
  , { completionRate: 0, name: 'None' });

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <PageHeader 
        title="Analytics" 
        description="Track your progress and insights"
      />

      {/* Highlights */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="border-2 hover:border-primary/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Longest Streak</CardTitle>
            <Flame className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold">{topStreak.currentStreak} days</div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 truncate">
              {topStreak.name}
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-primary/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Best Performer</CardTitle>
            <Award className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold">{bestPerformer.completionRate}%</div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 truncate">
              {bestPerformer.name}
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-primary/50 transition-colors sm:col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Habits</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold">{habits.length}</div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              {habitsStats.filter(s => s.currentStreak > 0).length} active streaks
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      {habits.length === 0 ? (
        <EmptyState
          icon={<BarChart3 className="h-12 w-12 text-muted-foreground" />}
          title="No data to analyze yet"
          description="Create some habits and start tracking them to see your progress charts and statistics"
        />
      ) : (
        <SectionCard
          title="Progress Charts"
          description="Visual representation of your habit completion"
          icon={<BarChart3 className="h-5 w-5 text-primary" />}
        >
          <Tabs defaultValue="weekly" className="space-y-4">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
            <TabsContent value="weekly" className="space-y-4 mt-6">
              <WeeklyChart habits={habits} />
            </TabsContent>
            <TabsContent value="monthly" className="space-y-4 mt-6">
              <MonthlyChart habits={habits} />
            </TabsContent>
          </Tabs>
        </SectionCard>
      )}

      {/* Detailed Stats */}
      <SectionCard
        title="Habit Statistics"
        description="Detailed breakdown of each habit"
        icon={<ListChecks className="h-5 w-5 text-primary" />}
      >
        {habitsStats.length === 0 ? (
          <EmptyState
            icon={<ListChecks className="h-12 w-12 text-muted-foreground" />}
            title="No statistics available"
            description="Create and track habits to see detailed statistics here"
          />
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {habitsStats.map(stat => (
              <div 
                key={stat.id} 
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 border rounded-xl hover:bg-muted/50 hover:border-primary/50 transition-all"
              >
                <div className="space-y-1 flex-1 min-w-0">
                  <h3 className="font-semibold text-base truncate">{stat.name}</h3>
                  <div className="flex flex-wrap gap-3 sm:gap-4 text-sm text-muted-foreground">
                    <span>Total: <span className="font-semibold text-foreground">{stat.totalCompletions}</span></span>
                    <span>Best: <span className="font-semibold text-foreground">{stat.longestStreak}</span> days</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Flame className="h-3 w-3 text-orange-500" />
                    <span className="font-semibold">{stat.currentStreak}</span>
                  </Badge>
                  <Badge variant={stat.completionRate >= 80 ? 'default' : 'outline'} className="font-semibold">
                    {stat.completionRate}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>
    </div>
  );
}
