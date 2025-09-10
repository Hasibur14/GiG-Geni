'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Search,
  Filter,
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Star,
  Trophy,
  Clock,
  Eye,
  SlidersHorizontal
} from 'lucide-react';
import { mockCompetitions, categories } from '@/lib/mock-data';
import { Competition } from '@/lib/interface';
import Link from 'next/link';

export default function CompetitionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique locations from competitions
  const locations = useMemo(() => {
    const uniqueLocations = Array.from(new Set(mockCompetitions.map(comp => comp.location).filter((loc): loc is string => Boolean(loc))));
    return uniqueLocations;
  }, []);

  // Filter and sort competitions
  const filteredCompetitions = useMemo(() => {
    let filtered = mockCompetitions.filter(competition => {
      const matchesSearch = competition.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           competition.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           competition.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           competition.skillsTested.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || 
                             competition.categories.some(cat => cat === selectedCategory);
      
      const matchesLocation = selectedLocation === 'all' || competition.location === selectedLocation;
      
      const matchesPrice = priceRange === 'all' || 
                          (priceRange === 'free' && competition.registrationFee === 'Free') ||
                          (priceRange === 'paid' && competition.registrationFee !== 'Free');
      
      return matchesSearch && matchesCategory && matchesLocation && matchesPrice;
    });

    // Sort competitions
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
        case 'oldest':
          return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
        case 'participants':
          return (b.participantCount || 0) - (a.participantCount || 0);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'prize':
          // Simple prize comparison (would need more sophisticated logic for real app)
          return b.prizes?.localeCompare(a.prizes || '') || 0;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, selectedCategory, selectedLocation, priceRange, sortBy]);

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

    if (!startDate) return { text: 'Coming Soon', variant: 'secondary' as const };
    if (now < startDate) return { text: 'Upcoming', variant: 'default' as const };
    if (endDate && now > endDate) return { text: 'Completed', variant: 'outline' as const };
    return { text: 'Active', variant: 'destructive' as const };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Discover Competitions
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find the perfect competition to showcase your skills and advance your career
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          {/* Main Search Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search competitions, skills, or companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="h-12 px-6 border-gray-300 hover:border-orange-500"
            >
              <SlidersHorizontal className="h-5 w-5 mr-2" />
              Filters
            </Button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-200"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    {locations.map(location => (
                      <SelectItem key={location} value={location}>{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="All Prices" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="free">Free</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="participants">Most Participants</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="prize">Prize Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </motion.div>
          )}
        </div>

        {/* Results Summary */}
        <div className="flex justify-between items-center mt-6 mb-4">
          <p className="text-gray-600">
            {filteredCompetitions.length} competition{filteredCompetitions.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Competition Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompetitions.map((competition, index) => {
            const status = getStatusBadge(competition);
            
            return (
              <motion.div
                key={competition.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="h-full"
              >
                <Card className="h-full flex flex-col hover:shadow-xl transition-all duration-300 border-gray-200 hover:border-orange-300 group">
                  <CardContent className="p-6 flex flex-col h-full">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                      <Badge variant={status.variant} className="text-xs">
                        {status.text}
                      </Badge>
                      {competition.rating && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                          {competition.rating}
                        </div>
                      )}
                    </div>

                    {/* Title and Organizer */}
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                        {competition.title}
                      </h3>
                      <p className="text-gray-600 font-medium">{competition.organizer}</p>
                    </div>

                    {/* Categories */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {competition.categories.slice(0, 2).map(category => (
                        <Badge key={category} variant="secondary" className="text-xs">
                          {category}
                        </Badge>
                      ))}
                      {competition.categories.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{competition.categories.length - 2}
                        </Badge>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                      {competition.description}
                    </p>

                    {/* Skills */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {competition.skillsTested.slice(0, 3).map(skill => (
                          <span key={skill} className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded">
                            {skill}
                          </span>
                        ))}
                        {competition.skillsTested.length > 3 && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            +{competition.skillsTested.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Competition Details */}
                    <div className="space-y-2 mb-4">
                      {competition.location && (
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-2" />
                          {competition.location}
                        </div>
                      )}
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        {formatDate(competition.startDate)} - {formatDate(competition.endDate)}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 mr-2" />
                        {competition.participantCount || 0} participants
                      </div>
                      {competition.prizes && (
                        <div className="flex items-center text-sm font-semibold text-green-600">
                          <Trophy className="h-4 w-4 mr-2" />
                          {competition.prizes}
                        </div>
                      )}
                    </div>

                    {/* Registration Fee */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Registration:</span>
                        <span className={`font-semibold ${
                          competition.registrationFee === 'Free' ? 'text-green-600' : 'text-gray-900'
                        }`}>
                          {competition.registrationFee}
                        </span>
                      </div>
                    </div>

                    {/* Action Button - Always at bottom */}
                    <div className="mt-auto">
                      <Link href={`/competitions/${competition.id}`} className="block">
                        <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredCompetitions.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No competitions found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search criteria or filters to find more competitions.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedLocation('all');
                  setPriceRange('all');
                }}
              >
                Clear Filters
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}