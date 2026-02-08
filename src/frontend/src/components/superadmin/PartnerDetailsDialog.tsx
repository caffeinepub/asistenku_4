import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useGetPartnerMetrics } from '@/hooks/useSuperadminUserManagement';
import { Loader2, AlertCircle } from 'lucide-react';

interface PartnerDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  partnerId: string;
}

export default function PartnerDetailsDialog({ open, onOpenChange, partnerId }: PartnerDetailsDialogProps) {
  const { data: metrics, isLoading, error } = useGetPartnerMetrics(partnerId);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Partner Performance Metrics</DialogTitle>
          <DialogDescription>
            View detailed performance metrics for this partner
          </DialogDescription>
        </DialogHeader>
        {error && (
          <div className="flex items-center gap-2 p-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-md">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <p>Failed to load metrics: {error.message}</p>
          </div>
        )}
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : metrics ? (
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Completed Jobs</p>
                <p className="text-2xl font-semibold">{metrics.completedJobs}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Rejected Jobs</p>
                <p className="text-2xl font-semibold">{metrics.rejectedJobs}</p>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Earnings (Estimated)</p>
              <p className="text-2xl font-semibold">Rp {metrics.totalEarnings.toLocaleString('id-ID')}</p>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
