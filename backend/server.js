import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI, Modality } from '@google/genai';

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

const genAI = new GoogleGenAI({ apiKey });
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

CRITICAL REQUIREMENTS:
- Main ingredients: ${mainIngredients || 'Any available ingredients'} - You MUST use these EXACT ingredients as specified. If user says "rice", use "rice" not "jasmine rice" or "brown rice". If user says "chicken", use "chicken" not "chicken breast" or "chicken thighs". Use the ingredients exactly as written.
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
3. Detailed ingredients list with quantities (MUST include the exact main ingredients specified by user)
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

IMPORTANT: The main ingredients provided by the user (${mainIngredients}) must be used EXACTLY as written. Do not substitute with similar ingredients. These ingredients should be the star of each dish.`;

    // Generate recipes using Gemini
    console.log('🍳 Starting recipe generation...');
    console.log('🤖 Using model: gemini-1.5-flash');
    
    let text;
    try {
      console.log('🔄 Calling Gemini API for recipes...');
      const result = await genAI.models.generateContent({
        model: "gemini-1.5-flash",
        contents: prompt
      });
      text = result.candidates[0].content.parts[0].text;
      console.log('✅ Recipe generation successful');
      console.log('📝 Response length:', text.length);
    } catch (geminiError) {
      console.error('❌ Gemini API Error:', geminiError);
      throw new Error(`Gemini API Error: ${geminiError.message}`);
    }
    
    // Extract JSON from the response
    console.log('🔍 Extracting JSON from response...');
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      console.error('❌ No valid JSON found in response');
      console.error('📝 Response text:', text.substring(0, 500) + '...');
      throw new Error('No valid JSON found in response');
    }
    
    console.log('✅ JSON found, parsing...');
    const recipes = JSON.parse(jsonMatch[0]);
    console.log('📊 Parsed recipes count:', recipes.length);
    
    // Validate recipes structure
    if (!Array.isArray(recipes) || recipes.length !== 3) {
      console.error('❌ Invalid recipes format:', recipes);
      throw new Error('Invalid recipes format');
    }
    
    console.log('✅ Recipes validation passed');
    
    // Generate actual food images using Gemini 2.0 Flash Preview Image Generation
    console.log('🚀 Starting Gemini image generation...');
    const recipesWithImages = [];

    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      console.log(`\n📸 Generating image for recipe ${i + 1}: ${recipe.title}`);

      try {
        console.log('🔧 Using Gemini 2.0 Flash Preview Image Generation model...');
        const imagePrompt = `Create a beautiful, appetizing photo of ${recipe.title}. This is a fusion dish that combines ${recipe.ingredients.join(', ')}. The image should be high quality, well-lit, and show the finished dish on a plate. Style: food photography, professional lighting, appetizing presentation.`;
        console.log('📝 Image prompt:', imagePrompt);

        console.log('🔄 Calling Gemini API for image generation...');
        const imageResult = await genAI.models.generateContent({
          model: "gemini-2.0-flash-preview-image-generation",
          contents: imagePrompt,
          config: {
            responseModalities: [Modality.TEXT, Modality.IMAGE],
          },
        });

        console.log('✅ Gemini API response received');
        console.log('📊 Response structure:', JSON.stringify(imageResult, null, 2));

        let imageUrl = null;
        let imageData = null;

        // Extract image data from response
        console.log('🔍 Extracting image data from response...');
        if (imageResult.candidates && imageResult.candidates[0] && imageResult.candidates[0].content) {
          console.log('📋 Found candidates, checking parts...');

          for (const part of imageResult.candidates[0].content.parts) {
            console.log('🔍 Part type:', part.text ? 'TEXT' : part.inlineData ? 'IMAGE' : 'UNKNOWN');

            if (part.inlineData) {
              console.log('🎯 Found image data!');
              const mimeType = part.inlineData.mimeType || 'image/png';
              imageUrl = `data:${mimeType};base64,${part.inlineData.data}`;
              imageData = part.inlineData.data;
              break;
            }
          }
        } else {
          console.log('❌ No candidates or content found in response');
        }

        if (imageUrl) {
          console.log('✅ Successfully generated Gemini image URL');
          recipesWithImages.push({
            ...recipe,
            imageUrl: imageUrl,
            imageGenerated: true
          });
        } else {
          console.log('⚠️ No Gemini image generated, trying regular gemini-2.0-flash as fallback...');

          // Try regular gemini-2.0-flash as fallback
          try {
            const fallbackResult = await genAI.models.generateContent({
              model: "gemini-2.0-flash",
              contents: imagePrompt,
              config: {
                responseModalities: [Modality.TEXT, Modality.IMAGE],
              },
            });
            
            // Check for image data in fallback response
            for (const part of fallbackResult.candidates[0].content.parts) {
              if (part.inlineData) {
                console.log('🎯 Found fallback image data!');
                const mimeType = part.inlineData.mimeType || 'image/png';
                imageUrl = `data:${mimeType};base64,${part.inlineData.data}`;
                break;
              }
            }

            if (imageUrl) {
              console.log('✅ Successfully generated fallback image');
              recipesWithImages.push({
                ...recipe,
                imageUrl: imageUrl,
                imageGenerated: true
              });
            } else {
              throw new Error('No fallback image generated');
            }
          } catch (fallbackError) {
            console.log('❌ Fallback also failed, using Unsplash fallback');
            const foodKeywords = recipe.title.toLowerCase().split(' ').slice(0, 3).join(',');
            const cuisineKeywords = recipe.title.toLowerCase().includes('asian') ? 'asian' :
                                   recipe.title.toLowerCase().includes('italian') ? 'italian' :
                                   recipe.title.toLowerCase().includes('mexican') ? 'mexican' :
                                   recipe.title.toLowerCase().includes('indian') ? 'indian' : 'food';

            imageUrl = `https://source.unsplash.com/400x300/?${cuisineKeywords},${foodKeywords},dish`;

            recipesWithImages.push({
              ...recipe,
              imageUrl: imageUrl,
              imageGenerated: false
            });
          }
        }

      } catch (error) {
        console.error(`❌ Error generating Gemini image for ${recipe.title}:`, error);
        console.error('🔍 Error details:', {
          name: error.name,
          message: error.message,
          stack: error.stack
        });

        // Use Unsplash as final fallback
        const foodKeywords = recipe.title.toLowerCase().split(' ').slice(0, 3).join(',');
        const cuisineKeywords = recipe.title.toLowerCase().includes('asian') ? 'asian' :
                               recipe.title.toLowerCase().includes('italian') ? 'italian' :
                               recipe.title.toLowerCase().includes('mexican') ? 'mexican' :
                               recipe.title.toLowerCase().includes('indian') ? 'indian' : 'food';

        const imageUrl = `https://source.unsplash.com/400x300/?${cuisineKeywords},${foodKeywords},dish`;

        recipesWithImages.push({
          ...recipe,
          imageUrl: imageUrl,
          imageGenerated: false
        });
      }
    }
    
    console.log('🎉 Image generation complete!');
    console.log('📊 Final recipes:', recipesWithImages.map(r => ({
      title: r.title,
      imageGenerated: r.imageGenerated,
      hasImageUrl: !!r.imageUrl
    })));

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
