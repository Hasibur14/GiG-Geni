import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export default function ManageCompetitionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      {children}
    </ProtectedRoute>
  );
}