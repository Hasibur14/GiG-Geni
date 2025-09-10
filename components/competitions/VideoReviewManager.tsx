'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  MessageSquare,
  Star,
  Download,
  ExternalLink,
  User,
  Calendar,
  FileVideo,
  ThumbsUp,
  ThumbsDown,
  AlertCircle,
  Filter,
  Search
} from 'lucide-react';

interface VideoSubmission {
  id: string;
  participantId: string;
  participantName: string;
  participantEmail: string;
  videoUrl: string;
  submittedAt: string;
  duration: number; // in seconds
  status: 'pending' | 'approved' | 'rejected' | 'under_review';
  reviewedBy?: string;
  reviewedAt?: string;
  feedback?: string;
  rating?: number; // 1-5 stars
  notes?: string;
}

interface VideoReviewManagerProps {
  competitionId: string;
  submissions: VideoSubmission[];
  onStatusUpdate?: (submissionId: string, status: string, feedback?: string, rating?: number) => void;
}

const mockSubmissions: VideoSubmission[] = [
  {
    id: '1',
    participantId: 'p1',
    participantName: 'John Smith',
    participantEmail: 'john@example.com',
    videoUrl: 'https://drive.google.com/file/d/1example/view',
    submittedAt: '2024-01-20T10:30:00Z',
    duration: 95,
    status: 'pending'
  },
  {
    id: '2',
    participantId: 'p2',
    participantName: 'Sarah Johnson',
    participantEmail: 'sarah@example.com',
    videoUrl: 'https://drive.google.com/file/d/2example/view',
    submittedAt: '2024-01-20T14:15:00Z',
    duration: 110,
    status: 'approved',
    reviewedBy: 'Admin',
    reviewedAt: '2024-01-21T09:00:00Z',
    feedback: 'Excellent presentation and clear communication.',
    rating: 5
  },
  {
    id: '3',
    participantId: 'p3',
    participantName: 'Mike Chen',
    participantEmail: 'mike@example.com',
    videoUrl: 'https://drive.google.com/file/d/3example/view',
    submittedAt: '2024-01-20T16:45:00Z',
    duration: 75,
    status: 'under_review'
  },
  {
    id: '4',
    participantId: 'p4',
    participantName: 'Emily Davis',
    participantEmail: 'emily@example.com',
    videoUrl: 'https://drive.google.com/file/d/4example/view',
    submittedAt: '2024-01-19T11:20:00Z',
    duration: 130,
    status: 'rejected',
    reviewedBy: 'Admin',
    reviewedAt: '2024-01-21T11:30:00Z',
    feedback: 'Video quality was poor and content did not meet requirements.',
    rating: 2
  }
];

export default function VideoReviewManager({ 
  competitionId, 
  submissions = mockSubmissions, 
  onStatusUpdate 
}: VideoReviewManagerProps) {
  const [selectedSubmission, setSelectedSubmission] = useState<VideoSubmission | null>(null);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('review');

  const handleApprove = (submission: VideoSubmission) => {
    onStatusUpdate?.(submission.id, 'approved', feedback, rating);
    setSelectedSubmission(null);
    setFeedback('');
    setRating(0);
    setNotes('');
  };

  const handleReject = (submission: VideoSubmission) => {
    onStatusUpdate?.(submission.id, 'rejected', feedback, rating);
    setSelectedSubmission(null);
    setFeedback('');
    setRating(0);
    setNotes('');
  };

  const handleSetUnderReview = (submission: VideoSubmission) => {
    onStatusUpdate?.(submission.id, 'under_review', notes);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'under_review': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const filteredSubmissions = submissions.filter(submission => {
    const matchesStatus = filterStatus === 'all' || submission.status === filterStatus;
    const matchesSearch = submission.participantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         submission.participantEmail.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const stats = {
    total: submissions.length,
    pending: submissions.filter(s => s.status === 'pending').length,
    approved: submissions.filter(s => s.status === 'approved').length,
    rejected: submissions.filter(s => s.status === 'rejected').length,
    underReview: submissions.filter(s => s.status === 'under_review').length
  };

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Videos</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <FileVideo className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
              </div>
              <ThumbsUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
              </div>
              <ThumbsDown className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Under Review</p>
                <p className="text-2xl font-bold text-blue-600">{stats.underReview}</p>
              </div>
              <Eye className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="review">Video Review</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="review" className="space-y-6">
          {/* Filters and Search */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search participants..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="under_review">Under Review</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Video Submissions List */}
            <Card>
              <CardHeader>
                <CardTitle>Video Submissions ({filteredSubmissions.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                {filteredSubmissions.map((submission) => (
                  <div 
                    key={submission.id} 
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedSubmission?.id === submission.id ? 'border-orange-500 bg-orange-50' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedSubmission(submission)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{submission.participantName}</p>
                          <p className="text-xs text-gray-600">{submission.participantEmail}</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(submission.status)}>
                        {submission.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatDuration(submission.duration)}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(submission.submittedAt).toLocaleDateString()}
                        </span>
                      </div>
                      {submission.rating && (
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-500 mr-1" />
                          <span>{submission.rating}/5</span>
                        </div>
                      )}
                    </div>
                    
                    {submission.feedback && (
                      <p className="text-xs text-gray-600 mt-2 line-clamp-2">{submission.feedback}</p>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Video Player and Review */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {selectedSubmission ? `Review: ${selectedSubmission.participantName}` : 'Select a Video to Review'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedSubmission ? (
                  <div className="space-y-4">
                    {/* Video Player Placeholder */}
                    <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center relative">
                      <div className="text-center text-white">
                        <FileVideo className="h-16 w-16 mx-auto mb-4 opacity-50" />
                        <p className="text-sm mb-2">Video Player</p>
                        <p className="text-xs opacity-75">Duration: {formatDuration(selectedSubmission.duration)}</p>
                      </div>
                      
                      {/* Video Controls */}
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                            <Play className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                            <Volume2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-white hover:bg-white/20"
                            onClick={() => window.open(selectedSubmission.videoUrl, '_blank')}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                            <Maximize className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Participant Info */}
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{selectedSubmission.participantName}</h4>
                        <Badge className={getStatusColor(selectedSubmission.status)}>
                          {selectedSubmission.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{selectedSubmission.participantEmail}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Submitted: {new Date(selectedSubmission.submittedAt).toLocaleString()}
                      </p>
                    </div>
                    
                    {/* Rating */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Rating</label>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setRating(star)}
                            className={`p-1 ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                          >
                            <Star className="h-5 w-5 fill-current" />
                          </button>
                        ))}
                        <span className="ml-2 text-sm text-gray-600">{rating}/5</span>
                      </div>
                    </div>
                    
                    {/* Feedback */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Feedback</label>
                      <Textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Provide detailed feedback for the participant..."
                        rows={4}
                      />
                    </div>
                    
                    {/* Review Notes */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Internal Notes</label>
                      <Textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Internal notes (not visible to participant)..."
                        rows={2}
                      />
                    </div>
                    
                    {/* Action Buttons */}
                    {selectedSubmission.status === 'pending' || selectedSubmission.status === 'under_review' ? (
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => handleSetUnderReview(selectedSubmission)}
                          variant="outline"
                          className="flex-1"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Mark Under Review
                        </Button>
                        <Button
                          onClick={() => handleApprove(selectedSubmission)}
                          className="flex-1 bg-green-500 hover:bg-green-600"
                          disabled={!feedback.trim()}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                        <Button
                          onClick={() => handleReject(selectedSubmission)}
                          variant="destructive"
                          className="flex-1"
                          disabled={!feedback.trim()}
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                      </div>
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center text-sm text-gray-600">
                          <AlertCircle className="h-4 w-4 mr-2" />
                          This video has already been reviewed.
                        </div>
                        {selectedSubmission.reviewedBy && (
                          <p className="text-xs text-gray-500 mt-1">
                            Reviewed by {selectedSubmission.reviewedBy} on {new Date(selectedSubmission.reviewedAt!).toLocaleString()}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileVideo className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">Select a video submission to start reviewing</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Review Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Review Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Completion Rate</span>
                    <span className="text-sm text-gray-600">
                      {Math.round(((stats.approved + stats.rejected) / stats.total) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-orange-500 h-2 rounded-full" 
                      style={{ width: `${((stats.approved + stats.rejected) / stats.total) * 100}%` }}
                    ></div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
                      <div className="text-sm text-gray-600">Approved</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
                      <div className="text-sm text-gray-600">Rejected</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Average Ratings */}
            <Card>
              <CardHeader>
                <CardTitle>Rating Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[5, 4, 3, 2, 1].map((rating) => {
                    const count = submissions.filter(s => s.rating === rating).length;
                    const percentage = submissions.length > 0 ? (count / submissions.length) * 100 : 0;
                    
                    return (
                      <div key={rating} className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1 w-12">
                          <span className="text-sm">{rating}</span>
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        </div>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-yellow-500 h-2 rounded-full" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-8">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}