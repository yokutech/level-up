import { useEffect, useState } from 'react';
import { Download, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  // Check if already installed - computed value
  const isInstalled = typeof window !== 'undefined' && 
    window.matchMedia('(display-mode: standalone)').matches;

  useEffect(() => {
    // Don't show if already installed
    if (isInstalled) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Show prompt after a delay (better UX)
      setTimeout(() => {
        // Check if user hasn't dismissed it before
        const dismissed = localStorage.getItem('pwa-install-dismissed');
        if (!dismissed) {
          setShowPrompt(true);
        }
      }, 3000);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, [isInstalled]);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      toast.success('App installed successfully! 🎉');
      setShowPrompt(false);
    } else {
      toast.info('You can install the app anytime from your browser menu');
    }

    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-install-dismissed', 'true');
    toast.info('You can install the app anytime from the menu');
  };

  if (!showPrompt || !deferredPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-96 animate-in slide-in-from-bottom-5">
      <Card className="border-2 border-primary">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Download className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Install Level Up</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={handleDismiss}
              className="h-6 w-6"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription>
            Install this app on your device for quick access and offline use
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Button onClick={handleInstall} className="flex-1">
            Install Now
          </Button>
          <Button onClick={handleDismiss} variant="outline">
            Maybe Later
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

// Install button for header
export function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  // Check if already installed - computed value
  const isInstalled = typeof window !== 'undefined' && 
    window.matchMedia('(display-mode: standalone)').matches;

  useEffect(() => {
    // Don't listen for event if already installed
    if (isInstalled) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, [isInstalled]);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      toast.success('App installed successfully! 🎉');
    }

    setDeferredPrompt(null);
  };

  if (isInstalled || !deferredPrompt) return null;

  return (
    <Button
      onClick={handleInstall}
      variant="outline"
      size="sm"
      className="gap-2"
    >
      <Download className="h-4 w-4" />
      Install App
    </Button>
  );
}
