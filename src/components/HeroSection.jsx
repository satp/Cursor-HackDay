import React from 'react'
import { motion } from 'framer-motion'

const HeroSection = () => {
  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center lg:text-left lg:flex lg:items-center lg:justify-between"
      >
        <div className="lg:w-2/3">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl lg:text-7xl font-bold text-gradient mb-4"
          >
            FlavorForge
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl lg:text-2xl text-gray-300 font-light"
          >
            Create Fusion Recipes
          </motion.p>
        </div>
        
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="hidden lg:block lg:w-1/3"
        >
          <div className="relative">
            <div className="w-64 h-64 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-500/20 to-teal-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
              <div className="relative w-full h-full bg-gradient-to-br from-accent-400 to-teal-400 rounded-full flex items-center justify-center">
                <div className="text-6xl">🍖</div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default HeroSection
