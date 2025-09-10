// components/home/Hero.tsx
'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import {
  Trophy,
  Users,
  Target,
  ArrowRight,
  Play,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import RecentWinnerCarousel from './RecentWinner';
import { winnersData } from '@/lib/mock-data';



const stats = [
  { label: 'Active Competitions', value: '500+', icon: Trophy },
  { label: 'Job Seekers', value: '10K+', icon: Users },
  { label: 'Success Rate', value: '92%', icon: Target },
  { label: 'Growth Rate', value: '250%', icon: TrendingUp },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-orange-50/40 to-blue-50/30">

      {/* Enhanced Floating Elements with Animation - Mobile Responsive */}
      <motion.div 
        animate={{ 
          y: [0, -20, 0],
          x: [0, 2, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut" 
        }}
        className="absolute top-20 left-2 lg:left-10 w-12 h-12 lg:w-24 lg:h-24 bg-gradient-to-br from-[#FC5602]/20 to-[#FF7B02]/10 rounded-full blur-xl"
        style={{ willChange: 'transform' }}
      />
      <motion.div 
        animate={{ 
          y: [0, 15, 0],
          x: [0, -4, 0],
          scale: [1, 0.9, 1]
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute top-40 right-2 lg:right-20 w-16 h-16 lg:w-36 lg:h-36 bg-gradient-to-br from-blue-500/15 to-purple-500/10 rounded-full blur-xl"
        style={{ willChange: 'transform' }}
      />
      <motion.div 
        animate={{ 
          y: [0, -10, 0],
          x: [0, 4, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4
        }}
        className="absolute bottom-20 left-2 lg:left-20 w-16 h-16 lg:w-28 lg:h-28 bg-gradient-to-br from-green-500/15 to-[#FC5602]/10 rounded-full blur-xl"
        style={{ willChange: 'transform' }}
      />
      <motion.div 
        animate={{ 
          y: [0, 25, 0],
          x: [0, -2, 0],
          rotate: [0, 180, 360]
        }}
        transition={{ 
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-1/2 right-2 lg:right-10 w-12 h-12 lg:w-20 lg:h-20 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-lg"
        style={{ willChange: 'transform' }}
      />

      <div className="container section-padding relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px]">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Badge variant="outline" className="bg-[#FC5602]/10 text-[#FC5602] border-[#FC5602]/20 hover:bg-[#FC5602]/20 transition-colors">
                <Sparkles className="w-3 h-3 mr-1" />
                🚀 The Future of Hiring is Here
              </Badge>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="space-y-4"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Where{' '}
                <span className="relative">
                  <span className="gradient-text">Talent</span>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="absolute bottom-2 left-0 h-3 bg-[#FC5602]/20 -z-10"
                  />
                </span>{' '}
                Meets{' '}
                <span className="relative">
                  <span className="gradient-text">Opportunity</span>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="absolute bottom-2 left-0 h-3 bg-[#FC5602]/20 -z-10"
                  />
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl">
                Experience the most engaging and fair hiring process through competitive challenges.
                <span className="block mt-2 font-semibold text-[#FC5602]">
                  Prove your skills. Get hired. Win amazing prizes.
                </span>
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/competitions">
                <Button 
                  size="lg" 
                  className="btn-primary group w-full sm:w-auto text-lg px-8 py-4 border border-orange-500  hover:text-orange-500"
                >
                  Join Competition
                  <Trophy className="ml-2 text-orange-600 h-5 w-5 group-hover:rotate-12 transition-transform duration-300 " />
                </Button>
              </Link>
              
              <Link href="/employer/competitions/create">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="btn-outline w-full sm:w-auto text-lg px-8 py-4 group"
                >
                  Post Competition
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>

            {/* Watch Demo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <button className="flex items-center space-x-3 text-gray-600 hover:text-[#FC5602] transition-colors group">
                <div className="w-12 h-12 rounded-full bg-[#FC5602]/10 flex items-center justify-center group-hover:bg-[#FC5602]/20 transition-colors">
                  <Play className="w-5 h-5 text-[#FC5602] ml-0.5" />
                </div>
                <span className="text-lg font-medium">Watch how it works</span>
              </button>
            </motion.div>
          </motion.div>

          {/* Right Content - Hero Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main Hero Card */}
            <div className="relative">
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 1, 0] 
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
                className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-gray-200/50 ring-1 ring-gray-100/50"
              >
                {/* <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#FC5602] to-[#FF7B02] rounded-xl flex items-center justify-center">
                        <Trophy className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Frontend Challenge</p>
                        <p className="text-sm text-gray-500">Tech Corp Inc.</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                      Active
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-semibold text-[#FC5602]">Round 2 of 4</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div 
                        initial={{ width: '0%' }}
                        animate={{ width: '50%' }}
                        transition={{ delay: 1.5, duration: 1.5 }}
                        className="bg-gradient-to-r from-[#FC5602] to-[#FF7B02] h-2 rounded-full"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-xl border border-orange-200/30">
                      <p className="text-2xl font-bold text-[#FC5602]">$5,000</p>
                      <p className="text-xs text-gray-600 font-medium">Prize Pool</p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl border border-blue-200/30">
                      <p className="text-2xl font-bold text-blue-600">247</p>
                      <p className="text-xs text-gray-600 font-medium">Participants</p>
                    </div>
                  </div>
                </div> */}
                <RecentWinnerCarousel winners={winnersData} interval={4000}/>
              </motion.div>
              
              {/* Floating Elements */}
              <motion.div
                animate={{ 
                  y: [0, -15, 0],
                  x: [0, 5, 0] 
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-[#FC5602] rounded-2xl flex items-center justify-center shadow-lg"
              >
                <Users className="w-8 h-8 text-white" />
              </motion.div>
              
              <motion.div
                animate={{ 
                  y: [0, 10, 0],
                  x: [0, -5, 0] 
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
                className="absolute -bottom-6 -left-6 w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-xl border border-gray-100"
              >
                <Target className="w-8 h-8 text-[#FC5602]" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-20"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-lg p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
                  className="text-center space-y-3"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-[#FC5602]/10 rounded-xl">
                    <stat.icon className="w-6 h-6 text-[#FC5602]" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}