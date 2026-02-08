import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useGetAllClientTasks } from '@/hooks/useTasks';
import type { TaskRecord } from '@/backend';
import { useLocale } from '@/providers/LocaleProvider';
import { t } from '@/lib/i18n';

interface TaskListCardProps {
  title: string;
  description?: string;
}

export default function TaskListCard({ title, description }: TaskListCardProps) {
  const { locale } = useLocale();
  const { data: tasks = [], isLoading } = useGetAllClientTasks();

  const getRequestTypeBadge = (type: string) => {
    const typeStr = String(type).toUpperCase();
    if (typeStr === 'NORMAL') {
      return <Badge variant="secondary">{t('request_type_normal_label', locale)}</Badge>;
    }
    if (typeStr === 'PRIORITY') {
      return <Badge variant="default">{t('request_type_priority_label', locale)}</Badge>;
    }
    if (typeStr === 'URGENT') {
      return <Badge variant="destructive">{t('request_type_urgent_label', locale)}</Badge>;
    }
    return <Badge variant="outline">Unknown</Badge>;
  };

  const formatDate = (timestamp: bigint) => {
    return new Date(Number(timestamp)).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-8 text-muted-foreground">
            {t('loading', locale)}
          </div>
        ) : tasks.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            {t('no_requests_yet', locale)}
          </p>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.taskId}
                className="p-4 rounded-lg border bg-card space-y-2"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{task.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                      {task.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Client: {task.clientId}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    {getRequestTypeBadge(task.requestType)}
                    <Badge variant="outline">{t('status_requested', locale)}</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t">
                  <span>{formatDate(task.createdAt)}</span>
                  {task.clientDeadline && (
                    <span>
                      {t('deadline_label', locale)}: {formatDate(task.clientDeadline)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
