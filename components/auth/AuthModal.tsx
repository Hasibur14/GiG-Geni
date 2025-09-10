"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Eye, EyeOff, Mail, Lock, User, Building, X } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'signup';
  onVerificationNeeded?: (email: string) => void;
  onAuthSuccess?: (email: string, needsVerification: boolean) => void;
  title?: string;
  subtitle?: string;
}

export function AuthModal({ isOpen, onClose, defaultMode = 'login', onVerificationNeeded, onAuthSuccess, title, subtitle }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup' | 'userType'>(defaultMode);
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<'employee' | 'employer' | 'admin' | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    companyName: '',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  
  const { login, register, isLoading } = useAuthStore();
  const router = useRouter();

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      companyName: '',
      agreeToTerms: false
    });
    setError('');
    setStep(1);
    setUserType(null);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleModeSwitch = (newMode: 'login' | 'signup') => {
    resetForm();
    setMode(newMode);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      if (onAuthSuccess) {
        onAuthSuccess(formData.email, false);
      } else {
        handleClose();
        setTimeout(() => {
          const user = useAuthStore.getState().user;
          if (user) {
            switch (user.role) {
              case 'admin':
                router.push('/admin');
                break;
              case 'employer':
                router.push('/employer');
                break;
              case 'employee':
                router.push('/employee');
                break;
              default:
                router.push('/');
            }
          }
        }, 100);
      }
    } else {
      setError(result.error || 'Login failed');
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'signup' && step === 1 && !userType) {
      setError('Please select a user type');
      return;
    }
    
    if (mode === 'signup' && step === 1) {
      setStep(2);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!userType) {
      setError('Please select a user type');
      return;
    }

    setError('');
    
    const result = await register({
      email: formData.email,
      password: formData.password,
      name: formData.fullName,
      role: userType,
      companyName: userType === 'employer' ? formData.companyName : undefined
    });
    
    if (result.success) {
      if (onAuthSuccess) {
        onAuthSuccess(formData.email, true);
      } else {
        handleClose();
        if (onVerificationNeeded) {
          onVerificationNeeded(formData.email);
        }
      }
    } else {
      setError(result.error || 'Registration failed');
    }
  };

  const quickLogin = async (userType: 'admin' | 'employer' | 'employee') => {
    const credentials = {
      admin: { email: 'admin@giggeni.com', password: 'password123' },
      employer: { email: 'employer@giggeni.com', password: 'password123' },
      employee: { email: 'employee@giggeni.com', password: 'password123' }
    };
    
    // Auto-fill the form with dummy credentials
    setFormData(prev => ({
      ...prev,
      email: credentials[userType].email,
      password: credentials[userType].password
    }));
    
    setError('');
  };

  const handleDummyLogin = async (userType: 'admin' | 'employer' | 'employee') => {
    const credentials = {
      admin: { email: 'admin@giggeni.com', password: 'password123' },
      employer: { email: 'employer@giggeni.com', password: 'password123' },
      employee: { email: 'employee@giggeni.com', password: 'password123' }
    };
    
    setError('');
    const result = await login(credentials[userType].email, credentials[userType].password);
    
    if (result.success) {
      if (onAuthSuccess) {
        onAuthSuccess(credentials[userType].email, false);
      } else {
        handleClose();
        setTimeout(() => {
          const user = useAuthStore.getState().user;
          if (user) {
            switch (user.role) {
              case 'admin':
                router.push('/admin');
                break;
              case 'employer':
                router.push('/employer');
                break;
              case 'employee':
                router.push('/employee');
                break;
              default:
                router.push('/');
            }
          }
        }, 100);
      }
    } else {
      setError(result.error || 'Login failed');
    }
  };

  const renderLoginForm = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <form onSubmit={handleLoginSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="pl-10 h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="pl-10 pr-10 h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
            />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
          <button
            type="button"
            className="text-sm text-orange-600 hover:text-orange-700 font-medium"
          >
            Forgot password?
          </button>
        </div>

        {error && (
          <Alert className="border-red-200 bg-red-50">
            <AlertDescription className="text-red-700">
              {error}
            </AlertDescription>
          </Alert>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
        >
          {isLoading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Signing in...
            </div>
          ) : (
            'Sign In'
          )}
        </Button>
      </form>

      {/* Quick Login Buttons */}
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Quick Login (Demo)</span>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => quickLogin('admin')}
            className="text-xs"
          >
            Admin
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => quickLogin('employer')}
            className="text-xs"
          >
            Employer
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => quickLogin('employee')}
            className="text-xs"
          >
            Employee
          </Button>
        </div>
        <div className="mt-2 text-center">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => handleDummyLogin(formData.email.includes('admin') ? 'admin' : formData.email.includes('employer') ? 'employer' : 'employee')}
            className="text-xs text-orange-600 hover:text-orange-700"
            disabled={!formData.email || !formData.password}
          >
            Auto Login with Filled Credentials
          </Button>
        </div>
      </div>

      <div className="text-center">
        <span className="text-sm text-gray-600">Don't have an account? </span>
        <button
          type="button"
          onClick={() => handleModeSwitch('signup')}
          className="text-sm text-orange-600 hover:text-orange-700 font-medium"
        >
          Sign up
        </button>
      </div>
    </motion.div>
  );

  const renderUserTypeSelection = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-xl font-semibold text-center mb-6">I am a...</h2>
      <div className="space-y-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setUserType('employee')}
          className={`w-full p-6 rounded-lg border-2 transition-all duration-200 ${
            userType === 'employee'
              ? 'border-orange-500 bg-orange-50'
              : 'border-gray-200 hover:border-orange-200'
          }`}
        >
          <div className="flex items-center">
            <User className={`w-8 h-8 mr-4 ${
              userType === 'employee' ? 'text-orange-500' : 'text-gray-400'
            }`} />
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">Job Seeker</h3>
              <p className="text-sm text-gray-600">
                Looking for opportunities and competitions
              </p>
            </div>
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setUserType('employer')}
          className={`w-full p-6 rounded-lg border-2 transition-all duration-200 ${
            userType === 'employer'
              ? 'border-orange-500 bg-orange-50'
              : 'border-gray-200 hover:border-orange-200'
          }`}
        >
          <div className="flex items-center">
            <Building className={`w-8 h-8 mr-4 ${
              userType === 'employer' ? 'text-orange-500' : 'text-gray-400'
            }`} />
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">Employer</h3>
              <p className="text-sm text-gray-600">
                Post competitions and find talent
              </p>
            </div>
          </div>
        </motion.button>
      </div>

      {error && (
        <Alert className="border-red-200 bg-red-50 mt-4">
          <AlertDescription className="text-red-700">
            {error}
          </AlertDescription>
        </Alert>
      )}

      <Button
        onClick={() => userType && setStep(2)}
        disabled={!userType}
        className="w-full mt-6 h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue
      </Button>

      <div className="text-center mt-4">
        <span className="text-sm text-gray-600">Already have an account? </span>
        <button
          type="button"
          onClick={() => handleModeSwitch('login')}
          className="text-sm text-orange-600 hover:text-orange-700 font-medium"
        >
          Sign in
        </button>
      </div>
    </motion.div>
  );

  const renderSignupForm = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleSignupSubmit} className="space-y-6">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="text-orange-600 hover:text-orange-700 text-sm font-medium  flex items-center "
        >
          ← Back to account type
        </button>

        <div className="space-y-2">
          <label htmlFor="fullName" className="text-sm font-medium text-gray-700">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              id="fullName"
              name="fullName"
              type="text"
              required
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="pl-10 h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
        </div>

        {userType === 'employer' && (
          <div className="space-y-2">
            <label htmlFor="companyName" className="text-sm font-medium text-gray-700">
              Company Name
            </label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                id="companyName"
                name="companyName"
                type="text"
                required
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Enter your company name"
                className="pl-10 h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="pl-10 h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              className="pl-10 pr-10 h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="pl-10 pr-10 h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="agreeToTerms"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={(e) => setFormData(prev => ({ ...prev, agreeToTerms: e.target.checked }))}
            className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
            required
          />
          <label htmlFor="agreeToTerms" className="ml-2 text-sm text-gray-600">
            I agree to the{' '}
            <button type="button" className="text-orange-600 hover:text-orange-700 font-medium">
              Terms of Service
            </button>
            {' '}and{' '}
            <button type="button" className="text-orange-600 hover:text-orange-700 font-medium">
              Privacy Policy
            </button>
          </label>
        </div>

        {error && (
          <Alert className="border-red-200 bg-red-50">
            <AlertDescription className="text-red-700">
              {error}
            </AlertDescription>
          </Alert>
        )}

        <Button
          type="submit"
          disabled={isLoading || !formData.agreeToTerms}
          className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Creating account...
            </div>
          ) : (
            'Create Account'
          )}
        </Button>
      </form>

      <div className="text-center mt-4">
        <span className="text-sm text-gray-600">Already have an account? </span>
        <button
          type="button"
          onClick={() => handleModeSwitch('login')}
          className="text-sm text-orange-600 hover:text-orange-700 font-medium"
        >
          Sign in
        </button>
      </div>
    </motion.div>
  );

  const getTitle = () => {
    if (title) return title;
    if (mode === 'login') return 'Welcome Back';
    if (mode === 'signup' && step === 1) return 'Join GiG Geni';
    if (mode === 'signup' && step === 2) return 'Create Your Account';
    return 'Authentication';
  };

  const getSubtitle = () => {
    if (subtitle) return subtitle;
    if (mode === 'login') return 'Sign in to your GiG Geni account';
    if (mode === 'signup' && step === 1) return 'Choose your account type';
    if (mode === 'signup' && step === 2) return 'Complete your registration';
    return '';
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className=" mx-auto p-8 overflow-hidden bg-white">
        <DialogHeader className="text-center mb-8">
          {/* <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <span className="text-white font-bold text-xl">GG</span>
          </motion.div> */}
          <DialogTitle className="text-3xl font-bold text-gray-900 mb-2">
            {getTitle()}
          </DialogTitle>
          <p className="text-gray-600">{getSubtitle()}</p>
        </DialogHeader>

        <div className="bg-white rounded-xl">
          <AnimatePresence mode="wait">
            {mode === 'login' && renderLoginForm()}
            {mode === 'signup' && step === 1 && renderUserTypeSelection()}
            {mode === 'signup' && step === 2 && renderSignupForm()}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}