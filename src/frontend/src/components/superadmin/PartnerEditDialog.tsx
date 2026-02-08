import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useUpdatePartnerLevel } from '@/hooks/useSuperadminUserManagement';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import type { UserProfile } from '@/backend';

interface PartnerEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  partner: UserProfile;
  currentLevel: 'JUNIOR' | 'SENIOR' | 'EXPERT' | null;
  currentHourlyRate: string;
}

const LEVEL_RATES = {
  JUNIOR: 35000,
  SENIOR: 55000,
  EXPERT: 75000,
};

export default function PartnerEditDialog({ open, onOpenChange, partner, currentLevel, currentHourlyRate }: PartnerEditDialogProps) {
  const [selectedLevel, setSelectedLevel] = useState<'JUNIOR' | 'SENIOR' | 'EXPERT'>(currentLevel || 'JUNIOR');
  const updatePartnerLevel = useUpdatePartnerLevel();

  // Reset form when dialog opens with new partner
  useEffect(() => {
    if (open && currentLevel) {
      setSelectedLevel(currentLevel);
    }
  }, [open, currentLevel]);

  const handleSave = async () => {
    try {
      await updatePartnerLevel.mutateAsync({ partnerId: partner.id, level: selectedLevel });
      toast.success('Partner level updated successfully');
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error.message || 'Failed to update partner level');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Partner Level</DialogTitle>
          <DialogDescription>
            Update the partner's level. The hourly rate will be adjusted automatically.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Current Level</Label>
            <p className="text-sm text-muted-foreground">{currentLevel || 'Not set'}</p>
          </div>
          <div className="space-y-2">
            <Label>Current Hourly Rate</Label>
            <p className="text-sm text-muted-foreground">{currentHourlyRate}</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="newLevel">New Level</Label>
            <Select value={selectedLevel} onValueChange={(value) => setSelectedLevel(value as 'JUNIOR' | 'SENIOR' | 'EXPERT')}>
              <SelectTrigger id="newLevel">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="JUNIOR">Junior</SelectItem>
                <SelectItem value="SENIOR">Senior</SelectItem>
                <SelectItem value="EXPERT">Expert</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="newHourlyRate">New Hourly Rate (Read-only)</Label>
            <Input
              id="newHourlyRate"
              value={`Rp ${LEVEL_RATES[selectedLevel].toLocaleString('id-ID')}`}
              readOnly
              disabled
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={updatePartnerLevel.isPending}>
            {updatePartnerLevel.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
