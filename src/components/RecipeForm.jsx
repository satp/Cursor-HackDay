import React from 'react'
import { motion } from 'framer-motion'
import { Clock, X } from 'lucide-react'

const RecipeForm = ({ formData, onFormChange, onGenerate, isLoading }) => {
  const cuisines = ['Italian', 'Chinese', 'Japanese', 'Korean', 'Indian', 'Mexican', 'Thai', 'Mediterranean', 'Middle Eastern', 'American']
  const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert', 'Drink']
  const timeLimits = ['15', '30', '45', '60+']
  const difficulties = ['Easy', 'Medium', 'Advanced']
  const spiceLevels = ['Mild', 'Medium', 'Hot', 'Inferno']
  const equipment = ['Stovetop', 'Oven', 'Air-fryer', 'Instant Pot', 'Grill', 'Blender', 'Microwave']

  const handleCuisineToggle = (cuisine) => {
    if (formData.additionalCuisines.includes(cuisine)) {
      onFormChange('additionalCuisines', formData.additionalCuisines.filter(c => c !== cuisine))
    } else {
      onFormChange('additionalCuisines', [...formData.additionalCuisines, cuisine])
    }
  }

  const handleEquipmentToggle = (equipment) => {
    if (formData.equipment.includes(equipment)) {
      onFormChange('equipment', formData.equipment.filter(e => e !== equipment))
    } else {
      onFormChange('equipment', [...formData.equipment, equipment])
    }
  }

  return (
    <div className="glass-effect rounded-2xl p-8">
      <div className="space-y-8">
        {/* Main Ingredients Input */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Main ingredients
          </label>
          <input
            type="text"
            value={formData.mainIngredients}
            onChange={(e) => onFormChange('mainIngredients', e.target.value)}
            placeholder="E.g., chicken, broccoli, rice"
            className="w-full px-4 py-3 bg-dark-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all duration-200"
          />
        </div>

        {/* Base Cuisine */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Base Cuisine
          </label>
          <select
            value={formData.baseCuisine}
            onChange={(e) => onFormChange('baseCuisine', e.target.value)}
            className="w-full px-4 py-3 bg-dark-800 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all duration-200"
          >
            {cuisines.map(cuisine => (
              <option key={cuisine} value={cuisine}>{cuisine}</option>
            ))}
          </select>
        </div>

        {/* Additional Cuisines */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Additional Cuisines
          </label>
          <div className="flex flex-wrap gap-2">
            {cuisines.map(cuisine => (
              <button
                key={cuisine}
                onClick={() => handleCuisineToggle(cuisine)}
                className={`pill-button ${
                  formData.additionalCuisines.includes(cuisine)
                    ? 'pill-button-selected'
                    : 'pill-button-unselected'
                }`}
              >
                {cuisine}
                {formData.additionalCuisines.includes(cuisine) && (
                  <X className="w-3 h-3 ml-1" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Meal Type */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Meal Type
          </label>
          <div className="flex flex-wrap gap-2">
            {mealTypes.map(type => (
              <button
                key={type}
                onClick={() => onFormChange('mealType', type)}
                className={`pill-button ${
                  formData.mealType === type
                    ? 'pill-button-selected'
                    : 'pill-button-unselected'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Time Limit */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Time Limit
          </label>
          <div className="flex flex-wrap gap-2">
            {timeLimits.map(time => (
              <button
                key={time}
                onClick={() => onFormChange('timeLimit', time)}
                className={`pill-button ${
                  formData.timeLimit === time
                    ? 'pill-button-selected'
                    : 'pill-button-unselected'
                }`}
              >
                <Clock className="w-4 h-4 mr-1" />
                {time} min
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Difficulty
          </label>
          <div className="flex flex-wrap gap-2">
            {difficulties.map(difficulty => (
              <button
                key={difficulty}
                onClick={() => onFormChange('difficulty', difficulty)}
                className={`pill-button ${
                  formData.difficulty === difficulty
                    ? 'pill-button-selected'
                    : 'pill-button-unselected'
                }`}
              >
                {difficulty}
              </button>
            ))}
          </div>
        </div>

        {/* Spice Level */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Spice Level
          </label>
          <div className="flex flex-wrap gap-2">
            {spiceLevels.map(spice => (
              <button
                key={spice}
                onClick={() => onFormChange('spiceLevel', spice)}
                className={`pill-button ${
                  formData.spiceLevel === spice
                    ? 'pill-button-selected'
                    : 'pill-button-unselected'
                }`}
              >
                {spice}
              </button>
            ))}
          </div>
        </div>

        {/* Equipment */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Equipment
          </label>
          <div className="flex flex-wrap gap-2">
            {equipment.map(item => (
              <button
                key={item}
                onClick={() => handleEquipmentToggle(item)}
                className={`pill-button ${
                  formData.equipment.includes(item)
                    ? 'pill-button-selected'
                    : 'pill-button-unselected'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onGenerate}
          disabled={isLoading}
          className="glow-button w-full mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
              Generating Recipes...
            </div>
          ) : (
            'Generate 3 Recipes'
          )}
        </motion.button>
      </div>
    </div>
  )
}

export default RecipeForm
