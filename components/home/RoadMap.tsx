// components/home/Roadmap.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Smartphone,
  Globe,
  Brain,
  Zap,
  Users,
  Award,
  CheckCircle,
  Clock,
  Rocket,
  Target,
  TrendingUp,
  Star,
} from 'lucide-react';
import { ambitions, roadmapFeatures } from '@/lib/mock-data';



export function Roadmap() {
  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
      <div className="container-width">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4 mb-16"
        >
          <Badge variant="outline" className="bg-[#FC5602]/10 text-[#FC5602] border-[#FC5602]/20">
            Our Vision
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            GiG Geni <span className="gradient-text">Ambition</span> & Roadmap
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Building the future of work by revolutionizing how talent connects with opportunity 
            through innovation, fairness, and continuous improvement.
          </p>
        </motion.div>

        {/* Ambitions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-3 gap-8 mb-20"
        >
          {ambitions.map((ambition, index) => (
            <motion.div
              key={ambition.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <Card className="card-hover border-0 shadow-lg h-full">
                <CardContent className="p-8 text-center space-y-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#FC5602] to-[#FF7B02] rounded-2xl flex items-center justify-center mx-auto">
                    <ambition.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {ambition.title}
                    </h3>
                    <p className="text-gray-600">
                      {ambition.description}
                    </p>
                  </div>
                  
                  <div className="pt-4">
                    <Badge variant="outline" className="bg-[#FC5602]/10 text-[#FC5602] border-[#FC5602]/20 text-lg px-4 py-2">
                      {ambition.metric}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Roadmap Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-8"
        >
          <div className="text-center space-y-4 mb-12">
            <h3 className="text-3xl font-bold text-gray-900">
              Development <span className="gradient-text">Roadmap</span>
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our journey to transform the hiring landscape with cutting-edge features and innovations.
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 md:-ml-0.5 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            
            <div className="space-y-12">
              {roadmapFeatures.map((feature, index) => (
                <motion.div
                  key={feature.phase}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`relative flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-8 md:left-1/2 md:-ml-4 w-8 h-8 rounded-full border-4 border-white shadow-lg z-10 bg-gradient-to-br from-[#FC5602] to-[#FF7B02]">
                    <div className="w-full h-full rounded-full flex items-center justify-center">
                      {feature.status === 'completed' && (
                        <CheckCircle className="w-4 h-4 text-white" />
                      )}
                      {feature.status === 'in-progress' && (
                        <Clock className="w-4 h-4 text-white animate-spin" />
                      )}
                      {feature.status === 'planned' && (
                        <Star className="w-4 h-4 text-white" />
                      )}
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className={`w-full md:w-5/12 ml-20 md:ml-0 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                    <Card className="card-hover border-0 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center shrink-0`}>
                            {React.createElement(feature.icon, { className: "w-6 h-6 text-white" })}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-3">
                              <Badge variant="outline"
                                className={`${
                                  feature.status === 'completed' 
                                    ? 'bg-green-100 text-green-800 border-green-200' 
                                    : feature.status === 'in-progress'
                                    ? 'bg-[#FC5602]/10 text-[#FC5602] border-[#FC5602]/20'
                                    : 'bg-gray-100 text-gray-600 border-gray-200'
                                }`}
                              >
                                {feature.phase}
                              </Badge>
                              <Badge 
                                variant="outline" 
                                className={`${
                                  feature.status === 'completed' 
                                    ? 'border-green-300 text-green-700' 
                                    : feature.status === 'in-progress'
                                    ? 'border-[#FC5602] text-[#FC5602]'
                                    : 'border-gray-300 text-gray-600'
                                }`}
                              >
                                {feature.status.replace('-', ' ').toUpperCase()}
                              </Badge>
                            </div>
                            
                            <h4 className="text-xl font-bold text-gray-900 mb-2">
                              {feature.title}
                            </h4>
                            <p className="text-gray-600 mb-4">
                              {feature.description}
                            </p>
                            
                            <div className="grid grid-cols-1 gap-2">
                              {feature.features.map((item, idx) => (
                                <div key={idx} className="flex items-center space-x-2">
                                  <div className="w-1.5 h-1.5 bg-[#FC5602] rounded-full"></div>
                                  <span className="text-sm text-gray-600">{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Future Vision */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20"
        >
          <Card className="bg-gradient-to-br from-[#FC5602] to-[#FF7B02] border-0 text-white overflow-hidden">
            <CardContent className="p-12 relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>
              
              <div className="relative text-center space-y-6">
                <Award className="w-16 h-16 text-white mx-auto" />
                <h3 className="text-4xl font-bold">
                  Join the Hiring Revolution
                </h3>
                <p className="text-xl opacity-90 max-w-3xl mx-auto">
                  Be part of the movement that&apos;s changing how the world thinks about talent, 
                  skills, and career opportunities. Together, we&apos;re building a fairer future.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-[#FC5602] px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all"
                  >
                    Get Early Access
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-[#FC5602] transition-all"
                  >
                    Partner With Us
                  </motion.button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}