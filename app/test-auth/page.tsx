'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/store/authStore';
import { EmployeeOnly, EmployerOnly, AdminOnly, AuthenticatedOnly } from '@/components/auth/RoleBasedAccess';
import Link from 'next/link';

export default function TestAuthPage() {
  const { user, isAuthenticated } = useAuthStore();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Authorization Test Page</h1>
        <p className="text-muted-foreground">
          Test role-based access control and route protection
        </p>
      </div>

      {/* Current User Info */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Current User Status</CardTitle>
        </CardHeader>
        <CardContent>
          {isAuthenticated && user ? (
            <div className="space-y-2">
              <p><span className="font-medium">Name:</span> {user.name}</p>
              <p><span className="font-medium">Email:</span> {user.email}</p>
              <p><span className="font-medium">Role:</span> <Badge className="ml-2 capitalize">{user.role}</Badge></p>
              <p><span className="font-medium">Email Verified:</span> {user.isEmailVerified ? '✅' : '❌'}</p>
              <p><span className="font-medium">Profile Complete:</span> {user.isProfileComplete ? '✅' : '❌'}</p>
            </div>
          ) : (
            <p className="text-muted-foreground">Not authenticated</p>
          )}
        </CardContent>
      </Card>

      {/* Role-Based Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Employee Only Content</CardTitle>
          </CardHeader>
          <CardContent>
            <EmployeeOnly fallback={<p className="text-muted-foreground">Only employees can see this content</p>}>
              <div className="space-y-2">
                <p className="text-green-600 font-medium">✅ You can see employee content!</p>
                <Button asChild size="sm">
                  <Link href="/competitions/my">My Competitions</Link>
                </Button>
              </div>
            </EmployeeOnly>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Employer Only Content</CardTitle>
          </CardHeader>
          <CardContent>
            <EmployerOnly fallback={<p className="text-muted-foreground">Only employers can see this content</p>}>
              <div className="space-y-2">
                <p className="text-green-600 font-medium">✅ You can see employer content!</p>
                <Button asChild size="sm">
                  <Link href="/competitions/create">Create Competition</Link>
                </Button>
              </div>
            </EmployerOnly>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Admin Only Content</CardTitle>
          </CardHeader>
          <CardContent>
            <AdminOnly fallback={<p className="text-muted-foreground">Only admins can see this content</p>}>
              <div className="space-y-2">
                <p className="text-green-600 font-medium">✅ You can see admin content!</p>
                <Button asChild size="sm" variant="outline">
                  <Link href="/admin">Admin Panel</Link>
                </Button>
              </div>
            </AdminOnly>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Authenticated Only Content</CardTitle>
          </CardHeader>
          <CardContent>
            <AuthenticatedOnly fallback={<p className="text-muted-foreground">Please log in to see this content</p>}>
              <div className="space-y-2">
                <p className="text-green-600 font-medium">✅ You are authenticated!</p>
                <Button asChild size="sm" variant="outline">
                  <Link href="/profile">View Profile</Link>
                </Button>
              </div>
            </AuthenticatedOnly>
          </CardContent>
        </Card>
      </div>

      {/* Test Links */}
      <Card>
        <CardHeader>
          <CardTitle>Test Protected Routes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button asChild variant="outline" size="sm">
              <Link href="/profile">Profile (All Users)</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/settings">Settings (All Users)</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/notifications">Notifications (All Users)</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/competitions/my">My Competitions (Employee)</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/competitions/join">Join Competitions (Employee)</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/competitions/create">Create Competition (Employer)</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/competitions/manage">Manage Competitions (Employer)</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/competitions/1/journey">Competition Journey (Employee)</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}