'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  User,
  Search,
  Filter,
  Download,
  Upload,
  Eye,
  Edit,
  Mail,
  Phone,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Star,
  Trophy,
  Video,
  FileText,
  Users,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  ArrowRight,
  ArrowLeft,
  MoreHorizontal,
  RefreshCw,
  Bell,
  MessageSquare,
  Target,
  Award,
  Zap
} from 'lucide-react';

interface Participant {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  registrationDate: string;
  lastActivity: string;
  currentRound: number;
  overallStatus: 'active' | 'eliminated' | 'completed' | 'winner';
  
  // Round 1 - Quiz
  round1Status: 'not_started' | 'in_progress' | 'completed' | 'passed' | 'failed';
  round1Score?: number;
  round1CompletedAt?: string;
  round1Attempts?: number;
  
  // Round 2 - Video
  round2Status: 'locked' | 'available' | 'submitted' | 'under_review' | 'approved' | 'rejected';
  round2VideoUrl?: string;
  round2SubmittedAt?: string;
  round2ReviewedAt?: string;
  round2Feedback?: string;
  
  // Round 3 - Interview
  round3Status: 'locked' | 'available' | 'scheduled' | 'completed' | 'passed' | 'failed' | 'no_show';
  round3ScheduledTime?: string;
  round3CompletedAt?: string;
  round3Rating?: number;
  round3Notes?: string;
  
  // Round 4 - Final
  round4Status: 'locked' | 'available' | 'in_progress' | 'completed';
  round4Score?: number;
  round4Rank?: number;
  round4CompletedAt?: string;
  round4Comments?: string;
  
  // Analytics
  totalTimeSpent?: number;
  engagementScore?: number;
  progressPercentage?: number;
}

interface ParticipantTrackerProps {
  competitionId: string;
  participants: Participant[];
  onParticipantUpdate?: (participantId: string, updates: Partial<Participant>) => void;
}

const mockParticipants: Participant[] = [
  {
    id: 'p1',
    name: 'John Smith',
    email: 'john@example.com',
    phone: '+1-555-0123',
    registrationDate: '2024-02-01T10:00:00Z',
    lastActivity: '2024-02-20T15:30:00Z',
    currentRound: 4,
    overallStatus: 'winner',
    round1Status: 'passed',
    round1Score: 92,
    round1CompletedAt: '2024-02-05T14:00:00Z',
    round1Attempts: 1,
    round2Status: 'approved',
    round2VideoUrl: 'https://drive.google.com/file/d/abc123',
    round2SubmittedAt: '2024-02-10T16:00:00Z',
    round2ReviewedAt: '2024-02-12T10:00:00Z',
    round3Status: 'completed',
    round3ScheduledTime: '2024-02-15T14:00:00Z',
    round3CompletedAt: '2024-02-15T15:00:00Z',
    round3Rating: 4.5,
    round3Notes: 'Excellent technical skills',
    round4Status: 'completed',
    round4Score: 88,
    round4Rank: 1,
    round4CompletedAt: '2024-02-20T12:00:00Z',
    totalTimeSpent: 480,
    engagementScore: 95,
    progressPercentage: 100
  },
  {
    id: 'p2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    registrationDate: '2024-02-01T11:00:00Z',
    lastActivity: '2024-02-18T09:15:00Z',
    currentRound: 3,
    overallStatus: 'active',
    round1Status: 'passed',
    round1Score: 89,
    round1CompletedAt: '2024-02-06T10:00:00Z',
    round1Attempts: 2,
    round2Status: 'approved',
    round2VideoUrl: 'https://drive.google.com/file/d/def456',
    round2SubmittedAt: '2024-02-11T14:00:00Z',
    round2ReviewedAt: '2024-02-13T11:00:00Z',
    round3Status: 'scheduled',
    round3ScheduledTime: '2024-02-25T10:00:00Z',
    round4Status: 'locked',
    totalTimeSpent: 320,
    engagementScore: 87,
    progressPercentage: 75
  },
  {
    id: 'p3',
    name: 'Mike Chen',
    email: 'mike@example.com',
    registrationDate: '2024-02-02T09:00:00Z',
    lastActivity: '2024-02-14T16:45:00Z',
    currentRound: 2,
    overallStatus: 'eliminated',
    round1Status: 'passed',
    round1Score: 87,
    round1CompletedAt: '2024-02-07T13:00:00Z',
    round1Attempts: 1,
    round2Status: 'rejected',
    round2VideoUrl: 'https://drive.google.com/file/d/ghi789',
    round2SubmittedAt: '2024-02-12T11:00:00Z',
    round2ReviewedAt: '2024-02-14T16:00:00Z',
    round2Feedback: 'Video quality needs improvement',
    round3Status: 'locked',
    round4Status: 'locked',
    totalTimeSpent: 180,
    engagementScore: 65,
    progressPercentage: 50
  },
  {
    id: 'p4',
    name: 'Emily Davis',
    email: 'emily@example.com',
    registrationDate: '2024-02-02T14:00:00Z',
    lastActivity: '2024-02-08T12:30:00Z',
    currentRound: 1,
    overallStatus: 'eliminated',
    round1Status: 'failed',
    round1Score: 72,
    round1CompletedAt: '2024-02-08T12:00:00Z',
    round1Attempts: 3,
    round2Status: 'locked',
    round3Status: 'locked',
    round4Status: 'locked',
    totalTimeSpent: 120,
    engagementScore: 45,
    progressPercentage: 25
  }
];

const roundNames = {
  1: 'Screening Quiz',
  2: 'Video Pitch',
  3: 'Live Interview',
  4: 'Final Evaluation'
};

const statusColors = {
  // Overall status
  active: 'bg-blue-100 text-blue-800',
  eliminated: 'bg-red-100 text-red-800',
  completed: 'bg-green-100 text-green-800',
  winner: 'bg-yellow-100 text-yellow-800',
  
  // Round status
  not_started: 'bg-gray-100 text-gray-800',
  locked: 'bg-gray-100 text-gray-800',
  available: 'bg-blue-100 text-blue-800',
  in_progress: 'bg-yellow-100 text-yellow-800',
  submitted: 'bg-purple-100 text-purple-800',
  under_review: 'bg-orange-100 text-orange-800',
  scheduled: 'bg-indigo-100 text-indigo-800',
  passed: 'bg-green-100 text-green-800',
  failed: 'bg-red-100 text-red-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  no_show: 'bg-gray-100 text-gray-800'
};

export default function ParticipantTracker({ 
  competitionId, 
  participants = mockParticipants, 
  onParticipantUpdate 
}: ParticipantTrackerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roundFilter, setRoundFilter] = useState('all');
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'timeline'>('list');
  const [sortBy, setSortBy] = useState<'name' | 'progress' | 'score' | 'activity'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredParticipants = participants
    .filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           p.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || p.overallStatus === statusFilter;
      const matchesRound = roundFilter === 'all' || p.currentRound.toString() === roundFilter;
      return matchesSearch && matchesStatus && matchesRound;
    })
    .sort((a, b) => {
      let aValue, bValue;
      switch (sortBy) {
        case 'progress':
          aValue = a.progressPercentage || 0;
          bValue = b.progressPercentage || 0;
          break;
        case 'score':
          aValue = a.round4Score || a.round3Rating || a.round1Score || 0;
          bValue = b.round4Score || b.round3Rating || b.round1Score || 0;
          break;
        case 'activity':
          aValue = new Date(a.lastActivity).getTime();
          bValue = new Date(b.lastActivity).getTime();
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

  const getProgressSteps = (participant: Participant) => {
    const steps = [
      {
        round: 1,
        name: 'Quiz',
        status: participant.round1Status,
        score: participant.round1Score,
        completed: participant.round1CompletedAt
      },
      {
        round: 2,
        name: 'Video',
        status: participant.round2Status,
        completed: participant.round2SubmittedAt
      },
      {
        round: 3,
        name: 'Interview',
        status: participant.round3Status,
        score: participant.round3Rating,
        completed: participant.round3CompletedAt
      },
      {
        round: 4,
        name: 'Final',
        status: participant.round4Status,
        score: participant.round4Score,
        completed: participant.round4CompletedAt
      }
    ];
    return steps;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
      case 'passed':
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'in_progress':
      case 'under_review':
      case 'scheduled':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'locked':
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
      default:
        return <Clock className="h-4 w-4 text-blue-500" />;
    }
  };

  const activeCount = participants.filter(p => p.overallStatus === 'active').length;
  const eliminatedCount = participants.filter(p => p.overallStatus === 'eliminated').length;
  const completedCount = participants.filter(p => p.overallStatus === 'completed').length;
  const winnersCount = participants.filter(p => p.overallStatus === 'winner').length;
  const averageProgress = participants.reduce((sum, p) => sum + (p.progressPercentage || 0), 0) / participants.length;

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{participants.length}</p>
              </div>
              <Users className="h-8 w-8 text-gray-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-blue-600">{activeCount}</p>
              </div>
              <Activity className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Eliminated</p>
                <p className="text-2xl font-bold text-red-600">{eliminatedCount}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Winners</p>
                <p className="text-2xl font-bold text-yellow-600">{winnersCount}</p>
              </div>
              <Trophy className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Progress</p>
                <p className="text-2xl font-bold text-purple-600">{averageProgress.toFixed(0)}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search participants..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="eliminated">Eliminated</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="winner">Winners</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={roundFilter} onValueChange={setRoundFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Round" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Rounds</SelectItem>
                <SelectItem value="1">Round 1</SelectItem>
                <SelectItem value="2">Round 2</SelectItem>
                <SelectItem value="3">Round 3</SelectItem>
                <SelectItem value="4">Round 4</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="progress">Progress</SelectItem>
                <SelectItem value="score">Score</SelectItem>
                <SelectItem value="activity">Last Activity</SelectItem>
              </SelectContent>
            </Select>
            
            <Button
              variant="outline"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </Button>
            
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Participants List */}
      <Card>
        <CardHeader>
          <CardTitle>Participant Progress Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredParticipants.map((participant) => {
              const steps = getProgressSteps(participant);
              return (
                <div key={participant.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{participant.name}</h3>
                        <p className="text-sm text-gray-600">{participant.email}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                          <span>Registered: {new Date(participant.registrationDate).toLocaleDateString()}</span>
                          <span>Last Active: {new Date(participant.lastActivity).toLocaleDateString()}</span>
                          {participant.totalTimeSpent && (
                            <span>Time Spent: {Math.floor(participant.totalTimeSpent / 60)}h {participant.totalTimeSpent % 60}m</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={statusColors[participant.overallStatus] || statusColors.active}>
                        {participant.overallStatus}
                      </Badge>
                      <p className="text-sm font-medium mt-1">
                        Progress: {participant.progressPercentage || 0}%
                      </p>
                      {participant.engagementScore && (
                        <p className="text-xs text-gray-500">
                          Engagement: {participant.engagementScore}/100
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {/* Progress Timeline */}
                  <div className="flex items-center space-x-2 mb-4">
                    {steps.map((step, index) => (
                      <div key={step.round} className="flex items-center">
                        <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg border ${
                          step.status === 'completed' || step.status === 'passed' || step.status === 'approved'
                            ? 'bg-green-50 border-green-200'
                            : step.status === 'failed' || step.status === 'rejected'
                            ? 'bg-red-50 border-red-200'
                            : step.status === 'in_progress' || step.status === 'under_review' || step.status === 'scheduled'
                            ? 'bg-yellow-50 border-yellow-200'
                            : 'bg-gray-50 border-gray-200'
                        }`}>
                          {getStatusIcon(step.status)}
                          <div className="text-center">
                            <p className="text-xs font-medium">{step.name}</p>
                            <Badge className={`text-xs ${statusColors[step.status] || statusColors.not_started}`}>
                              {step.status.replace('_', ' ')}
                            </Badge>
                            {step.score && (
                              <p className="text-xs text-gray-600 mt-1">
                                {step.round === 3 ? `${step.score}/5` : `${step.score}%`}
                              </p>
                            )}
                          </div>
                        </div>
                        {index < steps.length - 1 && (
                          <ArrowRight className="h-4 w-4 text-gray-400 mx-2" />
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Overall Progress</span>
                      <span>{participant.progressPercentage || 0}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-orange-500 h-2 rounded-full transition-all"
                        style={{ width: `${participant.progressPercentage || 0}%` }}
                      />
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedParticipant(participant)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        <Mail className="h-4 w-4 mr-1" />
                        Contact
                      </Button>
                      <Button size="sm" variant="outline">
                        <Bell className="h-4 w-4 mr-1" />
                        Notify
                      </Button>
                    </div>
                    <div className="text-sm text-gray-500">
                      Current Round: {participant.currentRound} - {roundNames[participant.currentRound as keyof typeof roundNames]}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Participant Detail Modal */}
      {selectedParticipant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Participant Details: {selectedParticipant.name}</h2>
              <Button
                variant="ghost"
                onClick={() => setSelectedParticipant(null)}
              >
                ×
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Name</label>
                    <p>{selectedParticipant.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Email</label>
                    <p>{selectedParticipant.email}</p>
                  </div>
                  {selectedParticipant.phone && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">Phone</label>
                      <p>{selectedParticipant.phone}</p>
                    </div>
                  )}
                  <div>
                    <label className="text-sm font-medium text-gray-600">Registration Date</label>
                    <p>{new Date(selectedParticipant.registrationDate).toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Last Activity</label>
                    <p>{new Date(selectedParticipant.lastActivity).toLocaleString()}</p>
                  </div>
                </CardContent>
              </Card>
              
              {/* Round Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Round Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {getProgressSteps(selectedParticipant).map((step) => (
                    <div key={step.round} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Round {step.round}: {step.name}</h4>
                        <Badge className={statusColors[step.status] || statusColors.not_started}>
                          {step.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      {step.score && (
                        <p className="text-sm text-gray-600">
                          Score: {step.round === 3 ? `${step.score}/5 stars` : `${step.score}%`}
                        </p>
                      )}
                      {step.completed && (
                        <p className="text-sm text-gray-600">
                          Completed: {new Date(step.completed).toLocaleString()}
                        </p>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}