'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { checkRoutePermission } from '@/lib/auth';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Lock, ArrowLeft, Home } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAuthStore();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Just check if we're done loading auth state
    setIsChecking(false);
  }, [user, isAuthenticated]);

  // Show loading state while checking permissions
  if (isChecking) {
    return fallback || (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  // Check permissions
  const permission = checkRoutePermission(pathname, user);

  // If not authenticated, the OnboardingProvider will handle showing the login modal
  // If authenticated but no permission, show access denied
  if (!permission.allowed && isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="border-destructive/20">
          <CardContent className="pt-6">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
                <AlertTriangle className="w-8 h-8 text-destructive" />
              </div>
              
              <div>
                <h1 className="text-2xl font-bold text-destructive mb-2">
                  Access Denied
                </h1>
                <p className="text-muted-foreground">
                  {permission.reason || 'You do not have permission to access this page.'}
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  This page is restricted to specific user roles.
                </p>
                <div className="flex gap-2 justify-center">
                  <Button variant="outline" onClick={() => window.history.back()}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Go Back
                  </Button>
                  <Button onClick={() => window.location.href = '/'}>
                    <Home className="w-4 h-4 mr-2" />
                    Go Home
                  </Button>
                </div>
              </div>

              {user && (
                <div className="text-xs text-muted-foreground bg-muted p-3 rounded">
                  <p>Current role: <span className="font-medium capitalize">{user.role}</span></p>
                  <p>Email: <span className="font-medium">{user.email}</span></p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // If not authenticated, show a loading state while the OnboardingProvider handles the login modal
  if (!permission.allowed && !isAuthenticated) {
    return fallback || (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  // Render children if allowed
  return <>{children}</>;
}