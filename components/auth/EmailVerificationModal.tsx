'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
    Mail,
    CheckCircle,
    Clock,
    RefreshCw,
    AlertCircle,
    ArrowLeft
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

interface EmailVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  onBackToAuth?: () => void;
}

export function EmailVerificationModal({ isOpen, onClose, email, onBackToAuth }: EmailVerificationModalProps) {
    const router = useRouter();
    const { user, updateUserVerificationStatus } = useAuthStore();
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [isVerifying, setIsVerifying] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [countdown, setCountdown] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const [error, setError] = useState('');
    const [isVerified, setIsVerified] = useState(false);

    // Countdown timer for resend
    useEffect(() => {
        if (countdown > 0 && !canResend) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else if (countdown === 0) {
            setCanResend(true);
        }
    }, [countdown, canResend]);

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setOtp(['', '', '', '', '', '']);
            setError('');
            setIsVerified(false);
            setCountdown(60);
            setCanResend(false);
        }
    }, [isOpen]);

    const handleOtpChange = (index: number, value: string) => {
        if (value.length > 1) return; // Only allow single digit

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setError('');

        // Auto-focus next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
        }

        // Auto-verify when all fields are filled
        if (newOtp.every(digit => digit !== '') && newOtp.join('').length === 6) {
            handleVerify(newOtp.join(''));
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            prevInput?.focus();
        }
    };

    const handleVerify = async (otpCode?: string) => {
        const code = otpCode || otp.join('');

        if (code.length !== 6) {
            setError('Please enter the complete 6-digit code');
            return;
        }

        setIsVerifying(true);
        setError('');

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // For demo purposes, accept any 6-digit code
            if (code.length === 6 && user) {
                localStorage.setItem(`email_verified_${user.id}`, 'true');
                updateUserVerificationStatus(true, user.isProfileComplete);
                setIsVerified(true);

                setTimeout(() => {
                    onClose();
                    // Redirect to role-specific dashboard
                    const roleRoutes = {
                        'admin': '/admin',
                        'employer': '/employer',
                        'employee': '/employee'
                    };
                    router.push(roleRoutes[user.role as keyof typeof roleRoutes] || '/employee');
                }, 2000);
            } else {
                setError('Invalid verification code. Please try again.');
            }
        } catch (err) {
            setError('Verification failed. Please try again.');
        } finally {
            setIsVerifying(false);
        }
    };

    const handleResend = async () => {
        setIsResending(true);
        setError('');

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            setCountdown(60);
            setCanResend(false);
            setOtp(['', '', '', '', '', '']);

            // Focus first input
            const firstInput = document.getElementById('otp-0');
            firstInput?.focus();
        } catch (err) {
            setError('Failed to resend code. Please try again.');
        } finally {
            setIsResending(false);
        }
    };

    const handleClose = () => {
        setOtp(['', '', '', '', '', '']);
        setError('');
        setIsVerified(false);
        onClose();
    };

    if (isVerified) {
        return (
            <Dialog open={isOpen} onOpenChange={handleClose}>
                <DialogContent className="max-w-md mx-auto p-0 overflow-hidden">
                    <div className=" bg-white p-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-8"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", duration: 0.6 }}
                                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                            >
                                <CheckCircle className="h-10 w-10 text-green-600" />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <h2 className="text-2xl font-bold text-gray-900 mb-3">Email Verified!</h2>
                                <p className="text-gray-600 mb-6">
                                    Your email has been successfully verified. Redirecting you to your dashboard...
                                </p>

                                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Verification Complete
                                </Badge>
                            </motion.div>
                        </motion.div>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="w-full mx-auto p-0 overflow-hidden">
                <div className=" bg-white p-8">
                    <DialogHeader className="text-center mb-8 flex items-center justify-center">
                        {/* <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4"
                        >
                            <Mail className="text-white w-8 h-8" />
                        </motion.div> */}
                        <DialogTitle className="text-3xl font-bold text-gray-900 mb-2">
                            Verify Your Email
                        </DialogTitle>
                        <p className="text-gray-600">
                            We've sent a 6-digit code to
                        </p>
                        <p className="text-orange-600 font-semibold">{email}</p>
                    </DialogHeader>

                    <div className=" backdrop-blur-sm  p-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <label className="block text-sm font-medium text-gray-700 text-center">
                                        Enter verification code
                                    </label>
                                    <div className="flex justify-center space-x-3">
                                        {otp.map((digit, index) => (
                                            <Input
                                                key={index}
                                                id={`otp-${index}`}
                                                type="text"
                                                inputMode="numeric"
                                                pattern="[0-9]*"
                                                maxLength={1}
                                                value={digit}
                                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                                onKeyDown={(e) => handleKeyDown(index, e)}
                                                className="w-12 h-12 text-center text-lg font-semibold border-2 border-gray-200 focus:border-orange-500 focus:ring-orange-500 rounded-lg"
                                                autoComplete="off"
                                            />
                                        ))}
                                    </div>
                                </div>

                                {error && (
                                    <Alert className="border-red-200 bg-red-50">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertDescription className="text-red-700">
                                            {error}
                                        </AlertDescription>
                                    </Alert>
                                )}

                                <Button
                                    onClick={() => handleVerify()}
                                    disabled={isVerifying || otp.some(digit => digit === '')}
                                    className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isVerifying ? (
                                        <div className="flex items-center">
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                            Verifying...
                                        </div>
                                    ) : (
                                        'Verify Email'
                                    )}
                                </Button>

                                <div className="text-center space-y-4">
                                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                                        <Clock className="h-4 w-4" />
                                        <span>
                                            {canResend ? (
                                                'You can now resend the code'
                                            ) : (
                                                `Resend code in ${countdown}s`
                                            )}
                                        </span>
                                    </div>

                                    <Button
                                        variant="outline"
                                        onClick={handleResend}
                                        disabled={!canResend || isResending}
                                        className="w-full border-orange-200 text-orange-600 hover:bg-orange-50 hover:border-orange-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isResending ? (
                                            <div className="flex items-center">
                                                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                                Resending...
                                            </div>
                                        ) : (
                                            <div className="flex items-center">
                                                <RefreshCw className="h-4 w-4 mr-2" />
                                                Resend Code
                                            </div>
                                        )}
                                    </Button>
                                </div>

                                {onBackToAuth && (
                                    <div className="text-center pt-4 border-t border-gray-200">
                                        <Button
                                            variant="ghost"
                                            onClick={onBackToAuth}
                                            className="text-gray-600 hover:text-gray-800"
                                        >
                                            <ArrowLeft className="h-4 w-4 mr-2" />
                                            Back to Login
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}