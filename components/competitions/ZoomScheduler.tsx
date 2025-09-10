'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Calendar,
  Clock,
  Video,
  Send,
  Copy,
  ExternalLink,
  User,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
  Edit,
  Trash2,
  Bell,
  Users,
  Link as LinkIcon,
  Download,
  Upload,
  Settings,
  Zap
} from 'lucide-react';

interface Participant {
  id: string;
  name: string;
  email: string;
  phone?: string;
  timezone: string;
  round2Status: string;
  interviewStatus: 'not_scheduled' | 'scheduled' | 'completed' | 'no_show' | 'rescheduled';
  scheduledTime?: string;
  zoomLink?: string;
  interviewNotes?: string;
  interviewRating?: number;
  interviewerId?: string;
}

interface ZoomMeeting {
  id: string;
  title: string;
  meetingId: string;
  passcode: string;
  joinUrl: string;
  startUrl: string;
  scheduledTime: string;
  duration: number;
  participantIds: string[];
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  recordingUrl?: string;
}

interface ZoomSchedulerProps {
  competitionId: string;
  participants: Participant[];
  onScheduleUpdate?: (participantId: string, meetingData: any) => void;
}

const mockParticipants: Participant[] = [
  {
    id: 'p1',
    name: 'John Smith',
    email: 'john@example.com',
    phone: '+1-555-0123',
    timezone: 'America/New_York',
    round2Status: 'approved',
    interviewStatus: 'not_scheduled'
  },
  {
    id: 'p2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '+1-555-0124',
    timezone: 'America/Los_Angeles',
    round2Status: 'approved',
    interviewStatus: 'scheduled',
    scheduledTime: '2024-02-25T14:00:00Z',
    zoomLink: 'https://zoom.us/j/123456789'
  },
  {
    id: 'p3',
    name: 'Mike Chen',
    email: 'mike@example.com',
    timezone: 'Asia/Shanghai',
    round2Status: 'approved',
    interviewStatus: 'completed',
    scheduledTime: '2024-02-20T10:00:00Z',
    interviewRating: 4,
    interviewNotes: 'Strong technical skills, good communication.'
  }
];

const mockMeetings: ZoomMeeting[] = [
  {
    id: 'm1',
    title: 'Interview - Sarah Johnson',
    meetingId: '123456789',
    passcode: 'abc123',
    joinUrl: 'https://zoom.us/j/123456789?pwd=abc123',
    startUrl: 'https://zoom.us/s/123456789?zak=xyz789',
    scheduledTime: '2024-02-25T14:00:00Z',
    duration: 60,
    participantIds: ['p2'],
    status: 'scheduled'
  }
];

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
];

const timezones = [
  'America/New_York',
  'America/Los_Angeles',
  'America/Chicago',
  'Europe/London',
  'Europe/Paris',
  'Asia/Tokyo',
  'Asia/Shanghai',
  'Asia/Kolkata',
  'Australia/Sydney'
];

export default function ZoomScheduler({ 
  competitionId, 
  participants = mockParticipants, 
  onScheduleUpdate 
}: ZoomSchedulerProps) {
  const [meetings, setMeetings] = useState<ZoomMeeting[]>(mockMeetings);
  const [meeting, setMeeting] = useState({
    id: '',
    title: 'Competition Interview - Round 3',
    scheduledTime: '',
    duration: 60,
    zoomLink: '',
    meetingId: '',
    passcode: '',
    status: 'not_created',
    participantCount: 0
  });
  const [meetingForm, setMeetingForm] = useState({
    title: 'Competition Interview - Round 3',
    scheduledTime: '',
    duration: 60,
    description: 'Live interview session for competition participants'
  });
  const [activeTab, setActiveTab] = useState('create');
  const [notifications, setNotifications] = useState({
    emailSent: false,
    notificationSent: false,
    reminderScheduled: false
  });
  const [participantsData] = useState([
    { id: 'p1', name: 'John Doe', email: 'john@example.com', status: 'qualified' },
    { id: 'p2', name: 'Jane Smith', email: 'jane@example.com', status: 'qualified' },
    { id: 'p3', name: 'Mike Johnson', email: 'mike@example.com', status: 'qualified' },
    { id: 'p4', name: 'Sarah Wilson', email: 'sarah@example.com', status: 'qualified' }
  ]);

  const createMeeting = () => {
    if (!meetingForm.scheduledTime) {
      alert('Please select a meeting time');
      return;
    }

    const newMeeting = {
      id: Date.now().toString(),
      title: meetingForm.title,
      scheduledTime: meetingForm.scheduledTime,
      duration: meetingForm.duration,
      zoomLink: `https://zoom.us/j/${Math.floor(Math.random() * 1000000000)}`,
      meetingId: Math.floor(Math.random() * 1000000000).toString().replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3'),
      passcode: Math.random().toString(36).substring(2, 8).toUpperCase(),
      status: 'created' as const,
      participantCount: participantsData.length
    };

    setMeeting(newMeeting);
  };

  const sendNotifications = () => {
    // Simulate sending notifications
    setNotifications({
      emailSent: true,
      notificationSent: true,
      reminderScheduled: true
    });
    
    alert(`Meeting details sent to ${participantsData.length} participants via email and in-app notifications!`);
  };

  const handleReschedule = (meetingId: string) => {
    setMeetings(prev => prev.map(m => 
      m.id === meetingId ? { ...m, status: 'cancelled' } : m
    ));
  };

  const handleCancelMeeting = (meetingId: string) => {
    setMeetings(prev => prev.map(m => 
      m.id === meetingId ? { ...m, status: 'cancelled' as const } : m
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'rescheduled': return 'bg-purple-100 text-purple-800';
      case 'no_show': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const eligibleParticipants = participants.filter(p => p.round2Status === 'approved');
  const scheduledCount = participants.filter(p => p.interviewStatus === 'scheduled').length;
  const completedCount = participants.filter(p => p.interviewStatus === 'completed').length;
  const pendingCount = participants.filter(p => p.interviewStatus === 'not_scheduled').length;

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Eligible</p>
                <p className="text-2xl font-bold text-gray-900">{eligibleParticipants.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Scheduled</p>
                <p className="text-2xl font-bold text-blue-600">{scheduledCount}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">{completedCount}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
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
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="create">Create Meeting</TabsTrigger>
          <TabsTrigger value="details">Meeting Details</TabsTrigger>
          <TabsTrigger value="participants">Participants</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create Interview Meeting</CardTitle>
              <CardDescription>
                Create a single Zoom meeting for all qualified participants
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Meeting Title</label>
                <Input
                  value={meetingForm.title}
                  onChange={(e) => setMeetingForm({...meetingForm, title: e.target.value})}
                  placeholder="Enter meeting title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea
                  value={meetingForm.description}
                  onChange={(e) => setMeetingForm({...meetingForm, description: e.target.value})}
                  placeholder="Meeting description"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Interview Date & Time</label>
                  <Input
                    type="datetime-local"
                    value={meetingForm.scheduledTime}
                    onChange={(e) => setMeetingForm({...meetingForm, scheduledTime: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Duration (minutes)</label>
                  <Input
                    type="number"
                    value={meetingForm.duration}
                    onChange={(e) => setMeetingForm({...meetingForm, duration: parseInt(e.target.value)})}
                    min="30"
                    max="180"
                  />
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">Participants</span>
                </div>
                <p className="text-sm text-blue-700">
                  {participantsData.length} qualified participants will receive the meeting link
                </p>
              </div>

              <Button 
                onClick={createMeeting} 
                className="w-full"
                disabled={meeting.status === 'created'}
              >
                <Video className="h-4 w-4 mr-2" />
                {meeting.status === 'created' ? 'Meeting Created' : 'Create Zoom Meeting'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details" className="space-y-6">
          {meeting.status === 'created' ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Meeting Created Successfully</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Meeting Title</label>
                    <p className="text-sm bg-gray-50 p-2 rounded">{meeting.title}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Scheduled Time</label>
                    <p className="text-sm bg-gray-50 p-2 rounded">
                      {new Date(meeting.scheduledTime).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Duration</label>
                    <p className="text-sm bg-gray-50 p-2 rounded">{meeting.duration} minutes</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Participants</label>
                    <p className="text-sm bg-gray-50 p-2 rounded">{meeting.participantCount} people</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Zoom Link</label>
                  <div className="flex items-center space-x-2">
                    <Input value={meeting.zoomLink} readOnly className="bg-gray-50" />
                    <Button size="sm" variant="outline" onClick={() => navigator.clipboard.writeText(meeting.zoomLink)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Meeting ID</label>
                    <p className="text-sm bg-gray-50 p-2 rounded font-mono">{meeting.meetingId}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Passcode</label>
                    <p className="text-sm bg-gray-50 p-2 rounded font-mono">{meeting.passcode}</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">Notifications</h3>
                    <Button 
                      onClick={sendNotifications}
                      disabled={notifications.emailSent}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      {notifications.emailSent ? 'Notifications Sent' : 'Send to All Participants'}
                    </Button>
                  </div>
                  
                  {notifications.emailSent && (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span>Email notifications sent to all participants</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span>In-app notifications delivered</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span>Reminder notifications scheduled</span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No Meeting Created</CardTitle>
                <CardDescription>
                  Create a meeting first to view details
                </CardDescription>
              </CardHeader>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="participants" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Qualified Participants ({participantsData.length})</h3>
            <Badge variant="outline">
              Round 3 - Interview Stage
            </Badge>
          </div>

          <div className="grid gap-4">
            {participantsData.map((participant) => (
              <Card key={participant.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">{participant.name}</h4>
                        <Badge variant="default">
                          {participant.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{participant.email}</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <CheckCircle className="h-3 w-3" />
                        <span>Passed Round 1 & 2</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {notifications.emailSent ? (
                        <div className="flex items-center space-x-1 text-green-600">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-sm">Notified</span>
                        </div>
                      ) : (
                        <Badge variant="outline">Pending notification</Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {meeting.status === 'created' && !notifications.emailSent && (
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 text-orange-800">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    Meeting created but participants haven't been notified yet
                  </span>
                </div>
                <p className="text-sm text-orange-700 mt-1">
                  Go to Meeting Details tab to send notifications to all participants
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>


      </Tabs>
    </div>
  );
}