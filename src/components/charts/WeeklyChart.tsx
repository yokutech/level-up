import { useMemo } from 'react';
import { format, startOfWeek, addDays } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { HabitWithCompletions } from '@/hooks/useHabitsDB';
import { useTheme } from 'next-themes';

interface WeeklyChartProps {
  habits: HabitWithCompletions[];
}

export function WeeklyChart({ habits }: WeeklyChartProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const weeklyData = useMemo(() => {
    const today = new Date();
    const weekStart = startOfWeek(today, { weekStartsOn: 1 }); // Monday

    const data = [];
    for (let i = 0; i < 7; i++) {
      const date = addDays(weekStart, i);
      const dateStr = format(date, 'yyyy-MM-dd');
      const dayName = format(date, 'EEE');
      
      const completedCount = habits.filter(habit => 
        habit.completedDates.includes(dateStr)
      ).length;

      data.push({
        day: dayName,
        completed: completedCount,
        total: habits.length
      });
    }
    return data;
  }, [habits]);

  const chartColors = {
    completed: isDark ? 'hsl(142, 76%, 36%)' : 'hsl(142, 71%, 45%)',
    grid: isDark ? 'hsl(0, 0%, 20%)' : 'hsl(0, 0%, 90%)',
    text: isDark ? 'hsl(0, 0%, 85%)' : 'hsl(0, 0%, 15%)'
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">Weekly Progress</CardTitle>
        <CardDescription>Your habit completion this week</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={weeklyData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
            <XAxis 
              dataKey="day" 
              stroke={chartColors.text}
              fontSize={12}
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
            <Bar 
              dataKey="completed" 
              fill={chartColors.completed} 
              radius={[8, 8, 0, 0]} 
              name="Completed"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
