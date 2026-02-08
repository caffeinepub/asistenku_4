import { useState } from 'react';
import { useGetIncomingRequests } from '@/hooks/useAsistenmuDelegation';
import TaskRow from './TaskRow';
import TaskDetailPanel from './TaskDetailPanel';

export default function IncomingRequestsTab() {
  const { data: tasks = [], isLoading, isError } = useGetIncomingRequests();
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Loading incoming requests...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12 text-destructive">
        Failed to load incoming requests. Please try again.
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No incoming requests at the moment.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div key={task.id}>
          <TaskRow
            task={task}
            onClick={() => setSelectedTaskId(selectedTaskId === task.id ? null : task.id)}
            isExpanded={selectedTaskId === task.id}
          />
          {selectedTaskId === task.id && (
            <TaskDetailPanel taskId={task.id} onClose={() => setSelectedTaskId(null)} />
          )}
        </div>
      ))}
    </div>
  );
}
