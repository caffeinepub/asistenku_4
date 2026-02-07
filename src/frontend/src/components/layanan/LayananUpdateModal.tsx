import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, X } from 'lucide-react';
import { useUpdateLayanankuShare } from '@/hooks/useLayananku';
import type { LayanankuPublic } from '@/backend';

interface LayananUpdateModalProps {
  layanan: LayanankuPublic;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export default function LayananUpdateModal({ layanan, open, onOpenChange, onSuccess }: LayananUpdateModalProps) {
  const [sharePrincipals, setSharePrincipals] = useState<string[]>([]);
  const updateMutation = useUpdateLayanankuShare();

  useEffect(() => {
    if (open) {
      setSharePrincipals([...layanan.sharePrincipals]);
    }
  }, [open, layanan]);

  const handleAddShare = () => {
    if (sharePrincipals.length < 6) {
      setSharePrincipals([...sharePrincipals, '']);
    }
  };

  const handleRemoveShare = (index: number) => {
    if (sharePrincipals.length > 1) {
      setSharePrincipals(sharePrincipals.filter((_, i) => i !== index));
    }
  };

  const handleShareChange = (index: number, value: string) => {
    const newShares = [...sharePrincipals];
    newShares[index] = value;
    setSharePrincipals(newShares);
  };

  const handleSubmit = async () => {
    const filteredShares = sharePrincipals.filter((p) => p.trim() !== '');

    try {
      await updateMutation.mutateAsync({
        idLayanan: layanan.id,
        newSharePrincipals: filteredShares,
      });
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      // Error handled by mutation
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Update Layanan</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>ID Layanan (read-only)</Label>
            <Input value={layanan.id} readOnly disabled className="font-mono" />
          </div>
          <div>
            <Label>Jenis (read-only)</Label>
            <Input value={layanan.kind} readOnly disabled />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Share Layanan (principalId)</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddShare}
                disabled={sharePrincipals.length >= 6}
              >
                <Plus className="h-4 w-4 mr-1" />
                Tambah
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mb-2">Max 6 principal termasuk pemilik</p>
            <div className="space-y-2">
              {sharePrincipals.map((principal, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={principal}
                    onChange={(e) => handleShareChange(index, e.target.value)}
                    placeholder="Principal ID"
                  />
                  {sharePrincipals.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => handleRemoveShare(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={updateMutation.isPending}>
            {updateMutation.isPending ? 'Updating...' : 'Update'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
