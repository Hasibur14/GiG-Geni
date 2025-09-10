// components/navigation/Footer.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  Heart,
  Linkedin,
} from 'lucide-react';

const footerLinks = {
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
  ],
  forJobSeekers: [
    { label: 'Browse Competitions', href: '/competitions' },
    { label: 'Leaderboards', href: '/leaderboards' },
    { label: 'Success Stories', href: '/success-stories' },
    { label: 'Career Resources', href: '/resources' },
  ],
  forEmployers: [
    { label: 'Post a Competition', href: '/employer/create' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Employer Dashboard', href: '/employer/dashboard' },
    { label: 'Hiring Guide', href: '/hiring-guide' },
  ],
  support: [
    { label: 'Help Center', href: '/help' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
  ],
};

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com/gigGeni', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com/gigGeni', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com/company/gigGeni', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://instagram.com/gigGeni', label: 'Instagram' },
];

export function Footer() {
  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    // You would implement the actual subscription logic here
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="container-width section-padding">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h3 className="text-3xl font-bold mb-4">
              Stay Updated with <span className="gradient-text">GiG Geni</span>
            </h3>
            <p className="text-gray-400 mb-8 text-lg">
              Get the latest competitions, career tips, and platform updates delivered to your inbox.
            </p>
            
            <form 
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            >
              <Input
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
                className="flex-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-[#FC5602]"
              />
              <Button 
                type="submit"
                className="btn-primary shrink-0"
              >
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-width section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-lg bg-[#FC5602] flex items-center justify-center">
                  <span className="text-white font-bold text-xl">G</span>
                </div>
                <span className="text-2xl font-bold gradient-text">GiG Geni</span>
              </div>
              
              <p className="text-gray-400 leading-relaxed">
                Revolutionizing hiring through competitive challenges. Where talent meets opportunity 
                in the most engaging and fair way possible.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm text-gray-400">
                  <MapPin className="h-4 w-4 text-[#FC5602]" />
                  <span>123 Innovation Drive, Tech City, TC 12345</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-400">
                  <Phone className="h-4 w-4 text-[#FC5602]" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-400">
                  <Mail className="h-4 w-4 text-[#FC5602]" />
                  <span>hello@gigGeni.com</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#FC5602] transition-all duration-200"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Footer Links */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
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
              transition={{ delay: 0.2 }}
            >
              <h4 className="font-semibold text-white mb-4">For Job Seekers</h4>
              <ul className="space-y-3">
                {footerLinks.forJobSeekers.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
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
              transition={{ delay: 0.3 }}
            >
              <h4 className="font-semibold text-white mb-4">For Employers</h4>
              <ul className="space-y-3">
                {footerLinks.forEmployers.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      <Separator className="bg-gray-800" />

      {/* Bottom Footer */}
      <div className="container-width py-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0"
        >
          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} GiG Geni. All rights reserved.
          </div>
          
          <div className="flex items-center space-x-1 text-gray-400 text-sm">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-[#FC5602] fill-current" />
            <span>for the future of hiring</span>
          </div>
          
          <div className="flex items-center space-x-6 text-sm">
            <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
              Cookie Policy
            </Link>
            <Link href="/accessibility" className="text-gray-400 hover:text-white transition-colors">
              Accessibility
            </Link>
            <Link href="/sitemap" className="text-gray-400 hover:text-white transition-colors">
              Sitemap
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}