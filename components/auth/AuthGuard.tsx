'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, Lock, UserX } from 'lucide-react';
import { AuthModal } from './AuthModal';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  allowedRoles?: ('admin' | 'employer' | 'employee')[];
  fallback?: React.ReactNode;
}

export function AuthGuard({ 
  children, 
  requireAuth = true, 
  allowedRoles = [], 
  fallback 
}: AuthGuardProps) {
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const authRequired = searchParams.get('auth');
    const error = searchParams.get('error');
    
    if (authRequired === 'required' && !isAuthenticated) {
      setShowAuthModal(true);
    }
    
    if (error === 'unauthorized') {
      // Clear the error from URL
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete('error');
      router.replace(newUrl.pathname + newUrl.search);
    }
  }, [searchParams, isAuthenticated, router]);

  // Don't render anything on server or during hydration
  if (!mounted) {
    return null;
  }

  // If authentication is not required, render children
  if (!requireAuth) {
    return <>{children}</>;
  }

  // Check if user is authenticated
  if (!isAuthenticated || !user) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <>
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-md mx-auto">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-orange-600" />
              </div>
              <CardTitle>Authentication Required</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">
                You need to be logged in to access this page.
              </p>
              <Button 
                onClick={() => setShowAuthModal(true)}
                className="w-full"
              >
                Sign In
              </Button>
              <Button 
                variant="outline" 
                onClick={() => router.push('/')}
                className="w-full"
              >
                Go Home
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)} 
        />
      </>
    );
  }

  // Check role-based access
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <UserX className="w-6 h-6 text-red-600" />
            </div>
            <CardTitle>Access Denied</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              You don't have permission to access this page.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <div className="flex items-center gap-2 text-amber-800">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm font-medium">
                  Required role: {allowedRoles.join(' or ')}
                </span>
              </div>
              <p className="text-sm text-amber-700 mt-1">
                Your current role: {user.role}
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => router.push('/')}
              className="w-full"
            >
              Go Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // User is authenticated and has required role
  return <>{children}</>;
}

// Hook for checking authentication and roles
export function useAuthGuard() {
  const { user, isAuthenticated } = useAuthStore();
  
  const hasRole = (roles: ('admin' | 'employer' | 'employee')[]) => {
    if (!isAuthenticated || !user) return false;
    return roles.includes(user.role);
  };
  
  const canAccess = (requiredRoles?: ('admin' | 'employer' | 'employee')[]) => {
    if (!isAuthenticated || !user) return false;
    if (!requiredRoles || requiredRoles.length === 0) return true;
    return requiredRoles.includes(user.role) || user.role === 'admin';
  };
  
  return {
    user,
    isAuthenticated,
    hasRole,
    canAccess
  };
}