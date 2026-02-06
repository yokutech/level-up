import { useEffect, useState } from 'react';
import { WifiOff, Wifi } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-96 animate-in slide-in-from-bottom-5">
      <Alert variant="destructive" className="border-2">
        <WifiOff className="h-4 w-4" />
        <AlertDescription className="ml-2">
          <strong>You're offline.</strong> Don't worry - your data is safe and the app works offline!
        </AlertDescription>
      </Alert>
    </div>
  );
}

export function OnlineIndicator() {
  const [showOnline, setShowOnline] = useState(false);
  const [wasOffline, setWasOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      if (wasOffline) {
        setShowOnline(true);
        setTimeout(() => setShowOnline(false), 3000);
      }
      setWasOffline(false);
    };

    const handleOffline = () => {
      setWasOffline(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [wasOffline]);

  if (!showOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-96 animate-in slide-in-from-bottom-5">
      <Alert className="border-2 border-green-500 bg-green-50 dark:bg-green-950">
        <Wifi className="h-4 w-4 text-green-600 dark:text-green-400" />
        <AlertDescription className="ml-2 text-green-800 dark:text-green-200">
          <strong>Back online!</strong> All your changes are saved.
        </AlertDescription>
      </Alert>
    </div>
  );
}
