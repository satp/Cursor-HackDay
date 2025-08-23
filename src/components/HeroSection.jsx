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
        <div className="w-full text-center">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl lg:text-7xl font-bold mb-1 main-title leading-tight pb-2"
            style={{ 
              color: '#f97316', 
              opacity: 1, 
              transform: 'none',
              fontFamily: '"Averia Serif Libre", serif !important',
              fontWeight: '700 !important',
              fontStyle: 'normal !important'
            }}
          >
            FlavorForge
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl lg:text-2xl text-[#fef08a] font-bold"
          >
            Create Fusion Recipes
          </motion.p>
        </div>
        

      </motion.div>
    </div>
  )
}

export default HeroSection
