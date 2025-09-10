'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Save, Plus, X, Code, Target, Users } from 'lucide-react';
import { UserProfile, EmployerProfile } from '@/lib/interface';

interface SkillsTabProps {
  profile: UserProfile | EmployerProfile | null;
  isEditing: boolean;
  onUpdate: (updates: Partial<UserProfile | EmployerProfile>) => Promise<void>;
  userRole?: string;
}

// Type guards to check profile types
function isUserProfile(profile: UserProfile | EmployerProfile | null): profile is UserProfile {
  return profile !== null && 'skills' in profile;
}

function isEmployerProfile(profile: UserProfile | EmployerProfile | null): profile is EmployerProfile {
  return profile !== null && 'hiringPreferences' in profile;
}

export function SkillsTab({ profile, isEditing, onUpdate, userRole }: SkillsTabProps) {
  const userProfile = isUserProfile(profile) ? profile : null;
  const employerProfile = isEmployerProfile(profile) ? profile : null;
  
  const [skills, setSkills] = useState<string[]>(userProfile?.skills || []);
  const [hiringPreferences, setHiringPreferences] = useState<string[]>(employerProfile?.hiringPreferences || []);
  const [newSkill, setNewSkill] = useState('');
  const [newPreference, setNewPreference] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Predefined skill suggestions
  const skillSuggestions = [
    'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Java', 'C++', 'C#',
    'HTML/CSS', 'Vue.js', 'Angular', 'Next.js', 'Express.js', 'MongoDB', 'PostgreSQL',
    'MySQL', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'Git', 'CI/CD',
    'Agile', 'Scrum', 'Project Management', 'Leadership', 'Communication', 'Problem Solving',
    'Data Analysis', 'Machine Learning', 'AI', 'DevOps', 'Security', 'Testing', 'UI/UX Design'
  ];

  const preferenceSuggestions = [
    'Remote Work', 'Hybrid Work', 'Full-time', 'Part-time', 'Contract', 'Freelance',
    'Junior Level', 'Mid Level', 'Senior Level', 'Lead/Principal', 'Management',
    'Startup Experience', 'Enterprise Experience', 'Agile Environment', 'Fast-paced',
    'Collaborative Team', 'Independent Work', 'Innovation Focus', 'Growth Mindset'
  ];

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills(prev => [...prev, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (index: number) => {
    setSkills(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddPreference = () => {
    if (newPreference.trim() && !hiringPreferences.includes(newPreference.trim())) {
      setHiringPreferences(prev => [...prev, newPreference.trim()]);
      setNewPreference('');
    }
  };

  const handleRemovePreference = (index: number) => {
    setHiringPreferences(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (userRole === 'employee') {
        await onUpdate({ skills } as Partial<UserProfile>);
      } else if (userRole === 'employer') {
        await onUpdate({ hiringPreferences } as Partial<EmployerProfile>);
      }
    } finally {
      setIsSaving(false);
    }
  };

  const addSuggestedSkill = (skill: string) => {
    if (!skills.includes(skill)) {
      setSkills(prev => [...prev, skill]);
    }
  };

  const addSuggestedPreference = (preference: string) => {
    if (!hiringPreferences.includes(preference)) {
      setHiringPreferences(prev => [...prev, preference]);
    }
  };

  if (!profile) return null;

  return (
    <div className="space-y-6">
      {/* Skills Section (for employees) */}
      {userRole === 'employee' && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Code className="w-5 h-5" />
              Skills & Expertise
            </CardTitle>
            {isEditing && (
              <Button onClick={handleSave} disabled={isSaving}>
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Current Skills */}
            <div className="space-y-2">
              <Label>Your Skills</Label>
              <div className="flex flex-wrap gap-2 min-h-[40px] p-2 border rounded-md">
                {skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {skill}
                    {isEditing && (
                      <button
                        onClick={() => handleRemoveSkill(index)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </Badge>
                ))}
                {skills.length === 0 && (
                  <p className="text-muted-foreground text-sm">No skills added yet</p>
                )}
              </div>
            </div>

            {/* Add New Skill */}
            {isEditing && (
              <div className="space-y-2">
                <Label>Add New Skill</Label>
                <div className="flex gap-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Enter a skill"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                  />
                  <Button onClick={handleAddSkill} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Skill Suggestions */}
            {isEditing && (
              <div className="space-y-2">
                <Label>Popular Skills (click to add)</Label>
                <div className="flex flex-wrap gap-2">
                  {skillSuggestions
                    .filter(skill => !skills.includes(skill))
                    .slice(0, 15)
                    .map((skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                        onClick={() => addSuggestedSkill(skill)}
                      >
                        {skill}
                      </Badge>
                    ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Hiring Preferences Section (for employers) */}
      {userRole === 'employer' && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Hiring Preferences
            </CardTitle>
            {isEditing && (
              <Button onClick={handleSave} disabled={isSaving}>
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Current Preferences */}
            <div className="space-y-2">
              <Label>Your Hiring Preferences</Label>
              <div className="flex flex-wrap gap-2 min-h-[40px] p-2 border rounded-md">
                {hiringPreferences.map((preference, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {preference}
                    {isEditing && (
                      <button
                        onClick={() => handleRemovePreference(index)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </Badge>
                ))}
                {hiringPreferences.length === 0 && (
                  <p className="text-muted-foreground text-sm">No preferences added yet</p>
                )}
              </div>
            </div>

            {/* Add New Preference */}
            {isEditing && (
              <div className="space-y-2">
                <Label>Add New Preference</Label>
                <div className="flex gap-2">
                  <Input
                    value={newPreference}
                    onChange={(e) => setNewPreference(e.target.value)}
                    placeholder="Enter a hiring preference"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddPreference()}
                  />
                  <Button onClick={handleAddPreference} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Preference Suggestions */}
            {isEditing && (
              <div className="space-y-2">
                <Label>Common Preferences (click to add)</Label>
                <div className="flex flex-wrap gap-2">
                  {preferenceSuggestions
                    .filter(pref => !hiringPreferences.includes(pref))
                    .map((preference) => (
                      <Badge
                        key={preference}
                        variant="outline"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                        onClick={() => addSuggestedPreference(preference)}
                      >
                        {preference}
                      </Badge>
                    ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Additional Skills Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            {userRole === 'employee' ? 'Skill Development Tips' : 'Hiring Best Practices'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {userRole === 'employee' ? (
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>• Keep your skills updated with current industry trends</p>
              <p>• Include both technical and soft skills</p>
              <p>• Be specific (e.g., "React 18" instead of just "React")</p>
              <p>• Add skills you're currently learning</p>
              <p>• Consider industry certifications</p>
            </div>
          ) : (
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>• Be clear about work arrangements (remote, hybrid, on-site)</p>
              <p>• Specify experience levels you're looking for</p>
              <p>• Include company culture preferences</p>
              <p>• Consider diversity and inclusion factors</p>
              <p>• Update preferences based on market conditions</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}