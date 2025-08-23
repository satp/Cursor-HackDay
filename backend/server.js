import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Gemini AI
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('❌ GEMINI_API_KEY not found in environment variables');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);
console.log('✅ Gemini AI initialized successfully');

// Middleware
app.use(cors({
  origin: true, // Allow all origins
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Recipe generation endpoint
app.post('/api/generate-recipes', async (req, res) => {
  try {
    const {
      mainIngredients,
      cuisines,
      mealType,
      timeLimit,
      difficulty,
      spiceLevel,
      equipment
    } = req.body;

    // Create the prompt for Gemini
    const baseCuisine = cuisines[0];
    const additionalCuisines = cuisines.slice(1);
    const allCuisines = cuisines.join(' + ');
    
    const prompt = `Create 3 unique fusion recipes that combine ${allCuisines} cuisines. 

Requirements:
- Main ingredients: ${mainIngredients || 'Any available ingredients'} (these should be the PRIMARY components of each dish)
- Base cuisine: ${baseCuisine}
- Additional cuisines: ${additionalCuisines.join(', ')}
- Meal type: ${mealType}
- Time limit: ${timeLimit} minutes
- Difficulty: ${difficulty}
- Spice level: ${spiceLevel}
- Available equipment: ${equipment.join(', ') || 'Basic kitchen equipment'}

For each recipe, provide:
1. A creative title that reflects the fusion
2. A catchy tagline
3. Detailed ingredients list with quantities (prioritize the main ingredients)
4. Step-by-step cooking instructions
5. Cooking time
6. Difficulty level
7. Spice level
8. Why this fusion works (culinary explanation)
9. A detailed image prompt for generating a beautiful food photo

Format the response as a JSON array with this structure:
[
  {
    "title": "Recipe Title",
    "tagline": "Catchy description",
    "ingredients": ["ingredient 1", "ingredient 2", ...],
    "steps": ["step 1", "step 2", ...],
    "time": "X min",
    "difficulty": "Easy/Medium/Advanced",
    "spice": "Mild/Medium/Hot/Inferno",
    "why_it_works": "Explanation of why this fusion works",
    "image_prompt": "Detailed description for image generation"
  }
]

Make sure the recipes are creative, practical, showcase the fusion of cuisines effectively, and prominently feature the main ingredients as the star of each dish.`;

    // Generate recipes using Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    let text;
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      text = response.text();
    } catch (geminiError) {
      console.error('❌ Gemini API Error:', geminiError);
      throw new Error(`Gemini API Error: ${geminiError.message}`);
    }
    
    // Extract JSON from the response
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in response');
    }
    
    const recipes = JSON.parse(jsonMatch[0]);
    
    // Validate recipes structure
    if (!Array.isArray(recipes) || recipes.length !== 3) {
      throw new Error('Invalid recipes format');
    }
    
    // Add food-themed placeholder images that match the recipe
    const recipesWithImages = recipes.map((recipe, index) => {
      // Create a food-themed image URL based on the recipe
      const foodKeywords = recipe.title.toLowerCase().split(' ').slice(0, 3).join(',');
      const cuisineKeywords = recipe.title.toLowerCase().includes('asian') ? 'asian' : 
                             recipe.title.toLowerCase().includes('italian') ? 'italian' : 
                             recipe.title.toLowerCase().includes('mexican') ? 'mexican' : 
                             recipe.title.toLowerCase().includes('indian') ? 'indian' : 'food';
      
      return {
        ...recipe,
        imageUrl: `https://source.unsplash.com/400x300/?${cuisineKeywords},${foodKeywords},dish`,
        imageGenerated: false
      };
    });

    res.json({ success: true, recipes: recipesWithImages });
  } catch (error) {
    console.error('Error generating recipes:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to generate recipes',
      details: error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'FlavorForge Backend is running',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 FlavorForge Backend running on port ${PORT}`);
  console.log(`📡 API endpoints:`);
  console.log(`   - Health: http://localhost:${PORT}/api/health`);
  console.log(`   - Recipes: http://localhost:${PORT}/api/generate-recipes`);
});
