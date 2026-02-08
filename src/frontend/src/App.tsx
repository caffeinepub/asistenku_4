import { StrictMode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import RuntimeErrorBoundary from './components/RuntimeErrorBoundary';
import { LocaleProvider } from './providers/LocaleProvider';
import { Toaster } from './components/ui/sonner';

import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import InternalGatePage from './pages/InternalGatePage';
import InternalRegisterPage from './pages/InternalRegisterPage';
import InternalLoginPage from './pages/InternalLoginPage';
import InternalRoleMismatchPage from './pages/internal/InternalRoleMismatchPage';
import ClientDashboardPage from './pages/client/ClientDashboardPage';
import PartnerDashboardPage from './pages/partner/PartnerDashboardPage';
import PartnerBlockedPage from './pages/partner/PartnerBlockedPage';
import SuperadminDashboardPage from './pages/superadmin/SuperadminDashboardPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AsistenmuDashboardPage from './pages/internal/AsistenmuDashboardPage';
import SupervisorDashboardPage from './pages/internal/SupervisorDashboardPage';
import ManagementDashboardPage from './pages/internal/ManagementDashboardPage';
import FinanceDashboardPage from './pages/internal/FinanceDashboardPage';
import CustomerServiceDashboardPage from './pages/internal/CustomerServiceDashboardPage';
import SyaratKetentuanPage from './pages/SyaratKetentuanPage';
import KebijakanPrivasiPage from './pages/KebijakanPrivasiPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

const rootRoute = createRootRoute();

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LandingPage,
});

const daftarRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/daftar',
  component: RegisterPage,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
});

const internalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/internal',
  component: InternalGatePage,
});

const internalDaftarRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/internal/daftar',
  component: InternalRegisterPage,
});

const internalLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/internal/login',
  component: InternalLoginPage,
});

const internalRoleMismatchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/internal/role-mismatch',
  component: InternalRoleMismatchPage,
});

const clientDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/client/dashboard',
  component: ClientDashboardPage,
});

const partnerDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/partner/dashboard',
  component: PartnerDashboardPage,
});

const partnerBlockedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/partner/blocked',
  component: PartnerBlockedPage,
});

const superadminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/superadmin/dashboard',
  component: SuperadminDashboardPage,
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/dashboard',
  component: AdminDashboardPage,
});

const asistenmuDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/asistenmu/dashboard',
  component: AsistenmuDashboardPage,
});

const supervisorDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/supervisor/dashboard',
  component: SupervisorDashboardPage,
});

const managementDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/management/dashboard',
  component: ManagementDashboardPage,
});

const financeDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/finance/dashboard',
  component: FinanceDashboardPage,
});

const customerServiceDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/customer-service',
  component: CustomerServiceDashboardPage,
});

const syaratKetentuanRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/syarat-ketentuan',
  component: SyaratKetentuanPage,
});

const kebijakanPrivasiRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/kebijakan-privasi',
  component: KebijakanPrivasiPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  daftarRoute,
  loginRoute,
  internalRoute,
  internalDaftarRoute,
  internalLoginRoute,
  internalRoleMismatchRoute,
  clientDashboardRoute,
  partnerDashboardRoute,
  partnerBlockedRoute,
  superadminDashboardRoute,
  adminDashboardRoute,
  asistenmuDashboardRoute,
  supervisorDashboardRoute,
  managementDashboardRoute,
  financeDashboardRoute,
  customerServiceDashboardRoute,
  syaratKetentuanRoute,
  kebijakanPrivasiRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <StrictMode>
      <RuntimeErrorBoundary>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <LocaleProvider>
            <QueryClientProvider client={queryClient}>
              <RouterProvider router={router} />
              <Toaster />
            </QueryClientProvider>
          </LocaleProvider>
        </ThemeProvider>
      </RuntimeErrorBoundary>
    </StrictMode>
  );
}
