'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertTriangle, Trash2 } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

interface DeleteAccountDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DeleteAccountDialog({ isOpen, onClose }: DeleteAccountDialogProps) {
  const { user, logout } = useAuthStore();
  const [confirmText, setConfirmText] = useState('');
  const [password, setPassword] = useState('');
  const [confirmations, setConfirmations] = useState({
    dataLoss: false,
    noRecovery: false,
    finalDecision: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const requiredText = 'DELETE MY ACCOUNT';
  const isConfirmTextValid = confirmText === requiredText;
  const allConfirmationsChecked = Object.values(confirmations).every(Boolean);
  const canDelete = isConfirmTextValid && allConfirmationsChecked && password;

  const handleConfirmationChange = (key: string, checked: boolean) => {
    setConfirmations(prev => ({ ...prev, [key]: checked }));
  };

  const handleDelete = async () => {
    if (!canDelete) return;

    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate password validation
      if (password !== 'password123') {
        throw new Error('Incorrect password');
      }

      // In a real app, you would call the delete account API here
      console.log('Account deletion requested');
      
      // Logout and redirect
      logout();
      window.location.href = '/';
    } catch (err: any) {
      setError(err.message || 'Failed to delete account');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
      setConfirmText('');
      setPassword('');
      setConfirmations({ dataLoss: false, noRecovery: false, finalDecision: false });
      setError('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="w-5 h-5" />
            Delete Account
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Warning:</strong> This action is permanent and cannot be undone. 
              All your data, including profile information, competition history, and achievements will be permanently deleted.
            </AlertDescription>
          </Alert>

          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <div className="space-y-3">
              <h4 className="font-medium">What will be deleted:</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• Your profile and personal information</li>
                <li>• All competition entries and submissions</li>
                <li>• Your leaderboard rankings and achievements</li>
                <li>• All notifications and messages</li>
                <li>• Any posted competitions (if you're an employer)</li>
                <li>• All account settings and preferences</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Please confirm you understand:</h4>
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="dataLoss"
                    checked={confirmations.dataLoss}
                    onCheckedChange={(checked) => handleConfirmationChange('dataLoss', checked as boolean)}
                    disabled={isLoading}
                  />
                  <Label htmlFor="dataLoss" className="text-sm leading-5">
                    I understand that all my data will be permanently deleted
                  </Label>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="noRecovery"
                    checked={confirmations.noRecovery}
                    onCheckedChange={(checked) => handleConfirmationChange('noRecovery', checked as boolean)}
                    disabled={isLoading}
                  />
                  <Label htmlFor="noRecovery" className="text-sm leading-5">
                    I understand that this action cannot be reversed or recovered
                  </Label>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="finalDecision"
                    checked={confirmations.finalDecision}
                    onCheckedChange={(checked) => handleConfirmationChange('finalDecision', checked as boolean)}
                    disabled={isLoading}
                  />
                  <Label htmlFor="finalDecision" className="text-sm leading-5">
                    I have made this decision carefully and want to proceed
                  </Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmText">
                Type <strong>{requiredText}</strong> to confirm:
              </Label>
              <Input
                id="confirmText"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder={requiredText}
                disabled={isLoading}
                className={isConfirmTextValid ? 'border-green-500' : ''}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Enter your password to confirm:</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your current password"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={!canDelete || isLoading}
              className="flex-1"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              {isLoading ? 'Deleting Account...' : 'Delete My Account'}
            </Button>
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Need help? Contact our support team before deleting your account.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}