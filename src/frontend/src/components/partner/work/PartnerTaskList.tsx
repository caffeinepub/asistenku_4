import type { PartnerTaskRecord } from '@/backend';
import PartnerTaskCard from './PartnerTaskCard';

interface PartnerTaskListProps {
  tasks: PartnerTaskRecord[];
  onTaskClick: (taskId: string) => void;
  emptyMessage: string;
}

export default function PartnerTaskList({ tasks, onTaskClick, emptyMessage }: PartnerTaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 border border-dashed rounded-lg">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <PartnerTaskCard key={task.taskId} task={task} onClick={() => onTaskClick(task.taskId)} />
      ))}
    </div>
  );
}
