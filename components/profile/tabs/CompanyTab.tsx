'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Save, Plus, X, Building, Users, Globe } from 'lucide-react';
import { EmployerProfile } from '@/lib/interface';

interface CompanyTabProps {
  profile: EmployerProfile | null;
  isEditing: boolean;
  onUpdate: (updates: Partial<EmployerProfile>) => Promise<void>;
}

export function CompanyTab({ profile, isEditing, onUpdate }: CompanyTabProps) {
  const [formData, setFormData] = useState({
    companyName: profile?.companyName || '',
    companyDescription: profile?.companyDescription || '',
    industry: profile?.industry || '',
    companySize: profile?.companySize || 0,
    website: profile?.website || '',
    foundedYear: profile?.foundedYear || new Date().getFullYear(),
    headquarters: profile?.headquarters || '',
    teamMembers: profile?.teamMembers || [],
    newTeamMember: ''
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddTeamMember = () => {
    if (formData.newTeamMember.trim() && !formData.teamMembers.includes(formData.newTeamMember.trim())) {
      setFormData(prev => ({
        ...prev,
        teamMembers: [...prev.teamMembers, prev.newTeamMember.trim()],
        newTeamMember: ''
      }));
    }
  };

  const handleRemoveTeamMember = (index: number) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updates: Partial<EmployerProfile> = {
        companyName: formData.companyName,
        companyDescription: formData.companyDescription,
        industry: formData.industry,
        companySize: formData.companySize,
        website: formData.website,
        foundedYear: formData.foundedYear,
        headquarters: formData.headquarters,
        teamMembers: formData.teamMembers
      };
      
      await onUpdate(updates);
    } finally {
      setIsSaving(false);
    }
  };

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Education', 'Manufacturing',
    'Retail', 'Consulting', 'Media & Entertainment', 'Real Estate',
    'Transportation', 'Energy', 'Government', 'Non-profit', 'Other'
  ];

  const companySizes = [
    { value: 1, label: '1-10 employees' },
    { value: 11, label: '11-50 employees' },
    { value: 51, label: '51-200 employees' },
    { value: 201, label: '201-500 employees' },
    { value: 501, label: '501-1000 employees' },
    { value: 1001, label: '1000+ employees' }
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  if (!profile) return null;

  return (
    <div className="space-y-6">
      {/* Company Information */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Building className="w-5 h-5" />
            Company Information
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
              <Label htmlFor="companyName">Company Name</Label>
              {isEditing ? (
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  placeholder="Enter company name"
                />
              ) : (
                <p className="text-sm p-2 bg-muted rounded">{formData.companyName || 'Not specified'}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              {isEditing ? (
                <Select value={formData.industry} onValueChange={(value) => handleInputChange('industry', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-sm p-2 bg-muted rounded">{formData.industry || 'Not specified'}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="companySize">Company Size</Label>
              {isEditing ? (
                <Select 
                  value={formData.companySize.toString()} 
                  onValueChange={(value) => handleInputChange('companySize', parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select company size" />
                  </SelectTrigger>
                  <SelectContent>
                    {companySizes.map((size) => (
                      <SelectItem key={size.value} value={size.value.toString()}>
                        {size.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-sm p-2 bg-muted rounded">
                  {companySizes.find(size => size.value <= formData.companySize)?.label || 'Not specified'}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="foundedYear">Founded Year</Label>
              {isEditing ? (
                <Select 
                  value={formData.foundedYear.toString()} 
                  onValueChange={(value) => handleInputChange('foundedYear', parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-sm p-2 bg-muted rounded">{formData.foundedYear || 'Not specified'}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="website" className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Company Website
              </Label>
              {isEditing ? (
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="https://yourcompany.com"
                />
              ) : (
                <p className="text-sm p-2 bg-muted rounded">
                  {formData.website ? (
                    <a href={formData.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      {formData.website}
                    </a>
                  ) : (
                    'Not specified'
                  )}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="headquarters">Headquarters</Label>
              {isEditing ? (
                <Input
                  id="headquarters"
                  value={formData.headquarters}
                  onChange={(e) => handleInputChange('headquarters', e.target.value)}
                  placeholder="City, State/Country"
                />
              ) : (
                <p className="text-sm p-2 bg-muted rounded">{formData.headquarters || 'Not specified'}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyDescription">Company Description</Label>
            {isEditing ? (
              <Textarea
                id="companyDescription"
                value={formData.companyDescription}
                onChange={(e) => handleInputChange('companyDescription', e.target.value)}
                placeholder="Describe your company, mission, values, and what makes it unique..."
                rows={4}
              />
            ) : (
              <p className="text-sm p-3 bg-muted rounded min-h-[100px]">
                {formData.companyDescription || 'No description provided'}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Team Members */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Team Members
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Current Team Members</Label>
            <div className="flex flex-wrap gap-2 min-h-[40px] p-2 border rounded-md">
              {formData.teamMembers.map((member, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {member}
                  {isEditing && (
                    <button
                      onClick={() => handleRemoveTeamMember(index)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </Badge>
              ))}
              {formData.teamMembers.length === 0 && (
                <p className="text-muted-foreground text-sm">No team members added yet</p>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="space-y-2">
              <Label>Add Team Member</Label>
              <div className="flex gap-2">
                <Input
                  value={formData.newTeamMember}
                  onChange={(e) => handleInputChange('newTeamMember', e.target.value)}
                  placeholder="Enter team member name"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTeamMember()}
                />
                <Button onClick={handleAddTeamMember} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Company Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Company Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-2xl font-bold text-primary">{profile.postedCompetitions?.length || 0}</p>
              <p className="text-sm text-muted-foreground">Competitions Posted</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-2xl font-bold text-primary">{formData.teamMembers.length}</p>
              <p className="text-sm text-muted-foreground">Team Members</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-2xl font-bold text-primary">
                {formData.foundedYear ? new Date().getFullYear() - formData.foundedYear : 0}
              </p>
              <p className="text-sm text-muted-foreground">Years in Business</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}