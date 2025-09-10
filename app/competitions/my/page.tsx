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
  Play,
  CheckCircle,
  AlertCircle,
  XCircle,
  Filter,
  MapPin
} from 'lucide-react';
import Link from 'next/link';

// Mock data for employee's competitions
const myCompetitions = [
  {
    id: '1',
    title: 'Frontend Developer Challenge',
    company: 'TechCorp Inc.',
    status: 'in_progress',
    currentRound: 2,
    totalRounds: 4,
    prize: '$5,000',
    participants: 156,
    deadline: '2024-02-15',
    location: 'Remote',
    categories: ['Frontend', 'React'],
    description: 'Build a modern web application using React and TypeScript',
    joinedDate: '2024-01-10',
    progress: 50
  },
  {
    id: '2',
    title: 'Data Science Innovation',
    company: 'DataFlow Solutions',
    status: 'completed',
    currentRound: 4,
    totalRounds: 4,
    prize: '$10,000',
    participants: 89,
    deadline: '2024-01-30',
    location: 'New York',
    categories: ['Data Science', 'Python'],
    description: 'Develop ML models for predictive analytics',
    joinedDate: '2023-12-15',
    progress: 100,
    result: 'winner'
  },
  {
    id: '3',
    title: 'Mobile App Development',
    company: 'MobileTech',
    status: 'upcoming',
    currentRound: 0,
    totalRounds: 3,
    prize: '$7,500',
    participants: 234,
    deadline: '2024-03-20',
    location: 'San Francisco',
    categories: ['Mobile', 'Flutter'],
    description: 'Create a cross-platform mobile application',
    joinedDate: '2024-01-25',
    progress: 0
  },
  {
    id: '4',
    title: 'UI/UX Design Contest',
    company: 'DesignStudio',
    status: 'eliminated',
    currentRound: 1,
    totalRounds: 3,
    prize: '$3,000',
    participants: 178,
    deadline: '2024-01-20',
    location: 'Remote',
    categories: ['Design', 'UI/UX'],
    description: 'Design a modern user interface for a fintech app',
    joinedDate: '2024-01-05',
    progress: 25
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'in_progress': return 'bg-blue-100 text-blue-800';
    case 'completed': return 'bg-green-100 text-green-800';
    case 'upcoming': return 'bg-yellow-100 text-yellow-800';
    case 'eliminated': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'in_progress': return <Play className="h-4 w-4" />;
    case 'completed': return <CheckCircle className="h-4 w-4" />;
    case 'upcoming': return <Clock className="h-4 w-4" />;
    case 'eliminated': return <XCircle className="h-4 w-4" />;
    default: return <AlertCircle className="h-4 w-4" />;
  }
};

function MyCompetitionsPageContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredCompetitions = myCompetitions.filter(competition => {
    const matchesSearch = competition.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         competition.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || competition.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: myCompetitions.length,
    inProgress: myCompetitions.filter(c => c.status === 'in_progress').length,
    completed: myCompetitions.filter(c => c.status === 'completed').length,
    won: myCompetitions.filter(c => c.result === 'winner').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            My Competitions
          </h1>
          <p className="text-gray-600">
            Track your competition progress and manage your applications
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Joined</p>
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
                  <p className="text-sm font-medium text-gray-600">In Progress</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
                </div>
                <Play className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Won</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.won}</p>
                </div>
                <Star className="h-8 w-8 text-yellow-500" />
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
                  placeholder="Search competitions or companies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Tabs value={statusFilter} onValueChange={setStatusFilter} className="w-auto">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="in_progress">In Progress</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="eliminated">Eliminated</TabsTrigger>
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
                      <p className="text-gray-600 mb-3">{competition.company}</p>
                      <div className="flex items-center space-x-2 mb-3">
                        <Badge className={getStatusColor(competition.status)}>
                          {getStatusIcon(competition.status)}
                          <span className="ml-1 capitalize">{competition.status.replace('_', ' ')}</span>
                        </Badge>
                        {competition.result === 'winner' && (
                          <Badge className="bg-yellow-100 text-yellow-800">
                            <Trophy className="h-3 w-3 mr-1" />
                            Winner
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 line-clamp-2">{competition.description}</p>
                  
                  {/* Progress Bar */}
                  {competition.status === 'in_progress' && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Round {competition.currentRound} of {competition.totalRounds}</span>
                        <span>{competition.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${competition.progress}%` }}
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

                  {/* Competition Info */}
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
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(competition.deadline).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {competition.location}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button asChild className="flex-1">
                      <Link href={`/competitions/${competition.id}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Link>
                    </Button>
                    {competition.status === 'in_progress' && (
                      <Button asChild variant="outline">
                        <Link href={`/competitions/${competition.id}/journey`}>
                          Continue
                        </Link>
                      </Button>
                    )}
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
                  : 'You haven\'t joined any competitions yet'}
              </p>
              <Button asChild>
                <Link href="/competitions">
                  Browse Competitions
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default function MyCompetitionsPage() {
  return (
    <AuthGuard requireAuth={true}>
      <MyCompetitionsPageContent />
    </AuthGuard>
  );
}