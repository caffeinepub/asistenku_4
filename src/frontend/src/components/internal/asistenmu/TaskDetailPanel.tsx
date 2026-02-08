import { useGetTaskById } from '@/hooks/useAsistenmuDelegation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TaskDetailPanelProps {
  taskId: string;
  onClose: () => void;
}

export default function TaskDetailPanel({ taskId, onClose }: TaskDetailPanelProps) {
  const { data: task, isLoading, isError } = useGetTaskById(taskId);

  if (isLoading) {
    return (
      <div className="ml-7 mt-2 p-4 rounded-lg border bg-muted/30">
        <p className="text-sm text-muted-foreground">Loading task details...</p>
      </div>
    );
  }

  if (isError || !task) {
    return (
      <div className="ml-7 mt-2 p-4 rounded-lg border bg-destructive/10">
        <p className="text-sm text-destructive">Failed to load task details.</p>
      </div>
    );
  }

  const getStatusLabel = (status: any) => {
    if (typeof status === 'object' && status !== null) {
      const key = Object.keys(status)[0];
      return key ? key.replace(/([A-Z])/g, ' $1').trim() : 'Unknown';
    }
    return String(status);
  };

  return (
    <div className="ml-7 mt-2">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <CardTitle className="text-base">Task Details</CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-6 w-6">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div>
            <div className="font-medium text-muted-foreground mb-1">Task ID</div>
            <div className="font-mono">{task.id}</div>
          </div>
          
          <div>
            <div className="font-medium text-muted-foreground mb-1">Title</div>
            <div>{task.title}</div>
          </div>
          
          <div>
            <div className="font-medium text-muted-foreground mb-1">Description</div>
            <div className="whitespace-pre-wrap">{task.description}</div>
          </div>
          
          <div>
            <div className="font-medium text-muted-foreground mb-1">Task Type</div>
            <div>{task.taskType}</div>
          </div>
          
          <div>
            <div className="font-medium text-muted-foreground mb-1">Status</div>
            <Badge variant="outline">{getStatusLabel(task.taskStatus)}</Badge>
          </div>
          
          <div>
            <div className="font-medium text-muted-foreground mb-1">Client Reference</div>
            <div>{task.clientReferenceId || '—'}</div>
          </div>
          
          {task.tags && (
            <div>
              <div className="font-medium text-muted-foreground mb-1">Tags</div>
              <div>{task.tags}</div>
            </div>
          )}
          
          {task.onboardingMaterial && (
            <div>
              <div className="font-medium text-muted-foreground mb-1">Onboarding Material</div>
              <div className="whitespace-pre-wrap">{task.onboardingMaterial}</div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
