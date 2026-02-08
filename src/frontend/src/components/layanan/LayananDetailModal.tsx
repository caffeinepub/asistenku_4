import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { LayanankuPublic } from '@/hooks/useLayananku';

interface LayananDetailModalProps {
  layanan: LayanankuPublic;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LayananDetailModal({ layanan, open, onOpenChange }: LayananDetailModalProps) {
  const formatDate = (timestamp: bigint) => {
    return new Date(Number(timestamp)).toLocaleDateString('id-ID');
  };

  const getStatusLabel = (status: any) => {
    const statusStr = String(status).toLowerCase();
    if (statusStr === 'active') return 'Active';
    if (statusStr === 'inactive') return 'Inactive';
    if (statusStr === 'expired') return 'Expired';
    return 'Unknown';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Layanan Detail</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">ID Layanan</p>
            <p className="font-mono text-sm">{layanan.id}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Jenis</p>
            <p>{layanan.kind}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Status</p>
            <p>{getStatusLabel(layanan.status)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Masa Aktif</p>
            <p>{formatDate(layanan.startAt)} – {formatDate(layanan.endAt)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Share Principals ({layanan.sharePrincipals.length}/6)</p>
            <div className="space-y-1 mt-2">
              {layanan.sharePrincipals.length === 0 ? (
                <p className="text-sm text-muted-foreground">No shared principals</p>
              ) : (
                layanan.sharePrincipals.map((principal, index) => (
                  <p key={index} className="font-mono text-xs break-all">{principal}</p>
                ))
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
