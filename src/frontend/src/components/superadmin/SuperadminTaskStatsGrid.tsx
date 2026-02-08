import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Clock, PlayCircle, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface TaskStats {
  total: number;
  requested: number;
  inProgress: number;
  qa: number;
  completed: number;
  rejectedCancelled: number;
}

interface SuperadminTaskStatsGridProps {
  stats: TaskStats;
}

export default function SuperadminTaskStatsGrid({ stats }: SuperadminTaskStatsGridProps) {
  const statCards = [
    {
      title: 'Total Tasks',
      value: stats.total,
      icon: FileText,
      iconColor: 'text-primary',
    },
    {
      title: 'Requested',
      value: stats.requested,
      icon: Clock,
      iconColor: 'text-blue-600',
    },
    {
      title: 'In Progress',
      value: stats.inProgress,
      icon: PlayCircle,
      iconColor: 'text-amber-600',
    },
    {
      title: 'QA',
      value: stats.qa,
      icon: AlertCircle,
      iconColor: 'text-purple-600',
    },
    {
      title: 'Completed',
      value: stats.completed,
      icon: CheckCircle,
      iconColor: 'text-green-600',
    },
    {
      title: 'Rejected / Cancelled',
      value: stats.rejectedCancelled,
      icon: XCircle,
      iconColor: 'text-red-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {statCards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <Icon className={`h-5 w-5 ${card.iconColor}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
