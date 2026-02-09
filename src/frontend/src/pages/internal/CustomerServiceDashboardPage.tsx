import { useState } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import AccessGate from '@/components/AccessGate';
import LanguageToggle from '@/components/LanguageToggle';
import CustomerServiceSummaryView from '@/components/customer-service/CustomerServiceSummaryView';
import CustomerServiceUserManagementView from '@/components/customer-service/CustomerServiceUserManagementView';
import CustomerServiceServiceManagementView from '@/components/customer-service/CustomerServiceServiceManagementView';
import CustomerServiceTaskManagementView from '@/components/customer-service/CustomerServiceTaskManagementView';
import CustomerServiceGuideTab from '@/components/customer-service/CustomerServiceGuideTab';
import CustomerServiceTicketsTab from '@/components/customer-service/CustomerServiceTicketsTab';

function CustomerServiceDashboardContent() {
    const [activeMenu, setActiveMenu] = useState('ringkasan');

    const MENU_ITEMS = [
        { label: 'Summary', value: 'ringkasan' },
        { label: 'User Management', value: 'users' },
        { label: 'Service Management', value: 'services' },
        { label: 'Task Management', value: 'tasks' },
        { label: 'CS Guide', value: 'guide' },
        { label: 'Tickets / Escalation', value: 'tickets' }
    ];

    return (
        <div className="flex min-h-screen bg-background">
            <DashboardSidebar menuItems={MENU_ITEMS} activeItem={activeMenu} onItemClick={setActiveMenu} />

            <main className="flex-1 p-8">
                <div className="max-w-5xl mx-auto space-y-6">
                    <div className="flex items-center justify-end">
                        <LanguageToggle />
                    </div>

                    {activeMenu === 'ringkasan' && <CustomerServiceSummaryView />}
                    {activeMenu === 'users' && <CustomerServiceUserManagementView />}
                    {activeMenu === 'services' && <CustomerServiceServiceManagementView />}
                    {activeMenu === 'tasks' && <CustomerServiceTaskManagementView />}
                    {activeMenu === 'guide' && <CustomerServiceGuideTab />}
                    {activeMenu === 'tickets' && <CustomerServiceTicketsTab />}
                </div>
            </main>
        </div>
    );
}

export default function CustomerServiceDashboardPage() {
    return (
        <AccessGate requiredRole="CUSTOMER_SERVICE" isInternal={true}>
            <CustomerServiceDashboardContent />
        </AccessGate>
    );
}
