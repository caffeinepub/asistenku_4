import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetPartnersByStatus, useGetInternalUsers, useGetCustomerServiceUsers } from '@/hooks/useSuperadminUserManagement';
import { useGetAllInternalTasks } from '@/hooks/useSuperadminTasks';
import { useGetAllServices } from '@/hooks/useQueries';
import { Users, Briefcase, CheckCircle, Clock } from 'lucide-react';

export default function CustomerServiceSummaryView() {
    const pendingPartners = useGetPartnersByStatus('pending');
    const activePartners = useGetPartnersByStatus('active');
    const suspendedPartners = useGetPartnersByStatus('suspended');
    const blacklistedPartners = useGetPartnersByStatus('blacklisted');
    const internalUsers = useGetInternalUsers();
    const csUsers = useGetCustomerServiceUsers();
    const { data: allTasks = [] } = useGetAllInternalTasks();
    const { data: allServices = [] } = useGetAllServices();

    const totalPartners = (pendingPartners.data?.length || 0) + (activePartners.data?.length || 0) + 
                          (suspendedPartners.data?.length || 0) + (blacklistedPartners.data?.length || 0);
    const totalInternalUsers = (internalUsers.data?.length || 0) + (csUsers.data?.length || 0);
    const totalServices = allServices.length;
    const totalTasks = allTasks.length;

    const summaryCards = [
        { title: 'Total Partners', value: totalPartners, icon: Users, color: 'text-blue-600' },
        { title: 'Internal Users', value: totalInternalUsers, icon: Users, color: 'text-teal-600' },
        { title: 'Total Services', value: totalServices, icon: Briefcase, color: 'text-purple-600' },
        { title: 'Total Tasks', value: totalTasks, icon: CheckCircle, color: 'text-green-600' },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold">Summary</h2>
                <p className="text-muted-foreground">Overview of system data (read-only)</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {summaryCards.map((card) => (
                    <Card key={card.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                            <card.icon className={`h-4 w-4 ${card.color}`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{card.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Customer Service Dashboard</CardTitle>
                    <CardDescription>Read-only access to system data for customer support</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Welcome to the Customer Service dashboard. You have read-only access to user, service, and task data.
                        Use the sidebar to navigate between different sections.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
