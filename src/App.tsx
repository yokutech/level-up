import { useState, useMemo } from 'react';
import { format } from 'date-fns';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/layout/Header';
import { PageContainer } from '@/components/layout/PageContainer';
import { Dashboard } from '@/pages/Dashboard';
import { Analytics } from '@/pages/Analytics';
import { ManageHabits } from '@/pages/ManageHabits';
import { useHabits } from '@/hooks/useHabitsDB';
import type { DBHabit } from '@/db/dexie';
import { useHabitStats } from '@/hooks/useHabitStatsDB';
import { Toaster } from '@/components/ui/sonner';
import { OfflineIndicator, OnlineIndicator } from '@/components/pwa/OfflineIndicator';
import { InstallPrompt } from '@/components/pwa/InstallPrompt';
import { UpdatePrompt } from '@/components/pwa/UpdatePrompt';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const { habits, addHabit, updateHabit, deleteHabit, toggleHabitCompletion } = useHabits();
  const { getHabitStats } = useHabitStats();

  // Calculate dashboard stats
  const dashboardStats = useMemo(() => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const todayCompleted = habits.filter(habit => 
      habit.completedDates.includes(today)
    ).length;
    
    const stats = habits.map(h => getHabitStats(h));
    const activeStreaks = stats.filter(s => s.currentStreak > 0).length;
    const avgCompletionRate = stats.length > 0 
      ? Math.round(stats.reduce((sum, s) => sum + s.completionRate, 0) / stats.length)
      : 0;

    return {
      todayCompleted,
      totalHabits: habits.length,
      activeStreaks,
      completionRate: avgCompletionRate
    };
  }, [habits, getHabitStats]);

  const habitsStats = useMemo(() => 
    habits.map(h => getHabitStats(h)), 
    [habits, getHabitStats]
  );

  const handleToggle = async (id: number) => {
    await toggleHabitCompletion(id);
  };

  const handleAdd = async (name: string, description?: string, color?: string) => {
    await addHabit(name, description, color);
  };

  const handleUpdate = async (id: number, updates: Partial<{ name: string; description?: string; color?: string | null }>) => {
    await updateHabit(id, updates as Partial<Omit<DBHabit, 'id' | 'createdAt'>>);
  };

  const handleDelete = async (id: number) => {
    await deleteHabit(id);
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-background">
        <Header currentPage={currentPage} onNavigate={setCurrentPage} />
        <main>
          <PageContainer>
            {currentPage === 'dashboard' && (
              <Dashboard 
                habits={habits}
                onToggle={handleToggle}
                stats={dashboardStats}
              />
            )}
            {currentPage === 'analytics' && (
              <Analytics 
                habits={habits}
                habitsStats={habitsStats}
              />
            )}
            {currentPage === 'manage' && (
              <ManageHabits
                habits={habits}
                onAdd={handleAdd}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
                onToggle={handleToggle}
              />
            )}
          </PageContainer>
        </main>
        <Toaster />
        <OfflineIndicator />
        <OnlineIndicator />
        <InstallPrompt />
        <UpdatePrompt />
      </div>
    </ThemeProvider>
  );
}

export default App;
