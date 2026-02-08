import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { useGetAllInternalTasks } from '@/hooks/useSuperadminTasks';
import SuperadminTaskDetailDialog from '../superadmin/SuperadminTaskDetailDialog';
import CollapsibleCardSection from '../superadmin/CollapsibleCardSection';
import type { TaskRecord } from '../../backend';
import { TaskStatusInternal, RequestType } from '../../backend';

type StatusFilter = 'ALL' | TaskStatusInternal;

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: 'ALL', label: 'All Status' },
  { value: TaskStatusInternal.REQUESTED, label: 'Requested' },
  { value: TaskStatusInternal.IN_PROGRESS, label: 'In Progress' },
  { value: TaskStatusInternal.QA_ASISTENMU, label: 'QA' },
  { value: TaskStatusInternal.DONE, label: 'Completed' },
  { value: TaskStatusInternal.REVISION, label: 'Rejected / Cancelled' },
];

function getRequestTypeLabel(type: RequestType): string {
  switch (type) {
    case RequestType.URGENT: return 'Urgent';
    case RequestType.PRIORITY: return 'Priority';
    case RequestType.NORMAL: return 'Normal';
    default: return 'Unknown';
  }
}

function getRequestTypeBadgeVariant(type: RequestType): 'default' | 'secondary' | 'destructive' {
  switch (type) {
    case RequestType.URGENT: return 'destructive';
    case RequestType.PRIORITY: return 'default';
    case RequestType.NORMAL: return 'secondary';
    default: return 'secondary';
  }
}

function getStatusLabel(status: TaskStatusInternal): string {
  switch (status) {
    case TaskStatusInternal.REQUESTED: return 'Requested';
    case TaskStatusInternal.IN_PROGRESS: return 'In Progress';
    case TaskStatusInternal.QA_ASISTENMU: return 'QA';
    case TaskStatusInternal.REVISION: return 'Rejected / Cancelled';
    case TaskStatusInternal.DONE: return 'Completed';
    default: return 'Unknown';
  }
}

function getStatusBadgeVariant(status: TaskStatusInternal): 'default' | 'secondary' | 'outline' | 'destructive' {
  switch (status) {
    case TaskStatusInternal.REQUESTED: return 'default';
    case TaskStatusInternal.IN_PROGRESS: return 'secondary';
    case TaskStatusInternal.QA_ASISTENMU: return 'outline';
    case TaskStatusInternal.REVISION: return 'destructive';
    case TaskStatusInternal.DONE: return 'secondary';
    default: return 'outline';
  }
}

function formatDate(timestamp?: bigint): string {
  if (!timestamp) return '—';
  return new Date(Number(timestamp)).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

interface StatusCardProps {
  status: TaskStatusInternal;
  tasks: TaskRecord[];
  onTaskClick: (taskId: string) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
}

function StatusCard({ status, tasks, onTaskClick, currentPage, onPageChange }: StatusCardProps) {
  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(tasks.length / ITEMS_PER_PAGE);
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedTasks = tasks.slice(startIndex, endIndex);

  return (
    <CollapsibleCardSection title={`${getStatusLabel(status)} (${tasks.length})`} defaultExpanded={false}>
      {tasks.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">No tasks in this status</p>
      ) : (
        <>
          <div className="space-y-3">
            {paginatedTasks.map((task) => (
              <div
                key={task.taskId}
                onClick={() => onTaskClick(task.taskId)}
                className="p-4 rounded-lg border bg-card hover:bg-accent cursor-pointer transition-colors space-y-2"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Task ID:</span>
                      <span className="text-sm text-muted-foreground">{task.taskId}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Client ID:</span>
                      <span className="text-sm text-muted-foreground">{task.clientId}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Request Type:</span>
                      <Badge variant={getRequestTypeBadgeVariant(task.requestType)}>
                        {getRequestTypeLabel(task.requestType)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Deadline:</span>
                      <span className="text-sm text-muted-foreground">{formatDate(task.clientDeadline ?? undefined)}</span>
                    </div>
                  </div>
                  <div className="shrink-0">
                    <Badge variant={getStatusBadgeVariant(task.statusInternal)}>
                      {getStatusLabel(task.statusInternal)}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Page {currentPage + 1} of {totalPages}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPageChange(currentPage - 1)}
                  disabled={currentPage === 0}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages - 1}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </CollapsibleCardSection>
  );
}

export default function CustomerServiceTaskManagementView() {
  const { data: allTasks = [], isLoading } = useGetAllInternalTasks();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL');
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const [requestedPage, setRequestedPage] = useState(0);
  const [inProgressPage, setInProgressPage] = useState(0);
  const [qaPage, setQaPage] = useState(0);
  const [completedPage, setCompletedPage] = useState(0);
  const [rejectedPage, setRejectedPage] = useState(0);

  const filteredTasks = useMemo(() => {
    let filtered = allTasks;

    if (searchQuery.trim()) {
      filtered = filtered.filter((task) =>
        task.taskId.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== 'ALL') {
      filtered = filtered.filter((task) => task.statusInternal === statusFilter);
    }

    return filtered;
  }, [allTasks, searchQuery, statusFilter]);

  const tasksByStatus = useMemo(() => {
    const requested = filteredTasks.filter((t) => t.statusInternal === TaskStatusInternal.REQUESTED);
    const inProgress = filteredTasks.filter((t) => t.statusInternal === TaskStatusInternal.IN_PROGRESS);
    const qa = filteredTasks.filter((t) => t.statusInternal === TaskStatusInternal.QA_ASISTENMU);
    const completed = filteredTasks.filter((t) => t.statusInternal === TaskStatusInternal.DONE);
    const rejected = filteredTasks.filter((t) => t.statusInternal === TaskStatusInternal.REVISION);

    return { requested, inProgress, qa, completed, rejected };
  }, [filteredTasks]);

  const handleTaskClick = (taskId: string) => {
    setSelectedTaskId(taskId);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = (open: boolean) => {
    setIsDetailOpen(open);
    if (!open) {
      setSelectedTaskId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Task Management (Read-Only)</h2>
        <p className="text-muted-foreground">View and monitor all tasks</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by Task ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div className="flex-1">
          <label className="text-sm font-medium mb-2 block">Status Filter</label>
          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as StatusFilter)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-muted-foreground">Loading tasks...</div>
      ) : filteredTasks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No tasks match the current filters</p>
        </div>
      ) : (
        <div className="space-y-4">
          <StatusCard
            status={TaskStatusInternal.REQUESTED}
            tasks={tasksByStatus.requested}
            onTaskClick={handleTaskClick}
            currentPage={requestedPage}
            onPageChange={setRequestedPage}
          />
          <StatusCard
            status={TaskStatusInternal.IN_PROGRESS}
            tasks={tasksByStatus.inProgress}
            onTaskClick={handleTaskClick}
            currentPage={inProgressPage}
            onPageChange={setInProgressPage}
          />
          <StatusCard
            status={TaskStatusInternal.QA_ASISTENMU}
            tasks={tasksByStatus.qa}
            onTaskClick={handleTaskClick}
            currentPage={qaPage}
            onPageChange={setQaPage}
          />
          <StatusCard
            status={TaskStatusInternal.DONE}
            tasks={tasksByStatus.completed}
            onTaskClick={handleTaskClick}
            currentPage={completedPage}
            onPageChange={setCompletedPage}
          />
          <StatusCard
            status={TaskStatusInternal.REVISION}
            tasks={tasksByStatus.rejected}
            onTaskClick={handleTaskClick}
            currentPage={rejectedPage}
            onPageChange={setRejectedPage}
          />
        </div>
      )}

      <SuperadminTaskDetailDialog
        taskId={selectedTaskId}
        open={isDetailOpen}
        onOpenChange={handleCloseDetail}
      />
    </div>
  );
}
