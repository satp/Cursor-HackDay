import React from 'react'
import { motion } from 'framer-motion'
import { Clock, Flame, Zap } from 'lucide-react'

const RecipeResults = ({ recipes, onRecipeClick, onGetMoreRecipes }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'Advanced': return 'bg-red-500/20 text-red-400 border-red-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getSpiceColor = (spice) => {
    switch (spice) {
      case 'Mild': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'Medium': return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
      case 'Hot': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'Inferno': return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  return (
    <div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-center mb-8 averia-serif-libre-bold"
        style={{ color: '#f97316' }}
      >
        Your Fusion Recipes
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="recipe-card cursor-pointer group"
            onClick={() => onRecipeClick(recipe)}
          >
            {/* Recipe Image */}
            <div className="w-full h-48 rounded-xl mb-4 overflow-hidden group-hover:scale-105 transition-all duration-300">
              {recipe.imageUrl ? (
                <img 
                  src={recipe.imageUrl} 
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to a simple colored div with emoji
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div className="w-full h-full bg-gradient-to-br from-accent-500/20 to-teal-500/20 flex items-center justify-center group-hover:from-accent-500/30 group-hover:to-teal-500/30 transition-all duration-300" style={{ display: recipe.imageUrl ? 'none' : 'flex' }}>
                <div className="text-4xl">🍽️</div>
              </div>

            </div>
            
            {/* Recipe Title */}
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gradient transition-all duration-300">
              {recipe.title}
            </h3>
            
            {/* Recipe Tagline */}
            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
              {recipe.tagline}
            </p>
            
            {/* Recipe Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="flex items-center px-2 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full text-xs">
                <Clock className="w-3 h-3 mr-1" />
                {recipe.time}
              </div>
              <div className={`flex items-center px-2 py-1 border rounded-full text-xs ${getDifficultyColor(recipe.difficulty)}`}>
                <Zap className="w-3 h-3 mr-1" />
                {recipe.difficulty}
              </div>
              <div className={`flex items-center px-2 py-1 border rounded-full text-xs ${getSpiceColor(recipe.spice)}`}>
                <Flame className="w-3 h-3 mr-1" />
                {recipe.spice}
              </div>
              {/* Cuisine Badge */}
              {(recipe.cuisine || recipe.cuisines) && (
                <div className="flex items-center px-2 py-1 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-full text-xs">
                  <span className="mr-1">🍽️</span>
                  {recipe.cuisine || (recipe.cuisines && recipe.cuisines[0]) || 'Fusion'}
                </div>
              )}
            </div>
            

          </motion.div>
        ))}
      </div>
      
      {/* Get More Recipes Button */}
      <div className="text-center mt-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onGetMoreRecipes}
          className="px-8 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold rounded-xl hover:from-orange-700 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-orange-500/25"
        >
          Get More Recipes
        </motion.button>
      </div>
    </div>
  )
}

export default RecipeResults
