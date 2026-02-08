import { RequestType } from '../backend';
import type { PartnerTaskRecord } from '../backend';

const REQUEST_TYPE_PRIORITY: Record<RequestType, number> = {
  [RequestType.URGENT]: 3,
  [RequestType.PRIORITY]: 2,
  [RequestType.NORMAL]: 1,
};

export function sortTasksByPriority(tasks: PartnerTaskRecord[]): PartnerTaskRecord[] {
  return [...tasks].sort((a, b) => {
    // First: sort by request type (URGENT > PRIORITY > NORMAL)
    const priorityA = REQUEST_TYPE_PRIORITY[a.requestType] || 0;
    const priorityB = REQUEST_TYPE_PRIORITY[b.requestType] || 0;
    
    if (priorityA !== priorityB) {
      return priorityB - priorityA; // Higher priority first
    }

    // Second: sort by deadline (nearest first)
    const deadlineA = a.clientDeadline || a.internalDeadline || Number.MAX_SAFE_INTEGER;
    const deadlineB = b.clientDeadline || b.internalDeadline || Number.MAX_SAFE_INTEGER;
    
    return Number(deadlineA) - Number(deadlineB);
  });
}
