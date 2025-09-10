import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export default function JoinCompetitionsLayout({
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