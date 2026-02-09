export const REGISTRATION_ROLES = [
  { id: 'ADMIN', label: 'Admin' },
  { id: 'ASISTENMU', label: 'Asistenmu' },
  { id: 'SUPERVISOR', label: 'Supervisor' },
  { id: 'MANAGEMENT', label: 'Management' },
  { id: 'FINANCE', label: 'Finance' },
  { id: 'CUSTOMER_SERVICE', label: 'Customer Service' },
];

export const LOGIN_ROLES = [
  { id: 'ADMIN', label: 'Admin', route: '/admin/dashboard' },
  { id: 'ASISTENMU', label: 'Asistenmu', route: '/asistenmu/dashboard' },
  { id: 'SUPERVISOR', label: 'Supervisor', route: '/supervisor/dashboard' },
  { id: 'MANAGEMENT', label: 'Management', route: '/management/dashboard' },
  { id: 'FINANCE', label: 'Finance', route: '/finance/dashboard' },
  { id: 'CUSTOMER_SERVICE', label: 'Customer Service', route: '/customer-service/dashboard' },
];

export const SUPERADMIN_ROLE = {
  id: 'SUPERADMIN',
  label: 'Superadmin',
  route: '/superadmin/dashboard',
};

export const ALL_INTERNAL_ROLES = [
  SUPERADMIN_ROLE,
  ...LOGIN_ROLES,
];

export function getRoleRoute(role: string): string | null {
  const normalizedRole = role.trim().toUpperCase();
  
  if (normalizedRole === SUPERADMIN_ROLE.id) {
    return SUPERADMIN_ROLE.route;
  }
  
  const found = LOGIN_ROLES.find((r) => r.id === normalizedRole);
  return found ? found.route : null;
}
