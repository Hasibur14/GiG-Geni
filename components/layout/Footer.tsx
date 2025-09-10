// components/layout/Footer.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Trophy,
  Users,
  Building2,
  Mail,
  Phone,
  MapPin,
  Twitter,
  Linkedin,
  Github,
  Instagram,
  ArrowRight,
} from 'lucide-react';

const footerLinks = {
  platform: [
    { name: 'Browse Competitions', href: '/competitions' },
    { name: 'Leaderboards', href: '/leaderboards' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Success Stories', href: '/success-stories' },
  ],
  forJobSeekers: [
    { name: 'Find Competitions', href: '/competitions' },
    { name: 'Profile Setup', href: '/profile' },
    { name: 'Skill Assessment', href: '/skills' },
    { name: 'Career Resources', href: '/resources' },
  ],
  forEmployers: [
    { name: 'Post Competition', href: '/employer/competitions/create' },
    { name: 'Manage Competitions', href: '/employer/dashboard' },
    { name: 'Talent Pool', href: '/employer/talent' },
    { name: 'Pricing', href: '/pricing' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'GDPR', href: '/gdpr' },
  ],
};

const socialLinks = [
  { name: 'Twitter', href: '#', icon: Twitter },
  { name: 'LinkedIn', href: '#', icon: Linkedin },
  { name: 'GitHub', href: '#', icon: Github },
  { name: 'Instagram', href: '#', icon: Instagram },
];

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-50 via-orange-50/40 to-blue-50/30 border-t border-gray-200">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link href="/" className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#FC5602] to-[#FF7B02] rounded-xl flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold gradient-text">GiG Geni</span>
              </Link>
              <p className="text-gray-600 leading-relaxed max-w-sm">
                Where talent meets opportunity through competitive challenges. 
                Prove your skills, get hired, and win amazing prizes.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-[#FC5602]" />
                  <span>hello@giggeni.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-[#FC5602]" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-[#FC5602]" />
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Platform Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="font-semibold text-gray-900 text-lg">Platform</h3>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-[#FC5602] transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* For Job Seekers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="font-semibold text-gray-900 text-lg flex items-center">
              <Users className="w-4 h-4 mr-2 text-[#FC5602]" />
              Job Seekers
            </h3>
            <ul className="space-y-3">
              {footerLinks.forJobSeekers.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-[#FC5602] transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* For Employers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="font-semibold text-gray-900 text-lg flex items-center">
              <Building2 className="w-4 h-4 mr-2 text-[#FC5602]" />
              Employers
            </h3>
            <ul className="space-y-3">
              {footerLinks.forEmployers.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-[#FC5602] transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company & Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Company */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 text-lg">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-[#FC5602] transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 text-lg">Legal</h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-[#FC5602] transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-8"
        >
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <h3 className="text-2xl font-bold text-gray-900">
              Stay Updated with <span className="gradient-text">GiG Geni</span>
            </h3>
            <p className="text-gray-600">
              Get the latest updates on new competitions, features, and success stories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#FC5602]/20 focus:border-[#FC5602] transition-colors"
              />
              <Button className="btn-primary px-6 py-3 rounded-xl">
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200"
        >
          <div className="text-gray-600 text-sm mb-4 md:mb-0">
            © 2024 GiG Geni. All rights reserved.
          </div>
          
          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 flex items-center justify-center text-gray-600 hover:text-[#FC5602] hover:bg-[#FC5602]/10 hover:border-[#FC5602]/20 transition-all duration-200"
                aria-label={social.name}
              >
                <social.icon className="w-4 h-4" />
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}