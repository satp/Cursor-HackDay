import React from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'

const RecipeForm = ({ formData, onFormChange, onGenerate, isLoading }) => {
  const cuisines = ['Italian', 'Chinese', 'Japanese', 'Korean', 'Indian', 'Mexican', 'Thai', 'Mediterranean', 'Middle Eastern', 'American']
  const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert', 'Drink']
  const timeLimits = ['15', '30', '45', '60+']
  const difficulties = ['Easy', 'Medium', 'Advanced']
  const spiceLevels = ['Mild', 'Medium', 'Hot', 'Inferno']
  const equipment = ['Stovetop', 'Oven', 'Air-fryer', 'Instant Pot', 'Grill', 'Blender', 'Microwave']

  const handleCuisineToggle = (cuisine) => {
    if (formData.cuisines.includes(cuisine)) {
      // Remove cuisine if already selected
      onFormChange('cuisines', formData.cuisines.filter(c => c !== cuisine))
    } else {
      // Add cuisine to the list
      onFormChange('cuisines', [...formData.cuisines, cuisine])
    }
  }

  const handleEquipmentToggle = (equipment) => {
    if (formData.equipment.includes(equipment)) {
      onFormChange('equipment', formData.equipment.filter(e => e !== equipment))
    } else {
      onFormChange('equipment', [...formData.equipment, equipment])
    }
  }

  const isFormValid = () => {
    return formData.mainIngredients.trim() !== '' &&
           formData.cuisines.length > 0 &&
           formData.mealType !== '' &&
           formData.timeLimit !== '' &&
           formData.difficulty !== '' &&
           formData.spiceLevel !== '' &&
           formData.equipment.length > 0;
  }

  return (
    <div className="glass-effect rounded-2xl p-8">
      <div className="space-y-8">
        {/* Main Ingredients Input */}
        <div>
          <div>
            <label className="form-label">
              Main Ingredients <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={formData.mainIngredients}
              onChange={(e) => onFormChange('mainIngredients', e.target.value)}
              placeholder="E.g., chicken, broccoli, rice"
              className="w-full px-4 py-3 mt-3 bg-black border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all duration-200"
            />
          </div>
        </div>

        {/* Cuisines */}
        <div>
          <label className="form-label">
            Cuisines <span className="text-red-400">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {cuisines.map(cuisine => (
              <button
                key={cuisine}
                onClick={() => handleCuisineToggle(cuisine)}
                className={`pill-button ${
                  formData.cuisines.includes(cuisine)
                    ? formData.cuisines[0] === cuisine 
                      ? 'pill-button-base-cuisine' // Base cuisine with orange outline
                      : 'pill-button-selected'
                    : 'pill-button-unselected'
                }`}
              >
                {cuisine}
                {formData.cuisines[0] === cuisine && (
                  <span className="ml-1 text-xs text-accent-300">(Base)</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Meal Type */}
        <div>
          <label className="form-label">
            Meal Type <span className="text-red-400">*</span>
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
          <label className="form-label">
            Time Limit <span className="text-red-400">*</span>
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
                {time} min
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty */}
        <div>
          <label className="form-label">
            Difficulty <span className="text-red-400">*</span>
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
          <label className="form-label">
            Spice Level <span className="text-red-400">*</span>
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
          <label className="form-label">
            Equipment <span className="text-red-400">*</span>
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
          disabled={isLoading || !isFormValid()}
          className={`glow-button w-full mt-8 ${
            isFormValid() 
              ? 'disabled:opacity-50 disabled:cursor-not-allowed' 
              : 'opacity-50 cursor-not-allowed'
          }`}
        >
          Create Recipes
        </motion.button>


      </div>
    </div>
  )
}

export default RecipeForm
