'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  AlertCircle,
  Trophy,
  Users,
  Calendar,
  MapPin
} from 'lucide-react';
import { mockCompetitions } from '@/lib/mock-data';
import { Competition } from '@/lib/interface';
import CompetitionJourney from '@/components/competitions/CompetitionJourney';
import Link from 'next/link';

export default function CompetitionJourneyPage() {
  const params = useParams();
  const router = useRouter();
  const [competition, setCompetition] = useState<Competition | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const competitionId = params.id as string;
    const foundCompetition = mockCompetitions.find(comp => comp.id === competitionId);
    
    if (foundCompetition) {
      setCompetition(foundCompetition);
    }
    setLoading(false);
  }, [params.id]);

  const formatDate = (date: Date | undefined) => {
    if (!date) return 'TBD';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusBadge = (competition: Competition) => {
    const now = new Date();
    const startDate = competition.startDate ? new Date(competition.startDate) : null;
    const endDate = competition.endDate ? new Date(competition.endDate) : null;

    if (!startDate) return { text: 'Coming Soon', color: 'bg-gray-100 text-gray-700' };
    if (now < startDate) return { text: 'Upcoming', color: 'bg-blue-100 text-blue-700' };
    if (endDate && now > endDate) return { text: 'Completed', color: 'bg-gray-100 text-gray-500' };
    return { text: 'Active', color: 'bg-green-100 text-green-700' };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading competition journey...</p>
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
          <p className="text-gray-600 mb-6">The competition you're looking for doesn't exist or has been removed.</p>
          <Link href="/competitions">
            <Button className="bg-orange-500 hover:bg-orange-600">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Competitions
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const status = getStatusBadge(competition);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <Link href={`/competitions/${competition.id}`}>
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Competition
              </Button>
            </Link>
            <Badge className={status.color}>
              {status.text}
            </Badge>
          </div>
          
          {/* Competition Info Card */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {competition.title}
                  </h1>
                  <p className="text-gray-600 mb-4">by {competition.organizer}</p>
                  
                  {/* Competition Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    {competition.location && (
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{competition.location}</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{competition.participantCount || 0} participants</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      <span>Ends {formatDate(competition.endDate)}</span>
                    </div>
                  </div>
                </div>
                
                {competition.prizes && (
                  <div className="text-right">
                    <div className="flex items-center text-green-600 font-semibold">
                      <Trophy className="h-5 w-5 mr-2" />
                      <span>{competition.prizes}</span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Competition Journey Component */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <CompetitionJourney
            competitionId={competition.id}
            competitionTitle={competition.title}
            currentRound={2} // This would come from user's progress data
            totalRounds={4}
          />
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="flex flex-wrap gap-3">
                <Button asChild variant="outline">
                  <Link href={`/competitions/${competition.id}`}>
                    View Competition Details
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/competitions/my">
                    My Competitions
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/competitions">
                    Browse More Competitions
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}