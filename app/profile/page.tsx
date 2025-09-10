import { ProfilePage } from '@/components/profile/ProfilePage';
import { AuthGuard } from '@/components/auth/AuthGuard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile - GiG Geni',
  description: 'Manage your profile information and settings',
};

export default function Profile() {
  return (
    <AuthGuard requireAuth={true}>
      <ProfilePage />
    </AuthGuard>
  );
}