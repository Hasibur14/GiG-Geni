import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export default function CreateCompetitionLayout({
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