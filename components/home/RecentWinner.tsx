'use client';

import { useState, useEffect } from 'react';
import { Trophy, Award, CheckCircle, Building2, DollarSign, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { winnersData } from '@/lib/mock-data';


interface Winner {
  id: string;
  name: string;
  image: string;
  competition: string;
  company: string;
  hired: boolean;
  position?: string;
  prize?: string;
  organizedBy?: string;
  date?: string;
}

interface RecentWinnerCarouselProps {
  winners?: Winner[];
  autoRotate?: boolean;
  interval?: number;
}

const RecentWinnerCarousel = ({ 
  winners = winnersData, 
  autoRotate = true, 
  interval = 4000 
}: RecentWinnerCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-rotate functionality
  useEffect(() => {
    if (!autoRotate || isHovered || winners.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex === winners.length - 1 ? 0 : prevIndex + 1;
        return nextIndex;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [autoRotate, isHovered, winners.length, interval, currentIndex]);

  const nextWinner = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === winners.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevWinner = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? winners.length - 1 : prevIndex - 1
    );
  };

  const currentWinner = winners[currentIndex];

  if (!currentWinner) return null;

  return (
    <div 
      className="relative w-full max-w-sm mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentWinner.id}
          initial={{ opacity: 0, x: 50, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -50, scale: 0.95 }}
          transition={{ 
            duration: 0.4, 
            ease: "easeInOut"
          }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
        >
          {/* Compact header */}
          <div className="bg-gradient-to-r from-[#FC5602] to-[#FF7B02] p-3 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Trophy className="w-4 h-4 text-yellow-200" />
                <p className="font-semibold text-xs truncate">{currentWinner.competition}</p>
              </div>
              {currentWinner.hired && (
                <div className="bg-green-500 text-white px-2 py-0.5 rounded-full flex items-center space-x-1">
                  <CheckCircle className="w-3 h-3" />
                  <span className="text-xs font-bold">HIRED</span>
                </div>
              )}
            </div>
            <p className="text-xs opacity-90 mt-1">{currentWinner.organizedBy || currentWinner.company}</p>
          </div>
          
          {/* Compact profile section */}
          <div className="p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-lg bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0">
                <img 
                  src={currentWinner.image} 
                  alt={currentWinner.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(currentWinner.name)}&background=FC5602&color=fff&size=64`;
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 text-sm truncate">{currentWinner.name}</h3>
                <p className="text-[#FC5602] font-medium text-xs">{currentWinner.position || '1st Place'} Winner</p>
                {currentWinner.prize && (
                  <div className="flex items-center space-x-1 mt-1 text-green-600">
                    <DollarSign className="w-3 h-3" />
                    <span className="font-bold text-xs">{currentWinner.prize}</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Compact stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-xl border border-orange-200/30 text-center">
                <Award className="w-5 h-5 text-[#FC5602] mx-auto mb-1" />
                <p className="text-xs text-gray-600 font-medium">Champion</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl border border-blue-200/30 text-center">
                <Trophy className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                <p className="text-xs text-gray-600 font-medium">Top Talent</p>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation controls */}
      {winners.length > 1 && (
        <>
          <button
            onClick={prevWinner}
            className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 p-1.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200 backdrop-blur-sm border border-gray-200"
            aria-label="Previous winner"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextWinner}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 p-1.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200 backdrop-blur-sm border border-gray-200"
            aria-label="Next winner"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}

      {/* Dots indicator */}
      {winners.length > 1 && (
        <div className="flex justify-center space-x-1.5 mt-3">
          {winners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-[#FC5602] scale-125 shadow-sm' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to winner ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentWinnerCarousel;