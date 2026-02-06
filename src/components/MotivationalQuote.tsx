import { useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Quote as QuoteIcon } from 'lucide-react';
import { motivationalQuotes } from '@/data/quotes';

export function MotivationalQuote() {
  // Get a consistent quote for the day using the date as seed
  const dailyQuote = useMemo(() => {
    const today = new Date().toDateString();
    const seed = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const index = seed % motivationalQuotes.length;
    return motivationalQuotes[index];
  }, []);

  return (
    <Card className="relative overflow-hidden border-primary/20 shadow-md">
      <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-primary/5 to-transparent pointer-events-none" />
      <CardContent className="relative p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <QuoteIcon className="h-10 w-10 sm:h-12 sm:w-12 text-primary shrink-0" />
          <div className="space-y-3 flex-1">
            <p className="text-lg sm:text-xl font-medium leading-relaxed italic">
              "{dailyQuote.text}"
            </p>
            <p className="text-sm sm:text-base text-muted-foreground font-medium">
              — {dailyQuote.author}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
