import { ThemeToggle } from '@/components/theme-toggle';
import { InstallButton } from '@/components/pwa/InstallPrompt';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const pages = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'manage', label: 'Manage Habits' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 shadow-sm">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          <div className="flex items-center gap-6 sm:gap-8">
            <div className="flex items-center gap-2 sm:gap-3 font-semibold text-lg sm:text-xl">
              <img 
                src="/icons/icon.png" 
                alt="Habit Tracker Icon" 
                className="h-8 w-8 sm:h-10 sm:w-10 rounded-md"
              />
              <span>Level Up</span>
            </div>
            <nav className="hidden sm:flex items-center gap-6">
              {pages.map(page => (
                <button
                  key={page.id}
                  onClick={() => onNavigate(page.id)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    currentPage === page.id
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  }`}
                >
                  {page.label}
                </button>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <InstallButton />
            <ThemeToggle />
          </div>
        </div>
        {/* Mobile Navigation */}
        <nav className="flex sm:hidden items-center gap-4 pb-3 overflow-x-auto">
          {pages.map(page => (
            <button
              key={page.id}
              onClick={() => onNavigate(page.id)}
              className={`text-sm font-medium whitespace-nowrap transition-colors hover:text-primary ${
                currentPage === page.id
                  ? 'text-foreground border-b-2 border-primary pb-1'
                  : 'text-muted-foreground'
              }`}
            >
              {page.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
