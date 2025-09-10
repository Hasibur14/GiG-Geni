import { NotificationsPage } from '@/components/notifications/NotificationsPage';
import { AuthGuard } from '@/components/auth/AuthGuard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Notifications - GiG Geni',
  description: 'View and manage your notifications',
};

export default function Notifications() {
  return (
    <AuthGuard requireAuth={true}>
      <NotificationsPage />
    </AuthGuard>
  );
}