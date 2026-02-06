import type { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface SectionCardProps {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
}

export function SectionCard({ title, description, children, className, icon }: SectionCardProps) {
  if (!title) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          {children}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-4">
        <div className="flex items-start gap-3">
          {icon && <div className="mt-0.5">{icon}</div>}
          <div className="space-y-1 flex-1">
            <CardTitle className="text-xl font-semibold">{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {children}
      </CardContent>
    </Card>
  );
}
