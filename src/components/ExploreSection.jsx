import React from 'react'
import { motion } from 'framer-motion'

const ExploreSection = ({ onExploreClick }) => {
  const fusionCombinations = [
    ['American', 'Thai'],
    ['Indian', 'Greek'],
    ['Japanese', 'Caribbean']
  ]

  return (
    <div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-center mb-8 text-gradient"
      >
        Explore
      </motion.h2>
      
      <div className="flex flex-wrap justify-center gap-4">
        {fusionCombinations.map((combination, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onExploreClick(combination)}
            className="px-6 py-3 bg-dark-800 text-white rounded-xl border border-gray-600 hover:border-teal-500/50 hover:bg-dark-700 transition-all duration-300 text-lg font-medium"
          >
            {combination[0]} + {combination[1]}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export default ExploreSection
