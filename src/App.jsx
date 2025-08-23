import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HeroSection from './components/HeroSection'
import RecipeForm from './components/RecipeForm'
import RecipeResults from './components/RecipeResults'
import ExploreSection from './components/ExploreSection'
import RecipeModal from './components/RecipeModal'

function App() {
  const [formData, setFormData] = useState({
    mainIngredients: '',
    baseCuisine: 'Italian',
    additionalCuisines: [],
    mealType: 'Dinner',
    timeLimit: '30',
    difficulty: 'Easy',
    spiceLevel: 'Medium',
    equipment: []
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
      // Simulate API call to GPT
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock response - in real app, this would be the GPT API response
      const mockRecipes = [
        {
          title: "Thai-Italian Fusion Chicken",
          tagline: "A perfect blend of Thai spices and Italian herbs",
          ingredients: [
            "2 chicken breasts",
            "1 cup jasmine rice",
            "2 tbsp olive oil",
            "3 cloves garlic",
            "1 inch ginger",
            "2 tbsp soy sauce",
            "1 tbsp fish sauce",
            "1 tsp red chili flakes",
            "Fresh basil",
            "Lime juice"
          ],
          steps: [
            "Marinate chicken with garlic, ginger, and soy sauce for 30 minutes",
            "Cook rice according to package instructions",
            "Heat olive oil in a pan and cook chicken until golden",
            "Add fish sauce and chili flakes",
            "Serve with rice, garnish with basil and lime"
          ],
          time: "30 min",
          difficulty: "Easy",
          spice: "Medium",
          why_it_works: "The combination of Thai umami flavors with Italian herbs creates a unique fusion that's both familiar and exciting.",
          image_prompt: "A beautifully plated Thai-Italian fusion chicken dish with golden brown chicken, fluffy jasmine rice, fresh green basil leaves, and lime wedges on a dark ceramic plate"
        },
        {
          title: "Mexican-Japanese Tacos",
          tagline: "Sushi meets street food in this innovative fusion",
          ingredients: [
            "4 corn tortillas",
            "1 lb fresh tuna",
            "1 avocado",
            "1 cucumber",
            "2 tbsp mayonnaise",
            "1 tbsp sriracha",
            "1 tsp wasabi",
            "Sesame seeds",
            "Nori sheets",
            "Pickled ginger"
          ],
          steps: [
            "Cut tuna into small cubes and mix with mayonnaise, sriracha, and wasabi",
            "Warm tortillas on a dry pan",
            "Layer avocado, tuna mixture, and cucumber on tortillas",
            "Sprinkle with sesame seeds and crumbled nori",
            "Serve with pickled ginger on the side"
          ],
          time: "15 min",
          difficulty: "Easy",
          spice: "Medium",
          why_it_works: "The fresh flavors of sushi combined with the convenience of tacos create a perfect fusion of Japanese precision and Mexican comfort.",
          image_prompt: "Colorful Mexican-Japanese fusion tacos with fresh tuna, avocado, and cucumber, topped with sesame seeds and nori, served on a rustic wooden board"
        },
        {
          title: "Indian-Greek Curry",
          tagline: "Mediterranean meets the subcontinent",
          ingredients: [
            "1 lb lamb shoulder",
            "1 cup Greek yogurt",
            "2 tbsp olive oil",
            "1 onion",
            "4 cloves garlic",
            "1 inch ginger",
            "2 tbsp curry powder",
            "1 tsp oregano",
            "1 tsp cumin",
            "Fresh mint",
            "Feta cheese"
          ],
          steps: [
            "Marinate lamb in yogurt, garlic, and ginger for 2 hours",
            "Heat olive oil and sauté onions until golden",
            "Add lamb and brown on all sides",
            "Add curry powder, oregano, and cumin",
            "Simmer until lamb is tender",
            "Garnish with fresh mint and crumbled feta"
          ],
          time: "60+ min",
          difficulty: "Advanced",
          spice: "Hot",
          why_it_works: "The tenderizing properties of Greek yogurt combined with Indian spices create a unique fusion that's both rich and aromatic.",
          image_prompt: "Rich Indian-Greek fusion curry with tender lamb pieces in a golden sauce, garnished with fresh mint leaves and crumbled white feta cheese, served in a deep ceramic bowl"
        }
      ]
      
      setRecipes(mockRecipes)
    } catch (error) {
      console.error('Error generating recipes:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe)
    setShowModal(true)
  }

  const handleExploreClick = (cuisines) => {
    setFormData(prev => ({
      ...prev,
      baseCuisine: cuisines[0],
      additionalCuisines: cuisines.slice(1)
    }))
  }

  return (
    <div className="min-h-screen bg-dark-950">
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

        {recipes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16"
          >
            <RecipeResults 
              recipes={recipes}
              onRecipeClick={handleRecipeClick}
            />
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <ExploreSection onExploreClick={handleExploreClick} />
        </motion.div>
      </div>

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
