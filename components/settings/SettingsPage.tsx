'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Settings, 
  Lock, 
  Bell, 
  Mail, 
  Trash2, 
  Shield, 
  Eye, 
  EyeOff,
  AlertTriangle,
  Save
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { ChangePasswordDialog } from './ChangePasswordDialog';
import { DeleteAccountDialog } from './DeleteAccountDialog';

export function SettingsPage() {
  const { user } = useAuthStore();
  const [settings, setSettings] = useState({
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      competitionUpdates: true,
      leaderboardUpdates: false,
      promotionalEmails: false,
      weeklyDigest: true,
    },
    privacy: {
      profileVisibility: 'public' as 'public' | 'private' | 'connections',
      showEmail: false,
      showPhone: false,
    },
    preferences: {
      theme: 'system' as 'light' | 'dark' | 'system',
      language: 'en',
      timezone: 'UTC',
    }
  });

  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleNotificationChange = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value
      }
    }));
  };

  const handlePrivacyChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: value
      }
    }));
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    // Show success message or handle error
  };

  return (
    <div className="container mx-auto  py-8 ">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Settings className="w-8 h-8" />
          Settings
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="space-y-6">
        {/* Account Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Account Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Password</h3>
                <p className="text-sm text-muted-foreground">
                  Change your account password
                </p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setShowChangePassword(true)}
              >
                Change Password
              </Button>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Two-Factor Authentication</h3>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Button variant="outline" disabled>
                Enable 2FA
                <span className="ml-2 text-xs bg-muted px-2 py-1 rounded">Coming Soon</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </CardTitle>
            <Button onClick={handleSaveSettings} disabled={isSaving}>
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="emailNotifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via email
                  </p>
                </div>
                <Switch
                  id="emailNotifications"
                  checked={settings.notifications.emailNotifications}
                  onCheckedChange={(checked) => handleNotificationChange('emailNotifications', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="pushNotifications">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive push notifications in your browser
                  </p>
                </div>
                <Switch
                  id="pushNotifications"
                  checked={settings.notifications.pushNotifications}
                  onCheckedChange={(checked) => handleNotificationChange('pushNotifications', checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="competitionUpdates">Competition Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified about competition status changes
                  </p>
                </div>
                <Switch
                  id="competitionUpdates"
                  checked={settings.notifications.competitionUpdates}
                  onCheckedChange={(checked) => handleNotificationChange('competitionUpdates', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="leaderboardUpdates">Leaderboard Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when your ranking changes
                  </p>
                </div>
                <Switch
                  id="leaderboardUpdates"
                  checked={settings.notifications.leaderboardUpdates}
                  onCheckedChange={(checked) => handleNotificationChange('leaderboardUpdates', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="promotionalEmails">Promotional Emails</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive promotional content and offers
                  </p>
                </div>
                <Switch
                  id="promotionalEmails"
                  checked={settings.notifications.promotionalEmails}
                  onCheckedChange={(checked) => handleNotificationChange('promotionalEmails', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="weeklyDigest">Weekly Digest</Label>
                  <p className="text-sm text-muted-foreground">
                    Get a weekly summary of platform activity
                  </p>
                </div>
                <Switch
                  id="weeklyDigest"
                  checked={settings.notifications.weeklyDigest}
                  onCheckedChange={(checked) => handleNotificationChange('weeklyDigest', checked)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Privacy Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Profile Visibility</Label>
                <p className="text-sm text-muted-foreground">
                  Control who can see your profile
                </p>
              </div>
              <select
                value={settings.privacy.profileVisibility}
                onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                className="flex h-10 w-[180px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="public">Public</option>
                <option value="connections">Connections Only</option>
                <option value="private">Private</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="showEmail">Show Email Address</Label>
                <p className="text-sm text-muted-foreground">
                  Display your email on your public profile
                </p>
              </div>
              <Switch
                id="showEmail"
                checked={settings.privacy.showEmail}
                onCheckedChange={(checked) => handlePrivacyChange('showEmail', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="showPhone">Show Phone Number</Label>
                <p className="text-sm text-muted-foreground">
                  Display your phone number on your public profile
                </p>
              </div>
              <Switch
                id="showPhone"
                checked={settings.privacy.showPhone}
                onCheckedChange={(checked) => handlePrivacyChange('showPhone', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-destructive/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="w-5 h-5" />
              Danger Zone
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                These actions are permanent and cannot be undone. Please proceed with caution.
              </AlertDescription>
            </Alert>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-destructive">Delete Account</h3>
                <p className="text-sm text-muted-foreground">
                  Permanently delete your account and all associated data
                </p>
              </div>
              <Button 
                variant="destructive" 
                onClick={() => setShowDeleteAccount(true)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dialogs */}
      <ChangePasswordDialog 
        isOpen={showChangePassword}
        onClose={() => setShowChangePassword(false)}
      />
      
      <DeleteAccountDialog 
        isOpen={showDeleteAccount}
        onClose={() => setShowDeleteAccount(false)}
      />
    </div>
  );
}