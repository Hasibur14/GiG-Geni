// components/home/BenefitsSection.tsx
'use client';

import { motion, useInView } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Users, ArrowRight, Star, CheckCircle } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import { employeeBenefits, employerBenefits } from '@/lib/mock-data';
import { Card, CardContent } from '@/components/ui/card';

interface BenefitCardProps {
  benefit: {
    icon: any;
    title: string;
    description: string;
    color: string;
  };
  index: number;
}

interface HorizontalScrollSectionProps {
  title: string;
  subtitle: string;
  icon: any;
  iconColor: string;
  benefits: any[];
  delay?: number;
}

function BenefitCard({ benefit, index }: BenefitCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const isActive = isHovered || isClicked;

  return (
    <motion.div
      className="relative w-72 sm:w-80 h-72 flex-shrink-0 cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="w-full h-full border-0 shadow-none transition-all duration-500 overflow-hidden group relative rounded-xl bg-white">
          {/* Background gradient */}
           <div className={`absolute inset-0 w-full h-full bg-gradient-to-br ${benefit.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
          
          {/* Default content */}
           <motion.div
              className="absolute inset-0 z-10 p-6 w-full h-full flex flex-col justify-between"
              animate={{ opacity: isActive ? 0 : 1, y: isActive ? -20 : 0 }}
              transition={{ duration: 0.3 }}
            >
            <div>
              <div className={`w-20 h-20 bg-gradient-to-br ${benefit.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <benefit.icon className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                {benefit.title}
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                {benefit.description.substring(0, 80)}...
              </p>
            </div>
            <div className="flex items-center text-gray-500 mt-4">
              <span className="text-sm font-medium">Hover for details</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          {/* Hover content */}
           <motion.div
              className="absolute inset-0 p-6 w-full h-full flex flex-col justify-between"
              animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
              transition={{ duration: 0.3 }}
              style={{ pointerEvents: isActive ? 'auto' : 'none' }}
            >
             <div className={`absolute inset-0 w-full h-full bg-gradient-to-br ${benefit.color} opacity-95`} />
            <div className="relative z-10 text-white">
              <div className="flex items-center mb-4">
                <benefit.icon className="w-8 h-8 mr-3" />
                <h4 className="text-lg font-bold">{benefit.title}</h4>
              </div>
              <p className="text-white/90 leading-relaxed mb-6">
                {benefit.description}
              </p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm">Proven Results</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-2 fill-current" />
                  <span className="text-sm">Premium Feature</span>
                </div>
              </div>
            </div>
            <div className="relative z-10 flex items-center justify-between">
              <span className="text-white/80 text-sm font-medium">Learn More</span>
              <motion.div
                animate={{ scale: isActive ? 1.1 : 1 }}
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
              >
                <ArrowRight className="w-4 h-4 text-white" />
              </motion.div>
            </div>
          </motion.div>
       </div>
    </motion.div>
  );
}

function HorizontalScrollSection({ title, subtitle, icon: Icon, iconColor, benefits, delay = 0 }: HorizontalScrollSectionProps) {
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.innerWidth < 640 ? 288 : 320; // Responsive scroll amount
      const newScrollLeft = direction === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    checkScrollButtons();
  }, [benefits]);

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      className="mb-16"
    >
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className={`w-16 h-16 bg-gradient-to-br ${iconColor} rounded-xl flex items-center justify-center`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
            <p className="text-gray-600">{subtitle}</p>
          </div>
        </div>
        
        {/* Scroll Controls */}
        <div className="flex space-x-2">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
              canScrollLeft 
                ? 'border-gray-300 hover:border-gray-400 text-gray-600 hover:text-gray-800' 
                : 'border-gray-200 text-gray-300 cursor-not-allowed'
            }`}
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
              canScrollRight 
                ? 'border-gray-300 hover:border-gray-400 text-gray-600 hover:text-gray-800' 
                : 'border-gray-200 text-gray-300 cursor-not-allowed'
            }`}
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scrollable Cards Container */}
      <div className="relative overflow-hidden">
        <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto overflow-y-hidden hide-scrollbar"
            onScroll={checkScrollButtons}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
          <div className="flex space-x-4 min-w-max">
            {benefits.map((benefit, index) => (
              <BenefitCard
                key={benefit.title}
                benefit={benefit}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}



export function BenefitsSection() {
   useEffect(() => {
     // Add scrollbar hiding styles
     const style = document.createElement('style');
     style.textContent = `
       .hide-scrollbar {
         -ms-overflow-style: none;
         scrollbar-width: none;
       }
       .hide-scrollbar::-webkit-scrollbar {
         display: none;
       }
     `;
     document.head.appendChild(style);
     
     return () => {
       document.head.removeChild(style);
     };
   }, []);

   return (
     <section className="section-padding bg-gray-50">
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
            Why Choose GiG Geni?
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Benefits for{' '}
            <span className="gradient-text">Everyone</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our platform revolutionizes hiring by creating win-win situations for both 
            job seekers and employers through competitive challenges.
          </p>
        </motion.div>

        {/* Employee Benefits Section */}
        <HorizontalScrollSection
          title="For Job Seekers"
          subtitle="Turn your job search into an exciting competition and get rewarded for your skills."
          icon={Users}
          iconColor="from-[#FC5602] to-[#FF7B02]"
          benefits={employeeBenefits}
          delay={0}
        />

        {/* Employer Benefits Section */}
        <HorizontalScrollSection
          title="For Employers"
          subtitle="Find the best talent efficiently through performance-based hiring."
          icon={Briefcase}
          iconColor="from-purple-500 to-purple-600"
          benefits={employerBenefits}
          delay={0.2}
        />

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-20"
        >
          <div className="bg-gradient-to-r from-[#FC5602] to-[#FF7B02] rounded-3xl p-8 lg:p-12 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />
            
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mb-6"
              >
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white fill-current" />
                </div>
              </motion.div>
              
              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Ready to Transform Your Career?
              </h3>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of professionals who have already discovered the power of competitive hiring.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-[#FC5602] font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <span className="flex items-center justify-center">
                    Start Competing
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-[#FC5602] transition-all duration-300"
                >
                  <span className="flex items-center justify-center">
                    Post a Challenge
                    <Briefcase className="w-4 h-4 ml-2" />
                  </span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}