import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, FileText } from 'lucide-react';
import type { PartnerTaskRecord } from '@/backend';
import { getStatusBadgeVariant, getStatusLabel, getRequestTypeLabel, getRequestTypeBadgeVariant } from '@/lib/partnerWorkStatusMapping';

interface PartnerTaskCardProps {
  task: PartnerTaskRecord;
  onClick: () => void;
}

export default function PartnerTaskCard({ task, onClick }: PartnerTaskCardProps) {
  const deadline = task.clientDeadline || task.internalDeadline;
  const deadlineDate = deadline ? new Date(Number(deadline) / 1000000) : null;

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-mono text-muted-foreground">{task.taskId}</span>
              <Badge variant={getRequestTypeBadgeVariant(task.requestType)}>
                {getRequestTypeLabel(task.requestType)}
              </Badge>
              <Badge variant={getStatusBadgeVariant(task.statusInternal)}>
                {getStatusLabel(task.statusInternal)}
              </Badge>
            </div>

            <h3 className="font-semibold text-lg">{task.title || 'Untitled Task'}</h3>

            {task.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
            )}

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {deadlineDate && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{deadlineDate.toLocaleDateString('id-ID')}</span>
                </div>
              )}
            </div>
          </div>

          <Button variant="outline" size="sm" onClick={onClick}>
            <FileText className="h-4 w-4 mr-1" />
            Detail
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
