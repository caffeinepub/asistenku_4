import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { useMyHasActiveLayananku } from '@/hooks/useLayananku';

interface ClientDelegasiLockStateProps {
  children: React.ReactNode;
}

export default function ClientDelegasiLockState({ children }: ClientDelegasiLockStateProps) {
  const { data: hasActive = false, isLoading, isError } = useMyHasActiveLayananku();

  if (isLoading) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Checking layanan status...
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to check layanan status. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  if (!hasActive) {
    return (
      <div className="space-y-4">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Anda belum mempunyai layanan aktif. Silahkan hubungi admin.
          </AlertDescription>
        </Alert>
        <div className="opacity-50 pointer-events-none">
          {children}
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
