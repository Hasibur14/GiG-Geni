'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  CheckCircle,
  Clock,
  Play,
  Upload,
  Video,
  Calendar,
  Trophy,
  FileText,
  AlertCircle,
  Star,
  Users,
  Target,
  Award,
  Zap,
  Camera,
  MessageSquare,
  Download
} from 'lucide-react';

interface Round {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'locked' | 'upcoming';
  type: 'quiz' | 'video' | 'interview' | 'evaluation';
  requirements?: string[];
  deadline?: string;
  score?: number;
  maxScore?: number;
  passThreshold?: number;
  submissionUrl?: string;
  interviewDate?: string;
  feedback?: string;
}

interface CompetitionJourneyProps {
  competitionId: string;
  competitionTitle: string;
  currentRound: number;
  totalRounds: number;
}

const mockRounds: Round[] = [
  {
    id: 1,
    title: 'Screening Quiz',
    description: 'Complete the technical assessment to demonstrate your foundational knowledge.',
    status: 'completed',
    type: 'quiz',
    requirements: [
      'Complete all 25 questions',
      'Achieve minimum 85% score',
      'Time limit: 45 minutes'
    ],
    deadline: '2024-02-10',
    score: 92,
    maxScore: 100,
    passThreshold: 85,
    feedback: 'Excellent performance! You demonstrated strong technical knowledge.'
  },
  {
    id: 2,
    title: 'Video Pitch',
    description: 'Record a video presentation showcasing your approach and solution.',
    status: 'current',
    type: 'video',
    requirements: [
      'Video duration: 3-5 minutes',
      'Upload to Google Drive',
      'Include project walkthrough',
      'Explain your technical decisions'
    ],
    deadline: '2024-02-20'
  },
  {
    id: 3,
    title: 'Live Interview',
    description: 'Participate in a live technical interview with our panel.',
    status: 'locked',
    type: 'interview',
    requirements: [
      'Schedule via Zoom link',
      'Prepare for technical questions',
      'Demo your project live',
      'Duration: 30-45 minutes'
    ],
    deadline: '2024-02-25'
  },
  {
    id: 4,
    title: 'Final Evaluation',
    description: 'Final assessment and winner selection by the judging panel.',
    status: 'locked',
    type: 'evaluation',
    requirements: [
      'All previous rounds completed',
      'Final project submission',
      'Peer review participation',
      'Results announcement'
    ],
    deadline: '2024-03-01'
  }
];

const getRoundIcon = (type: string, status: string) => {
  const iconClass = status === 'completed' ? 'text-green-600' : 
                   status === 'current' ? 'text-orange-500' : 'text-gray-400';
  
  switch (type) {
    case 'quiz': return <FileText className={`h-6 w-6 ${iconClass}`} />;
    case 'video': return <Video className={`h-6 w-6 ${iconClass}`} />;
    case 'interview': return <MessageSquare className={`h-6 w-6 ${iconClass}`} />;
    case 'evaluation': return <Trophy className={`h-6 w-6 ${iconClass}`} />;
    default: return <Target className={`h-6 w-6 ${iconClass}`} />;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'completed':
      return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
    case 'current':
      return <Badge className="bg-orange-100 text-orange-800">Current</Badge>;
    case 'locked':
      return <Badge className="bg-gray-100 text-gray-600">Locked</Badge>;
    case 'upcoming':
      return <Badge className="bg-blue-100 text-blue-800">Upcoming</Badge>;
    default:
      return <Badge variant="secondary">Unknown</Badge>;
  }
};

export default function CompetitionJourney({ 
  competitionId, 
  competitionTitle, 
  currentRound = 2, 
  totalRounds = 4 
}: CompetitionJourneyProps) {
  const [selectedRound, setSelectedRound] = useState(currentRound);
  const [videoUrl, setVideoUrl] = useState('');
  const [videoDescription, setVideoDescription] = useState('');

  const currentRoundData = mockRounds.find(round => round.id === selectedRound);
  const progressPercentage = ((currentRound - 1) / totalRounds) * 100;

  const handleVideoSubmission = () => {
    // Handle video submission logic
    console.log('Submitting video:', { videoUrl, videoDescription });
  };

  const scheduleInterview = () => {
    // Handle interview scheduling logic
    console.log('Scheduling interview for round 3');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Competition Journey
        </h1>
        <p className="text-gray-600 mb-4">{competitionTitle}</p>
        
        {/* Overall Progress */}
        <div className="max-w-md mx-auto">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Round {currentRound} of {totalRounds}</span>
            <span>{Math.round(progressPercentage)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-orange-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Competition Timeline</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" />
            
            <div className="space-y-6">
              {mockRounds.map((round, index) => (
                <motion.div
                  key={round.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex items-start space-x-4 cursor-pointer p-4 rounded-lg transition-colors ${
                    selectedRound === round.id ? 'bg-orange-50 border border-orange-200' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedRound(round.id)}
                >
                  {/* Timeline Dot */}
                  <div className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-4 ${
                    round.status === 'completed' ? 'bg-green-100 border-green-500' :
                    round.status === 'current' ? 'bg-orange-100 border-orange-500' :
                    'bg-gray-100 border-gray-300'
                  }`}>
                    {round.status === 'completed' ? (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    ) : (
                      getRoundIcon(round.type, round.status)
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Round {round.id}: {round.title}
                      </h3>
                      {getStatusBadge(round.status)}
                    </div>
                    <p className="text-gray-600 mb-3">{round.description}</p>
                    
                    {round.deadline && (
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        Deadline: {new Date(round.deadline).toLocaleDateString()}
                      </div>
                    )}
                    
                    {round.score !== undefined && (
                      <div className="flex items-center text-sm text-green-600 mt-2">
                        <Star className="h-4 w-4 mr-1" />
                        Score: {round.score}/{round.maxScore} ({round.passThreshold}% required)
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Round Details */}
      {currentRoundData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {getRoundIcon(currentRoundData.type, currentRoundData.status)}
              <span>Round {currentRoundData.id}: {currentRoundData.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="requirements">Requirements</TabsTrigger>
                <TabsTrigger value="submission">Submission</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-6">
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    {currentRoundData.description}
                  </p>
                  
                  {currentRoundData.feedback && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">Feedback</h4>
                      <p className="text-green-700">{currentRoundData.feedback}</p>
                    </div>
                  )}
                  
                  {currentRoundData.deadline && (
                    <div className="flex items-center p-4 bg-orange-50 border border-orange-200 rounded-lg">
                      <Clock className="h-5 w-5 text-orange-600 mr-3" />
                      <div>
                        <p className="font-semibold text-orange-800">Deadline</p>
                        <p className="text-orange-700">
                          {new Date(currentRoundData.deadline).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="requirements" className="mt-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 mb-4">Requirements</h4>
                  {currentRoundData.requirements?.map((requirement, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <span className="text-gray-700">{requirement}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="submission" className="mt-6">
                {currentRoundData.type === 'quiz' && currentRoundData.status === 'completed' && (
                  <div className="text-center p-8">
                    <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Quiz Completed!</h3>
                    <p className="text-gray-600 mb-4">You scored {currentRoundData.score}/{currentRoundData.maxScore}</p>
                    <Badge className="bg-green-100 text-green-800">Passed</Badge>
                  </div>
                )}
                
                {currentRoundData.type === 'video' && currentRoundData.status === 'current' && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">Submit Your Video Pitch</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Google Drive Video URL
                          </label>
                          <Input
                            placeholder="https://drive.google.com/file/d/..."
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Video Description
                          </label>
                          <Textarea
                            placeholder="Describe your approach and key highlights..."
                            value={videoDescription}
                            onChange={(e) => setVideoDescription(e.target.value)}
                            rows={4}
                          />
                        </div>
                        <Button onClick={handleVideoSubmission} className="w-full">
                          <Upload className="h-4 w-4 mr-2" />
                          Submit Video Pitch
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
                
                {currentRoundData.type === 'interview' && currentRoundData.status === 'locked' && (
                  <div className="text-center p-8">
                    <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Interview Round</h3>
                    <p className="text-gray-600 mb-6">Complete the video pitch round to unlock interview scheduling.</p>
                    <Button disabled variant="outline">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Interview
                    </Button>
                  </div>
                )}
                
                {currentRoundData.type === 'evaluation' && currentRoundData.status === 'locked' && (
                  <div className="text-center p-8">
                    <Trophy className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Final Evaluation</h3>
                    <p className="text-gray-600 mb-6">Complete all previous rounds to reach the final evaluation.</p>
                    <Badge variant="secondary">Awaiting Previous Rounds</Badge>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}