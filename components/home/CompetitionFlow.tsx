// components/home/CompetitionFlow.tsx
'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ClipboardList,
  Code,
  Presentation,
  Trophy,
  ArrowRight,
  CheckCircle,
  Users,
  Calendar,
  Brain,
  BarChart3,
  Target,
  MessageSquare,
  PieChart,
  Lightbulb,
  Monitor,
  HeartHandshake,
} from 'lucide-react';
import { competitionTypes, flowSteps } from '@/lib/mock-data';

// Function to get appropriate icon for each step
const getStepIcon = (stepName: string) => {
  const iconMap: { [key: string]: React.ReactElement } = {
    // Computer Science & IT
    'Algorithm Quiz': <Brain className="w-4 h-4" />,
    'Coding Challenge': <Code className="w-4 h-4" />,
    'System Design': <Monitor className="w-4 h-4" />,
    'Technical Interview': <MessageSquare className="w-4 h-4" />,
    
    // Business & Strategy
    'Case Study': <ClipboardList className="w-4 h-4" />,
    'Market Analysis': <BarChart3 className="w-4 h-4" />,
    'Strategy Pitch': <Presentation className="w-4 h-4" />,
    'Executive Review': <Users className="w-4 h-4" />,
    
    // Sales & Marketing
    'Product Knowledge': <Lightbulb className="w-4 h-4" />,
    'Role Play': <HeartHandshake className="w-4 h-4" />,
    'Campaign Design': <PieChart className="w-4 h-4" />,
    'Client Presentation': <Target className="w-4 h-4" />,
  };
  
  return iconMap[stepName] || <CheckCircle className="w-4 h-4" />;
};

export function CompetitionFlow() {
  return (
    <section className="section-padding bg-white">
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
            How It Works
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            <span className="gradient-text">4-Step</span> Competition Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience a comprehensive evaluation process designed to showcase your true potential 
            and connect you with the right opportunities.
          </p>
        </motion.div>

        {/* Flow Steps */}
        <div className="space-y-6 md:space-y-8 mb-16 md:mb-20">
          {flowSteps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className={`flex flex-col lg:flex-row ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-4 md:gap-6 lg:gap-8`}>
                <div className="flex-1 w-full">
                  <Card className="card-hover border-0 shadow-lg">
                    <CardContent className="p-4 md:p-6 lg:p-8">
                      <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-6">
                        <div className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shrink-0 mx-auto sm:mx-0`}>
                          <step.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                        </div>
                        
                        <div className="flex-1 space-y-3 md:space-y-4 text-center sm:text-left">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                              {step.title}
                            </h3>
                            <Badge variant="outline" className="text-xs md:text-sm mx-auto sm:mx-0 w-fit">
                              <Calendar className="w-3 h-3 mr-1" />
                              {step.duration}
                            </Badge>
                          </div>
                          
                          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                            {step.description}
                          </p>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                            {step.details.map((detail, idx) => (
                              <div key={idx} className="flex items-center space-x-2 justify-center sm:justify-start">
                                <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                                <span className="text-xs md:text-sm text-gray-600">{detail}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Step Number */}
                <div className="relative shrink-0 order-first lg:order-none">
                  <div className={`w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center text-white font-bold text-xl md:text-2xl shadow-lg mx-auto`}>
                    {step.step}
                  </div>
                  
                  {index < flowSteps.length - 1 && (
                    <div className="absolute top-16 md:top-20 left-1/2 transform -translate-x-1/2 lg:block hidden">
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: (index * 0.2) + 0.5, duration: 0.6 }}
                      >
                        {/* <ArrowRight className={`w-8 h-8 text-gray-300 ${index % 2 === 1 ? 'rotate-180' : ''}`} /> */}
                      </motion.div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Competition Types */}
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
  className="space-y-12"
>
  <div className="text-center space-y-4 px-4">
    <Badge variant="outline" className="bg-[#FC5602]/10 text-[#FC5602] border-[#FC5602]/20 mb-4">
      Industry Specializations
    </Badge>
    <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
      Competition Types by <span className="gradient-text">Industry</span>
    </h3>
    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
      Each industry has tailored competition formats designed to evaluate the most relevant skills and showcase real-world expertise.
    </p>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
    {competitionTypes.map((type, index) => (
      <motion.div
        key={type.title}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.2 }}
      >
        <div className="relative h-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="relative p-8 space-y-6">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className={`w-20 h-20 bg-gradient-to-br ${type.color} rounded-2xl flex items-center justify-center mx-auto shadow-sm`}>
                <type.icon className="w-10 h-10 text-white" />
              </div>

              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">{type.title}</h4>
                <div className="flex items-center justify-center space-x-2">
                  <Badge variant="outline" className="bg-[#FC5602]/10 text-[#FC5602] border-[#FC5602]/20">
                    <Users className="w-3 h-3 mr-1" />
                    {type.participants}
                  </Badge>
                <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                Active
                </Badge>
                </div>
              </div>
            </div>

            {/* Competition Steps */}
            <div className="space-y-3">
              <h5 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                Competition Flow
              </h5>
              {type.steps.map((step, stepIndex) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index * 0.2) + (stepIndex * 0.1) + 0.3, duration: 0.4 }}
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl border border-transparent"
                >
                  <div className={`w-8 h-8 bg-gradient-to-br ${type.color} rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                    {getStepIcon(step)}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{step}</span>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </motion.div>
              ))}
            </div>

            {/* Action Button */}
<div className="pt-4 border-t border-gray-100">
  <motion.button
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    className="w-full bg-[#FC5602]/20 hover:bg-[#FC5602]/30 text-[#FC5602] font-semibold py-3 px-5 rounded-lg flex items-center justify-center space-x-2 border border-[#FC5602]/30 hover:border-[#FC5602]/50 transition-all duration-300"
  >
    <span>Explore Competitions</span>
    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
  </motion.button>
</div>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
</motion.div>


        {/* Interactive Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 md:mt-16 lg:mt-20"
        >
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-0 text-white overflow-hidden">
            <CardContent className="p-6 md:p-8 lg:p-12">
              <div className="text-center space-y-4 md:space-y-6">
                <h3 className="text-2xl md:text-3xl font-bold">
                  Start Your Competitive Journey{' '}
                  <span className="gradient-text bg-gradient-to-r from-[#FC5602] to-[#FF7B02] bg-clip-text text-transparent">
                    Today
                  </span>
                </h3>
                <p className="text-base md:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto px-4">
                  Join over 10,000+ professionals who have transformed their careers 
                  through skill-based competitive hiring.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center pt-2 md:pt-4 px-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#FC5602] hover:bg-[#E04D02] text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    <Trophy className="w-4 h-4 md:w-5 md:h-5" />
                    <span>Browse Competitions</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg transition-all flex items-center justify-center space-x-2"
                  >
                    <Users className="w-4 h-4 md:w-5 md:h-5" />
                    <span>Learn More</span>
                  </motion.button>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 pt-6 md:pt-8 border-t border-gray-700">
                  <div className="text-center">
                    <p className="text-xl md:text-2xl font-bold text-[#FC5602]">500+</p>
                    <p className="text-xs md:text-sm text-gray-400">Active Competitions</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl md:text-2xl font-bold text-[#FC5602]">92%</p>
                    <p className="text-xs md:text-sm text-gray-400">Success Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl md:text-2xl font-bold text-[#FC5602]">$2M+</p>
                    <p className="text-xs md:text-sm text-gray-400">Prizes Awarded</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}