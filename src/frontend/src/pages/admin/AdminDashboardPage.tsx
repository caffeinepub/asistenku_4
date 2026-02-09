import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardSidebar from '@/components/DashboardSidebar';
import AccessGate from '@/components/AccessGate';
import LanguageToggle from '@/components/LanguageToggle';
import ManajemenLayananView from '@/components/layanan/ManajemenLayananView';
import UserManagementView from '@/components/superadmin/UserManagementView';
import MyProfileCard from '@/components/internal/MyProfileCard';
import { useLocale } from '@/providers/LocaleProvider';
import { t } from '@/lib/i18n';

function AdminDashboardContent() {
  const { locale } = useLocale();
  const [activeMenu, setActiveMenu] = useState('ringkasan');

  const MENU_ITEMS = [
    { label: 'Ringkasan', value: 'ringkasan' },
    { label: 'Manajemen User', value: 'users' },
    { label: 'Manajemen Layanan', value: 'layanan' },
    { label: 'Manajemen Task', value: 'task' },
    { label: 'Pengaturan', value: 'pengaturan' },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar menuItems={MENU_ITEMS} activeItem={activeMenu} onItemClick={setActiveMenu} />

      <main className="flex-1 p-8">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex items-center justify-end">
            <LanguageToggle />
          </div>

          <MyProfileCard />

          {activeMenu === 'ringkasan' && (
            <Card>
              <CardHeader>
                <CardTitle>{t('admin_summary_title', locale)}</CardTitle>
                <CardDescription>{t('admin_summary_desc', locale)}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{t('admin_summary_welcome', locale)}</p>
              </CardContent>
            </Card>
          )}

          {activeMenu === 'users' && <UserManagementView />}

          {activeMenu === 'layanan' && <ManajemenLayananView />}

          {activeMenu === 'task' && (
            <Card>
              <CardHeader>
                <CardTitle>Manajemen Task</CardTitle>
                <CardDescription>Task assignment and tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Task management features coming soon.</p>
              </CardContent>
            </Card>
          )}

          {activeMenu === 'pengaturan' && (
            <Card>
              <CardHeader>
                <CardTitle>Pengaturan</CardTitle>
                <CardDescription>System settings and configuration</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Settings coming soon.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <AccessGate requiredRole="ADMIN" isInternal={true}>
      <AdminDashboardContent />
    </AccessGate>
  );
}
