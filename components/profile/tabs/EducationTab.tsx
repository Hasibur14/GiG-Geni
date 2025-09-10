'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Save, Plus, Edit, Trash2, GraduationCap, Calendar } from 'lucide-react';
import { UserProfile, Education } from '@/lib/interface';

interface EducationTabProps {
  profile: UserProfile | null;
  isEditing: boolean;
  onUpdate: (updates: Partial<UserProfile>) => Promise<void>;
}

export function EducationTab({ profile, isEditing, onUpdate }: EducationTabProps) {
  const [educations, setEducations] = useState<Education[]>(profile?.education || []);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState<Education>({
    institution: '',
    degree: '',
    field: '',
    startYear: undefined,
    endYear: undefined,
    grade: '',
    description: ''
  });

  const resetForm = () => {
    setFormData({
      institution: '',
      degree: '',
      field: '',
      startYear: undefined,
      endYear: undefined,
      grade: '',
      description: ''
    });
  };

  const handleInputChange = (field: keyof Education, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleEdit = (index: number) => {
    const education = educations[index];
    setFormData(education);
    setEditingIndex(index);
    setShowAddForm(true);
  };

  const handleSave = async () => {
    const newEducation: Education = {
      ...formData,
      id: formData.id || Date.now().toString(),
    };

    let updatedEducations;
    if (editingIndex !== null) {
      updatedEducations = educations.map((edu, index) => 
        index === editingIndex ? newEducation : edu
      );
    } else {
      updatedEducations = [...educations, newEducation];
    }

    setEducations(updatedEducations);
    setShowAddForm(false);
    setEditingIndex(null);
    resetForm();

    // Save to profile
    setIsSaving(true);
    try {
      await onUpdate({ education: updatedEducations });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (index: number) => {
    const updatedEducations = educations.filter((_, i) => i !== index);
    setEducations(updatedEducations);
    
    setIsSaving(true);
    try {
      await onUpdate({ education: updatedEducations });
    } finally {
      setIsSaving(false);
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  if (!profile) return null;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5" />
          Education
        </CardTitle>
        {isEditing && (
          <Button onClick={() => setShowAddForm(true)} disabled={showAddForm}>
            <Plus className="w-4 h-4 mr-2" />
            Add Education
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add/Edit Form */}
        {isEditing && showAddForm && (
          <Card className="border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg">
                {editingIndex !== null ? 'Edit Education' : 'Add New Education'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="institution">Institution</Label>
                  <Input
                    id="institution"
                    value={formData.institution || ''}
                    onChange={(e) => handleInputChange('institution', e.target.value)}
                    placeholder="University or school name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="degree">Degree</Label>
                  <Input
                    id="degree"
                    value={formData.degree || ''}
                    onChange={(e) => handleInputChange('degree', e.target.value)}
                    placeholder="e.g., Bachelor of Science, Master's, PhD"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="field">Field of Study</Label>
                  <Input
                    id="field"
                    value={formData.field || ''}
                    onChange={(e) => handleInputChange('field', e.target.value)}
                    placeholder="e.g., Computer Science, Business Administration"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="grade">Grade/GPA</Label>
                  <Input
                    id="grade"
                    value={formData.grade || ''}
                    onChange={(e) => handleInputChange('grade', e.target.value)}
                    placeholder="e.g., 3.8 GPA, First Class, A+"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startYear">Start Year</Label>
                  <select
                    id="startYear"
                    value={formData.startYear || ''}
                    onChange={(e) => handleInputChange('startYear', e.target.value ? parseInt(e.target.value) : undefined)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select year</option>
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endYear">End Year</Label>
                  <select
                    id="endYear"
                    value={formData.endYear || ''}
                    onChange={(e) => handleInputChange('endYear', e.target.value ? parseInt(e.target.value) : undefined)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select year</option>
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  value={formData.description || ''}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Relevant coursework, achievements, thesis topic, etc."
                  rows={3}
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

        {/* Education List */}
        <div className="space-y-4">
          {educations.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <GraduationCap className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No education records added yet.</p>
              {isEditing && (
                <p className="text-sm">Click "Add Education" to get started.</p>
              )}
            </div>
          ) : (
            educations.map((education, index) => (
              <Card key={education.id || index} className="relative">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1">{education.degree}</h3>
                      <p className="text-primary font-medium mb-2">{education.institution}</p>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                        {education.field && (
                          <>
                            <span>{education.field}</span>
                            <span>•</span>
                          </>
                        )}
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {education.startYear} - {education.endYear}
                          </span>
                        </div>
                        {education.grade && (
                          <>
                            <span>•</span>
                            <span className="font-medium">{education.grade}</span>
                          </>
                        )}
                      </div>
                      
                      {education.description && (
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {education.description}
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