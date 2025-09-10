'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { UserProfile, EmployerProfile } from '@/lib/interface';

// Mock profile data
const mockUserProfile: UserProfile = {
  id: '1',
  name: 'Sarah Johnson',
  profilePhoto: '',
  rating: 4.5,
  ovationTag: 'Top Performer',
  topRanking: '#15 in Frontend Development',
  txValue: 25000,
  aboutMe: 'Passionate frontend developer with 5+ years of experience in React, TypeScript, and modern web technologies.',
  identityValidation: 'Verified',
  salaryExpectation: '$80,000 - $100,000',
  jobPreference: 'Remote or Hybrid',
  skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Node.js'],
  experience: [
    {
      id: '1',
      company: 'TechCorp Solutions',
      role: 'Senior Frontend Developer',
      startDate: new Date('2022-01-01'),
      endDate: undefined,
      isCurrentRole: true,
      description: 'Leading frontend development for enterprise applications using React and TypeScript.'
    },
    {
      id: '2',
      company: 'StartupXYZ',
      role: 'Frontend Developer',
      startDate: new Date('2020-06-01'),
      endDate: new Date('2021-12-31'),
      isCurrentRole: false,
      description: 'Developed responsive web applications and improved user experience metrics by 40%.'
    }
  ],
  education: [
    {
      id: '1',
      institution: 'University of Technology',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startYear: 2016,
      endYear: 2020,
      grade: '3.8 GPA'
    }
  ],
  personalInformation: {
    dateOfBirth: new Date('1995-05-15'),
    gender: 'Female',
    nationality: 'American',
    languages: ['English', 'Spanish']
  },
  address: {
    home: '123 Main St, Apt 4B',
    city: 'San Francisco',
    state: 'CA',
    country: 'USA',
    zipCode: '94102'
  },
  contactInformation: {
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    linkedin: 'https://linkedin.com/in/sarahjohnson',
    website: 'https://sarahjohnson.dev'
  },
  assets: ['Portfolio Website', 'GitHub Profile', 'Design Portfolio'],
  additionalActivity: 'Open source contributor, Tech meetup organizer',
  training: [
    {
      id: '1',
      title: 'Advanced React Patterns',
      provider: 'Frontend Masters',
      date: new Date('2023-03-15'),
      description: 'Advanced React patterns and performance optimization'
    }
  ],
  reference: [
    {
      id: '1',
      name: 'John Smith',
      relationship: 'Former Manager',
      contact: '+1 (555) 987-6543',
      email: 'john.smith@techcorp.com',
      company: 'TechCorp Solutions'
    }
  ],
  socialLinks: [
    'https://github.com/sarahjohnson',
    'https://twitter.com/sarahjohnson',
    'https://dribbble.com/sarahjohnson'
  ],
  createdAt: new Date('2023-01-01'),
  updatedAt: new Date(),
  appliedCompetitions: []
};

const mockEmployerProfile: EmployerProfile = {
  id: '2',
  companyName: 'TechCorp Solutions',
  companySize: 150,
  industry: 'Technology',
  teamMembers: ['John Smith', 'Mike Wilson', 'Lisa Chen'],
  hiringPreferences: ['Remote Work', 'Full-time', 'Contract'],
  postedCompetitions: [],
  companyDescription: 'Leading technology company focused on innovative software solutions.',
  website: 'https://techcorp.com',
  foundedYear: 2015,
  headquarters: 'San Francisco, CA'
};

export function useProfileData() {
  const { user } = useAuthStore();
  const [profile, setProfile] = useState<UserProfile | EmployerProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const loadProfile = async () => {
      setIsLoading(true);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (user?.role === 'employee') {
        setProfile({ ...mockUserProfile, name: user.name, contactInformation: { ...mockUserProfile.contactInformation, email: user.email } });
      } else if (user?.role === 'employer') {
        setProfile({ ...mockEmployerProfile, companyName: user.company || mockEmployerProfile.companyName });
      }
      
      setIsLoading(false);
    };

    if (user) {
      loadProfile();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const updateProfile = async (updates: Partial<UserProfile | EmployerProfile>) => {
    if (!profile) return;
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setProfile(prev => prev ? { ...prev, ...updates, updatedAt: new Date() } : null);
    
    // In a real app, you would make an API call here
    console.log('Profile updated:', updates);
  };

  return {
    profile,
    updateProfile,
    isLoading
  };
}