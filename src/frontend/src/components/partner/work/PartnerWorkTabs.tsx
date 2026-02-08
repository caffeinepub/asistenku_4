import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { useGetMyPartnerTasks } from '@/hooks/usePartnerWork';
import { filterTasksByTab } from '@/lib/partnerWorkStatusMapping';
import { sortTasksByPriority } from '@/lib/partnerWorkSorting';
import PartnerTaskList from './PartnerTaskList';
import PartnerTaskDetailDialog from './PartnerTaskDetailDialog';

interface PartnerWorkTabsProps {
  isLocked: boolean;
}

export default function PartnerWorkTabs({ isLocked }: PartnerWorkTabsProps) {
  const { data: partnerData, isLoading, error } = useGetMyPartnerTasks();
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('new');

  const tasks = partnerData?.tasks || [];

  const newTasks = filterTasksByTab(tasks, 'NEW_TASKS');
  const activeTasks = sortTasksByPriority(filterTasksByTab(tasks, 'ACTIVE'));
  const qaTasks = filterTasksByTab(tasks, 'QA');
  const reviewTasks = filterTasksByTab(tasks, 'CLIENT_REVIEW');
  const completedTasks = filterTasksByTab(tasks, 'COMPLETED');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">Loading tasks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Failed to load tasks. Please try again.</AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="new">Penugasan Baru</TabsTrigger>
          <TabsTrigger value="active">Tugas Aktif</TabsTrigger>
          <TabsTrigger value="qa">QA Asistenmu</TabsTrigger>
          <TabsTrigger value="review">Review Client</TabsTrigger>
          <TabsTrigger value="completed">Selesai</TabsTrigger>
        </TabsList>

        <TabsContent value="new" className="mt-6">
          <PartnerTaskList
            tasks={newTasks}
            onTaskClick={setSelectedTaskId}
            emptyMessage="Tidak ada penugasan baru saat ini."
          />
        </TabsContent>

        <TabsContent value="active" className="mt-6">
          <PartnerTaskList
            tasks={activeTasks}
            onTaskClick={setSelectedTaskId}
            emptyMessage="Tidak ada tugas aktif saat ini."
          />
        </TabsContent>

        <TabsContent value="qa" className="mt-6">
          <PartnerTaskList
            tasks={qaTasks}
            onTaskClick={setSelectedTaskId}
            emptyMessage="Tidak ada tugas dalam QA saat ini."
          />
        </TabsContent>

        <TabsContent value="review" className="mt-6">
          <PartnerTaskList
            tasks={reviewTasks}
            onTaskClick={setSelectedTaskId}
            emptyMessage="Tidak ada tugas dalam review client saat ini."
          />
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <PartnerTaskList
            tasks={completedTasks}
            onTaskClick={setSelectedTaskId}
            emptyMessage="Belum ada tugas yang selesai."
          />
        </TabsContent>
      </Tabs>

      <PartnerTaskDetailDialog
        taskId={selectedTaskId}
        open={!!selectedTaskId}
        onOpenChange={(open) => !open && setSelectedTaskId(null)}
        currentTab={activeTab}
        isLocked={isLocked}
      />
    </>
  );
}
