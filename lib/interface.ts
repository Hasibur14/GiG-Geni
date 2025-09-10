export interface Competition {
  id: string;
  title: string;
  organizer: string;
  location?: string;
  rating?: number;
  categories: string[]; // e.g. ["IT", "Business"]
  prizes?: string;
  registrationFee?: string;
  startDate?: Date;
  endDate?: Date;
  resultDate?: Date;
  participantCount?: number;
  description?: string;
  skillsTested: string[];
  projectBrief?: string;
  termsAndConditions: string[];
  submissionFormats: string[];
  maxFileSize?: string;
  createdAt?: Date;
  updatedAt?: Date;
//   rounds: CompetitionRound[]; // <-- integrated journey
}

export interface LeaderboardParticipant {
  id: string;
  name: string;
  email: string;
  profilePhoto: string;
  role: string;
  company?: string;
  totalPoints: number;
  competitionsParticipated: number;
  competitionsWon: number;
  achievements: Achievement[];
  competitionHistory: CompetitionHistory[];
  joinedDate: Date;
  lastActive: Date;
  categories: string[];
  skills: string[];
  rank?: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedDate: Date;
  category: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface CompetitionHistory {
  competitionId: string;
  competitionTitle: string;
  category: string;
  participatedDate: Date;
  finalRank: number;
  totalParticipants: number;
  pointsEarned: number;
  roundScores: RoundScore[];
  status: 'completed' | 'ongoing' | 'withdrawn';
}

export interface RoundScore {
  roundNumber: number;
  roundType: string;
  score: number;
  maxScore: number;
  evaluatorComments?: string;
  completedDate: Date;
}

export interface LeaderboardFilters {
  category?: string;
  dateRange: '30days' | '90days' | 'alltime';
  sortBy: 'points' | 'competitions';
  sortOrder: 'desc' | 'asc';
  page: number;
  limit: number;
}

// Profile Interfaces
export interface Experience {
  id?: string;
  company?: string;
  role?: string;
  startDate?: Date;
  endDate?: Date;
  description?: string;
  isCurrentRole?: boolean;
}

export interface Education {
  id?: string;
  institution?: string;
  degree?: string;
  field?: string;
  startYear?: number;
  endYear?: number;
  grade?: string;
  description?: string;
}

export interface Training {
  id?: string;
  title?: string;
  provider?: string;
  date?: Date;
  description?: string;
  certificateUrl?: string;
}

export interface Reference {
  id?: string;
  name?: string;
  relationship?: string;
  contact?: string;
  email?: string;
  company?: string;
}

export interface ContactInformation {
  email?: string;
  phone?: string;
  linkedin?: string;
  website?: string;
}

export interface Address {
  home?: string;
  permanent?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  profilePhoto?: string;
  rating?: number;
  ovationTag?: string;
  topRanking?: string;
  txValue?: number;
  aboutMe?: string;
  identityValidation?: string;
  salaryExpectation?: string;
  jobPreference?: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
  personalInformation?: {
    dateOfBirth?: Date;
    gender?: string;
    nationality?: string;
    languages?: string[];
  };
  address?: Address;
  contactInformation?: ContactInformation;
  assets: string[];
  additionalActivity?: string;
  training: Training[];
  reference: Reference[];
  socialLinks: string[];
  createdAt?: Date;
  updatedAt?: Date;
  appliedCompetitions?: Competition[];
}

export interface EmployerProfile {
  id: string;
  companyName: string;
  companySize?: number;
  industry?: string;
  teamMembers?: string[];
  hiringPreferences?: string[];
  postedCompetitions: Competition[];
  companyDescription?: string;
  website?: string;
  foundedYear?: number;
  headquarters?: string;
}

// Notification Interfaces
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'competition' | 'system';
  isRead: boolean;
  createdAt: Date;
  actionUrl?: string;
  actionText?: string;
  metadata?: {
    competitionId?: string;
    userId?: string;
    [key: string]: any;
  };
}

// Settings Interfaces
export interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  competitionUpdates: boolean;
  leaderboardUpdates: boolean;
  promotionalEmails: boolean;
  weeklyDigest: boolean;
}

export interface UserSettings {
  notifications: NotificationSettings;
  privacy: {
    profileVisibility: 'public' | 'private' | 'connections';
    showEmail: boolean;
    showPhone: boolean;
  };
  preferences: {
    theme: 'light' | 'dark' | 'system';
    language: string;
    timezone: string;
  };
}