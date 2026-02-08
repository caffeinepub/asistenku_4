import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import CopyRow from '../CopyRow';
import type { UserProfile } from '@/backend';

interface ActiveClientDetailDialogProps {
  client: UserProfile;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ActiveClientDetailDialog({
  client,
  open,
  onOpenChange,
}: ActiveClientDetailDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Client Details</DialogTitle>
          <DialogDescription>Read-only view of client information</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <CopyRow label="Client ID" value={client.id} />
          <CopyRow label="Principal ID" value={client.principalId} />

          <div className="space-y-2">
            <label className="text-sm font-medium">Role</label>
            <div>
              <Badge variant="outline">{client.role}</Badge>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <div>
              <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
                {client.status}
              </Badge>
            </div>
          </div>

          {client.clientData && (
            <>
              {client.clientData.name && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <p className="text-sm">{client.clientData.name}</p>
                </div>
              )}

              {client.clientData.email && (
                <CopyRow label="Email" value={client.clientData.email} />
              )}

              {client.clientData.whatsapp && (
                <CopyRow label="WhatsApp" value={client.clientData.whatsapp} />
              )}

              {client.clientData.company && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Company</label>
                  <p className="text-sm">{client.clientData.company}</p>
                </div>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
