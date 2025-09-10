'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Edit, Save, X, Camera } from 'lucide-react';
import { PersonalInfoTab } from './tabs/PersonalInfoTab';
import { ExperienceTab } from './tabs/ExperienceTab';
import { EducationTab } from './tabs/EducationTab';
import { SkillsTab } from './tabs/SkillsTab';
import { ContactTab } from './tabs/ContactTab';
import { CompanyTab } from './tabs/CompanyTab';
import { ProfileCompletionModal } from './ProfileCompletionModal';
import { useProfileData } from '@/hooks/useProfileData';
import { EmployerProfile, UserProfile } from '@/lib/interface';

export function ProfilePage() {
  const { user } = useAuthStore();
  const { profile, updateProfile, isLoading } = useProfileData();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  // Check if user needs to complete profile (from URL params or auth state)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const shouldEdit = urlParams.get('edit') === 'true';
    const shouldComplete = urlParams.get('complete') === 'true';
    
    if (shouldEdit) {
      setIsEditing(true);
    }
    
    if (shouldComplete || (!user?.isProfileComplete && user?.isEmailVerified)) {
      setShowCompletionModal(true);
    }
  }, [user]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    // Save logic will be handled by individual tab components
    setIsEditing(false);
  };

  const getProfileCompletionPercentage = () => {
    if (!profile) return 0;
    
    const fields = [
      'name' in profile ? profile.name : null,
      'aboutMe' in profile ? profile.aboutMe : null,
      'contactInformation' in profile ? profile.contactInformation?.phone : null,
      'skills' in profile ? profile.skills?.length > 0 : false,
      'experience' in profile ? profile.experience?.length > 0 : false,
      'education' in profile ? profile.education?.length > 0 : false,
    ];
    
    const completedFields = fields.filter(Boolean).length;
    return Math.round((completedFields / fields.length) * 100);
  };

  const getTabsForRole = () => {
    const commonTabs = [
      { value: 'personal', label: 'Personal Info' },
      { value: 'contact', label: 'Contact' },
    ];

    if (user?.role === 'employee') {
      return [
        ...commonTabs,
        { value: 'experience', label: 'Experience' },
        { value: 'education', label: 'Education' },
        { value: 'skills', label: 'Skills' },
      ];
    } else if (user?.role === 'employer') {
      return [
        ...commonTabs,
        { value: 'company', label: 'Company' },
        { value: 'skills', label: 'Skills & Preferences' },
      ];
    }

    return commonTabs;
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 ">
      {/* Profile Header */}
      <div className="mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="text-2xl">
                    {user?.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold">{user?.name}</h1>
                    <p className="text-muted-foreground">{user?.title}</p>
                    {user?.company && (
                      <p className="text-sm text-muted-foreground">{user.company}</p>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      {user?.role && (
                        <Badge variant="secondary">
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </Badge>
                      )}
                      {/* {user. !== undefined && (
                        <Badge variant="outline">
                          ⭐ {profile.rating}/5
                        </Badge>
                      )} */}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Profile Completion</p>
                      <p className="text-lg font-semibold text-primary">
                        {getProfileCompletionPercentage()}%
                      </p>
                    </div>
                    <Button
                      onClick={handleEditToggle}
                      variant={isEditing ? "outline" : "default"}
                      className="ml-4"
                    >
                      {isEditing ? (
                        <>
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </>
                      ) : (
                        <>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Profile
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Profile Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          {getTabsForRole().map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="personal">
          <PersonalInfoTab 
            profile={profile} 
            isEditing={isEditing} 
            onUpdate={updateProfile}
          />
        </TabsContent>

        <TabsContent value="contact">
          <ContactTab 
            profile={profile} 
            isEditing={isEditing} 
            onUpdate={updateProfile}
          />
        </TabsContent>

        {user?.role === 'employee' && (
          <>
            <TabsContent value="experience">
              <ExperienceTab 
                profile={profile} 
                isEditing={isEditing} 
                onUpdate={updateProfile}
              />
            </TabsContent>

            <TabsContent value="education">
              <EducationTab 
                profile={profile as UserProfile}
                isEditing={isEditing} 
                onUpdate={updateProfile}
              />
            </TabsContent>
          </>
        )}

        {user?.role === 'employer' && (
          <TabsContent value="company">
            <CompanyTab 
              profile={profile as EmployerProfile} 
              isEditing={isEditing} 
              onUpdate={updateProfile}
            />
          </TabsContent>
        )}

        <TabsContent value="skills">
          <SkillsTab 
            profile={profile} 
            isEditing={isEditing} 
            onUpdate={updateProfile}
            userRole={user?.role}
          />
        </TabsContent>
      </Tabs>

      {/* Profile Completion Modal */}
      {showCompletionModal && (
        <ProfileCompletionModal
          isOpen={showCompletionModal}
          onClose={() => setShowCompletionModal(false)}
          onComplete={() => {
            setShowCompletionModal(false);
            setIsEditing(true);
          }}
          onSkip={() => setShowCompletionModal(false)}
        />
      )}
    </div>
  );
}