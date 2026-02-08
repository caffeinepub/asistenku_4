import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import CopyRow from '@/components/CopyRow';
import type { UserProfile } from '@/backend';

interface CustomerServiceUserDetailPanelProps {
  user: UserProfile;
  isOpen: boolean;
  onClose: () => void;
}

export default function CustomerServiceUserDetailPanel({
  user,
  isOpen,
  onClose
}: CustomerServiceUserDetailPanelProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>User Details (Read-Only)</DialogTitle>
          <DialogDescription>View user information</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Status:</span>
            <Badge variant="outline">{user.status}</Badge>
          </div>

          <CopyRow label="User ID" value={user.id} />
          <CopyRow label="Principal ID" value={user.principalId} />

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Role:</span>
            <Badge>{user.role}</Badge>
          </div>

          {user.clientData && (
            <div className="space-y-2 pt-4 border-t">
              <h4 className="font-medium">Client Data</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-muted-foreground">Name:</span>
                <span>{user.clientData.name}</span>
                <span className="text-muted-foreground">Email:</span>
                <span>{user.clientData.email}</span>
                <span className="text-muted-foreground">WhatsApp:</span>
                <span>{user.clientData.whatsapp}</span>
                <span className="text-muted-foreground">Company:</span>
                <span>{user.clientData.company}</span>
              </div>
            </div>
          )}

          {user.partnerData && (
            <div className="space-y-2 pt-4 border-t">
              <h4 className="font-medium">Partner Data</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-muted-foreground">Name:</span>
                <span>{user.partnerData.name}</span>
                <span className="text-muted-foreground">Email:</span>
                <span>{user.partnerData.email}</span>
                <span className="text-muted-foreground">WhatsApp:</span>
                <span>{user.partnerData.whatsapp}</span>
                <span className="text-muted-foreground">Skills:</span>
                <span>{user.partnerData.skills}</span>
                <span className="text-muted-foreground">Domisili:</span>
                <span>{user.partnerData.domisili}</span>
                <span className="text-muted-foreground">Level:</span>
                <span>{user.partnerData.level}</span>
                <span className="text-muted-foreground">Hourly Rate:</span>
                <span>{user.partnerData.hourlyRate.toString()}</span>
              </div>
            </div>
          )}

          {user.internalData && (
            <div className="space-y-2 pt-4 border-t">
              <h4 className="font-medium">Internal Data</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-muted-foreground">Name:</span>
                <span>{user.internalData.name || '—'}</span>
                <span className="text-muted-foreground">Email:</span>
                <span>{user.internalData.email || '—'}</span>
                <span className="text-muted-foreground">WhatsApp:</span>
                <span>{user.internalData.whatsapp || '—'}</span>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
