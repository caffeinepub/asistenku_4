import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCreateClientServiceRequest, useGetMyClientTasks } from '@/hooks/useClientServiceRequests';
import { useLocale } from '@/providers/LocaleProvider';
import { t } from '@/lib/i18n';
import { RequestType } from '@/backend';

export default function ClientServiceRequestTab() {
  const { locale } = useLocale();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [requestType, setRequestType] = useState<'NORMAL' | 'PRIORITY' | 'URGENT'>('NORMAL');
  const [clientDeadline, setClientDeadline] = useState('');

  const createMutation = useCreateClientServiceRequest();
  const { data: tasks = [], isLoading } = useGetMyClientTasks();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      return;
    }

    const deadlineBigInt = clientDeadline
      ? BigInt(new Date(clientDeadline).getTime())
      : null;

    const requestTypeEnum: RequestType = RequestType[requestType];

    await createMutation.mutateAsync({
      title: title.trim(),
      description: description.trim(),
      clientDeadline: deadlineBigInt,
      requestType: requestTypeEnum,
    });

    // Reset form after success
    setTitle('');
    setDescription('');
    setRequestType('NORMAL');
    setClientDeadline('');
  };

  const getRequestTypeBadge = (type: RequestType) => {
    const typeStr = String(type);
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
    <div className="space-y-6">
      {/* Request Form */}
      <Card>
        <CardHeader>
          <CardTitle>{t('service_request_form_title', locale)}</CardTitle>
          <CardDescription>{t('service_request_form_desc', locale)}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">
                {t('service_request_title_label', locale)} <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t('service_request_title_placeholder', locale)}
                required
                disabled={createMutation.isPending}
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">
                {t('service_request_description_label', locale)} <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t('service_request_description_placeholder', locale)}
                rows={4}
                required
                disabled={createMutation.isPending}
              />
            </div>

            {/* Request Type */}
            <div className="space-y-3">
              <Label>{t('service_request_type_label', locale)} <span className="text-destructive">*</span></Label>
              <RadioGroup
                value={requestType}
                onValueChange={(value) => setRequestType(value as 'NORMAL' | 'PRIORITY' | 'URGENT')}
                disabled={createMutation.isPending}
              >
                {/* NORMAL */}
                <div className="flex items-start space-x-3 p-3 rounded-lg border bg-card">
                  <RadioGroupItem value="NORMAL" id="normal" className="mt-1" />
                  <div className="flex-1 space-y-1">
                    <Label htmlFor="normal" className="font-medium cursor-pointer">
                      {t('request_type_normal', locale)}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {t('request_type_normal_helper', locale)}
                    </p>
                  </div>
                </div>

                {/* PRIORITY */}
                <div className="flex items-start space-x-3 p-3 rounded-lg border bg-card">
                  <RadioGroupItem value="PRIORITY" id="priority" className="mt-1" />
                  <div className="flex-1 space-y-1">
                    <Label htmlFor="priority" className="font-medium cursor-pointer">
                      {t('request_type_priority', locale)}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {t('request_type_priority_helper', locale)}
                    </p>
                  </div>
                </div>

                {/* URGENT */}
                <div className="flex items-start space-x-3 p-3 rounded-lg border-2 border-primary/20 bg-primary/5">
                  <RadioGroupItem value="URGENT" id="urgent" className="mt-1" />
                  <div className="flex-1 space-y-1">
                    <Label htmlFor="urgent" className="font-medium cursor-pointer">
                      {t('request_type_urgent', locale)}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {t('request_type_urgent_helper', locale)}
                    </p>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* Client Deadline (Optional) */}
            <div className="space-y-2">
              <Label htmlFor="deadline">{t('service_request_deadline_label', locale)}</Label>
              <Input
                id="deadline"
                type="date"
                value={clientDeadline}
                onChange={(e) => setClientDeadline(e.target.value)}
                disabled={createMutation.isPending}
              />
            </div>

            {/* Info Note */}
            <div className="p-4 rounded-lg bg-muted/50 border border-muted">
              <p className="text-sm text-muted-foreground">
                {t('service_request_info_note', locale)}
              </p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              disabled={createMutation.isPending || !title.trim() || !description.trim()}
            >
              {createMutation.isPending
                ? t('service_request_submitting', locale)
                : t('service_request_submit', locale)}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Request List */}
      <Card>
        <CardHeader>
          <CardTitle>{t('service_request_list_title', locale)}</CardTitle>
          <CardDescription>{t('service_request_list_desc', locale)}</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">
              {t('loading', locale)}
            </div>
          ) : tasks.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              {t('service_request_list_empty', locale)}
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
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      {getRequestTypeBadge(task.requestType)}
                      <Badge variant="outline">{t('status_requested', locale)}</Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t">
                    <span>{formatDate(BigInt(task.createdAt))}</span>
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
    </div>
  );
}
