import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useGetAsistenmuCandidates, useAssignAsistenmuToLayananku } from '@/hooks/useAsistenmuAssignment';

interface EditAsistenmuModalProps {
  layanankuId: string;
  currentAsistenmuPrincipalId?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export default function EditAsistenmuModal({
  layanankuId,
  currentAsistenmuPrincipalId,
  open,
  onOpenChange,
  onSuccess,
}: EditAsistenmuModalProps) {
  const [selectedAsistenmuPrincipalId, setSelectedAsistenmuPrincipalId] = useState('');
  const { data: asistenmuCandidates = [], isLoading: loadingCandidates } = useGetAsistenmuCandidates();
  const assignMutation = useAssignAsistenmuToLayananku();

  useEffect(() => {
    if (open) {
      setSelectedAsistenmuPrincipalId(currentAsistenmuPrincipalId || '');
    }
  }, [open, currentAsistenmuPrincipalId]);

  const handleSubmit = async () => {
    if (!selectedAsistenmuPrincipalId) {
      return;
    }

    try {
      await assignMutation.mutateAsync({
        layanankuId,
        asistenmuPrincipalId: selectedAsistenmuPrincipalId,
      });
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      // Error handled by mutation
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Asistenmu</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Layanan ID (read-only)</Label>
            <p className="text-sm font-mono bg-muted p-2 rounded mt-1">{layanankuId}</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="asistenmu">Asistenmu</Label>
            <Select
              value={selectedAsistenmuPrincipalId}
              onValueChange={setSelectedAsistenmuPrincipalId}
              disabled={assignMutation.isPending}
            >
              <SelectTrigger id="asistenmu">
                <SelectValue placeholder="Pilih Asistenmu" />
              </SelectTrigger>
              <SelectContent>
                {loadingCandidates ? (
                  <SelectItem value="loading" disabled>
                    Loading...
                  </SelectItem>
                ) : asistenmuCandidates.length === 0 ? (
                  <SelectItem value="empty" disabled>
                    No Asistenmu available
                  </SelectItem>
                ) : (
                  asistenmuCandidates.map((candidate) => (
                    <SelectItem key={candidate.principalId} value={candidate.principalId}>
                      {candidate.name || 'Unnamed'} ({candidate.principalId.slice(0, 8)}...)
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={assignMutation.isPending}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={assignMutation.isPending || !selectedAsistenmuPrincipalId}>
            {assignMutation.isPending ? 'Saving...' : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
