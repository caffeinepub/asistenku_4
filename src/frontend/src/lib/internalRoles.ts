/**
 * Single source of truth for internal role definitions.
 * Aligned with backend internalRoles set.
 */

export interface InternalRoleOption {
  id: string;
  label: string;
  description: string;
  route?: string;
}

/**
 * Complete list of internal roles recognized by the backend.
 * Must match backend's internalRoles set exactly.
 */
export const INTERNAL_ROLES: InternalRoleOption[] = [
  {
    id: 'SUPERADMIN',
    label: 'Superadmin',
    description: 'System administration and full access',
    route: '/superadmin/dashboard',
  },
  {
    id: 'ADMIN',
    label: 'Admin',
    description: 'Administrative access and user management',
    route: '/admin/dashboard',
  },
  {
    id: 'ASISTENMU',
    label: 'Asistenmu',
    description: 'Direct client support and assistance',
    route: '/asistenmu/dashboard',
  },
  {
    id: 'SUPERVISOR',
    label: 'Supervisor',
    description: 'Team supervision and coordination',
    route: '/supervisor/dashboard',
  },
  {
    id: 'MANAGEMENT',
    label: 'Management',
    description: 'Strategic management and planning',
    route: '/management/dashboard',
  },
  {
    id: 'FINANCE',
    label: 'Finance',
    description: 'Financial management and reporting',
    route: '/finance/dashboard',
  },
  {
    id: 'CUSTOMER_SERVICE',
    label: 'Customer Service',
    description: 'Customer support and assistance',
    route: '/customer-service',
  },
];

/**
 * Roles available for registration (excludes SUPERADMIN and ADMIN).
 */
export const REGISTRATION_ROLES = INTERNAL_ROLES.filter(
  (role) => role.id !== 'SUPERADMIN' && role.id !== 'ADMIN'
);

/**
 * Roles available for login workspace selection (all internal roles).
 */
export const LOGIN_ROLES = INTERNAL_ROLES.filter((role) => role.id !== 'SUPERADMIN');

/**
 * SUPERADMIN role for special claim flow.
 */
export const SUPERADMIN_ROLE = INTERNAL_ROLES.find((role) => role.id === 'SUPERADMIN')!;
