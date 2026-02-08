import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import type { UserProfile } from '@/backend';
import { Loader2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import PartnerDetailsDialog from './PartnerDetailsDialog';
import PartnerEditDialog from './PartnerEditDialog';
import CollapsibleCardSection from './CollapsibleCardSection';
import {
  useApprovePartner,
  useRejectPartner,
  useSuspendPartner,
  useBlacklistPartner,
  useReactivatePartner,
} from '@/hooks/useSuperadminUserManagement';
import { mapBackendLevelToUI, formatHourlyRate } from '@/lib/superadminUserMapping';

interface PartnerStatusSectionProps {
  title: string;
  description: string;
  partners: UserProfile[];
  status: 'pending' | 'active' | 'suspended' | 'blacklisted';
  isLoading: boolean;
  error?: Error | null;
}

const LEVEL_RATES = {
  JUNIOR: 35000,
  SENIOR: 55000,
  EXPERT: 75000,
};

export default function PartnerStatusSection({ title, description, partners, status, isLoading, error }: PartnerStatusSectionProps) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [approveOpen, setApproveOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<UserProfile | null>(null);
  const [confirmAction, setConfirmAction] = useState<'reject' | 'suspend' | 'blacklist' | 'reactivate' | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<'JUNIOR' | 'SENIOR' | 'EXPERT'>('JUNIOR');

  const approvePartner = useApprovePartner();
  const rejectPartner = useRejectPartner();
  const suspendPartner = useSuspendPartner();
  const blacklistPartner = useBlacklistPartner();
  const reactivatePartner = useReactivatePartner();

  const handleDetails = (partner: UserProfile) => {
    setSelectedPartner(partner);
    setDetailsOpen(true);
  };

  const handleEdit = (partner: UserProfile) => {
    setSelectedPartner(partner);
    setEditOpen(true);
  };

  const handleApproveClick = (partner: UserProfile) => {
    setSelectedPartner(partner);
    setSelectedLevel('JUNIOR'); // Reset to default
    setApproveOpen(true);
  };

  const handleApproveConfirm = async () => {
    if (!selectedPartner) return;

    try {
      await approvePartner.mutateAsync({ partnerId: selectedPartner.id, level: selectedLevel });
      toast.success('Partner approved successfully');
      setApproveOpen(false);
      setSelectedPartner(null);
    } catch (error: any) {
      toast.error(error.message || 'Failed to approve partner');
    }
  };

  const handleActionClick = (partner: UserProfile, action: 'reject' | 'suspend' | 'blacklist' | 'reactivate') => {
    setSelectedPartner(partner);
    setConfirmAction(action);
    setConfirmOpen(true);
  };

  const handleActionConfirm = async () => {
    if (!selectedPartner || !confirmAction) return;

    try {
      switch (confirmAction) {
        case 'reject':
          await rejectPartner.mutateAsync(selectedPartner.id);
          toast.success('Partner rejected');
          break;
        case 'suspend':
          await suspendPartner.mutateAsync(selectedPartner.id);
          toast.success('Partner suspended');
          break;
        case 'blacklist':
          await blacklistPartner.mutateAsync(selectedPartner.id);
          toast.success('Partner blacklisted');
          break;
        case 'reactivate':
          await reactivatePartner.mutateAsync(selectedPartner.id);
          toast.success('Partner reactivated');
          break;
      }
      setConfirmOpen(false);
      setSelectedPartner(null);
      setConfirmAction(null);
    } catch (error: any) {
      toast.error(error.message || 'Action failed');
    }
  };

  const getPartnerName = (partner: UserProfile) => {
    return partner.partnerData?.name || 'N/A';
  };

  const getPartnerEmail = (partner: UserProfile) => {
    return partner.partnerData?.email || 'N/A';
  };

  const getPartnerSkills = (partner: UserProfile) => {
    return partner.partnerData?.skills || 'N/A';
  };

  const getPartnerDomisili = (partner: UserProfile) => {
    return partner.partnerData?.domisili || 'N/A';
  };

  const getPartnerLevel = (partner: UserProfile): 'JUNIOR' | 'SENIOR' | 'EXPERT' | null => {
    if (!partner.partnerData?.level) return null;
    return mapBackendLevelToUI(partner.partnerData.level);
  };

  const getPartnerHourlyRate = (partner: UserProfile): string => {
    if (!partner.partnerData?.hourlyRate) return 'N/A';
    return formatHourlyRate(partner.partnerData.hourlyRate);
  };

  return (
    <>
      <CollapsibleCardSection title={title} description={description}>
        {error && (
          <div className="flex items-center gap-2 p-4 mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-md">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <p>Failed to load partners: {error.message}</p>
          </div>
        )}
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : partners.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No partners found</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Partner ID</TableHead>
                <TableHead>Principal ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Skills</TableHead>
                <TableHead>Location</TableHead>
                {status !== 'blacklisted' && <TableHead>Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {partners.map((partner) => (
                <TableRow key={partner.id}>
                  <TableCell className="font-mono text-sm">{partner.id}</TableCell>
                  <TableCell className="font-mono text-xs">{partner.principalId.slice(0, 12)}...</TableCell>
                  <TableCell>{getPartnerName(partner)}</TableCell>
                  <TableCell>{getPartnerEmail(partner)}</TableCell>
                  <TableCell>{getPartnerSkills(partner)}</TableCell>
                  <TableCell>{getPartnerDomisili(partner)}</TableCell>
                  {status !== 'blacklisted' && (
                    <TableCell>
                      <div className="flex gap-2">
                        {status === 'pending' && (
                          <>
                            <Button size="sm" variant="outline" onClick={() => handleDetails(partner)}>
                              Details
                            </Button>
                            <Button size="sm" onClick={() => handleApproveClick(partner)}>
                              Approve
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleActionClick(partner, 'reject')}>
                              Reject
                            </Button>
                          </>
                        )}
                        {status === 'active' && (
                          <>
                            <Button size="sm" variant="outline" onClick={() => handleDetails(partner)}>
                              Details
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleEdit(partner)}>
                              Edit
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleActionClick(partner, 'suspend')}>
                              Suspend
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleActionClick(partner, 'blacklist')}>
                              Blacklist
                            </Button>
                          </>
                        )}
                        {status === 'suspended' && (
                          <>
                            <Button size="sm" onClick={() => handleActionClick(partner, 'reactivate')}>
                              Reactivate
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleActionClick(partner, 'blacklist')}>
                              Blacklist
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CollapsibleCardSection>

      {selectedPartner && (
        <>
          <PartnerDetailsDialog
            open={detailsOpen}
            onOpenChange={setDetailsOpen}
            partnerId={selectedPartner.id}
          />

          <PartnerEditDialog
            open={editOpen}
            onOpenChange={setEditOpen}
            partner={selectedPartner}
            currentLevel={getPartnerLevel(selectedPartner)}
            currentHourlyRate={getPartnerHourlyRate(selectedPartner)}
          />
        </>
      )}

      <Dialog open={approveOpen} onOpenChange={setApproveOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Partner</DialogTitle>
            <DialogDescription>
              Select the partner level. The hourly rate will be set automatically.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="level">Partner Level</Label>
              <Select value={selectedLevel} onValueChange={(value) => setSelectedLevel(value as 'JUNIOR' | 'SENIOR' | 'EXPERT')}>
                <SelectTrigger id="level">
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
              <Label htmlFor="hourlyRate">Hourly Rate (Read-only)</Label>
              <Input
                id="hourlyRate"
                value={`Rp ${LEVEL_RATES[selectedLevel].toLocaleString('id-ID')}`}
                readOnly
                disabled
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setApproveOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleApproveConfirm} disabled={approvePartner.isPending}>
              {approvePartner.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Action</AlertDialogTitle>
            <AlertDialogDescription>
              {confirmAction === 'reject' && 'Are you sure you want to reject this partner? This action cannot be undone.'}
              {confirmAction === 'suspend' && 'Are you sure you want to suspend this partner? They will not be able to access their account.'}
              {confirmAction === 'blacklist' && 'Are you sure you want to blacklist this partner? This is a permanent action.'}
              {confirmAction === 'reactivate' && 'Are you sure you want to reactivate this partner? They will regain access to their account.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleActionConfirm}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
