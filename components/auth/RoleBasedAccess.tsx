'use client';

import { useAuthStore } from '@/store/authStore';
import { UserRole } from '@/lib/auth';

interface RoleBasedAccessProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function RoleBasedAccess({ allowedRoles, children, fallback = null }: RoleBasedAccessProps) {
  const { user } = useAuthStore();

  if (!user || !allowedRoles.includes(user.role)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

// Convenience components for specific roles
export function EmployeeOnly({ children, fallback }: { children: React.ReactNode; fallback?: React.ReactNode }) {
  return (
    <RoleBasedAccess allowedRoles={['employee']} fallback={fallback}>
      {children}
    </RoleBasedAccess>
  );
}

export function EmployerOnly({ children, fallback }: { children: React.ReactNode; fallback?: React.ReactNode }) {
  return (
    <RoleBasedAccess allowedRoles={['employer']} fallback={fallback}>
      {children}
    </RoleBasedAccess>
  );
}

export function AdminOnly({ children, fallback }: { children: React.ReactNode; fallback?: React.ReactNode }) {
  return (
    <RoleBasedAccess allowedRoles={['admin']} fallback={fallback}>
      {children}
    </RoleBasedAccess>
  );
}

export function AuthenticatedOnly({ children, fallback }: { children: React.ReactNode; fallback?: React.ReactNode }) {
  return (
    <RoleBasedAccess allowedRoles={['admin', 'employer', 'employee']} fallback={fallback}>
      {children}
    </RoleBasedAccess>
  );
}