'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Save, Mail, Phone, Globe, MapPin } from 'lucide-react';
import { UserProfile, EmployerProfile } from '@/lib/interface';

interface ContactTabProps {
  profile: UserProfile | EmployerProfile | null;
  isEditing: boolean;
  onUpdate: (updates: Partial<UserProfile | EmployerProfile>) => Promise<void>;
}

// Type guard to check if profile is UserProfile
function isUserProfile(profile: UserProfile | EmployerProfile | null): profile is UserProfile {
  return profile !== null && 'contactInformation' in profile;
}

export function ContactTab({ profile, isEditing, onUpdate }: ContactTabProps) {
  const userProfile = isUserProfile(profile) ? profile : null;
  
  const [formData, setFormData] = useState({
    email: userProfile?.contactInformation?.email || '',
    phone: userProfile?.contactInformation?.phone || '',
    linkedin: userProfile?.contactInformation?.linkedin || '',
    website: userProfile?.contactInformation?.website || '',
    homeAddress: userProfile?.address?.home || '',
    city: userProfile?.address?.city || '',
    state: userProfile?.address?.state || '',
    country: userProfile?.address?.country || '',
    zipCode: userProfile?.address?.zipCode || ''
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updates: Partial<UserProfile> = {
        contactInformation: {
          email: formData.email,
          phone: formData.phone,
          linkedin: formData.linkedin,
          website: formData.website
        },
        address: {
          home: formData.homeAddress,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          zipCode: formData.zipCode
        }
      };
      
      await onUpdate(updates);
    } finally {
      setIsSaving(false);
    }
  };

  if (!profile) return null;

  return (
    <div className="space-y-6">
      {/* Contact Information */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Phone className="w-5 h-5" />
            Contact Information
          </CardTitle>
          {isEditing && (
            <Button onClick={handleSave} disabled={isSaving}>
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="your.email@example.com"
                disabled={true} // Email should not be editable as per requirements
                className="bg-muted"
              />
              <p className="text-xs text-muted-foreground">
                Email address cannot be changed. Contact support if needed.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone Number
              </Label>
              {isEditing ? (
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              ) : (
                <p className="text-sm p-2 bg-muted rounded">{formData.phone || 'Not provided'}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedin" className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                LinkedIn Profile
              </Label>
              {isEditing ? (
                <Input
                  id="linkedin"
                  value={formData.linkedin}
                  onChange={(e) => handleInputChange('linkedin', e.target.value)}
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              ) : (
                <p className="text-sm p-2 bg-muted rounded">
                  {formData.linkedin ? (
                    <a href={formData.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      {formData.linkedin}
                    </a>
                  ) : (
                    'Not provided'
                  )}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="website" className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Personal Website
              </Label>
              {isEditing ? (
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="https://yourwebsite.com"
                />
              ) : (
                <p className="text-sm p-2 bg-muted rounded">
                  {formData.website ? (
                    <a href={formData.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      {formData.website}
                    </a>
                  ) : (
                    'Not provided'
                  )}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Address Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Address Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="homeAddress">Home Address</Label>
            {isEditing ? (
              <Input
                id="homeAddress"
                value={formData.homeAddress}
                onChange={(e) => handleInputChange('homeAddress', e.target.value)}
                placeholder="123 Main Street, Apt 4B"
              />
            ) : (
              <p className="text-sm p-2 bg-muted rounded">{formData.homeAddress || 'Not provided'}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              {isEditing ? (
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="San Francisco"
                />
              ) : (
                <p className="text-sm p-2 bg-muted rounded">{formData.city || 'Not provided'}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">State/Province</Label>
              {isEditing ? (
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  placeholder="CA"
                />
              ) : (
                <p className="text-sm p-2 bg-muted rounded">{formData.state || 'Not provided'}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              {isEditing ? (
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  placeholder="United States"
                />
              ) : (
                <p className="text-sm p-2 bg-muted rounded">{formData.country || 'Not provided'}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="zipCode">ZIP/Postal Code</Label>
              {isEditing ? (
                <Input
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  placeholder="94102"
                />
              ) : (
                <p className="text-sm p-2 bg-muted rounded">{formData.zipCode || 'Not provided'}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}