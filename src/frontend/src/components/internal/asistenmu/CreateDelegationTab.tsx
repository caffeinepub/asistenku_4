import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useGetTaskById, useAssignTaskToPartner, useSetTaskStatus } from '@/hooks/useAsistenmuDelegation';
import { TaskStatusInternal } from '@/backend';
import LoadedTaskSummary from './LoadedTaskSummary';
import { toast } from 'sonner';

export default function CreateDelegationTab() {
  const [taskIdInput, setTaskIdInput] = useState('');
  const [loadedTaskId, setLoadedTaskId] = useState<string | null>(null);
  const [workDetails, setWorkDetails] = useState('');
  const [effectiveHours, setEffectiveHours] = useState('');
  const [deadline, setDeadline] = useState('');
  const [workType, setWorkType] = useState<'NORMAL' | 'PRIORITY' | 'URGENT'>('NORMAL');
  const [partnerId, setPartnerId] = useState('');

  const { data: task, isLoading: isLoadingTask, isError: isTaskError } = useGetTaskById(loadedTaskId);
  const assignMutation = useAssignTaskToPartner();
  const statusMutation = useSetTaskStatus();

  const handleLoadTask = () => {
    if (!taskIdInput.trim()) {
      toast.error('Please enter a Task ID');
      return;
    }
    setLoadedTaskId(taskIdInput.trim());
  };

  const handleSendDelegation = async () => {
    if (!loadedTaskId || !task) {
      toast.error('Please load a task first');
      return;
    }

    if (!partnerId.trim()) {
      toast.error('Please enter a Partner ID');
      return;
    }

    if (!workDetails.trim()) {
      toast.error('Please enter work details');
      return;
    }

    if (!effectiveHours.trim() || isNaN(Number(effectiveHours)) || Number(effectiveHours) <= 0) {
      toast.error('Please enter valid effective hours');
      return;
    }

    if (!deadline.trim()) {
      toast.error('Please select a deadline');
      return;
    }

    try {
      // Step 1: Assign task to partner
      await assignMutation.mutateAsync({
        taskId: loadedTaskId,
        partnerId: partnerId.trim(),
      });

      // Step 2: Update status to "In progress by Asistenmu team"
      await statusMutation.mutateAsync({
        taskId: loadedTaskId,
        status: TaskStatusInternal.IN_PROGRESS,
      });

      toast.success('Delegation sent successfully!');

      // Reset form
      setTaskIdInput('');
      setLoadedTaskId(null);
      setWorkDetails('');
      setEffectiveHours('');
      setDeadline('');
      setWorkType('NORMAL');
      setPartnerId('');
    } catch (error: any) {
      toast.error(error.message || 'Failed to send delegation');
    }
  };

  const isFormValid = loadedTaskId && task && partnerId.trim() && workDetails.trim() && effectiveHours.trim() && deadline.trim();
  const isSubmitting = assignMutation.isPending || statusMutation.isPending;

  return (
    <div className="space-y-6">
      {/* Task ID Load Section */}
      <div className="space-y-3">
        <div>
          <Label htmlFor="taskId">Task ID</Label>
          <div className="flex gap-2 mt-1.5">
            <Input
              id="taskId"
              value={taskIdInput}
              onChange={(e) => setTaskIdInput(e.target.value)}
              placeholder="e.g., TS-000001"
              className="flex-1"
            />
            <Button onClick={handleLoadTask} disabled={isLoadingTask}>
              {isLoadingTask ? 'Loading...' : 'Load'}
            </Button>
          </div>
        </div>

        {isTaskError && loadedTaskId && (
          <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
            Task not found or you don't have permission to view it.
          </div>
        )}
      </div>

      {/* Loaded Task Summary */}
      {task && <LoadedTaskSummary task={task} />}

      {/* Delegation Form */}
      {task && (
        <div className="space-y-4 pt-4 border-t">
          <h3 className="font-semibold">Delegation Details</h3>

          <div>
            <Label htmlFor="workDetails">Work Details *</Label>
            <Textarea
              id="workDetails"
              value={workDetails}
              onChange={(e) => setWorkDetails(e.target.value)}
              placeholder="Describe the work scope and requirements..."
              rows={4}
              className="mt-1.5"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="effectiveHours">Effective Hours *</Label>
              <Input
                id="effectiveHours"
                type="number"
                min="0"
                step="0.5"
                value={effectiveHours}
                onChange={(e) => setEffectiveHours(e.target.value)}
                placeholder="e.g., 8"
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="deadline">Deadline (AM → Partner) *</Label>
              <Input
                id="deadline"
                type="datetime-local"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="mt-1.5"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="workType">Work Type *</Label>
            <Select value={workType} onValueChange={(value: any) => setWorkType(value)}>
              <SelectTrigger className="mt-1.5">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NORMAL">Normal</SelectItem>
                <SelectItem value="PRIORITY">Priority</SelectItem>
                <SelectItem value="URGENT">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="partnerId">Partner ID *</Label>
            <Input
              id="partnerId"
              value={partnerId}
              onChange={(e) => setPartnerId(e.target.value)}
              placeholder="e.g., PA-000001"
              className="mt-1.5"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Enter the Partner ID manually
            </p>
          </div>

          <div className="pt-4">
            <Button
              onClick={handleSendDelegation}
              disabled={!isFormValid || isSubmitting}
              className="w-full"
            >
              {isSubmitting ? 'Sending...' : 'Send Delegation'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
