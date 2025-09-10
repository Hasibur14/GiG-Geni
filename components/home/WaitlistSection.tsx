// components/home/WaitlistSection.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Rocket,
  Users,
  Trophy,
  Zap,
  CheckCircle,
  ArrowRight,
  Mail,
  User,
  Briefcase,
  Bell,
  Gift,
  Sparkles,
} from 'lucide-react';

interface WaitlistForm {
  name: string;
  email: string;
  role: 'job-seeker' | 'employer' | 'both';
  company?: string;
  interests: string[];
  notifications: boolean;
}

const waitlistBenefits = [
  'Early access to exclusive competitions',
  'Priority support and onboarding',
  'Special launch bonuses and rewards',
  'Beta testing opportunities',
  'Direct feedback channel to our team',
];

const interestOptions = [
  { id: 'tech', label: 'Technology & Development', icon: Zap },
  { id: 'design', label: 'Design & Creative', icon: Sparkles },
  { id: 'marketing', label: 'Marketing & Sales', icon: Users },
  { id: 'business', label: 'Business & Strategy', icon: Briefcase },
];

export function WaitlistSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<WaitlistForm>({
    name: '',
    email: '',
    role: 'job-seeker',
    company: '',
    interests: [],
    notifications: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInterestChange = (interestId: string, checked: boolean) => {
    setForm(prev => ({
      ...prev,
      interests: checked 
        ? [...prev.interests, interestId]
        : prev.interests.filter(id => id !== interestId)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after success
    setTimeout(() => {
      setIsOpen(false);
      setIsSubmitted(false);
      setForm({
        name: '',
        email: '',
        role: 'job-seeker',
        company: '',
        interests: [],
        notifications: true,
      });
    }, 2000);
  };

  return (
    <section className="section-padding bg-gradient-to-br from-slate-50 via-orange-50/40 to-blue-50/30">
      <div className="container-width">
        <div className="w-full">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6 mb-12"
          >
            <Badge variant="outline" className="bg-[#FC5602]/10 text-[#FC5602] border-[#FC5602]/20 hover:bg-[#FC5602]/20 transition-colors">
              <Rocket className="w-3 h-3 mr-1" />
              🚀 Join the Revolution
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Be Part of the{' '}
              <span className="relative">
                <span className="gradient-text">Future</span>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="absolute bottom-2 left-0 h-3 bg-[#FC5602]/20 -z-10"
                />
              </span>{' '}
              of Hiring
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Join thousands of forward-thinking professionals and companies who are revolutionizing 
              the way talent meets opportunity through competitive challenges.
            </p>
          </motion.div>

          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  {/* Left Side - Content */}
                  <div className="p-6 sm:p-8 lg:p-12 space-y-6 lg:space-y-8">
                    <div className="space-y-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#FC5602] to-[#FF7B02] rounded-xl flex items-center justify-center">
                          <Gift className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">
                            Join Our <span className="gradient-text">Waitlist</span>
                          </h3>
                          <p className="text-gray-600">Be first to experience the future</p>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 leading-relaxed">
                        Get exclusive early access to our platform, special launch bonuses, 
                        and be part of shaping the future of competitive hiring.
                      </p>
                    </div>

                    {/* Benefits */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">What you'll get:</h4>
                      <div className="space-y-3">
                        {waitlistBenefits.map((benefit, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                            className="flex items-center space-x-3"
                          >
                            <div className="w-5 h-5 rounded-full bg-[#FC5602]/10 flex items-center justify-center flex-shrink-0">
                              <CheckCircle className="w-3 h-3 text-[#FC5602]" />
                            </div>
                            <span className="text-gray-700 font-medium">{benefit}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                      <DialogTrigger asChild>
                        <Button 
                          size="lg" 
                          className="btn-primary w-full lg:w-auto text-lg px-8 py-4 group"
                        >
                          Join Waitlist Now
                          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="w-[95vw] sm:w-full max-w-4xl max-h-[90vh] overflow-y-auto mx-4 sm:mx-auto">
                        <DialogHeader className="space-y-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#FC5602] to-[#FF7B02] rounded-xl flex items-center justify-center">
                              <Rocket className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <DialogTitle className="text-xl font-bold text-gray-900">
                                Join the Waitlist
                              </DialogTitle>
                              <DialogDescription className="text-gray-600">
                                Be among the first to experience GiG Geni
                              </DialogDescription>
                            </div>
                          </div>
                        </DialogHeader>

                        {!isSubmitted ? (
                          <form onSubmit={handleSubmit} className="space-y-6 mt-8">
                            {/* Name and Email */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 flex items-center">
                                  <User className="w-4 h-4 mr-2 text-[#FC5602]" />
                                  Full Name
                                </label>
                                <Input
                                  type="text"
                                  placeholder="Enter your full name"
                                  value={form.name}
                                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                                  className="h-12 rounded-xl bg-white/80 backdrop-blur-sm"
                                  required
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 flex items-center">
                                  <Mail className="w-4 h-4 mr-2 text-[#FC5602]" />
                                  Email Address
                                </label>
                                <Input
                                  type="email"
                                  placeholder="Enter your email"
                                  value={form.email}
                                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                                  className="h-12 rounded-xl bg-white/80 backdrop-blur-sm"
                                  required
                                />
                              </div>
                            </div>

                            {/* Role Selection */}
                            <div className="space-y-4">
                              <label className="text-sm font-medium text-gray-700">I am a:</label>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {['job-seeker', 'employer', 'both'].map((role) => (
                                  <div
                                    key={role}
                                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                      form.role === role
                                        ? 'border-[#FC5602] bg-[#FC5602]/5'
                                        : 'border-gray-200 bg-white/60 hover:border-gray-300'
                                    }`}
                                    onClick={() => setForm({ ...form, role: role as any })}
                                  >
                                    <div className="flex items-center space-x-3">
                                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                        form.role === role ? 'border-[#FC5602]' : 'border-gray-300'
                                      }`}>
                                        {form.role === role && (
                                          <div className="w-2 h-2 rounded-full bg-[#FC5602]" />
                                        )}
                                      </div>
                                      <span className="font-medium capitalize">
                                        {role === 'job-seeker' ? 'Job Seeker' : role === 'employer' ? 'Employer' : 'Both'}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Company (if employer) */}
                            {(form.role === 'employer' || form.role === 'both') && (
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 flex items-center">
                                  <Briefcase className="w-4 h-4 mr-2 text-[#FC5602]" />
                                  Company Name
                                </label>
                                <Input
                                  type="text"
                                  placeholder="Enter your company name"
                                  value={form.company}
                                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                                  className="h-12 rounded-xl bg-white/80 backdrop-blur-sm"
                                />
                              </div>
                            )}

                            {/* Interests */}
                            <div className="space-y-4">
                              <label className="text-sm font-medium text-gray-700">Areas of Interest:</label>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {interestOptions.map((interest) => (
                                  <div key={interest.id} className="flex items-center space-x-3 p-3 rounded-xl bg-white/60 border border-gray-200">
                                    <Checkbox
                                      id={interest.id}
                                      checked={form.interests.includes(interest.id)}
                                      onCheckedChange={(checked) => handleInterestChange(interest.id, !!checked)}
                                      className="rounded"
                                    />
                                    <interest.icon className="w-4 h-4 text-[#FC5602]" />
                                    <label htmlFor={interest.id} className="text-sm font-medium cursor-pointer flex-1">
                                      {interest.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Notifications */}
                            <div className="flex items-center space-x-3 p-4 rounded-xl bg-[#FC5602]/5 border border-[#FC5602]/20">
                              <Checkbox
                                id="notifications"
                                checked={form.notifications}
                                onCheckedChange={(checked) => setForm({ ...form, notifications: !!checked })}
                                className="rounded"
                              />
                              <Bell className="w-4 h-4 text-[#FC5602]" />
                              <label htmlFor="notifications" className="text-sm text-gray-700 cursor-pointer flex-1">
                                Send me updates about new features and competitions
                              </label>
                            </div>

                            {/* Submit Button */}
                            <Button 
                              type="submit" 
                              disabled={isSubmitting}
                              className="w-full btn-primary h-12 text-lg rounded-xl"
                            >
                              {isSubmitting ? (
                                <>
                                  <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                                  />
                                  Joining Waitlist...
                                </>
                              ) : (
                                <>
                                  Join Waitlist
                                  <ArrowRight className="ml-2 h-5 w-5" />
                                </>
                              )}
                            </Button>
                          </form>
                        ) : (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center space-y-6 mt-8"
                          >
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                              <CheckCircle className="w-8 h-8 text-green-600" />
                            </div>
                            <div className="space-y-2">
                              <h3 className="text-xl font-bold text-gray-900">Welcome to the Waitlist!</h3>
                              <p className="text-gray-600">
                                Thank you for joining! We'll keep you updated on our progress and notify you when we launch.
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>

                  {/* Right Side - Visual */}
                  <div className="relative bg-gradient-to-br from-[#FC5602]/10 to-[#FF7B02]/5 p-6 sm:p-8 lg:p-12 flex items-center justify-center min-h-[300px] lg:min-h-[400px]">
                    <div className="relative">
                      {/* Main Illustration */}
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
                        className="w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200/50"
                      >
                        <div className="space-y-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-gradient-to-br from-[#FC5602] to-[#FF7B02] rounded-xl flex items-center justify-center">
                                <Trophy className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <p className="font-semibold text-gray-900">Early Access</p>
                                <p className="text-sm text-gray-500">Premium Features</p>
                              </div>
                            </div>
                            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                              VIP
                            </Badge>
                          </div>
                          
                          <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Waitlist Position</span>
                              <span className="font-semibold text-[#FC5602]">#247</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <motion.div 
                                initial={{ width: '0%' }}
                                whileInView={{ width: '75%' }}
                                viewport={{ once: true }}
                                transition={{ delay: 1, duration: 1.5 }}
                                className="bg-gradient-to-r from-[#FC5602] to-[#FF7B02] h-2 rounded-full"
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 sm:gap-4 text-center">
                            <div className="p-2 sm:p-3 bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-xl border border-orange-200/30">
                              <p className="text-sm sm:text-lg font-bold text-[#FC5602]">2.5K+</p>
                              <p className="text-xs text-gray-600 font-medium">Joined</p>
                            </div>
                            <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl border border-blue-200/30">
                              <p className="text-sm sm:text-lg font-bold text-blue-600">Soon</p>
                              <p className="text-xs text-gray-600 font-medium">Launch</p>
                            </div>
                          </div>
                        </div>
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
                        className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-12 h-12 sm:w-16 sm:h-16 bg-[#FC5602] rounded-2xl flex items-center justify-center shadow-lg"
                      >
                        <Users className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
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
                        className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl flex items-center justify-center shadow-xl border border-gray-100"
                      >
                        <Rocket className="w-6 h-6 sm:w-8 sm:h-8 text-[#FC5602]" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}