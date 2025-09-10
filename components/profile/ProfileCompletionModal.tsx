'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, User, ArrowRight, X } from 'lucide-react';

interface ProfileCompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  onSkip: () => void;
}

export function ProfileCompletionModal({ isOpen, onClose, onComplete, onSkip }: ProfileCompletionModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Complete Your Profile
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Welcome to GiG Geni!</h3>
            <p className="text-muted-foreground text-sm">
              Your account has been verified successfully. Complete your profile to get the most out of our platform.
            </p>
          </div>

          <Card>
            <CardContent className="pt-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Stand out to employers and competition organizers</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Get personalized competition recommendations</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Track your progress and achievements</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Connect with other professionals</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-2">
            <Button onClick={onComplete} className="w-full">
              Complete Profile Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline" onClick={onSkip} className="w-full">
              Skip for Now
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            You can always complete your profile later from your dashboard.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}