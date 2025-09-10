'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Save, Plus, Edit, Trash2, Briefcase, Calendar } from 'lucide-react';
import { UserProfile, Experience, EmployerProfile } from '@/lib/interface';

interface ExperienceTabProps {
  profile: UserProfile | EmployerProfile | null;
  isEditing: boolean;
  onUpdate: (updates: Partial<UserProfile >) => Promise<void>;
}

// Type guard to check if profile is UserProfile
function isUserProfile(profile: UserProfile | EmployerProfile | null): profile is UserProfile {
  return profile !== null && 'experience' in profile;
}

export function ExperienceTab({ profile, isEditing, onUpdate }: ExperienceTabProps) {
  const userProfile = isUserProfile(profile) ? profile : null;
  const [experiences, setExperiences] = useState<Experience[]>(userProfile?.experience || []);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState<Experience>({
    company: '',
    role: '',
    startDate: undefined,
    endDate: undefined,
    isCurrentRole: false,
    description: ''
  });

  const resetForm = () => {
    setFormData({
      company: '',
      role: '',
      startDate: undefined,
      endDate: undefined,
      isCurrentRole: false,
      description: ''
    });
  };

  const handleInputChange = (field: keyof Experience, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleEdit = (index: number) => {
    const experience = experiences[index];
    setFormData(experience);
    setEditingIndex(index);
    setShowAddForm(true);
  };

  const handleSave = async () => {
    const newExperience: Experience = {
      ...formData,
      id: formData.id || Date.now().toString(),
      startDate: formData.startDate ? new Date(formData.startDate) : undefined,
      endDate: formData.isCurrentRole ? undefined : (formData.endDate ? new Date(formData.endDate) : undefined)
    };

    let updatedExperiences;
    if (editingIndex !== null) {
      updatedExperiences = experiences.map((exp, index) => 
        index === editingIndex ? newExperience : exp
      );
    } else {
      updatedExperiences = [...experiences, newExperience];
    }

    setExperiences(updatedExperiences);
    setShowAddForm(false);
    setEditingIndex(null);
    resetForm();

    // Save to profile
    setIsSaving(true);
    try {
      await onUpdate({ experience: updatedExperiences });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (index: number) => {
    const updatedExperiences = experiences.filter((_, i) => i !== index);
    setExperiences(updatedExperiences);
    
    setIsSaving(true);
    try {
      await onUpdate({ experience: updatedExperiences });
    } finally {
      setIsSaving(false);
    }
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const calculateDuration = (startDate: Date | undefined, endDate: Date | undefined, isCurrent: boolean) => {
    if (!startDate) return '';
    
    const start = new Date(startDate);
    const end = isCurrent ? new Date() : (endDate ? new Date(endDate) : new Date());
    
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years === 0) {
      return `${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
    } else if (remainingMonths === 0) {
      return `${years} year${years !== 1 ? 's' : ''}`;
    } else {
      return `${years} year${years !== 1 ? 's' : ''} ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
    }
  };

  if (!profile) return null;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="w-5 h-5" />
          Work Experience
        </CardTitle>
        {isEditing && (
          <Button onClick={() => setShowAddForm(true)} disabled={showAddForm}>
            <Plus className="w-4 h-4 mr-2" />
            Add Experience
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add/Edit Form */}
        {isEditing && showAddForm && (
          <Card className="border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg">
                {editingIndex !== null ? 'Edit Experience' : 'Add New Experience'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={formData.company || ''}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    placeholder="Company name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Job Title</Label>
                  <Input
                    id="role"
                    value={formData.role || ''}
                    onChange={(e) => handleInputChange('role', e.target.value)}
                    placeholder="Your job title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate ? formData.startDate.toISOString().split('T')[0] : ''}
                    onChange={(e) => handleInputChange('startDate', e.target.value ? new Date(e.target.value) : undefined)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate ? formData.endDate.toISOString().split('T')[0] : ''}
                    onChange={(e) => handleInputChange('endDate', e.target.value ? new Date(e.target.value) : undefined)}
                    disabled={formData.isCurrentRole}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isCurrentRole"
                  checked={formData.isCurrentRole}
                  onCheckedChange={(checked) => handleInputChange('isCurrentRole', checked)}
                />
                <Label htmlFor="isCurrentRole">I currently work here</Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Job Description</Label>
                <Textarea
                  id="description"
                  value={formData.description || ''}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your responsibilities, achievements, and key projects..."
                  rows={4}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSave} disabled={isSaving}>
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? 'Saving...' : 'Save'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingIndex(null);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Experience List */}
        <div className="space-y-4">
          {experiences.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No work experience added yet.</p>
              {isEditing && (
                <p className="text-sm">Click "Add Experience" to get started.</p>
              )}
            </div>
          ) : (
            experiences.map((experience, index) => (
              <Card key={experience.id || index} className="relative">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">{experience.role}</h3>
                        {experience.isCurrentRole && (
                          <Badge variant="secondary">Current</Badge>
                        )}
                      </div>
                      <p className="text-primary font-medium mb-2">{experience.company}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {formatDate(experience.startDate)} - {experience.isCurrentRole ? 'Present' : formatDate(experience.endDate)}
                          </span>
                        </div>
                        <span>•</span>
                        <span>{calculateDuration(experience.startDate, experience.endDate, experience.isCurrentRole || false)}</span>
                      </div>
                      
                      {experience.description && (
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {experience.description}
                        </p>
                      )}
                    </div>

                    {isEditing && (
                      <div className="flex gap-2 ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(index)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(index)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}