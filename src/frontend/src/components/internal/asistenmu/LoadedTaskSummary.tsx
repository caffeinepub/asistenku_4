import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Task } from '@/backend';

interface LoadedTaskSummaryProps {
  task: Task;
}

export default function LoadedTaskSummary({ task }: LoadedTaskSummaryProps) {
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

  return (
    <Card className="bg-muted/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Task Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
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
          <div className="font-medium text-muted-foreground mb-1">Request Type</div>
          {getRequestTypeBadge(task.taskType)}
        </div>
        
        <div>
          <div className="font-medium text-muted-foreground mb-1">Client Deadline</div>
          <div>—</div>
        </div>
      </CardContent>
    </Card>
  );
}
