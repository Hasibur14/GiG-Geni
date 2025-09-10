'use client';

import { useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { checkRoutePermission } from '@/lib/auth';

export function useRouteGuard() {
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Handle redirect after login
    const redirect = searchParams.get('redirect');
    if (redirect && isAuthenticated) {
      router.replace(redirect);
      return;
    }

    // Handle error messages from middleware
    const error = searchParams.get('error');
    if (error) {
      // Clear error params
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete('error');
      newUrl.searchParams.delete('required_role');
      newUrl.searchParams.delete('user_role');
      newUrl.searchParams.delete('redirect');
      
      window.history.replaceState({}, '', newUrl.toString());

      // Show appropriate error message
      if (error === 'auth_required') {
        console.log('Authentication required for this page');
      } else if (error === 'access_denied') {
        const requiredRole = searchParams.get('required_role');
        const userRole = searchParams.get('user_role');
        console.log(`Access denied. Required: ${requiredRole}, Current: ${userRole}`);
      }
    }

    // Client-side route protection check
    const permission = checkRoutePermission(pathname, user);
    if (!permission.allowed && permission.redirectTo) {
      router.push(permission.redirectTo);
    }
  }, [pathname, user, isAuthenticated, router, searchParams]);

  return {
    isAllowed: checkRoutePermission(pathname, user).allowed,
    user,
    isAuthenticated
  };
}