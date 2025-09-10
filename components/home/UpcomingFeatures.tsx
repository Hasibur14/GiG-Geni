// components/home/UpcomingFeatures.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Smartphone,
  Bell,
  Zap,
  Shield,
  Users,
  Brain,
  Globe,
  Award,
  CheckCircle,
  ArrowRight,
  Mail,
  Gift,
} from 'lucide-react';
import { upcomingFeatures, waitlistBenefits } from '@/lib/mock-data';



interface WaitlistForm {
  email: string;
  name: string;
  role: 'job-seeker' | 'employer' | 'both';
  interests: string[];
  notifications: boolean;
}

export function UpcomingFeatures() {
  const [form, setForm] = useState<WaitlistForm>({
    email: '',
    name: '',
    role: 'job-seeker',
    interests: [],
    notifications: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleInterestChange = (feature: string, checked: boolean) => {
    setForm(prev => ({
      ...prev,
      interests: checked 
        ? [...prev.interests, feature]
        : prev.interests.filter(f => f !== feature)
    }));
  };




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
            What&apos;s Next
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Upcoming <span className="gradient-text">Features</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get excited for the innovative features we&apos;re building to make competitive hiring 
            even more powerful and accessible for everyone.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {upcomingFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="card-hover border-0 shadow-lg h-full rounded-xl bg-white/95 backdrop-blur-sm">
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center shadow-lg`}>
                      {React.createElement(feature.icon, { className: "w-7 h-7 text-white" })}
                    </div>
                    <Badge variant="outline" className="text-xs rounded-full px-3 py-1 bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200">
                      {feature.comingSoon}
                    </Badge>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-gray-700 mb-3">Key Benefits:</p>
                    {feature.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-sm text-gray-600 font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
