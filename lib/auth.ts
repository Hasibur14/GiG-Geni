import { User } from '@/store/authStore';

export type UserRole = 'admin' | 'employer' | 'employee';

export interface RoutePermission {
  path: string;
  allowedRoles: UserRole[];
  requiresAuth: boolean;
  redirectTo?: string;
}

// Define route permissions
export const ROUTE_PERMISSIONS: RoutePermission[] = [
  // Public routes (no auth required)
  { path: '/', allowedRoles: ['admin', 'employer', 'employee'], requiresAuth: false },
  { path: '/competitions', allowedRoles: ['admin', 'employer', 'employee'], requiresAuth: false },
  { path: '/leaderboards', allowedRoles: ['admin', 'employer', 'employee'], requiresAuth: false },
  { path: '/contact', allowedRoles: ['admin', 'employer', 'employee'], requiresAuth: false },
  
  // Private routes - General (all authenticated users)
  { path: '/profile', allowedRoles: ['admin', 'employer', 'employee'], requiresAuth: true, redirectTo: '/' },
  { path: '/settings', allowedRoles: ['admin', 'employer', 'employee'], requiresAuth: true, redirectTo: '/' },
  { path: '/notifications', allowedRoles: ['admin', 'employer', 'employee'], requiresAuth: true, redirectTo: '/' },
  
  // Employee-only routes
  { path: '/competitions/my', allowedRoles: ['employee'], requiresAuth: true, redirectTo: '/competitions' },
  { path: '/competitions/join', allowedRoles: ['employee'], requiresAuth: true, redirectTo: '/competitions' },
  { path: '/competitions/[id]/journey', allowedRoles: ['employee'], requiresAuth: true, redirectTo: '/competitions' },
  { path: '/(dashboard)/employee', allowedRoles: ['employee'], requiresAuth: true, redirectTo: '/' },
  
  // Employer-only routes
  { path: '/competitions/create', allowedRoles: ['employer'], requiresAuth: true, redirectTo: '/competitions' },
  { path: '/competitions/manage', allowedRoles: ['employer'], requiresAuth: true, redirectTo: '/competitions' },
  { path: '/(dashboard)/employer', allowedRoles: ['employer'], requiresAuth: true, redirectTo: '/' },
  
  // Admin-only routes
  { path: '/(dashboard)/admin', allowedRoles: ['admin'], requiresAuth: true, redirectTo: '/' },
];

export function checkRoutePermission(pathname: string, user: User | null): {
  allowed: boolean;
  redirectTo?: string;
  reason?: string;
} {
  // Find matching route permission
  const routePermission = ROUTE_PERMISSIONS.find(route => {
    // Handle dynamic routes
    if (route.path.includes('[')) {
      const routePattern = route.path.replace(/\[.*?\]/g, '[^/]+');
      const regex = new RegExp(`^${routePattern}$`);
      return regex.test(pathname);
    }
    
    // Handle grouped routes like (dashboard)
    if (route.path.includes('(') && route.path.includes(')')) {
      const routePattern = route.path.replace(/\([^)]+\)/g, '');
      return pathname.startsWith(routePattern);
    }
    
    // Exact match or starts with for nested routes
    return pathname === route.path || pathname.startsWith(route.path + '/');
  });

  // If no specific permission found, allow public access
  if (!routePermission) {
    return { allowed: true };
  }

  // Check if authentication is required
  if (routePermission.requiresAuth && !user) {
    return {
      allowed: false,
      redirectTo: routePermission.redirectTo || '/',
      reason: 'Authentication required'
    };
  }

  // Check role permissions
  if (user && !routePermission.allowedRoles.includes(user.role)) {
    return {
      allowed: false,
      redirectTo: '/access-denied',
      reason: `Access denied. Required roles: ${routePermission.allowedRoles.join(', ')}`
    };
  }

  return { allowed: true };
}

export function getRedirectPath(userRole: UserRole): string {
  switch (userRole) {
    case 'admin':
      return '/(dashboard)/admin';
    case 'employer':
      return '/competitions';
    case 'employee':
      return '/competitions';
    default:
      return '/';
  }
}

// Helper function to check if a route requires specific role
export function requiresRole(pathname: string, role: UserRole): boolean {
  const permission = ROUTE_PERMISSIONS.find(route => {
    if (route.path.includes('[')) {
      const routePattern = route.path.replace(/\[.*?\]/g, '[^/]+');
      const regex = new RegExp(`^${routePattern}$`);
      return regex.test(pathname);
    }
    
    if (route.path.includes('(') && route.path.includes(')')) {
      const routePattern = route.path.replace(/\([^)]+\)/g, '');
      return pathname.startsWith(routePattern);
    }
    
    return pathname === route.path || pathname.startsWith(route.path + '/');
  });

  return permission ? permission.allowedRoles.includes(role) && permission.allowedRoles.length === 1 : false;
}