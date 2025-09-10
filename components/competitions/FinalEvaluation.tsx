'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Trophy,
  Medal,
  Star,
  Award,
  User,
  Edit,
  Save,
  Download,
  Upload,
  CheckCircle,
  XCircle,
  Eye,
  MessageSquare,
  Calendar,
  Clock,
  Target,
  TrendingUp,
  Users,
  Crown,
  Gift,
  FileText,
  Mail,
  Bell,
  Settings,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';

interface Participant {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  round1Score: number;
  round2Status: string;
  round3Rating: number;
  round3Notes: string;
  finalScore?: number;
  finalRank?: number;
  finalComments?: string;
  isWinner?: boolean;
  prizeCategory?: string;
  status: 'pending' | 'evaluated' | 'winner' | 'completed';
  submissionDate: string;
  totalPoints?: number;
}

interface EvaluationCriteria {
  id: string;
  name: string;
  description: string;
  maxPoints: number;
  weight: number;
}

interface FinalEvaluationProps {
  competitionId: string;
  participants: Participant[];
  onEvaluationComplete?: (results: any) => void;
}

const mockParticipants: Participant[] = [
  {
    id: 'p1',
    name: 'John Smith',
    email: 'john@example.com',
    round1Score: 92,
    round2Status: 'approved',
    round3Rating: 4.5,
    round3Notes: 'Excellent technical skills and communication',
    finalScore: 88,
    finalRank: 1,
    isWinner: true,
    prizeCategory: 'First Place',
    status: 'winner',
    submissionDate: '2024-02-20T10:00:00Z',
    totalPoints: 450
  },
  {
    id: 'p2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    round1Score: 89,
    round2Status: 'approved',
    round3Rating: 4.2,
    round3Notes: 'Strong problem-solving abilities',
    finalScore: 85,
    finalRank: 2,
    isWinner: true,
    prizeCategory: 'Second Place',
    status: 'winner',
    submissionDate: '2024-02-20T11:00:00Z',
    totalPoints: 425
  },
  {
    id: 'p3',
    name: 'Mike Chen',
    email: 'mike@example.com',
    round1Score: 87,
    round2Status: 'approved',
    round3Rating: 4.0,
    round3Notes: 'Good technical foundation',
    finalScore: 82,
    finalRank: 3,
    isWinner: true,
    prizeCategory: 'Third Place',
    status: 'winner',
    submissionDate: '2024-02-20T12:00:00Z',
    totalPoints: 410
  },
  {
    id: 'p4',
    name: 'Emily Davis',
    email: 'emily@example.com',
    round1Score: 85,
    round2Status: 'approved',
    round3Rating: 3.8,
    round3Notes: 'Needs improvement in communication',
    status: 'pending',
    submissionDate: '2024-02-20T13:00:00Z'
  }
];

const evaluationCriteria: EvaluationCriteria[] = [
  {
    id: 'technical',
    name: 'Technical Skills',
    description: 'Programming ability, problem-solving, code quality',
    maxPoints: 100,
    weight: 0.4
  },
  {
    id: 'communication',
    name: 'Communication',
    description: 'Clarity, presentation skills, articulation',
    maxPoints: 100,
    weight: 0.25
  },
  {
    id: 'creativity',
    name: 'Creativity & Innovation',
    description: 'Original thinking, innovative solutions',
    maxPoints: 100,
    weight: 0.2
  },
  {
    id: 'teamwork',
    name: 'Teamwork & Collaboration',
    description: 'Ability to work in teams, leadership potential',
    maxPoints: 100,
    weight: 0.15
  }
];

const prizeCategories = [
  { id: 'first', name: 'First Place', prize: '$5,000 + Internship', color: 'text-yellow-600' },
  { id: 'second', name: 'Second Place', prize: '$3,000 + Mentorship', color: 'text-gray-600' },
  { id: 'third', name: 'Third Place', prize: '$1,000 + Certificate', color: 'text-orange-600' },
  { id: 'special', name: 'Special Recognition', prize: 'Certificate + Swag', color: 'text-purple-600' },
  { id: 'participation', name: 'Participation', prize: 'Certificate', color: 'text-blue-600' }
];

export default function FinalEvaluation({ 
  competitionId, 
  participants = mockParticipants, 
  onEvaluationComplete 
}: FinalEvaluationProps) {
  const [evaluatedParticipants, setEvaluatedParticipants] = useState<Participant[]>(participants);
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  const [evaluationScores, setEvaluationScores] = useState<Record<string, number>>({});
  const [finalComments, setFinalComments] = useState('');
  const [activeTab, setActiveTab] = useState('evaluate');
  const [competitionStatus, setCompetitionStatus] = useState<'ongoing' | 'completed'>('ongoing');
  const [bulkEvaluation, setBulkEvaluation] = useState({
    passingScore: 70,
    autoRank: true,
    sendNotifications: true
  });

  const handleScoreChange = (criteriaId: string, score: number) => {
    setEvaluationScores(prev => ({
      ...prev,
      [criteriaId]: Math.max(0, Math.min(100, score))
    }));
  };

  const calculateFinalScore = () => {
    let totalScore = 0;
    let totalWeight = 0;
    
    evaluationCriteria.forEach(criteria => {
      const score = evaluationScores[criteria.id] || 0;
      totalScore += score * criteria.weight;
      totalWeight += criteria.weight;
    });
    
    return totalWeight > 0 ? Math.round(totalScore / totalWeight) : 0;
  };

  const handleSaveEvaluation = () => {
    if (!selectedParticipant) return;
    
    const finalScore = calculateFinalScore();
    const totalPoints = Object.values(evaluationScores).reduce((sum, score) => sum + score, 0);
    
    setEvaluatedParticipants(prev => prev.map(p => 
      p.id === selectedParticipant.id 
        ? {
            ...p,
            finalScore,
            totalPoints,
            finalComments,
            status: 'evaluated' as const
          }
        : p
    ));
    
    // Reset form
    setSelectedParticipant(null);
    setEvaluationScores({});
    setFinalComments('');
  };

  const handleSetWinner = (participantId: string, prizeCategory: string) => {
    setEvaluatedParticipants(prev => prev.map(p => 
      p.id === participantId 
        ? {
            ...p,
            isWinner: true,
            prizeCategory,
            status: 'winner' as const
          }
        : p
    ));
  };

  const handleFinalizeCompetition = () => {
    // Auto-rank participants based on final scores
    const sortedParticipants = [...evaluatedParticipants]
      .filter(p => p.finalScore !== undefined)
      .sort((a, b) => (b.finalScore || 0) - (a.finalScore || 0));
    
    const rankedParticipants = evaluatedParticipants.map(p => {
      const rank = sortedParticipants.findIndex(sp => sp.id === p.id) + 1;
      return rank > 0 ? { ...p, finalRank: rank } : p;
    });
    
    setEvaluatedParticipants(rankedParticipants);
    setCompetitionStatus('completed');
    onEvaluationComplete?.(rankedParticipants);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'winner': return 'bg-green-100 text-green-800';
      case 'evaluated': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2: return <Medal className="h-5 w-5 text-gray-500" />;
      case 3: return <Award className="h-5 w-5 text-orange-500" />;
      default: return <Trophy className="h-5 w-5 text-blue-500" />;
    }
  };

  const pendingCount = evaluatedParticipants.filter(p => p.status === 'pending').length;
  const evaluatedCount = evaluatedParticipants.filter(p => p.status === 'evaluated').length;
  const winnersCount = evaluatedParticipants.filter(p => p.isWinner).length;
  const averageScore = evaluatedParticipants
    .filter(p => p.finalScore !== undefined)
    .reduce((sum, p) => sum + (p.finalScore || 0), 0) / 
    evaluatedParticipants.filter(p => p.finalScore !== undefined).length || 0;

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Evaluated</p>
                <p className="text-2xl font-bold text-blue-600">{evaluatedCount}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Winners</p>
                <p className="text-2xl font-bold text-green-600">{winnersCount}</p>
              </div>
              <Trophy className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Score</p>
                <p className="text-2xl font-bold text-purple-600">{averageScore.toFixed(1)}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="evaluate">Evaluate Participants</TabsTrigger>
          <TabsTrigger value="rankings">Rankings & Winners</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="finalize">Finalize Competition</TabsTrigger>
        </TabsList>

        {/* Evaluate Participants */}
        <TabsContent value="evaluate" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Participant Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Select Participant to Evaluate</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {evaluatedParticipants.map((participant) => (
                  <div 
                    key={participant.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedParticipant?.id === participant.id ? 'border-orange-500 bg-orange-50' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => {
                      setSelectedParticipant(participant);
                      setFinalComments(participant.finalComments || '');
                      // Load existing scores if available
                      const scores: Record<string, number> = {};
                      if (participant.finalScore) {
                        evaluationCriteria.forEach(criteria => {
                          scores[criteria.id] = participant.finalScore || 0;
                        });
                      }
                      setEvaluationScores(scores);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium">{participant.name}</p>
                          <p className="text-sm text-gray-600">{participant.email}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                            <span>R1: {participant.round1Score}%</span>
                            <span>R2: {participant.round2Status}</span>
                            <span>R3: {participant.round3Rating}/5</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(participant.status)}>
                          {participant.status}
                        </Badge>
                        {participant.finalScore && (
                          <p className="text-sm font-medium mt-1">
                            Score: {participant.finalScore}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Evaluation Form */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {selectedParticipant ? `Evaluate: ${selectedParticipant.name}` : 'Select a Participant'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedParticipant ? (
                  <div className="space-y-6">
                    {/* Previous Round Summary */}
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium mb-3">Previous Round Performance</h3>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Round 1 Quiz</p>
                          <p className="font-medium">{selectedParticipant.round1Score}%</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Round 2 Video</p>
                          <p className="font-medium capitalize">{selectedParticipant.round2Status}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Round 3 Interview</p>
                          <p className="font-medium">{selectedParticipant.round3Rating}/5 ⭐</p>
                        </div>
                      </div>
                      {selectedParticipant.round3Notes && (
                        <div className="mt-3">
                          <p className="text-gray-600 text-sm">Interview Notes:</p>
                          <p className="text-sm">{selectedParticipant.round3Notes}</p>
                        </div>
                      )}
                    </div>
                    
                    {/* Evaluation Criteria */}
                    <div className="space-y-4">
                      <h3 className="font-medium">Final Evaluation Criteria</h3>
                      {evaluationCriteria.map((criteria) => (
                        <div key={criteria.id} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">{criteria.name}</p>
                              <p className="text-sm text-gray-600">{criteria.description}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-500">Weight: {(criteria.weight * 100).toFixed(0)}%</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              value={evaluationScores[criteria.id] || ''}
                              onChange={(e) => handleScoreChange(criteria.id, parseInt(e.target.value) || 0)}
                              placeholder="0-100"
                              className="w-20"
                            />
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-orange-500 h-2 rounded-full transition-all"
                                style={{ width: `${(evaluationScores[criteria.id] || 0)}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium w-12">
                              {evaluationScores[criteria.id] || 0}/100
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Final Score Preview */}
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Calculated Final Score:</span>
                        <span className="text-2xl font-bold text-blue-600">
                          {calculateFinalScore()}/100
                        </span>
                      </div>
                    </div>
                    
                    {/* Final Comments */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Final Comments</label>
                      <Textarea
                        value={finalComments}
                        onChange={(e) => setFinalComments(e.target.value)}
                        placeholder="Overall assessment, strengths, areas for improvement..."
                        rows={4}
                      />
                    </div>
                    
                    <Button 
                      onClick={handleSaveEvaluation}
                      className="w-full bg-orange-500 hover:bg-orange-600"
                      disabled={Object.keys(evaluationScores).length === 0}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Evaluation
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Star className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">Select a participant to begin evaluation</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Rankings & Winners */}
        <TabsContent value="rankings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Final Rankings & Winner Selection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {evaluatedParticipants
                  .filter(p => p.finalScore !== undefined)
                  .sort((a, b) => (b.finalScore || 0) - (a.finalScore || 0))
                  .map((participant, index) => (
                    <div key={participant.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            {getRankIcon(index + 1)}
                            <span className="text-lg font-bold">#{index + 1}</span>
                          </div>
                          <div>
                            <p className="font-medium">{participant.name}</p>
                            <p className="text-sm text-gray-600">{participant.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-lg font-bold">{participant.finalScore}/100</p>
                            <Badge className={getStatusColor(participant.status)}>
                              {participant.isWinner ? participant.prizeCategory : participant.status}
                            </Badge>
                          </div>
                          {!participant.isWinner && (
                            <Select onValueChange={(value) => handleSetWinner(participant.id, value)}>
                              <SelectTrigger className="w-48">
                                <SelectValue placeholder="Set as winner" />
                              </SelectTrigger>
                              <SelectContent>
                                {prizeCategories.map(category => (
                                  <SelectItem key={category.id} value={category.name}>
                                    <div>
                                      <p className={`font-medium ${category.color}`}>{category.name}</p>
                                      <p className="text-xs text-gray-500">{category.prize}</p>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        </div>
                      </div>
                      {participant.finalComments && (
                        <div className="mt-3 p-3 bg-gray-50 rounded">
                          <p className="text-sm">{participant.finalComments}</p>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Score Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {evaluationCriteria.map(criteria => {
                    const avgScore = evaluatedParticipants
                      .filter(p => p.finalScore !== undefined)
                      .reduce((sum, p) => sum + (p.finalScore || 0), 0) / 
                      evaluatedParticipants.filter(p => p.finalScore !== undefined).length || 0;
                    
                    return (
                      <div key={criteria.id}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{criteria.name}</span>
                          <span>{avgScore.toFixed(1)}/100</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-orange-500 h-2 rounded-full"
                            style={{ width: `${avgScore}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Competition Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Participants:</span>
                    <span className="font-medium">{evaluatedParticipants.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Completed Evaluations:</span>
                    <span className="font-medium">{evaluatedCount + winnersCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Final Score:</span>
                    <span className="font-medium">{averageScore.toFixed(1)}/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Winners Selected:</span>
                    <span className="font-medium">{winnersCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Competition Status:</span>
                    <Badge className={competitionStatus === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                      {competitionStatus}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Finalize Competition */}
        <TabsContent value="finalize" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Finalize Competition</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h3 className="font-medium text-yellow-900 mb-2">⚠️ Important Notice</h3>
                <p className="text-sm text-yellow-700">
                  Once you finalize the competition, rankings will be locked and participants will be notified of the results. This action cannot be undone.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Pre-Finalization Checklist</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className={`h-5 w-5 ${pendingCount === 0 ? 'text-green-500' : 'text-gray-400'}`} />
                    <span className={pendingCount === 0 ? 'text-green-700' : 'text-gray-600'}>
                      All participants evaluated ({evaluatedCount + winnersCount}/{evaluatedParticipants.length})
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className={`h-5 w-5 ${winnersCount > 0 ? 'text-green-500' : 'text-gray-400'}`} />
                    <span className={winnersCount > 0 ? 'text-green-700' : 'text-gray-600'}>
                      Winners selected ({winnersCount})
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-green-700">Final rankings calculated</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Finalization Options</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Auto-rank by final scores</span>
                    <input
                      type="checkbox"
                      checked={bulkEvaluation.autoRank}
                      onChange={(e) => setBulkEvaluation(prev => ({ ...prev, autoRank: e.target.checked }))}
                      className="h-4 w-4 text-orange-500"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Send result notifications</span>
                    <input
                      type="checkbox"
                      checked={bulkEvaluation.sendNotifications}
                      onChange={(e) => setBulkEvaluation(prev => ({ ...prev, sendNotifications: e.target.checked }))}
                      className="h-4 w-4 text-orange-500"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <Button 
                  onClick={handleFinalizeCompetition}
                  className="flex-1 bg-green-500 hover:bg-green-600"
                  disabled={pendingCount > 0 || competitionStatus === 'completed'}
                >
                  <Trophy className="h-4 w-4 mr-2" />
                  {competitionStatus === 'completed' ? 'Competition Completed' : 'Finalize Competition'}
                </Button>
                <Button variant="outline" className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Export Results
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}