'use client';

import { useState } from 'react';
import type { Metadata } from "next";
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { AuthGuard } from '@/components/auth/AuthGuard';
import {
  Search,
  Calendar,
  DollarSign,
  Users,
  Star,
  Trophy,
  Clock,
  Eye,
  Edit,
  Plus,
  CheckCircle,
  AlertCircle,
  XCircle,
  Play,
  Pause,
  MapPin,
  BarChart3,
  Settings
} from 'lucide-react';
import Link from 'next/link';

// Mock data for employer's created competitions
const managedCompetitions = [
  {
    id: '1',
    title: 'Frontend Developer Challenge',
    status: 'active',
    currentRound: 2,
    totalRounds: 4,
    prize: '$5,000',
    participants: 156,
    applicants: 234,
    deadline: '2024-02-15',
    location: 'Remote',
    categories: ['Frontend', 'React'],
    description: 'Build a modern web application using React and TypeScript',
    createdDate: '2024-01-01',
    views: 1250,
    completionRate: 67
  },
  {
    id: '2',
    title: 'Data Science Innovation',
    status: 'completed',
    currentRound: 4,
    totalRounds: 4,
    prize: '$10,000',
    participants: 89,
    applicants: 156,
    deadline: '2024-01-30',
    location: 'New York',
    categories: ['Data Science', 'Python'],
    description: 'Develop ML models for predictive analytics',
    createdDate: '2023-12-01',
    views: 890,
    completionRate: 78,
    winner: 'John Smith'
  },
  {
    id: '3',
    title: 'Mobile App Development',
    status: 'draft',
    currentRound: 0,
    totalRounds: 3,
    prize: '$7,500',
    participants: 0,
    applicants: 0,
    deadline: '2024-03-20',
    location: 'San Francisco',
    categories: ['Mobile', 'Flutter'],
    description: 'Create a cross-platform mobile application',
    createdDate: '2024-01-25',
    views: 45,
    completionRate: 0
  },
  {
    id: '4',
    title: 'UI/UX Design Contest',
    status: 'paused',
    currentRound: 1,
    totalRounds: 3,
    prize: '$3,000',
    participants: 78,
    applicants: 178,
    deadline: '2024-02-20',
    location: 'Remote',
    categories: ['Design', 'UI/UX'],
    description: 'Design a modern user interface for a fintech app',
    createdDate: '2024-01-05',
    views: 567,
    completionRate: 45
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-800';
    case 'completed': return 'bg-blue-100 text-blue-800';
    case 'draft': return 'bg-gray-100 text-gray-800';
    case 'paused': return 'bg-yellow-100 text-yellow-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'active': return <Play className="h-4 w-4" />;
    case 'completed': return <CheckCircle className="h-4 w-4" />;
    case 'draft': return <Edit className="h-4 w-4" />;
    case 'paused': return <Pause className="h-4 w-4" />;
    default: return <AlertCircle className="h-4 w-4" />;
  }
};

function ManageCompetitionsPageContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredCompetitions = managedCompetitions.filter(competition => {
    const matchesSearch = competition.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || competition.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: managedCompetitions.length,
    active: managedCompetitions.filter(c => c.status === 'active').length,
    completed: managedCompetitions.filter(c => c.status === 'completed').length,
    draft: managedCompetitions.filter(c => c.status === 'draft').length,
    totalParticipants: managedCompetitions.reduce((sum, c) => sum + c.participants, 0)
  };

  return (
    <div className="min-h-screen  ">
      <div className="w-full container  py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Manage Competitions
            </h1>
            <p className="text-gray-600">
              Create, monitor, and manage your competition campaigns
            </p>
          </div>
          <Button asChild className="bg-orange-500 hover:bg-orange-600">
            <Link href="/competitions/create">
              <Plus className="h-4 w-4 mr-2" />
              Create Competition
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Created</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <Trophy className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active</p>
                  <p className="text-2xl font-bold text-green-600">{stats.active}</p>
                </div>
                <Play className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.completed}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Drafts</p>
                  <p className="text-2xl font-bold text-gray-600">{stats.draft}</p>
                </div>
                <Edit className="h-8 w-8 text-gray-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Participants</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.totalParticipants}</p>
                </div>
                <Users className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search competitions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Tabs value={statusFilter} onValueChange={setStatusFilter} className="w-auto">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="draft">Drafts</TabsTrigger>
                  <TabsTrigger value="paused">Paused</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardContent>
        </Card>

        {/* Competitions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCompetitions.map((competition, index) => (
            <motion.div
              key={competition.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{competition.title}</CardTitle>
                      <div className="flex items-center space-x-2 mb-3">
                        <Badge className={getStatusColor(competition.status)}>
                          {getStatusIcon(competition.status)}
                          <span className="ml-1 capitalize">{competition.status}</span>
                        </Badge>
                        {competition.winner && (
                          <Badge className="bg-yellow-100 text-yellow-800">
                            <Trophy className="h-3 w-3 mr-1" />
                            Winner: {competition.winner}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 line-clamp-2">{competition.description}</p>
                  
                  {/* Progress Bar for Active Competitions */}
                  {competition.status === 'active' && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Round {competition.currentRound} of {competition.totalRounds}</span>
                        <span>{competition.completionRate}% completion</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${competition.completionRate}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Categories */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {competition.categories.map(category => (
                      <Badge key={category} variant="secondary" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                  </div>

                  {/* Competition Stats */}
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {competition.prize}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {competition.participants} participants
                    </div>
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {competition.views} views
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(competition.deadline).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button asChild variant="outline" className="flex-1">
                      <Link href={`/competitions/${competition.id}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link href={`/competitions/${competition.id}/analytics`}>
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Analytics
                      </Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link href={`/competitions/${competition.id}/manage`}>
                        <Settings className="h-4 w-4 mr-2" />
                        Manage
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredCompetitions.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No competitions found
              </h3>
              <p className="text-gray-600 mb-4">
                {searchQuery || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filters'
                  : 'You haven\'t created any competitions yet'}
              </p>
              <Button asChild className="bg-orange-500 hover:bg-orange-600">
                <Link href="/competitions/create">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Competition
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default function ManageCompetitionsPage() {
  return (
    <AuthGuard requireAuth={true}>
      <ManageCompetitionsPageContent />
    </AuthGuard>
  );
}