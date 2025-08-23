import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HeroSection from './components/HeroSection'
import RecipeForm from './components/RecipeForm'
import RecipeResults from './components/RecipeResults'

import RecipeModal from './components/RecipeModal'

function App() {
  
  const [formData, setFormData] = useState({
    mainIngredients: '',
    cuisines: ['Italian'],
    mealType: 'Dinner',
    timeLimit: '30',
    difficulty: 'Easy',
    spiceLevel: 'Medium',
    equipment: ['Pan']
  })

  const [recipes, setRecipes] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleGenerateRecipes = async () => {
    setIsLoading(true)
    
    try {
      // Call the backend API
      const response = await fetch('http://localhost:5000/api/generate-recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to generate recipes')
      }
      
      setRecipes(data.recipes)
    } catch (error) {
      console.error('Error generating recipes:', error)
      alert('Failed to generate recipes. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe)
    setShowModal(true)
  }

  const handleGetMoreRecipes = async () => {
    setIsLoading(true)
    
    try {
      // Call the backend API to get more recipes
      const response = await fetch('http://localhost:5000/api/generate-recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to generate more recipes')
      }
      
      // Add new recipes to existing ones
      setRecipes(prev => [...prev, ...data.recipes])
    } catch (error) {
      console.error('Error generating more recipes:', error)
      alert('Failed to generate more recipes. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }



  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <HeroSection />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-12 flex gap-12 items-start"
        >
          {/* Form Card - Left Side */}
          <div className="w-3/5">
            <RecipeForm 
              formData={formData}
              onFormChange={handleFormChange}
              onGenerate={handleGenerateRecipes}
              isLoading={isLoading}
            />
          </div>
          
          {/* Video - Right Side */}
          <div className="w-2/5">
            <div className="sticky top-8 flex items-center h-full">
              <div className="w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover"
                  style={{ willChange: 'auto' }}
                >
                  <source src="/video.mp4" type="video/mp4" />
                  <div className="w-full h-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                    <div className="text-6xl">🍳</div>
                  </div>
                </video>
              </div>
            </div>
          </div>
        </motion.div>




      </div>

      {/* AI Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          >
            <div className="text-center">
              <div className="mb-8">
                <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-orange-500 mx-auto mb-6"></div>
                <h3 className="text-4xl font-bold text-white mb-4 averia-serif-libre-bold">Let AI Cook Your Meal!</h3>
                <p className="text-[#fef08a] text-xl font-noto-sans">Analyzing your ingredients and preferences...</p>
              </div>
              
              {/* Progress Messages */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-white/80 text-lg font-noto-sans"
                >
                  🍳 Crafting unique fusion combinations...
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                  className="text-white/80 text-lg font-noto-sans"
                >
                  🌶️ Balancing flavors and spice levels...
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3 }}
                  className="text-white/80 text-lg font-noto-sans"
                >
                  ✨ Finalizing your personalized recipes...
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recipe Results Overlay */}
      <AnimatePresence>
        {recipes.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-black rounded-2xl p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-end mb-6">
                <button
                  onClick={() => setRecipes([])}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              <RecipeResults 
                recipes={recipes}
                onRecipeClick={handleRecipeClick}
                onGetMoreRecipes={handleGetMoreRecipes}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recipe Detail Modal */}
      <AnimatePresence>
        {showModal && selectedRecipe && (
          <RecipeModal
            recipe={selectedRecipe}
            onClose={() => setShowModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
