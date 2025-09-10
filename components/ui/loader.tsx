'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'dots' | 'pulse' | 'orbit'
  className?: string
  text?: string
}

const sizeClasses = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16'
}

const textSizeClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl'
}

export function Loader({ size = 'md', variant = 'default', className, text }: LoaderProps) {
  const renderLoader = () => {
    switch (variant) {
      case 'dots':
        return (
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-[#FC5602] rounded-full"
                animate={{
                  y: [-4, 4, -4],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        )

      case 'pulse':
        return (
          <motion.div
            className={cn(
              'bg-gradient-to-r from-[#FC5602] to-orange-600 rounded-full',
              sizeClasses[size]
            )}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )

      case 'orbit':
        return (
          <div className={cn('relative', sizeClasses[size])}>
            <motion.div
              className="absolute inset-0 border-2 border-[#FC5602]/20 rounded-full"
            />
            <motion.div
              className="absolute top-0 left-1/2 w-2 h-2 bg-[#FC5602] rounded-full -translate-x-1/2 -translate-y-1"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ transformOrigin: `0 ${parseInt(sizeClasses[size].split(' ')[0].slice(2)) * 2}px` }}
            />
            <motion.div
              className="absolute top-1/2 right-0 w-1.5 h-1.5 bg-orange-400 rounded-full translate-x-1 -translate-y-1/2"
              animate={{ rotate: -360 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ transformOrigin: `-${parseInt(sizeClasses[size].split(' ')[0].slice(2)) * 2}px 0` }}
            />
          </div>
        )

      default:
        return (
          <div className={cn('relative', sizeClasses[size])}>
            {/* Outer ring */}
            <motion.div
              className="absolute inset-0 border-3 border-[#FC5602]/20 rounded-full"
            />
            {/* Spinning arc */}
            <motion.div
              className="absolute inset-0 border-3 border-transparent border-t-[#FC5602] rounded-full"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            {/* Inner glow */}
            <motion.div
              className="absolute inset-2 bg-gradient-to-r from-[#FC5602]/10 to-orange-400/10 rounded-full"
              animate={{
                scale: [0.8, 1, 0.8],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        )
    }
  }

  return (
    <div className={cn('flex flex-col items-center justify-center space-y-3', className)}>
      {renderLoader()}
      {text && (
        <motion.p
          className={cn(
            'text-gray-600 font-medium',
            textSizeClasses[size]
          )}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {text}
        </motion.p>
      )}
    </div>
  )
}

// Full-screen loader overlay
export function LoaderOverlay({ text = 'Loading...', variant = 'default' }: { text?: string; variant?: LoaderProps['variant'] }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm"
    >
      <div className="text-center">
        <Loader size="xl" variant={variant} text={text} />
        
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#FC5602]/20 rounded-full"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
            style={{
              left: `${50 + Math.random() * 20 - 10}%`,
              top: `${50 + Math.random() * 20 - 10}%`
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}

// Page loading component
export function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-100">
      <div className="text-center space-y-6">
        {/* Brand logo area */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FC5602] to-orange-600">
            GiG Geni
          </h1>
        </motion.div>
        
        <Loader size="xl" variant="orbit" text="Loading your experience..." />
        
        {/* Progress indicator */}
        <motion.div
          className="w-64 h-1 bg-gray-200 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-[#FC5602] to-orange-600 rounded-full"
            animate={{ x: ['-100%', '100%'] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </div>
    </div>
  )
}