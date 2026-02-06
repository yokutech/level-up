import { Check } from 'lucide-react';
import { HABIT_COLORS } from '@/utils/habitColors';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface HabitColorPickerProps {
  value: string | null | undefined;
  onChange: (colorId: string | null) => void;
}

export function HabitColorPicker({ value, onChange }: HabitColorPickerProps) {
  return (
    <div className="space-y-3">
      <Label>Color (Optional)</Label>
      <div className="grid grid-cols-5 sm:grid-cols-6 gap-2">
        {/* No Color Option */}
        <button
          type="button"
          onClick={() => onChange(null)}
          className={cn(
            'relative h-10 w-10 rounded-lg border-2 transition-all hover:scale-105',
            'bg-linear-to-br from-muted to-background',
            'flex items-center justify-center',
            !value
              ? 'border-primary ring-2 ring-primary ring-offset-2 ring-offset-background'
              : 'border-muted-foreground/20 hover:border-muted-foreground/40'
          )}
          title="No color"
        >
          {!value && (
            <Check className="h-4 w-4 text-primary" strokeWidth={3} />
          )}
          <span className="sr-only">No color</span>
        </button>

        {/* Color Options */}
        {HABIT_COLORS.map((color) => (
          <button
            key={color.id}
            type="button"
            onClick={() => onChange(color.id)}
            className={cn(
              'relative h-10 w-10 rounded-lg border-2 transition-all hover:scale-105',
              'flex items-center justify-center',
              value === color.id
                ? 'ring-2 ring-primary ring-offset-2 ring-offset-background border-primary'
                : 'border-transparent hover:border-muted-foreground/20'
            )}
            style={{ backgroundColor: color.value }}
            title={color.name}
          >
            {value === color.id && (
              <Check className="h-4 w-4 text-white drop-shadow-lg" strokeWidth={3} />
            )}
            <span className="sr-only">{color.name}</span>
          </button>
        ))}
      </div>
      {value && (
        <p className="text-xs text-muted-foreground">
          Selected: {HABIT_COLORS.find(c => c.id === value)?.name}
        </p>
      )}
    </div>
  );
}
