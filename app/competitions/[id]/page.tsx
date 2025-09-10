'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Star,
  Trophy,
  Clock,
  FileText,
  CheckCircle,
  Heart,
  Share2,
  Download,
  AlertCircle,
  Target,
  Award,
  Building,
  Bookmark,
  Image,
  File,
  BookMarked
} from 'lucide-react';
import { mockCompetitions } from '@/lib/mock-data';
import { Competition } from '@/lib/interface';
import Link from 'next/link';

export default function CompetitionDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [competition, setCompetition] = useState<Competition | null>(null);
  const [isJoined, setIsJoined] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
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
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatShortDate = (date: Date | undefined) => {
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

    if (!startDate) return { text: 'Coming Soon', variant: 'secondary' as const, color: 'bg-gray-100 text-gray-700' };
    if (now < startDate) return { text: 'Upcoming', variant: 'default' as const, color: 'bg-blue-100 text-blue-700' };
    if (endDate && now > endDate) return { text: 'Completed', variant: 'outline' as const, color: 'bg-gray-100 text-gray-500' };
    return { text: 'Active', variant: 'destructive' as const, color: 'bg-green-100 text-green-700' };
  };

  const handleJoin = () => {
    setIsJoined(!isJoined);
    // Here you would typically make an API call to join/leave the competition
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    // Here you would typically make an API call to save/unsave the competition
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: competition?.title,
        text: competition?.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading competition details...</p>
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
    <div className="min-h-screen  container">
      {/* Header Buttons - Positioned above banner */}
      <div className="relative z-20 bg-transparent mt-5 ">
        <div className="absolute top-0 left-0 right-0 p-6 ">
          <div className="flex items-center justify-between ">
            <Link href="/competitions">
              <Button variant="ghost" className="bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white hover:text-gray-900 shadow-sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Competitions
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={handleShare} className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button 
                variant={isSaved ? "default" : "outline"} 
                onClick={handleSave}
                className={isSaved ? "bg-orange-500 hover:bg-orange-600 shadow-sm" : "bg-white/90 backdrop-blur-sm hover:bg-white shadow-sm"}
              >
                {isSaved ? <BookMarked className="h-4 w-4 mr-2" /> : <Bookmark className="h-4 w-4 mr-2" />}
                {isSaved ? 'Saved' : 'Save'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Banner Image - Full Width */}
      <div className="relative h-64 md:h-80 bg-gradient-to-r from-blue-600 to-purple-600 overflow-hidden w-full rounded-xl">
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute bottom-6 left-6 text-white">
          <div className="flex items-center space-x-2 mb-2">
            <Badge className="bg-white text-gray-900">{competition.categories[0]}</Badge>
            <Badge className={status.color}>
              {status.text}
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{competition.title}</h1>
          <p className="text-lg opacity-90">by {competition.organizer}</p>
        </div>
      </div>

      <div className="w-full py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8  ">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Competition Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <Badge className={status.color}>
                        {status.text}
                      </Badge>
                      {competition.rating && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                          {competition.rating}
                        </div>
                      )}
                    </div>
                    {/* <h1 className="text-3xl font-bold text-gray-900 mb-2">{competition.title}</h1> */}
                    {/* <div className="flex items-center text-lg text-gray-600 mb-4">
                      <Building className="h-5 w-5 mr-2" />
                      {competition.organizer}
                    </div> */}
                  </div>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {competition.categories.map(category => (
                    <Badge key={category} variant="secondary" className="text-sm">
                      {category}
                    </Badge>
                  ))}
                </div>

                {/* Key Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {competition.location && (
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{competition.location}</span>
                    </div>
                  )}
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{competition.participantCount || 0} participants</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{competition.registrationFee}</span>
                  </div>
                  {competition.prizes && (
                    <div className="flex items-center text-sm font-semibold text-green-600">
                      <Trophy className="h-4 w-4 mr-2" />
                      <span>{competition.prizes}</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">About This Competition</h3>
                  <p className="text-gray-700 leading-relaxed">{competition.description}</p>
                </div>


              </CardContent>
            </Card>

            {/* Project Brief */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Project Brief</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Build a comprehensive web application that demonstrates your skills in modern web development. 
                  The project should showcase clean code architecture, responsive design, and user-friendly interfaces.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {competition.description}
                </p>
              </CardContent>
            </Card>



            {/* Resources & Downloads */}
<Card>
  <CardHeader>
    <CardTitle className="flex items-center space-x-2">
      <Download className="h-5 w-5" />
      <span>Resources</span>
    </CardTitle>
  </CardHeader>
  <CardContent>
    <div className="p-4 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors">
      <div className="flex items-start space-x-3">
        <File className="h-5 w-5 text-blue-600 mt-0.5" />
        <div className="flex-1">
          <a
            href="https://drive.google.com/file/d/1abc123/view"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
          >
            Find Necessary Information
          </a>
          <p className="text-sm text-gray-600 mt-1">
            Includes detailed specifications, assets, and references for the project.
          </p>
        </div>
      </div>
    </div>
  </CardContent>
</Card>


            {/* Detailed Information Tabs */}
            <Card>
              <CardContent className="p-6">
                <Tabs defaultValue="details" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="skills">Skills</TabsTrigger>
                    <TabsTrigger value="timeline">Timeline</TabsTrigger>
                    <TabsTrigger value="terms">Terms</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="details" className="mt-6">
                    <div className="space-y-6">
                      {/* {competition.projectBrief && (
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                            <FileText className="h-5 w-5 mr-2 text-orange-500" />
                            Project Brief
                          </h4>
                          <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
                            {competition.projectBrief}
                          </p>
                        </div>
                      )} */}
                      
                      {competition.submissionFormats && competition.submissionFormats.length > 0 && (
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                            <Download className="h-5 w-5 mr-2 text-orange-500" />
                            Submission Formats
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {competition.submissionFormats.map((format, index) => (
                              <Badge key={index} variant="outline" className="text-sm">
                                {format}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {competition.maxFileSize && (
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-3">Maximum File Size</h4>
                          <p className="text-gray-700">{competition.maxFileSize}</p>
                        </div>
                      )}
                      
                      {/* Evaluation Criteria */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                          <Award className="h-5 w-5 mr-2 text-orange-500" />
                          Evaluation Criteria
                        </h4>
                        <div className="space-y-3">
                          {['Innovation and Creativity', 'Technical Implementation', 'User Experience Design', 'Code Quality and Documentation', 'Problem-Solving Approach'].map((criteria, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <CheckCircle className="h-5 w-5 text-green-600" />
                              <span className="text-gray-700">{criteria}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Submission Requirements */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                          <FileText className="h-5 w-5 mr-2 text-orange-500" />
                          Submission Requirements
                        </h4>
                        <div className="space-y-3">
                          {['GitHub Repository Link', 'Live Demo URL', 'Project Documentation (PDF)', 'Video Walkthrough (Optional)'].map((format, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <File className="h-4 w-4 text-blue-600" />
                              <span className="text-gray-700">{format}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="skills" className="mt-6">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Target className="h-5 w-5 mr-2 text-orange-500" />
                        Skills Being Tested
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {competition.skillsTested.map((skill, index) => (
                          <div key={index} className="flex items-center p-3 bg-orange-50 rounded-lg">
                            <CheckCircle className="h-4 w-4 text-orange-500 mr-3" />
                            <span className="text-gray-800 font-medium">{skill}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="timeline" className="mt-6">
                    <div className="space-y-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Calendar className="h-5 w-5 mr-2 text-orange-500" />
                        Important Dates
                      </h4>
                      
                      <div className="space-y-4">
                        {competition.startDate && (
                          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                            <div className="flex items-center">
                              <Clock className="h-5 w-5 text-blue-500 mr-3" />
                              <div>
                                <p className="font-semibold text-gray-900">Competition Starts</p>
                                <p className="text-sm text-gray-600">Registration deadline</p>
                              </div>
                            </div>
                            <p className="text-lg font-semibold text-blue-600">{formatDate(competition.startDate)}</p>
                          </div>
                        )}
                        
                        {competition.endDate && (
                          <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                            <div className="flex items-center">
                              <Clock className="h-5 w-5 text-orange-500 mr-3" />
                              <div>
                                <p className="font-semibold text-gray-900">Submission Deadline</p>
                                <p className="text-sm text-gray-600">Final submissions due</p>
                              </div>
                            </div>
                            <p className="text-lg font-semibold text-orange-600">{formatDate(competition.endDate)}</p>
                          </div>
                        )}
                        
                        {competition.resultDate && (
                          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                            <div className="flex items-center">
                              <Award className="h-5 w-5 text-green-500 mr-3" />
                              <div>
                                <p className="font-semibold text-gray-900">Results Announced</p>
                                <p className="text-sm text-gray-600">Winners will be announced</p>
                              </div>
                            </div>
                            <p className="text-lg font-semibold text-green-600">{formatDate(competition.resultDate)}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="terms" className="mt-6">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-orange-500" />
                        Terms and Conditions
                      </h4>
                      {competition.termsAndConditions && competition.termsAndConditions.length > 0 ? (
                        <div className="space-y-3">
                          {competition.termsAndConditions.map((term, index) => (
                            <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                              <span className="text-orange-500 font-semibold mr-3">{index + 1}.</span>
                              <p className="text-gray-700">{term}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-600 italic">Terms and conditions will be provided upon registration.</p>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
 {/* Sticky Sidebar with All Cards */}
  <div className="lg:col-span-1">
<div className="space-y-6 sticky top-6">
  {/* Join Competition */}
  <Card>
    <CardHeader>
      <CardTitle className="text-xl font-bold text-gray-900">Join Competition</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="text-center">
        <div className="text-3xl font-bold text-orange-600 mb-1">
          {competition.prizes || 'TBD'}
        </div>
        <p className="text-sm text-gray-600">Total Prize Pool</p>
      </div>

      <Separator />

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Participants:</span>
          <span className="font-medium">{competition.participantCount || 0}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Registration:</span>
          <span className="font-medium">{competition.registrationFee}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Deadline:</span>
          <span className="font-medium text-orange-600">
            {formatShortDate(competition.endDate)}
          </span>
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <Button
          onClick={handleJoin}
          className={`w-full ${
            isJoined
              ? 'bg-green-500 hover:bg-green-600'
              : 'bg-orange-600 hover:bg-orange-700'
          } text-white`}
          size="lg"
          disabled={status.text === 'Completed'}
        >
          {isJoined ? (
            <>
              <CheckCircle className="h-4 w-4 mr-2" />
              Joined
            </>
          ) : (
            <>
              <Trophy className="h-4 w-4 mr-2" />
              Join Competition
            </>
          )}
        </Button>

        {status.text === 'Completed' && (
          <p className="text-sm text-gray-500 text-center">
            This competition has ended
          </p>
        )}
      </div>
    </CardContent>
  </Card>

  {/* Quick Info Card */}
  <Card>
    <CardHeader>
      <CardTitle className="text-lg font-semibold text-gray-900">
        Quick Info
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex items-center space-x-3">
        <Calendar className="h-5 w-5 text-blue-600" />
        <div>
          <p className="font-medium text-gray-900">Duration</p>
          <p className="text-sm text-gray-600">
            {formatShortDate(competition.startDate)} -{' '}
            {formatShortDate(competition.endDate)}
          </p>
        </div>
      </div>

      <Separator />

      <div className="flex items-center space-x-3">
        <Users className="h-5 w-5 text-green-600" />
        <div>
          <p className="font-medium text-gray-900">Announcement</p>
          <p className="text-sm text-gray-600">
            {formatShortDate(competition.resultDate) || 'Not Announced'}
          </p>
        </div>
      </div>
    </CardContent>
  </Card>

  {/* Organizer Card */}
  <Card>
    <CardHeader>
      <CardTitle className="text-lg font-semibold text-gray-900">
        Organizer
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
          <Building className="h-6 w-6 text-white" />
        </div>
        <div>
          <p className="font-semibold text-gray-900">
            {competition.organizer}
          </p>
          <p className="text-sm text-gray-600">Competition Host</p>
        </div>
      </div>
    </CardContent>
  </Card>
</div>
</div>
        </div>
      </div>
    </div>
  );
}