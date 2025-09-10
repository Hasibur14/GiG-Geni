'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import {
  Bell,
  Mail,
  MessageSquare,
  Send,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  Info,
  Settings,
  Eye,
  Edit,
  Trash2,
  Plus,
  Filter,
  Search,
  Calendar,
  Target,
  Zap,
  Globe,
  Smartphone,
  Monitor,
  Volume2,
  VolumeX,
  RefreshCw,
  Download,
  Upload,
  Archive,
  Star,
  Heart,
  ThumbsUp,
  Share,
  Copy,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  MoreHorizontal
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'email' | 'in_app' | 'sms' | 'push';
  category: 'round_transition' | 'reminder' | 'announcement' | 'result' | 'schedule' | 'system';
  title: string;
  message: string;
  recipients: string[];
  recipientType: 'all' | 'active' | 'round_specific' | 'custom';
  targetRound?: number;
  status: 'draft' | 'scheduled' | 'sent' | 'failed';
  scheduledAt?: string;
  sentAt?: string;
  createdAt: string;
  createdBy: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  template?: string;
  variables?: Record<string, any>;
  deliveryStats?: {
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
    failed: number;
  };
  autoTrigger?: {
    enabled: boolean;
    condition: string;
    delay?: number;
  };
}

interface NotificationTemplate {
  id: string;
  name: string;
  category: string;
  subject: string;
  content: string;
  variables: string[];
  isDefault: boolean;
}

interface NotificationSystemProps {
  competitionId: string;
  participants: any[];
  onSendNotification?: (notification: Notification) => void;
}

const mockNotifications: Notification[] = [
  {
    id: 'n1',
    type: 'email',
    category: 'round_transition',
    title: 'Round 2 Unlocked - Video Pitch',
    message: 'Congratulations! You have successfully passed Round 1. Round 2 (Video Pitch) is now available.',
    recipients: ['john@example.com', 'sarah@example.com'],
    recipientType: 'round_specific',
    targetRound: 2,
    status: 'sent',
    sentAt: '2024-02-12T10:00:00Z',
    createdAt: '2024-02-12T09:30:00Z',
    createdBy: 'admin@company.com',
    priority: 'high',
    deliveryStats: {
      sent: 2,
      delivered: 2,
      opened: 2,
      clicked: 1,
      failed: 0
    }
  },
  {
    id: 'n2',
    type: 'in_app',
    category: 'reminder',
    title: 'Quiz Deadline Reminder',
    message: 'Reminder: You have 2 days left to complete the screening quiz.',
    recipients: ['mike@example.com', 'emily@example.com'],
    recipientType: 'round_specific',
    targetRound: 1,
    status: 'sent',
    sentAt: '2024-02-10T14:00:00Z',
    createdAt: '2024-02-10T13:45:00Z',
    createdBy: 'admin@company.com',
    priority: 'medium',
    deliveryStats: {
      sent: 2,
      delivered: 2,
      opened: 1,
      clicked: 0,
      failed: 0
    }
  },
  {
    id: 'n3',
    type: 'email',
    category: 'schedule',
    title: 'Interview Scheduled',
    message: 'Your live interview has been scheduled for February 25, 2024 at 10:00 AM.',
    recipients: ['sarah@example.com'],
    recipientType: 'custom',
    targetRound: 3,
    status: 'scheduled',
    scheduledAt: '2024-02-20T09:00:00Z',
    createdAt: '2024-02-18T16:00:00Z',
    createdBy: 'admin@company.com',
    priority: 'high'
  }
];

const mockTemplates: NotificationTemplate[] = [
  {
    id: 't1',
    name: 'Round Transition',
    category: 'round_transition',
    subject: 'Round {{round_number}} Unlocked - {{round_name}}',
    content: 'Congratulations {{participant_name}}! You have successfully passed Round {{previous_round}}. Round {{round_number}} ({{round_name}}) is now available. Please log in to continue your journey.',
    variables: ['participant_name', 'round_number', 'round_name', 'previous_round'],
    isDefault: true
  },
  {
    id: 't2',
    name: 'Quiz Reminder',
    category: 'reminder',
    subject: 'Quiz Deadline Reminder - {{days_left}} Days Left',
    content: 'Hi {{participant_name}}, this is a friendly reminder that you have {{days_left}} days left to complete the screening quiz for {{competition_name}}.',
    variables: ['participant_name', 'days_left', 'competition_name'],
    isDefault: true
  },
  {
    id: 't3',
    name: 'Interview Scheduled',
    category: 'schedule',
    subject: 'Interview Scheduled - {{interview_date}}',
    content: 'Dear {{participant_name}}, your live interview has been scheduled for {{interview_date}} at {{interview_time}}. Zoom link: {{zoom_link}}',
    variables: ['participant_name', 'interview_date', 'interview_time', 'zoom_link'],
    isDefault: true
  },
  {
    id: 't4',
    name: 'Competition Results',
    category: 'result',
    subject: 'Competition Results - {{competition_name}}',
    content: 'Dear {{participant_name}}, the results for {{competition_name}} are now available. {{result_message}}',
    variables: ['participant_name', 'competition_name', 'result_message'],
    isDefault: true
  }
];

const priorityColors = {
  low: 'bg-gray-100 text-gray-800',
  medium: 'bg-blue-100 text-blue-800',
  high: 'bg-orange-100 text-orange-800',
  urgent: 'bg-red-100 text-red-800'
};

const statusColors = {
  draft: 'bg-gray-100 text-gray-800',
  scheduled: 'bg-yellow-100 text-yellow-800',
  sent: 'bg-green-100 text-green-800',
  failed: 'bg-red-100 text-red-800'
};

const typeIcons = {
  email: Mail,
  in_app: Bell,
  sms: Smartphone,
  push: Monitor
};

export default function NotificationSystem({ 
  competitionId, 
  participants, 
  onSendNotification 
}: NotificationSystemProps) {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [templates, setTemplates] = useState<NotificationTemplate[]>(mockTemplates);
  const [activeTab, setActiveTab] = useState('notifications');
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  // New notification form
  const [newNotification, setNewNotification] = useState<Partial<Notification>>({
    type: 'email',
    category: 'announcement',
    recipientType: 'all',
    priority: 'medium',
    status: 'draft'
  });

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || notification.status === statusFilter;
    const matchesType = typeFilter === 'all' || notification.type === typeFilter;
    const matchesCategory = categoryFilter === 'all' || notification.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesType && matchesCategory;
  });

  const handleCreateNotification = () => {
    if (!newNotification.title || !newNotification.message) return;
    
    const notification: Notification = {
      id: `n${Date.now()}`,
      type: newNotification.type || 'email',
      category: newNotification.category || 'announcement',
      title: newNotification.title,
      message: newNotification.message,
      recipients: newNotification.recipients || [],
      recipientType: newNotification.recipientType || 'all',
      targetRound: newNotification.targetRound,
      status: 'draft',
      createdAt: new Date().toISOString(),
      createdBy: 'admin@company.com',
      priority: newNotification.priority || 'medium'
    };
    
    setNotifications([notification, ...notifications]);
    setNewNotification({
      type: 'email',
      category: 'announcement',
      recipientType: 'all',
      priority: 'medium',
      status: 'draft'
    });
    setIsCreating(false);
    
    if (onSendNotification) {
      onSendNotification(notification);
    }
  };

  const handleSendNotification = (notificationId: string) => {
    setNotifications(notifications.map(n => 
      n.id === notificationId 
        ? { ...n, status: 'sent' as const, sentAt: new Date().toISOString() }
        : n
    ));
  };

  const getRecipientCount = (recipientType: string, targetRound?: number) => {
    switch (recipientType) {
      case 'all':
        return participants.length;
      case 'active':
        return participants.filter(p => p.overallStatus === 'active').length;
      case 'round_specific':
        return participants.filter(p => p.currentRound === targetRound).length;
      default:
        return 0;
    }
  };

  const totalSent = notifications.reduce((sum, n) => sum + (n.deliveryStats?.sent || 0), 0);
  const totalDelivered = notifications.reduce((sum, n) => sum + (n.deliveryStats?.delivered || 0), 0);
  const totalOpened = notifications.reduce((sum, n) => sum + (n.deliveryStats?.opened || 0), 0);
  const deliveryRate = totalSent > 0 ? ((totalDelivered / totalSent) * 100).toFixed(1) : '0';
  const openRate = totalSent > 0 ? ((totalOpened / totalSent) * 100).toFixed(1) : '0';

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Sent</p>
                <p className="text-2xl font-bold text-gray-900">{totalSent}</p>
              </div>
              <Send className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Delivery Rate</p>
                <p className="text-2xl font-bold text-green-600">{deliveryRate}%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Open Rate</p>
                <p className="text-2xl font-bold text-purple-600">{openRate}%</p>
              </div>
              <Eye className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Templates</p>
                <p className="text-2xl font-bold text-orange-600">{templates.length}</p>
              </div>
              <Settings className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-4">
          {/* Filters and Controls */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex-1 min-w-64">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search notifications..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="sent">Sent</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="in_app">In-App</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="push">Push</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="round_transition">Round Transition</SelectItem>
                    <SelectItem value="reminder">Reminder</SelectItem>
                    <SelectItem value="announcement">Announcement</SelectItem>
                    <SelectItem value="result">Result</SelectItem>
                    <SelectItem value="schedule">Schedule</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button onClick={() => setIsCreating(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Notifications List */}
          <Card>
            <CardHeader>
              <CardTitle>Notification History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredNotifications.map((notification) => {
                  const TypeIcon = typeIcons[notification.type];
                  return (
                    <div key={notification.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <TypeIcon className="h-5 w-5 text-gray-500 mt-1" />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-medium">{notification.title}</h3>
                              <Badge className={statusColors[notification.status]}>
                                {notification.status}
                              </Badge>
                              <Badge className={priorityColors[notification.priority]}>
                                {notification.priority}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span>Recipients: {notification.recipients.length}</span>
                              <span>Type: {notification.type}</span>
                              <span>Category: {notification.category.replace('_', ' ')}</span>
                              {notification.sentAt && (
                                <span>Sent: {new Date(notification.sentAt).toLocaleString()}</span>
                              )}
                            </div>
                            {notification.deliveryStats && (
                              <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                                <span>Delivered: {notification.deliveryStats.delivered}/{notification.deliveryStats.sent}</span>
                                <span>Opened: {notification.deliveryStats.opened}</span>
                                <span>Clicked: {notification.deliveryStats.clicked}</span>
                                {notification.deliveryStats.failed > 0 && (
                                  <span className="text-red-600">Failed: {notification.deliveryStats.failed}</span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          {notification.status === 'draft' && (
                            <Button
                              size="sm"
                              onClick={() => handleSendNotification(notification.id)}
                            >
                              <Send className="h-4 w-4 mr-1" />
                              Send
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedNotification(notification)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {templates.map((template) => (
                  <div key={template.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-medium">{template.name}</h3>
                          {template.isDefault && (
                            <Badge className="bg-blue-100 text-blue-800">Default</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          <strong>Subject:</strong> {template.subject}
                        </p>
                        <p className="text-sm text-gray-600 mb-2">
                          <strong>Content:</strong> {template.content.substring(0, 100)}...
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {template.variables.map((variable) => (
                            <Badge key={variable} variant="outline" className="text-xs">
                              {variable}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          <Copy className="h-4 w-4 mr-1" />
                          Use
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Automated Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-medium">Round Transition Notifications</h3>
                      <p className="text-sm text-gray-600">Automatically notify participants when they advance to the next round</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <label className="font-medium">Delay after advancement:</label>
                      <p className="text-gray-600">5 minutes</p>
                    </div>
                    <div>
                      <label className="font-medium">Template:</label>
                      <p className="text-gray-600">Round Transition</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-medium">Deadline Reminders</h3>
                      <p className="text-sm text-gray-600">Send reminders before round deadlines</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <label className="font-medium">Reminder schedule:</label>
                      <p className="text-gray-600">3 days, 1 day, 2 hours before</p>
                    </div>
                    <div>
                      <label className="font-medium">Template:</label>
                      <p className="text-gray-600">Quiz Reminder</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-medium">Interview Confirmations</h3>
                      <p className="text-sm text-gray-600">Automatically send interview details when scheduled</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <label className="font-medium">Send immediately:</label>
                      <p className="text-gray-600">Yes</p>
                    </div>
                    <div>
                      <label className="font-medium">Template:</label>
                      <p className="text-gray-600">Interview Scheduled</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create Notification Modal */}
      {isCreating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Create Notification</h2>
              <Button variant="ghost" onClick={() => setIsCreating(false)}>×</Button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Type</label>
                  <Select 
                    value={newNotification.type} 
                    onValueChange={(value: any) => setNewNotification({...newNotification, type: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="in_app">In-App</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="push">Push</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <Select 
                    value={newNotification.category} 
                    onValueChange={(value: any) => setNewNotification({...newNotification, category: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="round_transition">Round Transition</SelectItem>
                      <SelectItem value="reminder">Reminder</SelectItem>
                      <SelectItem value="announcement">Announcement</SelectItem>
                      <SelectItem value="result">Result</SelectItem>
                      <SelectItem value="schedule">Schedule</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <Input
                  value={newNotification.title || ''}
                  onChange={(e) => setNewNotification({...newNotification, title: e.target.value})}
                  placeholder="Notification title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <Textarea
                  value={newNotification.message || ''}
                  onChange={(e) => setNewNotification({...newNotification, message: e.target.value})}
                  placeholder="Notification message"
                  rows={4}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Recipients</label>
                  <Select 
                    value={newNotification.recipientType} 
                    onValueChange={(value: any) => setNewNotification({...newNotification, recipientType: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Participants ({participants.length})</SelectItem>
                      <SelectItem value="active">Active Participants</SelectItem>
                      <SelectItem value="round_specific">Round Specific</SelectItem>
                      <SelectItem value="custom">Custom Selection</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Priority</label>
                  <Select 
                    value={newNotification.priority} 
                    onValueChange={(value: any) => setNewNotification({...newNotification, priority: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsCreating(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateNotification}>
                  Create Notification
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}