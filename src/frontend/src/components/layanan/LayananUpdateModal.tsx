import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, X } from 'lucide-react';
import { useUpdateLayanankuShare, LayanankuPublic } from '@/hooks/useLayananku';

interface LayananUpdateModalProps {
  layanan: LayanankuPublic;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LayananUpdateModal({ layanan, open, onOpenChange }: LayananUpdateModalProps) {
  const [sharePrincipals, setSharePrincipals] = useState<string[]>([]);
  const updateMutation = useUpdateLayanankuShare();

  useEffect(() => {
    if (open) {
      setSharePrincipals(layanan.sharePrincipals.length > 0 ? [...layanan.sharePrincipals] : ['']);
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
      onOpenChange(false);
    } catch (error) {
      // Error handled by mutation
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Share Principals</DialogTitle>
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
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Share Principals</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddShare}
                disabled={sharePrincipals.length >= 6}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">Max 6 principals</p>
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
            {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
