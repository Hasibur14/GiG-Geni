'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Home, Search, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const floatingElements = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    delay: i * 0.5,
    duration: 3 + i * 0.3,
  }))

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-gradient-to-br from-orange-50 via-white to-orange-100">
      <div className="min-h-screen flex items-center justify-center relative">
          {/* Floating Background Elements */}
          {floatingElements.map((element) => (
            <motion.div
              key={element.id}
              className="absolute w-20 h-20 bg-gradient-to-r from-orange-200 to-orange-300 rounded-full opacity-20"
              animate={{
                y: [-20, 20, -20],
                x: [-10, 10, -10],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: element.duration,
                repeat: Infinity,
                delay: element.delay,
                ease: "easeInOut",
              }}
              style={{
                left: `${10 + element.id * 15}%`,
                top: `${20 + element.id * 10}%`,
              }}
            />
          ))}

          {/* Interactive Cursor Follower */}
          <motion.div
            className="fixed w-4 h-4 bg-[#FC5602] rounded-full pointer-events-none z-50 opacity-60"
            animate={{
              x: mousePosition.x - 8,
              y: mousePosition.y - 8,
              scale: isHovering ? 2 : 1,
            }}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
          />

          <div className="text-center z-10 px-4 max-w-2xl">
            {/* Animated 404 */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
              className="mb-8"
            >
              <h1 className="text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FC5602] via-orange-600 to-orange-800 leading-none">
                404
              </h1>
            </motion.div>

            {/* Bouncing Search Icon */}
            <motion.div
              animate={{
                y: [-10, 10, -10],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="mb-6 flex justify-center"
            >
              <Search className="w-16 h-16 text-[#FC5602]" />
            </motion.div>

            {/* Animated Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mb-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Oops! This page is playing hide and seek
              </h2>
              <p className="text-lg text-gray-600 mb-2">
                It seems our page has decided to take an unscheduled coffee break ☕
              </p>
              <p className="text-md text-gray-500">
                Don't worry, our best developers are on the case!
              </p>
            </motion.div>

            {/* Animated Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onHoverStart={() => setIsHovering(true)}
                  onHoverEnd={() => setIsHovering(false)}
                  className="flex items-center gap-2 bg-gradient-to-r from-[#FC5602] to-orange-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Home className="w-5 h-5" />
                  Back to Home
                </motion.button>
              </Link>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setIsHovering(true)}
                onHoverEnd={() => setIsHovering(false)}
                onClick={() => window.history.back()}
                className="flex items-center gap-2 bg-white text-gray-700 px-8 py-3 rounded-full font-semibold border-2 border-gray-200 hover:border-[#FC5602]/30 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5" />
                Go Back
              </motion.button>
            </motion.div>

            {/* Fun Fact */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mt-12 p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg"
            >
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-[#FC5602]">Fun Fact:</span> The first 404 error was discovered at CERN in 1992. 
                You're now part of internet history! 🎉
              </p>
            </motion.div>
        </div>

        {/* Animated Corner Decorations */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 left-10 w-16 h-16 border-4 border-orange-200 rounded-full opacity-30"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-10 right-10 w-12 h-12 border-4 border-orange-300 rounded-full opacity-30"
        />
      </div>
    </div>
  )
}