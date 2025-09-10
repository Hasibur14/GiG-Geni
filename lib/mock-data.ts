
import {
  Trophy,
  Target,
  Users,
  Briefcase,
  Zap,
  Shield,
  TrendingUp,
  Award,
  Clock,
  DollarSign,
  Eye,
  CheckCircle,
  Code,
  Presentation,
  UserCheck,
  ClipboardList,
  Rocket,
  Globe,
  Brain,
  Smartphone,
  Bell,
} from 'lucide-react';
import { Competition } from './interface';


export const winnersData = [
  {
    id: "1",
    name: "John Doe",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    competition: "Frontend Challenge 2024",
    company: "Tech Corp Inc.",
    hired: true,
    position: "1st Place",
    prize: "$5,000",
    organizedBy: "GigGini Platform",
    date: "Dec 2024"
  },
  {
    id: "2",
    name: "Jane Smith",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    competition: "AI Innovation Hackathon",
    company: "Future Labs",
    hired: false,
    position: "2nd Place",
    prize: "$3,000",
    organizedBy: "AI Consortium",
    date: "Nov 2024"
  },
  {
    id: "3",
    name: "Ali Hasan",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    competition: "Blockchain Development Contest",
    company: "CryptoWorld",
    hired: true,
    position: "1st Place",
    prize: "$7,500",
    organizedBy: "Blockchain Alliance",
    date: "Oct 2024"
  },
  {
    id: "4",
    name: "Sarah Wilson",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    competition: "UX/UI Design Challenge",
    company: "Design Studio Pro",
    hired: true,
    position: "1st Place",
    prize: "$4,000",
    organizedBy: "Design Masters",
    date: "Sep 2024"
  },
  {
    id: "5",
    name: "Michael Chen",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    competition: "Mobile App Development",
    company: "AppTech Solutions",
    hired: false,
    position: "3rd Place",
    prize: "$2,000",
    organizedBy: "Mobile Dev Community",
    date: "Aug 2024"
  }
];


export const employeeBenefits = [
  {
    icon: Trophy,
    title: 'Showcase Your Skills',
    description: 'Demonstrate your abilities through real challenges, not just resumes',
    color: 'from-[#6366F1] to-[#8B5CF6]', // subtle blue-violet
  },
  {
    icon: DollarSign,
    title: 'Win Cash Prizes',
    description: 'Compete for substantial monetary rewards while getting hired',
    color: 'from-[#10B981] to-[#34D399]', // fresh green
  },
  {
    icon: Eye,
    title: 'Get Noticed',
    description: 'Stand out to top employers who value skills over credentials',
    color: 'from-[#3B82F6] to-[#60A5FA]', // calm sky blue
  },
  {
    icon: Target,
    title: 'Fair Assessment',
    description: 'Experience unbiased evaluation based purely on performance',
    color: 'from-[#F59E0B] to-[#FBBF24]', // warm amber
  },
  {
    icon: TrendingUp,
    title: 'Career Growth',
    description: 'Build your reputation and ranking in your field',
    color: 'from-[#EC4899] to-[#F472B6]', // soft pink
  },
  {
    icon: CheckCircle,
    title: 'Skip Traditional Hiring',
    description: 'Bypass lengthy interview processes with performance-based selection',
    color: 'from-[#14B8A6] to-[#2DD4BF]', // teal
  },
];

export const employerBenefits = [
  {
    icon: Users,
    title: 'Quality Talent Pool',
    description: 'Access pre-screened candidates who prove their skills',
    color: 'from-[#3B82F6] to-[#60A5FA]', // sky blue - trust, collaboration
  },
  {
    icon: Zap,
    title: 'Faster Hiring',
    description: 'Reduce time-to-hire with streamlined competitive processes',
    color: 'from-[#F59E0B] to-[#FBBF24]', // amber - speed, energy
  },
  {
    icon: Shield,
    title: 'Risk Reduction',
    description: 'Make data-driven decisions based on actual performance',
    color: 'from-[#10B981] to-[#34D399]', // green - safety, stability
  },
  {
    icon: Briefcase,
    title: 'Brand Visibility',
    description: 'Showcase your company to top talent in your industry',
    color: 'from-[#6366F1] to-[#8B5CF6]', // indigo-violet - prestige, authority
  },
  {
    icon: Award,
    title: 'Better Matches',
    description: 'Find candidates who truly fit your requirements',
    color: 'from-[#EC4899] to-[#F472B6]', // pink - recognition, appreciation
  },
  {
    icon: Clock,
    title: 'Cost Effective',
    description: 'Lower recruitment costs with higher success rates',
    color: 'from-[#14B8A6] to-[#2DD4BF]', // teal - efficiency, savings
  },
];



export const mockCompetitions: Competition[] = [
  {
    id: '1',
    title: 'Full Stack Developer Challenge',
    organizer: 'TechCorp Solutions',
    location: 'Remote',
    rating: 4.8,
    categories: ['IT', 'Programming'],
    prizes: '$5000 + Job Offer',
    registrationFee: 'Free',
    startDate: new Date('2024-09-15'),
    endDate: new Date('2024-10-15'),
    resultDate: new Date('2024-10-22'),
    description: 'Build a complete e-commerce application using React, Node.js, and MongoDB.',
    skillsTested: ['React', 'Node.js', 'MongoDB', 'REST APIs'],
    participantCount: 234,
    projectBrief: 'Build a complete e-commerce application using React, Node.js, and MongoDB.',
    termsAndConditions: ['Terms and Conditions'],
    submissionFormats: ['Submission Formats'],
    maxFileSize: 'Max File Size',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: 'Digital Marketing Campaign Contest',
    organizer: 'Marketing Masters Inc',
    location: 'New York, NY',
    rating: 4.6,
    categories: ['Marketing', 'Business'],
    prizes: '$3000 + Internship',
    registrationFee: '$25',
    startDate: new Date('2024-09-20'),
    endDate: new Date('2024-10-20'),
    resultDate: new Date('2024-10-25'),
    description: 'Create and execute a comprehensive digital marketing strategy for a startup.',
    skillsTested: ['Social Media Marketing', 'SEO', 'Content Creation', 'Analytics'],
    participantCount: 156,
    projectBrief: 'Create and execute a comprehensive digital marketing strategy for a startup.',
    termsAndConditions: ['Terms and Conditions'],
    submissionFormats: ['Submission Formats'],
    maxFileSize: 'Max File Size',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    title: 'Sales Excellence Championship',
    organizer: 'SalesForce Elite',
    location: 'Chicago, IL',
    rating: 4.9,
    categories: ['Sales', 'Business'],
    prizes: '$4000 + Commission Role',
    registrationFee: 'Free',
    startDate: new Date('2024-09-25'),
    endDate: new Date('2024-10-25'),
    resultDate: new Date('2024-11-01'),
    description: 'Demonstrate your sales skills through role-play scenarios and real client pitches.',
    skillsTested: ['Cold Calling', 'Negotiation', 'CRM Software', 'Presentation'],
    participantCount: 89,
    projectBrief: 'Demonstrate your sales skills through role-play scenarios and real client pitches.',
    termsAndConditions: ['Terms and Conditions'],
    submissionFormats: ['Submission Formats'],
    maxFileSize: 'Max File Size',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];


export const competitionTypes = [
  {
    title: 'Computer Science & IT',
    icon: Code,
    steps: ['Algorithm Quiz', 'Coding Challenge', 'System Design', 'Technical Interview'],
    color: 'from-[#3B82F6] to-[#60A5FA]', // blue → indigo (tech, logic, innovation)
    participants: '2.3K+',
  },
  {
    title: 'Business & Strategy',
    icon: Presentation,
    steps: ['Case Study', 'Market Analysis', 'Strategy Pitch', 'Executive Review'],
    color: 'from-[#F59E0B] to-[#FBBF24]', // amber → gold (leadership, vision, analysis)
    participants: '1.8K+',
  },
  {
    title: 'Sales & Marketing',
    icon: Users,
    steps: ['Product Knowledge', 'Role Play', 'Campaign Design', 'Client Presentation'],
    color: 'from-[#10B981] to-[#34D399]', // green → mint (growth, networking, persuasion)
    participants: '1.5K+',
  },
];



export const topPerformers = [
  {
    name: 'Sarah Johnson',
    competition: 'Full Stack Developer Challenge',
    score: 95,
    rank: 1,
    skills: ['React', 'Node.js', 'TypeScript']
  },
  {
    name: 'Michael Chen',
    competition: 'Digital Marketing Strategy',
    score: 92,
    rank: 1,
    skills: ['SEO', 'Analytics', 'Content Strategy']
  },
  {
    name: 'Emily Rodriguez',
    competition: 'UI/UX Design Challenge',
    score: 88,
    rank: 2,
    skills: ['Figma', 'User Research', 'Prototyping']
  }
];




export const stats = [
  {
    title: 'Active Competitions',
    value: '3',
    change: '+1 this month',
    icon: Trophy,
    color: 'text-orange-600'
  },
  {
    title: 'Total Participants',
    value: '1,247',
    change: '+234 this week',
    icon: Users,
    color: 'text-blue-600'
  },
  {
    title: 'Successful Hires',
    value: '28',
    change: '+5 this month',
    icon: UserCheck,
    color: 'text-green-600'
  },
  {
    title: 'Total Investment',
    value: '$45,500',
    change: '+$8,000 this month',
    icon: DollarSign,
    color: 'text-purple-600'
  }
];

export const dashboardTopPerformers = [
  {
    name: 'Sarah Johnson',
    competition: 'Full Stack Developer Challenge',
    score: 95,
    rank: 1,
    skills: ['React', 'Node.js', 'TypeScript']
  },
  {
    name: 'Michael Chen',
    competition: 'Digital Marketing Strategy',
    score: 92,
    rank: 1,
    skills: ['SEO', 'Analytics', 'Content Strategy']
  },
  {
    name: 'Emily Rodriguez',
    competition: 'UI/UX Design Challenge',
    score: 88,
    rank: 2,
    skills: ['Figma', 'User Research', 'Prototyping']
  }
];



export const flowSteps = [
  {
    step: 1,
    icon: ClipboardList,
    title: 'Screening Questions',
    description: 'Answer domain-specific questions and situational challenges to qualify',
    details: [
      'Technical assessments',
      'Problem-solving scenarios',
      'Industry knowledge tests',
      'Communication skills evaluation'
    ],
    color: 'from-[#3B82F6] to-[#60A5FA]', // blue (clarity, assessment)
    duration: '30-45 mins',
  },
  {
    step: 2,
    icon: Code,
    title: 'Task Challenge',
    description: 'Complete real-world projects that showcase your practical abilities',
    details: [
      'Coding challenges',
      'Business case studies',
      'Design portfolios',
      'Sales presentations'
    ],
    color: 'from-[#10B981] to-[#34D399]', // green (growth, execution)
    duration: '2-5 days',
  },
  {
    step: 3,
    icon: Presentation,
    title: 'Demo Presentation',
    description: 'Present your solution to industry experts and potential employers',
    details: [
      'Live demonstrations',
      'Q&A sessions',
      'Peer interactions',
      'Expert feedback'
    ],
    color: 'from-[#F59E0B] to-[#FBBF24]', // amber (communication, energy)
    duration: '15-30 mins',
  },
  {
    step: 4,
    icon: Trophy,
    title: 'Final Evaluation',
    description: 'Get scored, ranked, and potentially hired based on your performance',
    details: [
      'Comprehensive scoring',
      'Industry rankings',
      'Job offers',
      'Prize distributions'
    ],
    color: 'from-[#6366F1] to-[#8B5CF6]', // indigo/violet (prestige, success)
    duration: '1-3 days',
  },
];

export const roadmapFeatures = [
  {
    phase: 'Q4 2024',
    status: 'completed' as const,
    title: 'Platform Foundation',
    description: 'Core competition platform with basic features',
    features: [
      'Competition creation and management',
      'User profiles and authentication',
      'Basic scoring system',
      'Employer dashboard'
    ],
    icon: CheckCircle,
    color: 'from-green-500 to-green-600',
  },
  {
    phase: 'Q1 2025',
    status: 'in-progress' as const,
    title: 'Advanced Features',
    description: 'Enhanced competition formats and AI-powered matching',
    features: [
      'AI-powered candidate matching',
      'Video interview integration',
      'Advanced analytics',
      'Mobile-responsive design'
    ],
    icon: Zap,
    color: 'from-[#FC5602] to-[#FF7B02]',
  },
  {
    phase: 'Q2 2025',
    status: 'planned' as const,
    title: 'Mobile App Launch',
    description: 'Native iOS and Android applications',
    features: [
      'Native mobile apps',
      'Push notifications',
      'Offline competition mode',
      'Mobile-first competitions'
    ],
    icon: Smartphone,
    color: 'from-blue-500 to-blue-600',
  },
  {
    phase: 'Q3 2025',
    status: 'planned' as const,
    title: 'AI & Automation',
    description: 'Machine learning for better hiring decisions',
    features: [
      'AI-powered skill assessment',
      'Automated screening',
      'Predictive hiring analytics',
      'Smart recommendations'
    ],
    icon: Brain,
    color: 'from-purple-500 to-purple-600',
  },
  {
    phase: 'Q4 2025',
    status: 'planned' as const,
    title: 'Global Expansion',
    description: 'International markets and partnerships',
    features: [
      'Multi-language support',
      'Global payment systems',
      'Regional partnerships',
      'Compliance frameworks'
    ],
    icon: Globe,
    color: 'from-indigo-500 to-indigo-600',
  },
  {
    phase: '2026 & Beyond',
    status: 'planned' as const,
    title: 'Future Innovations',
    description: 'Next-generation hiring technologies',
    features: [
      'VR/AR competitions',
      'Blockchain credentials',
      'Metaverse hiring events',
      'Quantum skill matching'
    ],
    icon: Rocket,
    color: 'from-pink-500 to-rose-500',
  },
];

export const ambitions = [
  {
    title: 'Transform Hiring',
    description: 'Make skill-based hiring the global standard',
    icon: Target,
    metric: '1M+ Placements',
  },
  {
    title: 'Reduce Bias',
    description: 'Create fair and unbiased recruitment processes',
    icon: Users,
    metric: '90% Fair Hiring',
  },
  {
    title: 'Accelerate Careers',
    description: 'Help professionals showcase their true potential',
    icon: TrendingUp,
    metric: '50% Faster Hiring',
  },
];


export const upcomingFeatures = [
  {
    icon: Smartphone,
    title: 'Mobile App',
    description: 'Complete competitions on-the-go with native iOS and Android apps',
    comingSoon: 'Q1 2026',
    color: 'from-blue-500 to-blue-600',
    benefits: ['Offline mode', 'Push notifications', 'Mobile-first UI', 'Real-time updates'],
  },
  {
    icon: Brain,
    title: 'AI Matching',
    description: 'Smart algorithms that match candidates with perfect opportunities',
    comingSoon: 'Q2 2025',
    color: 'from-purple-500 to-purple-600',
    benefits: ['Skill analysis', 'Culture fit', 'Career recommendations', 'Success prediction'],
  },
  {
    icon: Bell,
    title: 'Real-time Notifications',
    description: 'Stay updated with instant alerts for competitions and results',
    comingSoon: 'Q1 2025',
    color: 'from-[#FC5602] to-[#FF7B02]',
    benefits: ['Instant alerts', 'Email digest', 'Custom preferences', 'Multi-channel'],
  },
  {
    icon: Shield,
    title: 'Advanced Security',
    description: 'Enhanced protection for your data and competition integrity',
    comingSoon: 'Q3 2025',
    color: 'from-green-500 to-green-600',
    benefits: ['2FA authentication', 'Data encryption', 'Fraud prevention', 'Secure payments'],
  },
  {
    icon: Users,
    title: 'Team Competitions',
    description: 'Collaborate in group challenges and team-based hiring',
    comingSoon: 'Q4 2025',
    color: 'from-indigo-500 to-indigo-600',
    benefits: ['Group challenges', 'Team formation', 'Collaborative tools', 'Leadership assessment'],
  },
  {
    icon: Globe,
    title: 'Global Expansion',
    description: 'International competitions with multi-language support',
    comingSoon: '2026',
    color: 'from-teal-500 to-teal-600',
    benefits: ['Multi-language', 'Local currencies', 'Regional compliance', 'Cultural adaptation'],
  },
];



export const waitlistBenefits = [
  'Early access to new features',
  'Exclusive beta testing opportunities',
  'Priority customer support',
  'Special launch promotions',
  'Direct feedback channel to our team',
];


export const categories = [
  'IT & Technology',
  'Design & Creative',
  'Marketing & Sales',
  'Business & Strategy',
  'Finance & Accounting',
  'Engineering',
  'Healthcare',
  'Education',
  'Other'
];

export const skillSuggestions = {
  'IT & Technology': ['JavaScript', 'React', 'Node.js', 'Python', 'Java', 'AWS', 'Docker', 'MongoDB'],
  'Design & Creative': ['Figma', 'Adobe Creative Suite', 'UI/UX Design', 'Prototyping', 'User Research'],
  'Marketing & Sales': ['Digital Marketing', 'SEO', 'Social Media', 'Content Marketing', 'Sales Strategy'],
  'Business & Strategy': ['Business Analysis', 'Project Management', 'Strategic Planning', 'Leadership'],
  'Finance & Accounting': ['Financial Analysis', 'Accounting', 'Excel', 'Financial Modeling', 'Budgeting']
};

// Leaderboard Mock Data
import { LeaderboardParticipant, Achievement, CompetitionHistory, RoundScore } from './interface';

export const mockAchievements: Achievement[] = [
  {
    id: 'ach1',
    title: 'First Victory',
    description: 'Won your first competition',
    icon: '🏆',
    earnedDate: new Date('2024-01-15'),
    category: 'IT & Technology',
    rarity: 'common'
  },
  {
    id: 'ach2',
    title: 'Hat Trick',
    description: 'Won 3 competitions in a row',
    icon: '🎯',
    earnedDate: new Date('2024-03-20'),
    category: 'IT & Technology',
    rarity: 'rare'
  },
  {
    id: 'ach3',
    title: 'Perfect Score',
    description: 'Achieved 100% in a competition round',
    icon: '💯',
    earnedDate: new Date('2024-02-10'),
    category: 'Design & Creative',
    rarity: 'epic'
  },
  {
    id: 'ach4',
    title: 'Speed Demon',
    description: 'Completed challenge in record time',
    icon: '⚡',
    earnedDate: new Date('2024-04-05'),
    category: 'IT & Technology',
    rarity: 'rare'
  },
  {
    id: 'ach5',
    title: 'Mentor',
    description: 'Helped 10+ participants improve',
    icon: '🎓',
    earnedDate: new Date('2024-05-12'),
    category: 'Business & Strategy',
    rarity: 'epic'
  },
  {
    id: 'ach6',
    title: 'Legend',
    description: 'Top 1% performer across all categories',
    icon: '👑',
    earnedDate: new Date('2024-06-01'),
    category: 'All',
    rarity: 'legendary'
  }
];

export const mockLeaderboardData: LeaderboardParticipant[] = [
  {
    id: 'p1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    profilePhoto: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    role: 'Senior Full Stack Developer',
    company: 'TechCorp Solutions',
    totalPoints: 2850,
    competitionsParticipated: 12,
    competitionsWon: 5,
    achievements: [mockAchievements[0], mockAchievements[1], mockAchievements[3], mockAchievements[5]],
    competitionHistory: [
      {
        competitionId: '1',
        competitionTitle: 'Full Stack Developer Challenge',
        category: 'IT & Technology',
        participatedDate: new Date('2024-01-15'),
        finalRank: 1,
        totalParticipants: 234,
        pointsEarned: 450,
        roundScores: [
          { roundNumber: 1, roundType: 'Quiz', score: 95, maxScore: 100, completedDate: new Date('2024-01-16') },
          { roundNumber: 2, roundType: 'Coding Challenge', score: 88, maxScore: 100, completedDate: new Date('2024-01-20') },
          { roundNumber: 3, roundType: 'System Design', score: 92, maxScore: 100, completedDate: new Date('2024-01-25') },
          { roundNumber: 4, roundType: 'Technical Interview', score: 96, maxScore: 100, completedDate: new Date('2024-01-30') }
        ],
        status: 'completed'
      }
    ],
    joinedDate: new Date('2023-12-01'),
    lastActive: new Date('2024-12-15'),
    categories: ['IT & Technology'],
    skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
    rank: 1
  },
  {
    id: 'p2',
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    profilePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    role: 'Digital Marketing Specialist',
    company: 'Marketing Masters Inc',
    totalPoints: 2720,
    competitionsParticipated: 10,
    competitionsWon: 4,
    achievements: [mockAchievements[0], mockAchievements[2], mockAchievements[4]],
    competitionHistory: [
      {
        competitionId: '2',
        competitionTitle: 'Digital Marketing Campaign Contest',
        category: 'Marketing & Sales',
        participatedDate: new Date('2024-02-10'),
        finalRank: 1,
        totalParticipants: 156,
        pointsEarned: 420,
        roundScores: [
          { roundNumber: 1, roundType: 'Strategy Planning', score: 90, maxScore: 100, completedDate: new Date('2024-02-12') },
          { roundNumber: 2, roundType: 'Campaign Creation', score: 94, maxScore: 100, completedDate: new Date('2024-02-18') },
          { roundNumber: 3, roundType: 'Analytics Review', score: 87, maxScore: 100, completedDate: new Date('2024-02-25') }
        ],
        status: 'completed'
      }
    ],
    joinedDate: new Date('2023-11-15'),
    lastActive: new Date('2024-12-14'),
    categories: ['Marketing & Sales'],
    skills: ['SEO', 'Google Analytics', 'Social Media', 'Content Strategy'],
    rank: 2
  },
  {
    id: 'p3',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@email.com',
    profilePhoto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    role: 'UX/UI Designer',
    company: 'Design Studio Pro',
    totalPoints: 2650,
    competitionsParticipated: 8,
    competitionsWon: 3,
    achievements: [mockAchievements[0], mockAchievements[2]],
    competitionHistory: [
      {
        competitionId: '4',
        competitionTitle: 'UX/UI Design Challenge',
        category: 'Design & Creative',
        participatedDate: new Date('2024-03-05'),
        finalRank: 2,
        totalParticipants: 89,
        pointsEarned: 380,
        roundScores: [
          { roundNumber: 1, roundType: 'User Research', score: 92, maxScore: 100, completedDate: new Date('2024-03-07') },
          { roundNumber: 2, roundType: 'Wireframing', score: 88, maxScore: 100, completedDate: new Date('2024-03-12') },
          { roundNumber: 3, roundType: 'Prototype', score: 95, maxScore: 100, completedDate: new Date('2024-03-18') }
        ],
        status: 'completed'
      }
    ],
    joinedDate: new Date('2024-01-10'),
    lastActive: new Date('2024-12-13'),
    categories: ['Design & Creative'],
    skills: ['Figma', 'User Research', 'Prototyping', 'Adobe Creative Suite'],
    rank: 3
  },
  {
    id: 'p4',
    name: 'David Kim',
    email: 'david.kim@email.com',
    profilePhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    role: 'Business Analyst',
    company: 'Strategic Solutions Ltd',
    totalPoints: 2580,
    competitionsParticipated: 9,
    competitionsWon: 2,
    achievements: [mockAchievements[0], mockAchievements[4]],
    competitionHistory: [
      {
        competitionId: '5',
        competitionTitle: 'Business Strategy Challenge',
        category: 'Business & Strategy',
        participatedDate: new Date('2024-04-01'),
        finalRank: 3,
        totalParticipants: 67,
        pointsEarned: 350,
        roundScores: [
          { roundNumber: 1, roundType: 'Case Study', score: 85, maxScore: 100, completedDate: new Date('2024-04-03') },
          { roundNumber: 2, roundType: 'Market Analysis', score: 91, maxScore: 100, completedDate: new Date('2024-04-08') },
          { roundNumber: 3, roundType: 'Strategy Presentation', score: 89, maxScore: 100, completedDate: new Date('2024-04-15') }
        ],
        status: 'completed'
      }
    ],
    joinedDate: new Date('2023-10-20'),
    lastActive: new Date('2024-12-12'),
    categories: ['Business & Strategy'],
    skills: ['Business Analysis', 'Strategic Planning', 'Data Analysis', 'Project Management'],
    rank: 4
  },
  {
    id: 'p5',
    name: 'Lisa Thompson',
    email: 'lisa.thompson@email.com',
    profilePhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    role: 'Sales Manager',
    company: 'SalesForce Elite',
    totalPoints: 2480,
    competitionsParticipated: 7,
    competitionsWon: 3,
    achievements: [mockAchievements[0], mockAchievements[3]],
    competitionHistory: [
      {
        competitionId: '3',
        competitionTitle: 'Sales Excellence Championship',
        category: 'Marketing & Sales',
        participatedDate: new Date('2024-05-10'),
        finalRank: 1,
        totalParticipants: 89,
        pointsEarned: 400,
        roundScores: [
          { roundNumber: 1, roundType: 'Product Knowledge', score: 93, maxScore: 100, completedDate: new Date('2024-05-12') },
          { roundNumber: 2, roundType: 'Role Play', score: 89, maxScore: 100, completedDate: new Date('2024-05-17') },
          { roundNumber: 3, roundType: 'Client Presentation', score: 96, maxScore: 100, completedDate: new Date('2024-05-22') }
        ],
        status: 'completed'
      }
    ],
    joinedDate: new Date('2024-02-01'),
    lastActive: new Date('2024-12-11'),
    categories: ['Marketing & Sales'],
    skills: ['Sales Strategy', 'CRM', 'Negotiation', 'Client Relations'],
    rank: 5
  }
];

// Additional participants for pagination testing
export const extendedLeaderboardData: LeaderboardParticipant[] = [
  ...mockLeaderboardData,
  {
    id: 'p6',
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    profilePhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    role: 'DevOps Engineer',
    company: 'CloudTech Inc',
    totalPoints: 2350,
    competitionsParticipated: 6,
    competitionsWon: 2,
    achievements: [mockAchievements[0]],
    competitionHistory: [],
    joinedDate: new Date('2024-03-15'),
    lastActive: new Date('2024-12-10'),
    categories: ['IT & Technology'],
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
    rank: 6
  },
  {
    id: 'p7',
    name: 'Maria Garcia',
    email: 'maria.garcia@email.com',
    profilePhoto: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
    role: 'Product Manager',
    company: 'Innovation Labs',
    totalPoints: 2280,
    competitionsParticipated: 5,
    competitionsWon: 1,
    achievements: [mockAchievements[0]],
    competitionHistory: [],
    joinedDate: new Date('2024-04-20'),
    lastActive: new Date('2024-12-09'),
    categories: ['Business & Strategy'],
    skills: ['Product Strategy', 'Agile', 'User Stories', 'Roadmapping'],
    rank: 7
  },
  {
    id: 'p8',
    name: 'James Wilson',
    email: 'james.wilson@email.com',
    profilePhoto: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face',
    role: 'Data Scientist',
    company: 'Analytics Pro',
    totalPoints: 2150,
    competitionsParticipated: 4,
    competitionsWon: 1,
    achievements: [mockAchievements[0]],
    competitionHistory: [],
    joinedDate: new Date('2024-05-30'),
    lastActive: new Date('2024-12-08'),
    categories: ['IT & Technology'],
    skills: ['Python', 'Machine Learning', 'SQL', 'Tableau'],
    rank: 8
  }
];