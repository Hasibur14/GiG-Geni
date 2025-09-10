'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import QuizManager from '@/components/competitions/QuizManager';
import VideoReviewManager from '@/components/competitions/VideoReviewManager';
import ZoomScheduler from '@/components/competitions/ZoomScheduler';
import FinalEvaluation from '@/components/competitions/FinalEvaluation';
import ParticipantTracker from '@/components/competitions/ParticipantTracker';
import NotificationSystem from '@/components/competitions/NotificationSystem';
import {
  ArrowLeft,
  Users,
  Trophy,
  Clock,
  CheckCircle,
  XCircle,
  Play,
  Pause,
  Settings,
  FileText,
  Video,
  Calendar,
  Award,
  Eye,
  Edit,
  Send,
  Download,
  Upload,
  Plus,
  Trash2,
  AlertCircle,
  Star,
  MessageSquare,
  Link as LinkIcon,
  ExternalLink
} from 'lucide-react';
import { mockCompetitions } from '@/lib/mock-data';
import { Competition } from '@/lib/interface';
import Link from 'next/link';

// Mock data for participants and their progress
const mockParticipants = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    avatar: '/avatars/john.jpg',
    round1Score: 92,
    round1Status: 'passed',
    round2VideoUrl: 'https://drive.google.com/file/d/example1',
    round2Status: 'pending',
    round3ScheduledTime: null,
    round3Status: 'not_started',
    round4Score: null,
    round4Status: 'not_started',
    finalRank: null,
    joinedDate: '2024-01-15'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    avatar: '/avatars/sarah.jpg',
    round1Score: 88,
    round1Status: 'passed',
    round2VideoUrl: 'https://drive.google.com/file/d/example2',
    round2Status: 'approved',
    round3ScheduledTime: '2024-02-20T10:00:00Z',
    round3Status: 'scheduled',
    round4Score: null,
    round4Status: 'not_started',
    finalRank: null,
    joinedDate: '2024-01-16'
  },
  {
    id: '3',
    name: 'Mike Chen',
    email: 'mike@example.com',
    avatar: '/avatars/mike.jpg',
    round1Score: 78,
    round1Status: 'failed',
    round2VideoUrl: null,
    round2Status: 'not_started',
    round3ScheduledTime: null,
    round3Status: 'not_started',
    round4Score: null,
    round4Status: 'not_started',
    finalRank: null,
    joinedDate: '2024-01-17'
  }
];

const mockQuestions = [
  {
    id: '1',
    question: 'What is the primary purpose of React hooks?',
    options: ['State management', 'Component styling', 'API calls', 'All of the above'],
    correctAnswer: 0,
    points: 10
  },
  {
    id: '2',
    question: 'Which of the following is NOT a valid HTTP method?',
    options: ['GET', 'POST', 'FETCH', 'DELETE'],
    correctAnswer: 2,
    points: 10
  }
];

export default function CompetitionManagePage() {
  const params = useParams();
  const router = useRouter();
  const [competition, setCompetition] = useState<Competition | null>(null);
  const [participants, setParticipants] = useState(mockParticipants);
  const [questions, setQuestions] = useState(mockQuestions);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [newQuestion, setNewQuestion] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    points: 10
  });
  const [zoomLink, setZoomLink] = useState('');
  const [selectedParticipant, setSelectedParticipant] = useState<string | null>(null);

  useEffect(() => {
    const competitionId = params.id as string;
    const foundCompetition = mockCompetitions.find(comp => comp.id === competitionId);
    
    if (foundCompetition) {
      setCompetition(foundCompetition);
    }
    setLoading(false);
  }, [params.id]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed':
      case 'approved':
      case 'completed': return 'bg-green-100 text-green-800';
      case 'failed':
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleApproveVideo = (participantId: string) => {
    setParticipants(prev => prev.map(p => 
      p.id === participantId 
        ? { ...p, round2Status: 'approved', round3Status: 'ready' }
        : p
    ));
  };

  const handleRejectVideo = (participantId: string) => {
    setParticipants(prev => prev.map(p => 
      p.id === participantId 
        ? { ...p, round2Status: 'rejected' }
        : p
    ));
  };

  const handleScheduleInterview = (participantId: string, dateTime: string) => {
    setParticipants((prev:any )=> prev.map((p:any)=> 
      p.id === participantId 
        ? { ...p, round3ScheduledTime: dateTime, round3Status: 'scheduled' }
        : p
    ));
  };

  const handleAssignFinalScore = (participantId: string, score: number, rank: number) => {
    setParticipants((prev:any) => prev.map((p:any)     => 
      p.id === participantId 
        ? { ...p, round4Score: score, round4Status: 'completed', finalRank: rank }
        : p
    ));
  };

  const addQuestion = () => {
    if (newQuestion.question.trim() && newQuestion.options.every(opt => opt.trim())) {
      setQuestions(prev => [...prev, {
        id: Date.now().toString(),
        ...newQuestion
      }]);
      setNewQuestion({
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        points: 10
      });
    }
  };

  const removeQuestion = (questionId: string) => {
    setQuestions(prev => prev.filter(q => q.id !== questionId));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading competition management...</p>
        </div>
      </div>
    );
  }

  if (!competition) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Competition Not Found</h2>
          <p className="text-gray-600 mb-6">The competition you're trying to manage doesn't exist.</p>
          <Link href="/competitions/manage">
            <Button className="bg-orange-500 hover:bg-orange-600">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Manage Competitions
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const stats = {
    totalParticipants: participants.length,
    round1Passed: participants.filter(p => p.round1Status === 'passed').length,
    round2Pending: participants.filter(p => p.round2Status === 'pending').length,
    round3Scheduled: participants.filter(p => p.round3Status === 'scheduled').length,
    completed: participants.filter(p => p.round4Status === 'completed').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full py-8 container">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/competitions/manage">
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Manage
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Manage: {competition.title}
              </h1>
              <p className="text-gray-600">Control all aspects of your competition journey</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button asChild variant="outline">
              <Link href={`/competitions/${competition.id}`}>
                <Eye className="h-4 w-4 mr-2" />
                View Public Page
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={`/competitions/${competition.id}/journey`}>
                <Trophy className="h-4 w-4 mr-2" />
                View Journey
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Participants</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalParticipants}</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Round 1 Passed</p>
                  <p className="text-2xl font-bold text-green-600">{stats.round1Passed}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Videos Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.round2Pending}</p>
                </div>
                <Video className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Interviews Scheduled</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.round3Scheduled}</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.completed}</p>
                </div>
                <Award className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="round1">Round 1: Quiz</TabsTrigger>
            <TabsTrigger value="round2">Round 2: Videos</TabsTrigger>
            <TabsTrigger value="round3">Round 3: Interviews</TabsTrigger>
            <TabsTrigger value="round4">Round 4: Final</TabsTrigger>
            <TabsTrigger value="participants">Participants</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Participant Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {participants.map((participant) => (
                    <div key={participant.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium">{participant.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-medium">{participant.name}</p>
                          <p className="text-sm text-gray-600">{participant.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(participant.round1Status)}>R1: {participant.round1Status}</Badge>
                        <Badge className={getStatusColor(participant.round2Status)}>R2: {participant.round2Status}</Badge>
                        <Badge className={getStatusColor(participant.round3Status)}>R3: {participant.round3Status}</Badge>
                        <Badge className={getStatusColor(participant.round4Status)}>R4: {participant.round4Status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Round 1: Quiz Management */}
          <TabsContent value="round1" className="space-y-6">
            <QuizManager
              competitionId={params.id as string}
              onQuestionsUpdate={(updatedQuestions) => {
                // Convert QuizManager Question type to manage page question type
                const convertedQuestions = updatedQuestions.map(q => ({
                  id: q.id,
                  question: q.question,
                  options: q.options || [],
                  correctAnswer: typeof q.correctAnswer === 'number' ? q.correctAnswer : 0,
                  points: q.points
                }));
                setQuestions(convertedQuestions);
              }}
            />
          </TabsContent>

          {/* Round 2: Video Review */}
          <TabsContent value="round2" className="space-y-6">
            <VideoReviewManager
              competitionId={params.id as string}
              submissions={[]}
              onStatusUpdate={(submissionId, status, feedback, rating) => {
                console.log('Video review updated:', { submissionId, status, feedback, rating });
              }}
            />
          </TabsContent>

          {/* Round 3: Interview Scheduling */}
          <TabsContent value="round3" className="space-y-6">
            <ZoomScheduler
              competitionId={params.id as string}
              participants={[]}
              onScheduleUpdate={(participantId, meetingData) => {
                console.log('Schedule updated:', { participantId, meetingData });
              }}
            />
          </TabsContent>

          {/* Round 4: Final Evaluation */}
          <TabsContent value="round4" className="space-y-6">
            <FinalEvaluation
              competitionId={params.id as string}
              participants={[]}
              onEvaluationComplete={(results) => {
                console.log('Evaluation completed:', results);
              }}
            />
          </TabsContent>

          {/* Participants Tab */}
          <TabsContent value="participants" className="space-y-6">
            <ParticipantTracker 
              competitionId={params.id as string}
              participants={[]}
              onParticipantUpdate={(participantId, updates) => {
                console.log('Participant updated:', { participantId, updates });
              }}
            />
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <NotificationSystem 
              competitionId={params.id as string}
              participants={[]}
              onSendNotification={(notification) => {
                console.log('Notification sent:', notification);
              }}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}