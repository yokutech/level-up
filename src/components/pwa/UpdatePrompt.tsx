import { useRegisterSW } from 'virtual:pwa-register/react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { RefreshCw } from 'lucide-react';

export function UpdatePrompt() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r: ServiceWorkerRegistration | undefined) {
      console.log('SW Registered:', r);
    },
    onRegisterError(error: unknown) {
      console.log('SW registration error', error);
    },
  });

  const handleUpdate = () => {
    updateServiceWorker(true);
  };

  // Use needRefresh directly - no need for intermediate state
  if (!needRefresh) return null;

  return (
    <div className="fixed top-20 left-4 right-4 z-50 md:left-auto md:right-4 md:w-96 animate-in slide-in-from-top-5">
      <Alert className="border-2 border-blue-500 bg-blue-50 dark:bg-blue-950">
        <RefreshCw className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <AlertTitle className="text-blue-800 dark:text-blue-200 mb-2">
          Update Available
        </AlertTitle>
        <AlertDescription className="text-blue-700 dark:text-blue-300 space-y-2">
          <p className="text-sm">
            A new version of Level Up is available!
          </p>
          <div className="flex gap-2">
            <Button
              onClick={handleUpdate}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
            >
              Update Now
            </Button>
            <Button
              onClick={() => setNeedRefresh(false)}
              size="sm"
              variant="outline"
            >
              Later
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
}
