import { useMemo } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { HabitWithCompletions } from '@/hooks/useHabitsDB';
import { useTheme } from 'next-themes';

interface MonthlyChartProps {
  habits: HabitWithCompletions[];
}

export function MonthlyChart({ habits }: MonthlyChartProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const monthlyData = useMemo(() => {
    const today = new Date();
    const monthStart = startOfMonth(today);
    const monthEnd = endOfMonth(today);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

    return daysInMonth.map(date => {
      const dateStr = format(date, 'yyyy-MM-dd');
      const completedCount = habits.filter(habit => 
        habit.completedDates.includes(dateStr)
      ).length;

      return {
        date: format(date, 'MMM d'),
        completed: completedCount,
        total: habits.length,
        completionRate: habits.length > 0 
          ? Math.round((completedCount / habits.length) * 100) 
          : 0
      };
    });
  }, [habits]);

  const chartColors = {
    completed: isDark ? 'hsl(221, 83%, 53%)' : 'hsl(221, 83%, 53%)',
    rate: isDark ? 'hsl(142, 76%, 36%)' : 'hsl(142, 71%, 45%)',
    grid: isDark ? 'hsl(0, 0%, 20%)' : 'hsl(0, 0%, 90%)',
    text: isDark ? 'hsl(0, 0%, 85%)' : 'hsl(0, 0%, 15%)'
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">Monthly Overview</CardTitle>
        <CardDescription>Your habit completion this month</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={monthlyData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
            <XAxis 
              dataKey="date" 
              stroke={chartColors.text}
              fontSize={12}
              interval="preserveStartEnd"
            />
            <YAxis 
              stroke={chartColors.text}
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: isDark ? 'hsl(240, 10%, 15%)' : 'hsl(0, 0%, 100%)',
                border: `1px solid ${chartColors.grid}`,
                borderRadius: '8px',
                color: chartColors.text
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="completed" 
              stroke={chartColors.completed} 
              strokeWidth={2}
              dot={{ r: 3 }}
              name="Completed Habits"
            />
            <Line 
              type="monotone" 
              dataKey="completionRate" 
              stroke={chartColors.rate} 
              strokeWidth={2}
              dot={{ r: 3 }}
              name="Completion Rate (%)"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
