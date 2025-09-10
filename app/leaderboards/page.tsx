"use client"

import { useState, useMemo } from "react"
import type { Metadata } from "next"
import Image from "next/image"
import { Trophy, Medal, Award, Users, Target, Calendar, Filter, ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { extendedLeaderboardData, categories } from "@/lib/mock-data"
import { LeaderboardParticipant, LeaderboardFilters } from "@/lib/interface"

const ITEMS_PER_PAGE = 10

export default function LeaderboardsPage() {
  const [filters, setFilters] = useState<LeaderboardFilters>({
    category: undefined,
    dateRange: 'alltime',
    sortBy: 'points',
    sortOrder: 'desc',
    page: 1,
    limit: ITEMS_PER_PAGE
  })

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let data = [...extendedLeaderboardData]

    // Apply category filter
    if (filters.category && filters.category !== 'all') {
      data = data.filter(participant => 
        participant.categories.includes(filters.category!)
      )
    }

    // Apply date range filter (simplified for demo)
    if (filters.dateRange !== 'alltime') {
      const cutoffDate = new Date()
      if (filters.dateRange === '30days') {
        cutoffDate.setDate(cutoffDate.getDate() - 30)
      } else if (filters.dateRange === '90days') {
        cutoffDate.setDate(cutoffDate.getDate() - 90)
      }
      data = data.filter(participant => 
        participant.lastActive >= cutoffDate
      )
    }

    // Sort data
    data.sort((a, b) => {
      let comparison = 0
      if (filters.sortBy === 'points') {
        comparison = a.totalPoints - b.totalPoints
      } else if (filters.sortBy === 'competitions') {
        comparison = a.competitionsParticipated - b.competitionsParticipated
      }
      return filters.sortOrder === 'desc' ? -comparison : comparison
    })

    // Update ranks
    data.forEach((participant, index) => {
      participant.rank = index + 1
    })

    return data
  }, [filters])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedData.length / ITEMS_PER_PAGE)
  const startIndex = (filters.page - 1) * ITEMS_PER_PAGE
  const paginatedData = filteredAndSortedData.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const updateFilters = (updates: Partial<LeaderboardFilters>) => {
    setFilters(prev => ({ ...prev, ...updates, page: 1 }))
  }

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-500" />
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />
    if (rank === 3) return <Award className="w-5 h-5 text-amber-600" />
    return <span className="w-5 h-5 flex items-center justify-center text-sm font-semibold text-gray-500">#{rank}</span>
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
      case 'epic': return 'bg-gradient-to-r from-purple-400 to-blue-500 text-white'
      case 'rare': return 'bg-gradient-to-r from-blue-400 to-cyan-500 text-white'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto  py-8 ">
        {/* Header */}
        {/* <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-6">
            <Trophy className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-orange-600 via-orange-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Leaderboard
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Celebrating excellence and recognizing our top performers across all competitions
          </p>
        </div> */}

        {/* Filters and Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <div className="space-y-2 flex-1 sm:flex-none">
                <label className="text-sm font-medium text-gray-700">Category</label>
                <Select value={filters.category || 'all'} onValueChange={(value) => updateFilters({ category: value === 'all' ? undefined : value })}>
                  <SelectTrigger className="w-full sm:w-48 h-11">
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
              
              <div className="space-y-2 flex-1 sm:flex-none">
                <label className="text-sm font-medium text-gray-700">Time Period</label>
                <Select value={filters.dateRange} onValueChange={(value: any) => updateFilters({ dateRange: value })}>
                  <SelectTrigger className="w-full sm:w-48 h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30days">Last 30 Days</SelectItem>
                    <SelectItem value="90days">Last 90 Days</SelectItem>
                    <SelectItem value="alltime">All Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex gap-2 w-full lg:w-auto">
              <Button
                variant={filters.sortBy === 'points' ? 'default' : 'outline'}
                onClick={() => updateFilters({ sortBy: 'points' })}
                className="flex items-center gap-2 flex-1 lg:flex-none h-11"
              >
                <Trophy className="h-4 w-4" />
                <span className="hidden sm:inline">Sort by </span>Points
              </Button>
              <Button
                variant={filters.sortBy === 'competitions' ? 'default' : 'outline'}
                onClick={() => updateFilters({ sortBy: 'competitions' })}
                className="flex items-center gap-2 flex-1 lg:flex-none h-11"
              >
                <Medal className="h-4 w-4" />
                <span className="hidden sm:inline">Sort by </span>Competitions
              </Button>
            </div>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Mobile View */}
          <div className="block lg:hidden">
            <div className="space-y-4 p-4">
              {paginatedData.map((participant) => (
                <div key={participant.id} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      {getRankIcon(participant.rank!)}
                    </div>
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200">
                      <Image
                        src={participant.profilePhoto}
                        alt={participant.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{participant.name}</h3>
                      <p className="text-sm text-gray-600">{participant.role}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-sm text-gray-500">
                          {participant.competitionsParticipated} competitions
                        </span>
                        <span className="font-bold text-[#FC5602]">
                          {participant.totalPoints.toLocaleString()} pts
                        </span>
                      </div>
                    </div>
                  </div>
                  {participant.achievements.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {participant.achievements.slice(0, 2).map(achievement => (
                        <div
                          key={achievement.id}
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(achievement.rarity)}`}
                          title={achievement.description}
                        >
                          {achievement.icon}
                        </div>
                      ))}
                      {participant.achievements.length > 2 && (
                        <div className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                          +{participant.achievements.length - 2}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Desktop View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <tr>
                  <th className="text-left py-5 px-6 font-semibold text-gray-700">Rank</th>
                  <th className="text-left py-5 px-6 font-semibold text-gray-700">Participant</th>
                  <th className="text-left py-5 px-6 font-semibold text-gray-700">Role & Company</th>
                  <th className="text-center py-5 px-6 font-semibold text-gray-700">Competitions</th>
                  <th className="text-center py-5 px-6 font-semibold text-gray-700">Points</th>
                  <th className="text-center py-5 px-6 font-semibold text-gray-700">Achievements</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((participant) => (
                  <tr key={participant.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-2">
                        {getRankIcon(participant.rank!)}
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden">
                          <Image
                            src={participant.profilePhoto}
                            alt={participant.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{participant.name}</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {participant.skills.slice(0, 3).map(skill => (
                              <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <div>
                        <p className="font-medium text-gray-900">{participant.role}</p>
                        <p className="text-sm text-gray-600">{participant.company}</p>
                      </div>
                    </td>
                    <td className="py-5 px-6 text-center">
                      <div>
                        <p className="font-semibold text-gray-900">{participant.competitionsParticipated}</p>
                        <p className="text-sm text-green-600">{participant.competitionsWon} won</p>
                      </div>
                    </td>
                    <td className="py-5 px-6 text-center">
                      <p className="font-bold text-lg text-[#FC5602]">{participant.totalPoints.toLocaleString()}</p>
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex flex-wrap gap-1 justify-center">
                        {participant.achievements.slice(0, 3).map(achievement => (
                          <div
                            key={achievement.id}
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(achievement.rarity)}`}
                            title={achievement.description}
                          >
                            {achievement.icon}
                          </div>
                        ))}
                        {participant.achievements.length > 3 && (
                          <div className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                            +{participant.achievements.length - 3}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-600 order-2 sm:order-1">
                Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, filteredAndSortedData.length)} of {filteredAndSortedData.length} participants
              </div>
              <div className="flex items-center gap-2 order-1 sm:order-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFilters(prev => ({ ...prev, page: prev.page - 1 }))}
                  disabled={filters.page === 1}
                  className="flex items-center gap-1 h-10"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Previous</span>
                </Button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = i + 1
                    return (
                      <Button
                        key={pageNum}
                        variant={filters.page === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilters(prev => ({ ...prev, page: pageNum }))}
                        className="w-10 h-10"
                      >
                        {pageNum}
                      </Button>
                    )
                  })}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFilters(prev => ({ ...prev, page: prev.page + 1 }))}
                  disabled={filters.page === totalPages}
                  className="flex items-center gap-1 h-10"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}