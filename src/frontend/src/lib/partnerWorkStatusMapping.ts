import { TaskStatusInternal, RequestType } from '../backend';
import type { PartnerTaskRecord } from '../backend';

export type WorkTab = 'NEW_TASKS' | 'ACTIVE' | 'QA' | 'CLIENT_REVIEW' | 'COMPLETED';

export function getTabForStatus(status: TaskStatusInternal): WorkTab {
  switch (status) {
    case TaskStatusInternal.REQUESTED:
      return 'NEW_TASKS';
    case TaskStatusInternal.IN_PROGRESS:
      return 'ACTIVE';
    case TaskStatusInternal.QA_ASISTENMU:
      return 'QA';
    case TaskStatusInternal.REVISION:
      return 'CLIENT_REVIEW';
    case TaskStatusInternal.DONE:
      return 'COMPLETED';
    default:
      return 'NEW_TASKS';
  }
}

export function getStatusBadgeVariant(status: TaskStatusInternal): 'default' | 'secondary' | 'outline' | 'destructive' {
  switch (status) {
    case TaskStatusInternal.REQUESTED:
      return 'default';
    case TaskStatusInternal.IN_PROGRESS:
      return 'secondary';
    case TaskStatusInternal.QA_ASISTENMU:
      return 'outline';
    case TaskStatusInternal.REVISION:
      return 'outline';
    case TaskStatusInternal.DONE:
      return 'secondary';
    default:
      return 'default';
  }
}

export function getStatusLabel(status: TaskStatusInternal): string {
  switch (status) {
    case TaskStatusInternal.REQUESTED:
      return 'New Assignment';
    case TaskStatusInternal.IN_PROGRESS:
      return 'In Progress';
    case TaskStatusInternal.QA_ASISTENMU:
      return 'QA Asistenmu';
    case TaskStatusInternal.REVISION:
      return 'Client Review';
    case TaskStatusInternal.DONE:
      return 'Completed';
    default:
      return 'Unknown';
  }
}

export function getRequestTypeLabel(type: RequestType): string {
  switch (type) {
    case RequestType.URGENT:
      return 'Urgent';
    case RequestType.PRIORITY:
      return 'Priority';
    case RequestType.NORMAL:
      return 'Normal';
    default:
      return 'Normal';
  }
}

export function getRequestTypeBadgeVariant(type: RequestType): 'default' | 'secondary' | 'destructive' {
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

export function filterTasksByTab(tasks: PartnerTaskRecord[], tab: WorkTab): PartnerTaskRecord[] {
  return tasks.filter(task => getTabForStatus(task.statusInternal) === tab);
}
