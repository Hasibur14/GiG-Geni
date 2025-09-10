'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Lock, CheckCircle, AlertCircle } from 'lucide-react';

interface ChangePasswordDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChangePasswordDialog({ isOpen, onClose }: ChangePasswordDialogProps) {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const validatePassword = (password: string) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar,
      isValid: minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar
    };
  };

  const passwordValidation = validatePassword(formData.newPassword);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.currentPassword) {
      setError('Please enter your current password');
      return;
    }

    if (!passwordValidation.isValid) {
      setError('Please ensure your new password meets all requirements');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate validation
      if (formData.currentPassword !== 'password123') {
        throw new Error('Current password is incorrect');
      }

      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to change password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setError('');
      setSuccess(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Change Password
          </DialogTitle>
        </DialogHeader>

        {success ? (
          <div className="text-center py-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Password Changed Successfully!</h3>
            <p className="text-muted-foreground">Your password has been updated.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Current Password */}
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showPasswords.current ? 'text' : 'password'}
                  value={formData.currentPassword}
                  onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                  placeholder="Enter your current password"
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => togglePasswordVisibility('current')}
                  disabled={isLoading}
                >
                  {showPasswords.current ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showPasswords.new ? 'text' : 'password'}
                  value={formData.newPassword}
                  onChange={(e) => handleInputChange('newPassword', e.target.value)}
                  placeholder="Enter your new password"
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => togglePasswordVisibility('new')}
                  disabled={isLoading}
                >
                  {showPasswords.new ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              
              {/* Password Requirements */}
              {formData.newPassword && (
                <div className="text-xs space-y-1">
                  <div className={`flex items-center gap-2 ${passwordValidation.minLength ? 'text-green-600' : 'text-muted-foreground'}`}>
                    <div className={`w-2 h-2 rounded-full ${passwordValidation.minLength ? 'bg-green-600' : 'bg-muted-foreground'}`} />
                    At least 8 characters
                  </div>
                  <div className={`flex items-center gap-2 ${passwordValidation.hasUpperCase ? 'text-green-600' : 'text-muted-foreground'}`}>
                    <div className={`w-2 h-2 rounded-full ${passwordValidation.hasUpperCase ? 'bg-green-600' : 'bg-muted-foreground'}`} />
                    One uppercase letter
                  </div>
                  <div className={`flex items-center gap-2 ${passwordValidation.hasLowerCase ? 'text-green-600' : 'text-muted-foreground'}`}>
                    <div className={`w-2 h-2 rounded-full ${passwordValidation.hasLowerCase ? 'bg-green-600' : 'bg-muted-foreground'}`} />
                    One lowercase letter
                  </div>
                  <div className={`flex items-center gap-2 ${passwordValidation.hasNumbers ? 'text-green-600' : 'text-muted-foreground'}`}>
                    <div className={`w-2 h-2 rounded-full ${passwordValidation.hasNumbers ? 'bg-green-600' : 'bg-muted-foreground'}`} />
                    One number
                  </div>
                  <div className={`flex items-center gap-2 ${passwordValidation.hasSpecialChar ? 'text-green-600' : 'text-muted-foreground'}`}>
                    <div className={`w-2 h-2 rounded-full ${passwordValidation.hasSpecialChar ? 'bg-green-600' : 'bg-muted-foreground'}`} />
                    One special character
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showPasswords.confirm ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  placeholder="Confirm your new password"
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => togglePasswordVisibility('confirm')}
                  disabled={isLoading}
                >
                  {showPasswords.confirm ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {formData.confirmPassword && formData.newPassword !== formData.confirmPassword && (
                <p className="text-xs text-destructive">Passwords do not match</p>
              )}
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" disabled={isLoading || !passwordValidation.isValid} className="flex-1">
                {isLoading ? 'Changing Password...' : 'Change Password'}
              </Button>
              <Button type="button" variant="outline" onClick={handleClose} disabled={isLoading}>
                Cancel
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}