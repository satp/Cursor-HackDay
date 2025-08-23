import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Copy, Download, Clock, Flame, Zap } from 'lucide-react'

const RecipeModal = ({ recipe, onClose }) => {
  const [activeTab, setActiveTab] = useState('ingredients')

  const tabs = [
    { id: 'ingredients', label: 'Ingredients' },
    { id: 'steps', label: 'Steps' }
  ]

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

  const copyRecipe = async () => {
    const recipeText = `
${recipe.title}
${recipe.tagline}

INGREDIENTS:
${recipe.ingredients.map(ingredient => `• ${ingredient}`).join('\n')}

STEPS:
${recipe.steps.map((step, index) => `${index + 1}. ${step}`).join('\n')}

NOTES:
${recipe.why_it_works}

Time: ${recipe.time} | Difficulty: ${recipe.difficulty} | Spice: ${recipe.spice}
    `.trim()

    try {
      await navigator.clipboard.writeText(recipeText)
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy recipe:', err)
    }
  }

  const downloadRecipe = () => {
    const recipeText = `
${recipe.title}
${recipe.tagline}

INGREDIENTS:
${recipe.ingredients.map(ingredient => `• ${ingredient}`).join('\n')}

STEPS:
${recipe.steps.map((step, index) => `${index + 1}. ${step}`).join('\n')}

NOTES:
${recipe.why_it_works}

Time: ${recipe.time} | Difficulty: ${recipe.difficulty} | Spice: ${recipe.spice}
    `.trim()

    const blob = new Blob([recipeText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${recipe.title.replace(/\s+/g, '_')}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="modal-overlay"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">{recipe.title}</h2>
                <p className="text-gray-400">{recipe.tagline}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            
            {/* Recipe Badges */}
            <div className="flex flex-wrap gap-2 mt-4">
              <div className="flex items-center px-3 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full text-sm">
                <Clock className="w-4 h-4 mr-1" />
                {recipe.time}
              </div>
              <div className={`flex items-center px-3 py-1 border rounded-full text-sm ${getDifficultyColor(recipe.difficulty)}`}>
                <Zap className="w-4 h-4 mr-1" />
                {recipe.difficulty}
              </div>
              <div className={`flex items-center px-3 py-1 border rounded-full text-sm ${getSpiceColor(recipe.spice)}`}>
                <Flame className="w-4 h-4 mr-1" />
                {recipe.spice}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-white/10">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-4 px-6 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-teal-400 border-b-2 border-teal-400'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6 max-h-96 overflow-y-auto">
            <AnimatePresence mode="wait">
              {activeTab === 'ingredients' && (
                <motion.div
                  key="ingredients"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-lg font-semibold text-white mb-4">Ingredients</h3>
                  <ul className="space-y-2">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-teal-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-300">{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {activeTab === 'steps' && (
                <motion.div
                  key="steps"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-lg font-semibold text-white mb-4">Steps</h3>
                  <ol className="space-y-4">
                    {recipe.steps.map((step, index) => (
                      <li key={index} className="flex">
                        <span className="w-6 h-6 bg-teal-400 text-dark-900 rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">
                          {index + 1}
                        </span>
                        <span className="text-gray-300">{step}</span>
                      </li>
                    ))}
                  </ol>
                </motion.div>
              )}


            </AnimatePresence>
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-white/10 flex gap-3">
            <button
              onClick={copyRecipe}
              className="flex items-center px-4 py-2 bg-dark-700 text-white rounded-lg hover:bg-dark-600 transition-colors"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy Recipe
            </button>
            <button
              onClick={downloadRecipe}
              className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default RecipeModal
