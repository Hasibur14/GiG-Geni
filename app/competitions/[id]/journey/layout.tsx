import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export default function CompetitionJourneyLayout({
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