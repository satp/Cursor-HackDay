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



  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <HeroSection />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-12"
        >
          <RecipeForm 
            formData={formData}
            onFormChange={handleFormChange}
            onGenerate={handleGenerateRecipes}
            isLoading={isLoading}
          />
        </motion.div>




      </div>

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
              className="bg-dark-900 rounded-2xl p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gradient">Your Fusion Recipes</h2>
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
