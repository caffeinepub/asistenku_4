import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useGetTaskById } from '@/hooks/useSuperadminTasks';
import { TaskStatusInternal, RequestType } from '../../backend';

interface SuperadminTaskDetailDialogProps {
  taskId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function getRequestTypeLabel(type: RequestType): string {
  switch (type) {
    case RequestType.URGENT:
      return 'Urgent';
    case RequestType.PRIORITY:
      return 'Priority';
    case RequestType.NORMAL:
      return 'Normal';
    default:
      return 'Unknown';
  }
}

function getRequestTypeBadgeVariant(type: RequestType): 'default' | 'secondary' | 'destructive' {
  switch (type) {
    case RequestType.URGENT:
      return 'destructive';
    case RequestType.PRIORITY:
      return 'default';
    case RequestType.NORMAL:
      return 'secondary';
    default:
      return 'secondary';
  }
}

function getStatusLabel(status: TaskStatusInternal): string {
  switch (status) {
    case TaskStatusInternal.REQUESTED:
      return 'Requested';
    case TaskStatusInternal.IN_PROGRESS:
      return 'In Progress';
    case TaskStatusInternal.QA_ASISTENMU:
      return 'QA';
    case TaskStatusInternal.REVISION:
      return 'Rejected / Cancelled';
    case TaskStatusInternal.DONE:
      return 'Completed';
    default:
      return 'Unknown';
  }
}

function getStatusBadgeVariant(status: TaskStatusInternal): 'default' | 'secondary' | 'outline' | 'destructive' {
  switch (status) {
    case TaskStatusInternal.REQUESTED:
      return 'default';
    case TaskStatusInternal.IN_PROGRESS:
      return 'secondary';
    case TaskStatusInternal.QA_ASISTENMU:
      return 'outline';
    case TaskStatusInternal.REVISION:
      return 'destructive';
    case TaskStatusInternal.DONE:
      return 'secondary';
    default:
      return 'outline';
  }
}

function formatDate(timestamp?: bigint): string {
  if (!timestamp) return '—';
  return new Date(Number(timestamp)).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function SuperadminTaskDetailDialog({ taskId, open, onOpenChange }: SuperadminTaskDetailDialogProps) {
  const { data: task, isLoading, isError } = useGetTaskById(taskId);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Task Details</DialogTitle>
          <DialogDescription>View complete task information</DialogDescription>
        </DialogHeader>

        {isLoading && (
          <div className="py-8 text-center text-muted-foreground">
            Loading task details...
          </div>
        )}

        {isError && (
          <div className="py-8 text-center text-destructive">
            Error loading task details
          </div>
        )}

        {!isLoading && !isError && !task && (
          <div className="py-8 text-center text-muted-foreground">
            Task not found
          </div>
        )}

        {task && (
          <div className="space-y-6">
            {/* Task ID and Status */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <p className="text-sm text-muted-foreground">Task ID: {task.taskId}</p>
              </div>
              <Badge variant={getStatusBadgeVariant(task.statusInternal)}>
                {getStatusLabel(task.statusInternal)}
              </Badge>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-sm font-medium mb-2">Description</h4>
              <p className="text-sm text-muted-foreground">{task.description}</p>
            </div>

            {/* Client Information */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Client ID</h4>
                <p className="text-sm text-muted-foreground">{task.clientId}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">Request Type</h4>
                <Badge variant={getRequestTypeBadgeVariant(task.requestType)}>
                  {getRequestTypeLabel(task.requestType)}
                </Badge>
              </div>
            </div>

            {/* Deadlines */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Client Deadline</h4>
                <p className="text-sm text-muted-foreground">{formatDate(task.clientDeadline ?? undefined)}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">Internal Deadline</h4>
                <p className="text-sm text-muted-foreground">{formatDate(task.internalDeadline ?? undefined)}</p>
              </div>
            </div>

            {/* Assignment Information */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Assigned Partner</h4>
                <p className="text-sm text-muted-foreground">{task.assignedPartnerId ?? '—'}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">Assigned Asistenmu</h4>
                <p className="text-sm text-muted-foreground">{task.assignedAsistenmuName || '—'}</p>
              </div>
            </div>

            {/* Timestamps */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <h4 className="text-sm font-medium mb-1">Created At</h4>
                <p className="text-sm text-muted-foreground">{formatDate(task.createdAt)}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">Updated At</h4>
                <p className="text-sm text-muted-foreground">{formatDate(task.updatedAt)}</p>
              </div>
            </div>

            {/* Principal ID */}
            <div className="pt-4 border-t">
              <h4 className="text-sm font-medium mb-1">Created By Principal</h4>
              <p className="text-xs text-muted-foreground font-mono break-all">
                {task.createdByPrincipal.toString()}
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
