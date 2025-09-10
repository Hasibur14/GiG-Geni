import { SettingsPage } from '@/components/settings/SettingsPage';
import { AuthGuard } from '@/components/auth/AuthGuard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settings - GiG Geni',
  description: 'Manage your account settings and preferences',
};

export default function Settings() {
  return (
    <AuthGuard requireAuth={true}>
      <SettingsPage />
    </AuthGuard>
  );
}