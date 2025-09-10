'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';

export default function AuthTestSimplePage() {
  const { user, isAuthenticated, logout } = useAuthStore();

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Simple Auth Test</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Authentication Status:</h3>
            <p>Authenticated: {isAuthenticated ? '✅ Yes' : '❌ No'}</p>
            {user && (
              <div className="mt-2 space-y-1">
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Role: {user.role}</p>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Test Protected Routes:</h3>
            <div className="grid grid-cols-1 gap-2">
              <Button asChild variant="outline" size="sm">
                <Link href="/profile">Profile (All Users)</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/competitions/my">My Competitions (Employee Only)</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/competitions/create">Create Competition (Employer Only)</Link>
              </Button>
            </div>
          </div>

          {isAuthenticated && (
            <Button onClick={logout} variant="destructive">
              Logout
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}