import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Calendar, Loader2 } from 'lucide-react';
import { useGetTaskById, useSetTaskStatus } from '@/hooks/usePartnerWork';
import { TaskStatusInternal } from '@/backend';
import { getStatusBadgeVariant, getStatusLabel, getRequestTypeLabel, getRequestTypeBadgeVariant } from '@/lib/partnerWorkStatusMapping';
import { toast } from 'sonner';

interface PartnerTaskDetailDialogProps {
  taskId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentTab: string;
  isLocked: boolean;
}

export default function PartnerTaskDetailDialog({
  taskId,
  open,
  onOpenChange,
  currentTab,
  isLocked,
}: PartnerTaskDetailDialogProps) {
  const { data: task, isLoading, error } = useGetTaskById(taskId);
  const setStatusMutation = useSetTaskStatus();
  const [rejectReason, setRejectReason] = useState('');

  const handleAccept = async () => {
    if (!taskId) return;
    try {
      await setStatusMutation.mutateAsync({
        taskId,
        status: TaskStatusInternal.IN_PROGRESS,
      });
      toast.success('Penugasan diterima');
      onOpenChange(false);
    } catch (err: any) {
      toast.error('Gagal menerima penugasan: ' + (err.message || 'Unknown error'));
    }
  };

  const handleReject = async () => {
    if (!taskId) return;
    try {
      // Note: Backend doesn't store reject reason yet, but we allow optional input
      await setStatusMutation.mutateAsync({
        taskId,
        status: TaskStatusInternal.DONE, // Using DONE as rejected status fallback
      });
      toast.success('Penugasan ditolak');
      onOpenChange(false);
      setRejectReason('');
    } catch (err: any) {
      toast.error('Gagal menolak penugasan: ' + (err.message || 'Unknown error'));
    }
  };

  const handleRequestQA = async () => {
    if (!taskId) return;
    try {
      await setStatusMutation.mutateAsync({
        taskId,
        status: TaskStatusInternal.QA_ASISTENMU,
      });
      toast.success('Permintaan QA dikirim');
      onOpenChange(false);
    } catch (err: any) {
      toast.error('Gagal meminta QA: ' + (err.message || 'Unknown error'));
    }
  };

  const showNewTaskActions = currentTab === 'new' && !isLocked;
  const showActiveTaskActions = currentTab === 'active' && !isLocked;
  const isReadOnly = currentTab === 'qa' || currentTab === 'review' || currentTab === 'completed' || isLocked;

  const deadline = task?.clientDeadline || task?.internalDeadline;
  const deadlineDate = deadline ? new Date(Number(deadline) / 1000000) : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detail Penugasan</DialogTitle>
          <DialogDescription>Informasi lengkap tentang penugasan ini</DialogDescription>
        </DialogHeader>

        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Gagal memuat detail penugasan.</AlertDescription>
          </Alert>
        )}

        {task && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-mono text-muted-foreground">{task.taskId}</span>
              <Badge variant={getRequestTypeBadgeVariant(task.requestType)}>
                {getRequestTypeLabel(task.requestType)}
              </Badge>
              <Badge variant={getStatusBadgeVariant(task.statusInternal)}>
                {getStatusLabel(task.statusInternal)}
              </Badge>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">{task.title || 'Untitled Task'}</h3>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {task.description || 'No description provided.'}
              </p>
            </div>

            {deadlineDate && (
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Deadline:</span>
                <span>{deadlineDate.toLocaleDateString('id-ID', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Client ID:</span>
                <p className="font-mono">{task.clientId}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Asistenmu:</span>
                <p>{task.assignedAsistenmuName || '-'}</p>
              </div>
            </div>

            {isLocked && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Aksi terkunci karena status akun Anda sedang pending atau suspended.
                </AlertDescription>
              </Alert>
            )}

            {showNewTaskActions && (
              <div className="space-y-4 pt-4 border-t">
                <div className="space-y-2">
                  <Label htmlFor="rejectReason">Alasan Penolakan (Opsional)</Label>
                  <Textarea
                    id="rejectReason"
                    placeholder="Masukkan alasan jika Anda menolak penugasan ini..."
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        <DialogFooter className="gap-2">
          {showNewTaskActions && (
            <>
              <Button
                variant="destructive"
                onClick={handleReject}
                disabled={setStatusMutation.isPending}
              >
                {setStatusMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Menolak...
                  </>
                ) : (
                  'Tolak'
                )}
              </Button>
              <Button onClick={handleAccept} disabled={setStatusMutation.isPending}>
                {setStatusMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Menerima...
                  </>
                ) : (
                  'Terima'
                )}
              </Button>
            </>
          )}

          {showActiveTaskActions && (
            <Button onClick={handleRequestQA} disabled={setStatusMutation.isPending}>
              {setStatusMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Mengirim...
                </>
              ) : (
                'Meminta QA Asistenmu'
              )}
            </Button>
          )}

          {isReadOnly && (
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Tutup
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
