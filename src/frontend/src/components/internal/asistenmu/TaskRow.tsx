import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronRight } from 'lucide-react';
import type { Task } from '@/backend';

interface TaskRowProps {
  task: Task;
  onClick: () => void;
  isExpanded: boolean;
}

export default function TaskRow({ task, onClick, isExpanded }: TaskRowProps) {
  const getRequestTypeBadge = (taskType: string) => {
    const type = taskType.toUpperCase();
    if (type.includes('NORMAL')) {
      return <Badge variant="secondary">Normal</Badge>;
    }
    if (type.includes('PRIORITY')) {
      return <Badge variant="default">Priority</Badge>;
    }
    if (type.includes('URGENT')) {
      return <Badge variant="destructive">Urgent</Badge>;
    }
    return <Badge variant="outline">—</Badge>;
  };

  const formatDate = (timestamp: bigint | undefined) => {
    if (!timestamp) return '—';
    return new Date(Number(timestamp)).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusLabel = (status: any) => {
    if (typeof status === 'object' && status !== null) {
      const key = Object.keys(status)[0];
      return key ? key.replace(/([A-Z])/g, ' $1').trim() : 'Unknown';
    }
    return String(status);
  };

  return (
    <button
      onClick={onClick}
      className="w-full p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors text-left"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="mt-1">
            {isExpanded ? (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-muted-foreground">{task.id}</span>
            </div>
            <h4 className="font-medium truncate">{task.title}</h4>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              {getRequestTypeBadge(task.taskType)}
              <Badge variant="outline">{getStatusLabel(task.taskStatus)}</Badge>
            </div>
          </div>
        </div>
        <div className="text-xs text-muted-foreground text-right shrink-0">
          <div>Client Deadline:</div>
          <div className="font-medium">—</div>
        </div>
      </div>
    </button>
  );
}
