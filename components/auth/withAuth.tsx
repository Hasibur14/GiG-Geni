'use client';

import { ComponentType } from 'react';
import { ProtectedRoute } from './ProtectedRoute';

export function withAuth<P extends object>(
  Component: ComponentType<P>,
  fallback?: React.ReactNode
) {
  const AuthenticatedComponent = (props: P) => {
    return (
      <ProtectedRoute fallback={fallback}>
        <Component {...props} />
      </ProtectedRoute>
    );
  };

  AuthenticatedComponent.displayName = `withAuth(${Component.displayName || Component.name})`;
  
  return AuthenticatedComponent;
}