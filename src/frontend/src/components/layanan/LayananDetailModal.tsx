import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import type { LayanankuPublic } from '@/backend';

interface LayananDetailModalProps {
  layanan: LayanankuPublic & { asistenmuName?: string };
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
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Detail Layanan</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>ID Layanan</Label>
            <p className="text-sm font-mono">{layanan.id}</p>
          </div>
          <div>
            <Label>Jenis</Label>
            <p className="text-sm">{layanan.kind}</p>
          </div>
          <div>
            <Label>Asistenmu</Label>
            <p className="text-sm">{layanan.asistenmuName || '—'}</p>
          </div>
          <div>
            <Label>Status</Label>
            <p className="text-sm">{getStatusLabel(layanan.status)}</p>
          </div>
          <div>
            <Label>Masa Aktif</Label>
            <p className="text-sm">
              {formatDate(layanan.startAt)} – {formatDate(layanan.endAt)}
            </p>
          </div>
          <div>
            <Label>Share Principals ({layanan.sharePrincipals.length}/6)</Label>
            <div className="mt-2 space-y-1">
              {layanan.sharePrincipals.map((principal, index) => (
                <p key={index} className="text-xs font-mono bg-muted p-2 rounded">
                  {principal}
                </p>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
