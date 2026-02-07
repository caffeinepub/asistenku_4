import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import RuntimeErrorBoundary from '@/components/RuntimeErrorBoundary';
import { LocaleProvider } from '@/providers/LocaleProvider';

import LandingPage from '@/pages/LandingPage';
import RegisterPage from '@/pages/RegisterPage';
import LoginPage from '@/pages/LoginPage';
import InternalGatePage from '@/pages/InternalGatePage';
import InternalRegisterPage from '@/pages/InternalRegisterPage';
import InternalLoginPage from '@/pages/InternalLoginPage';
import ClientDashboardPage from '@/pages/client/ClientDashboardPage';
import PartnerDashboardPage from '@/pages/partner/PartnerDashboardPage';
import SuperadminDashboardPage from '@/pages/superadmin/SuperadminDashboardPage';
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage';
import AsistenmuDashboardPage from '@/pages/internal/AsistenmuDashboardPage';
import SupervisorDashboardPage from '@/pages/internal/SupervisorDashboardPage';
import ManagementDashboardPage from '@/pages/internal/ManagementDashboardPage';
import FinanceDashboardPage from '@/pages/internal/FinanceDashboardPage';
import InternalRoleMismatchPage from '@/pages/internal/InternalRoleMismatchPage';
import SyaratKetentuanPage from '@/pages/SyaratKetentuanPage';
import KebijakanPrivasiPage from '@/pages/KebijakanPrivasiPage';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            refetchOnWindowFocus: false,
            retry: 1
        }
    }
});

const rootRoute = createRootRoute();

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: LandingPage
});

const registerRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/daftar',
    component: RegisterPage
});

const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/login',
    component: LoginPage
});

const internalRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/internal',
    component: InternalGatePage
});

const internalRegisterRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/internal/daftar',
    component: InternalRegisterPage
});

const internalLoginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/internal/login',
    component: InternalLoginPage
});

const clientRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/client',
    component: ClientDashboardPage
});

const partnerRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/partner',
    component: PartnerDashboardPage
});

const superadminRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/superadmin',
    component: SuperadminDashboardPage
});

const adminRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/admin',
    component: AdminDashboardPage
});

const asistenmuRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/asistenmu',
    component: AsistenmuDashboardPage
});

const supervisorRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/supervisor',
    component: SupervisorDashboardPage
});

const managementRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/management',
    component: ManagementDashboardPage
});

const financeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/finance',
    component: FinanceDashboardPage
});

const internalRoleMismatchRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/internal/role-mismatch',
    component: InternalRoleMismatchPage
});

const syaratKetentuanRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/syarat-ketentuan',
    component: SyaratKetentuanPage
});

const kebijakanPrivasiRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/kebijakan-privasi',
    component: KebijakanPrivasiPage
});

const routeTree = rootRoute.addChildren([
    indexRoute,
    registerRoute,
    loginRoute,
    internalRoute,
    internalRegisterRoute,
    internalLoginRoute,
    clientRoute,
    partnerRoute,
    superadminRoute,
    adminRoute,
    asistenmuRoute,
    supervisorRoute,
    managementRoute,
    financeRoute,
    internalRoleMismatchRoute,
    syaratKetentuanRoute,
    kebijakanPrivasiRoute
]);

const router = createRouter({ routeTree });

export default function App() {
    return (
        <RuntimeErrorBoundary>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} forcedTheme="light">
                <LocaleProvider>
                    <QueryClientProvider client={queryClient}>
                        <RouterProvider router={router} />
                        <Toaster />
                    </QueryClientProvider>
                </LocaleProvider>
            </ThemeProvider>
        </RuntimeErrorBoundary>
    );
}
