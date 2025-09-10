'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Save, Plus, X } from 'lucide-react';
import { UserProfile, EmployerProfile } from '@/lib/interface';

interface PersonalInfoTabProps {
  profile: UserProfile | EmployerProfile | null;
  isEditing: boolean;
  onUpdate: (updates: Partial<UserProfile | EmployerProfile>) => Promise<void>;
}

// Type guard to check if profile is UserProfile
function isUserProfile(profile: UserProfile | EmployerProfile | null): profile is UserProfile {
  return profile !== null && 'aboutMe' in profile;
}

export function PersonalInfoTab({ profile, isEditing, onUpdate }: PersonalInfoTabProps) {
  const userProfile = isUserProfile(profile) ? profile : null;
  const [formData, setFormData] = useState({
    name: userProfile?.name || '',
    aboutMe: userProfile?.aboutMe || '',
    salaryExpectation: userProfile?.salaryExpectation || '',
    jobPreference: userProfile?.jobPreference || '',
    dateOfBirth: userProfile?.personalInformation?.dateOfBirth?.toISOString().split('T')[0] || '',
    gender: userProfile?.personalInformation?.gender || '',
    nationality: userProfile?.personalInformation?.nationality || '',
    languages: userProfile?.personalInformation?.languages || [],
    newLanguage: ''
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddLanguage = () => {
    if (formData.newLanguage.trim()) {
      setFormData(prev => ({
        ...prev,
        languages: [...prev.languages, prev.newLanguage.trim()],
        newLanguage: ''
      }));
    }
  };

  const handleRemoveLanguage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updates: Partial<UserProfile> = {
        name: formData.name,
        aboutMe: formData.aboutMe,
        salaryExpectation: formData.salaryExpectation,
        jobPreference: formData.jobPreference,
        personalInformation: {
          dateOfBirth: formData.dateOfBirth ? new Date(formData.dateOfBirth) : undefined,
          gender: formData.gender,
          nationality: formData.nationality,
          languages: formData.languages
        }
      };
      
      await onUpdate(updates);
    } finally {
      setIsSaving(false);
    }
  };

  if (!profile) return null;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Personal Information</CardTitle>
        {isEditing && (
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            {isEditing ? (
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your full name"
              />
            ) : (
              <p className="text-sm p-2 bg-muted rounded">{formData.name || 'Not specified'}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            {isEditing ? (
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              />
            ) : (
              <p className="text-sm p-2 bg-muted rounded">
                {formData.dateOfBirth ? new Date(formData.dateOfBirth).toLocaleDateString() : 'Not specified'}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            {isEditing ? (
              <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <p className="text-sm p-2 bg-muted rounded">{formData.gender || 'Not specified'}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="nationality">Nationality</Label>
            {isEditing ? (
              <Input
                id="nationality"
                value={formData.nationality}
                onChange={(e) => handleInputChange('nationality', e.target.value)}
                placeholder="Enter your nationality"
              />
            ) : (
              <p className="text-sm p-2 bg-muted rounded">{formData.nationality || 'Not specified'}</p>
            )}
          </div>
        </div>

        {/* About Me */}
        <div className="space-y-2">
          <Label htmlFor="aboutMe">About Me</Label>
          {isEditing ? (
            <Textarea
              id="aboutMe"
              value={formData.aboutMe}
              onChange={(e) => handleInputChange('aboutMe', e.target.value)}
              placeholder="Tell us about yourself, your interests, and what drives you..."
              rows={4}
            />
          ) : (
            <p className="text-sm p-3 bg-muted rounded min-h-[100px]">
              {formData.aboutMe || 'No description provided'}
            </p>
          )}
        </div>

        {/* Career Preferences (Employee only) */}
        {'salaryExpectation' in profile && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="salaryExpectation">Salary Expectation</Label>
              {isEditing ? (
                <Input
                  id="salaryExpectation"
                  value={formData.salaryExpectation}
                  onChange={(e) => handleInputChange('salaryExpectation', e.target.value)}
                  placeholder="e.g., $80,000 - $100,000"
                />
              ) : (
                <p className="text-sm p-2 bg-muted rounded">{formData.salaryExpectation || 'Not specified'}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobPreference">Job Preference</Label>
              {isEditing ? (
                <Select value={formData.jobPreference} onValueChange={(value) => handleInputChange('jobPreference', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                    <SelectItem value="onsite">On-site</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-sm p-2 bg-muted rounded">{formData.jobPreference || 'Not specified'}</p>
              )}
            </div>
          </div>
        )}

        {/* Languages */}
        <div className="space-y-2">
          <Label>Languages</Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.languages.map((language, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {language}
                {isEditing && (
                  <button
                    onClick={() => handleRemoveLanguage(index)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </Badge>
            ))}
          </div>
          {isEditing && (
            <div className="flex gap-2">
              <Input
                value={formData.newLanguage}
                onChange={(e) => handleInputChange('newLanguage', e.target.value)}
                placeholder="Add a language"
                onKeyPress={(e) => e.key === 'Enter' && handleAddLanguage()}
              />
              <Button onClick={handleAddLanguage} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}