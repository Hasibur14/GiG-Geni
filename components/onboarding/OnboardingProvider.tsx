'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useRouteGuard } from '@/hooks/useRouteGuard';
import { AuthModal } from '@/components/auth/AuthModal';
import { EmailVerificationModal } from '@/components/auth/EmailVerificationModal';

interface OnboardingProviderProps {
  children: React.ReactNode;
}

export function OnboardingProvider({ children }: OnboardingProviderProps) {
  const { user } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [verificationEmail, setVerificationEmail] = useState('');
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  
  // Initialize route guard
  const { 
    shouldShowLoginModal, 
    intendedPath, 
    handleLoginSuccess, 
    handleLoginModalClose 
  } = useRouteGuard();

  useEffect(() => {
    // Check if user needs to complete profile after email verification
    if (user && user.isEmailVerified && !user.isProfileComplete) {
      // Only redirect if not already on profile page
      if (pathname !== '/profile') {
        router.push('/profile?complete=true');
      }
    }
  }, [user, router, pathname]);

  const handleAuthSuccess = (email: string, needsVerification: boolean) => {
    if (needsVerification) {
      setVerificationEmail(email);
      setIsVerificationModalOpen(true);
    } else {
      handleLoginSuccess();
    }
  };

  const handleVerificationComplete = () => {
    setIsVerificationModalOpen(false);
    setVerificationEmail('');
    handleLoginSuccess();
  };

  const handleBackToAuth = () => {
    setIsVerificationModalOpen(false);
    // Keep the login modal open
  };

  return (
    <>
      {children}
      
      {/* Login Modal for Protected Routes */}
      <AuthModal
        isOpen={shouldShowLoginModal}
        onClose={handleLoginModalClose}
        onAuthSuccess={handleAuthSuccess}
        title={intendedPath ? `Login Required` : undefined}
        subtitle={intendedPath ? `Please log in to access ${intendedPath}` : undefined}
      />

      {/* Email Verification Modal */}
      <EmailVerificationModal
        isOpen={isVerificationModalOpen}
        onClose={handleVerificationComplete}
        email={verificationEmail}
        onBackToAuth={handleBackToAuth}
      />
    </>
  );
}