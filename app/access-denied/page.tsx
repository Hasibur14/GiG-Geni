import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ArrowLeft, Home } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Access Denied - GiG Geni',
  description: 'You do not have permission to access this page',
};

'use client';

import { useSearchParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, ArrowLeft, Home } from 'lucide-react';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';

export default function AccessDeniedPage() {
  const searchParams = useSearchParams();
  const { user } = useAuthStore();
  
  const requiredRole = searchParams.get('required_role');
  const userRole = searchParams.get('user_role');
  const attemptedPath = searchParams.get('attempted_path');

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
                You do not have permission to access this page. This page is restricted to specific user roles.
              </p>
            </div>

            {(requiredRole || userRole || attemptedPath) && (
              <div className="bg-muted p-4 rounded-lg text-left space-y-2">
                <h3 className="font-semibold text-sm">Access Details:</h3>
                {attemptedPath && (
                  <p className="text-sm">
                    <span className="font-medium">Attempted Path:</span> {attemptedPath}
                  </p>
                )}
                {requiredRole && (
                  <p className="text-sm">
                    <span className="font-medium">Required Role(s):</span>{' '}
                    <Badge variant="outline" className="ml-1">
                      {requiredRole}
                    </Badge>
                  </p>
                )}
                {(userRole || user?.role) && (
                  <p className="text-sm">
                    <span className="font-medium">Your Role:</span>{' '}
                    <Badge variant="secondary" className="ml-1 capitalize">
                      {userRole || user?.role}
                    </Badge>
                  </p>
                )}
              </div>
            )}

            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                If you believe this is an error, please contact support or try logging in with a different account.
              </p>
              <div className="flex gap-2 justify-center">
                <Button variant="outline" onClick={() => window.history.back()}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Go Back
                </Button>
                <Button asChild>
                  <Link href="/">
                    <Home className="w-4 h-4 mr-2" />
                    Go Home
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}