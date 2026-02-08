import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { useGetAllInternalTasks } from '@/hooks/useSuperadminTasks';
import SuperadminTaskDetailDialog from './SuperadminTaskDetailDialog';
import SuperadminTaskStatsGrid from './SuperadminTaskStatsGrid';
import CollapsibleCardSection from './CollapsibleCardSection';
import type { TaskRecord } from '../../backend';
import { TaskStatusInternal, RequestType } from '../../backend';

type StatusFilter = 'ALL' | TaskStatusInternal;
type PeriodFilter = 'ALL' | 'DAILY' | 'WEEKLY' | 'MONTHLY';

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: 'ALL', label: 'All Status' },
  { value: TaskStatusInternal.REQUESTED, label: 'Requested' },
  { value: TaskStatusInternal.IN_PROGRESS, label: 'In Progress' },
  { value: TaskStatusInternal.QA_ASISTENMU, label: 'QA' },
  { value: TaskStatusInternal.DONE, label: 'Completed' },
  { value: TaskStatusInternal.REVISION, label: 'Rejected / Cancelled' },
];

const PERIOD_OPTIONS: { value: PeriodFilter; label: string }[] = [
  { value: 'ALL', label: 'All Time' },
  { value: 'DAILY', label: 'Daily' },
  { value: 'WEEKLY', label: 'Weekly' },
  { value: 'MONTHLY', label: 'Monthly' },
];

function getRequestTypeLabel(type: RequestType): string {
  switch (type) {
    case RequestType.URGENT:
      return 'Urgent';
    case RequestType.PRIORITY:
      return 'Priority';
    case RequestType.NORMAL:
      return 'Normal';
    default:
      return 'Unknown';
  }
}

function getRequestTypeBadgeVariant(type: RequestType): 'default' | 'secondary' | 'destructive' {
  switch (type) {
    case RequestType.URGENT:
      return 'destructive';
    case RequestType.PRIORITY:
      return 'default';
    case RequestType.NORMAL:
      return 'secondary';
    default:
      return 'secondary';
  }
}

function getStatusLabel(status: TaskStatusInternal): string {
  switch (status) {
    case TaskStatusInternal.REQUESTED:
      return 'Requested';
    case TaskStatusInternal.IN_PROGRESS:
      return 'In Progress';
    case TaskStatusInternal.QA_ASISTENMU:
      return 'QA';
    case TaskStatusInternal.REVISION:
      return 'Rejected / Cancelled';
    case TaskStatusInternal.DONE:
      return 'Completed';
    default:
      return 'Unknown';
  }
}

function getStatusBadgeVariant(status: TaskStatusInternal): 'default' | 'secondary' | 'outline' | 'destructive' {
  switch (status) {
    case TaskStatusInternal.REQUESTED:
      return 'default';
    case TaskStatusInternal.IN_PROGRESS:
      return 'secondary';
    case TaskStatusInternal.QA_ASISTENMU:
      return 'outline';
    case TaskStatusInternal.REVISION:
      return 'destructive';
    case TaskStatusInternal.DONE:
      return 'secondary';
    default:
      return 'outline';
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

function filterByPeriod(tasks: TaskRecord[], period: PeriodFilter): TaskRecord[] {
  if (period === 'ALL') return tasks;

  const now = Date.now();
  const oneDayMs = 24 * 60 * 60 * 1000;
  const oneWeekMs = 7 * oneDayMs;
  const oneMonthMs = 30 * oneDayMs;

  return tasks.filter((task) => {
    const taskTime = Number(task.createdAt);
    const diff = now - taskTime;

    switch (period) {
      case 'DAILY':
        return diff <= oneDayMs;
      case 'WEEKLY':
        return diff <= oneWeekMs;
      case 'MONTHLY':
        return diff <= oneMonthMs;
      default:
        return true;
    }
  });
}

interface StatusCardProps {
  status: TaskStatusInternal | 'REJECTED_CANCELLED';
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

  const getCardTitle = () => {
    if (status === 'REJECTED_CANCELLED') {
      return `Rejected / Cancelled (${tasks.length})`;
    }
    return `${getStatusLabel(status)} (${tasks.length})`;
  };

  return (
    <CollapsibleCardSection title={getCardTitle()} defaultExpanded={true}>
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

export default function SuperadminTaskManagementView() {
  const { data: allTasks = [], isLoading } = useGetAllInternalTasks();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL');
  const [periodFilter, setPeriodFilter] = useState<PeriodFilter>('ALL');
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Pagination state per status
  const [requestedPage, setRequestedPage] = useState(0);
  const [assignedPage, setAssignedPage] = useState(0);
  const [inProgressPage, setInProgressPage] = useState(0);
  const [qaPage, setQaPage] = useState(0);
  const [completedPage, setCompletedPage] = useState(0);
  const [rejectedPage, setRejectedPage] = useState(0);

  const filteredTasks = useMemo(() => {
    let filtered = allTasks;

    // Apply search filter (Task ID only)
    if (searchQuery.trim()) {
      filtered = filtered.filter((task) =>
        task.taskId.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'ALL') {
      filtered = filtered.filter((task) => task.statusInternal === statusFilter);
    }

    // Apply period filter
    filtered = filterByPeriod(filtered, periodFilter);

    return filtered;
  }, [allTasks, searchQuery, statusFilter, periodFilter]);

  // Group tasks by status
  const tasksByStatus = useMemo(() => {
    const requested = filteredTasks.filter((t) => t.statusInternal === TaskStatusInternal.REQUESTED);
    const inProgress = filteredTasks.filter((t) => t.statusInternal === TaskStatusInternal.IN_PROGRESS);
    const qa = filteredTasks.filter((t) => t.statusInternal === TaskStatusInternal.QA_ASISTENMU);
    const completed = filteredTasks.filter((t) => t.statusInternal === TaskStatusInternal.DONE);
    const rejected = filteredTasks.filter((t) => t.statusInternal === TaskStatusInternal.REVISION);

    return {
      requested,
      inProgress,
      qa,
      completed,
      rejected,
    };
  }, [filteredTasks]);

  // Compute statistics from filtered tasks
  const taskStats = useMemo(() => {
    return {
      total: filteredTasks.length,
      requested: tasksByStatus.requested.length,
      inProgress: tasksByStatus.inProgress.length,
      qa: tasksByStatus.qa.length,
      completed: tasksByStatus.completed.length,
      rejectedCancelled: tasksByStatus.rejected.length,
    };
  }, [filteredTasks.length, tasksByStatus]);

  const handleSearch = () => {
    if (searchQuery.trim() && filteredTasks.length === 0) {
      toast.error('Task not found');
    }
  };

  const handleTaskClick = (taskId: string) => {
    setSelectedTaskId(taskId);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setSelectedTaskId(null);
  };

  const hasNoResults = filteredTasks.length === 0 && !isLoading;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Task Management</h2>
        <p className="text-muted-foreground">Manage and monitor all tasks across the system</p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by Task ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
              className="pl-9"
            />
          </div>
          <Button onClick={handleSearch} variant="default">
            Search
          </Button>
        </div>

        <div className="flex items-center gap-4">
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

          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">Period Filter</label>
            <Select value={periodFilter} onValueChange={(value) => setPeriodFilter(value as PeriodFilter)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PERIOD_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Statistics Grid */}
      {!isLoading && (
        <SuperadminTaskStatsGrid stats={taskStats} />
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-12 text-muted-foreground">
          Loading tasks...
        </div>
      )}

      {/* Empty State */}
      {hasNoResults && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No tasks match the current filters</p>
        </div>
      )}

      {/* Status Cards */}
      {!isLoading && !hasNoResults && (
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
            status="REJECTED_CANCELLED"
            tasks={tasksByStatus.rejected}
            onTaskClick={handleTaskClick}
            currentPage={rejectedPage}
            onPageChange={setRejectedPage}
          />
        </div>
      )}

      {/* Task Detail Dialog */}
      <SuperadminTaskDetailDialog
        taskId={selectedTaskId}
        open={isDetailOpen}
        onOpenChange={handleCloseDetail}
      />
    </div>
  );
}
