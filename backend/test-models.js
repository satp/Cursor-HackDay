import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
console.log('🔑 API Key:', apiKey ? `${apiKey.substring(0, 10)}...` : 'NOT FOUND');

if (!apiKey) {
  console.error('❌ GEMINI_API_KEY not found');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function testModels() {
  try {
    console.log('🚀 Testing available models...');
    
    // Test basic text generation first
    const textModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    console.log('✅ Text model created');
    
    const result = await textModel.generateContent("Hello, can you generate a simple text response?");
    const response = await result.response;
    console.log('✅ Text generation successful:', response.text());
    
    // Now try to create an image generation model
    console.log('\n🔄 Trying to create image generation model...');
    try {
      const imageModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash-preview-image-generation" });
      console.log('✅ Image model created');
    } catch (error) {
      console.log('❌ Image model creation failed:', error.message);
    }
    
    // Try alternative model names
    const alternativeModels = [
      "gemini-2.0-flash-preview",
      "gemini-2.0-flash",
      "gemini-1.5-flash-exp",
      "gemini-1.5-pro"
    ];
    
    for (const modelName of alternativeModels) {
      try {
        console.log(`\n🔄 Trying model: ${modelName}`);
        const testModel = genAI.getGenerativeModel({ model: modelName });
        console.log(`✅ ${modelName} created successfully`);
      } catch (error) {
        console.log(`❌ ${modelName} failed:`, error.message);
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

testModels();
