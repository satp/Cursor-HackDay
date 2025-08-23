import { GoogleGenAI, Modality } from "@google/genai";
import dotenv from 'dotenv';
import * as fs from "node:fs";

// Load environment variables
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
console.log('🔑 API Key:', apiKey ? `${apiKey.substring(0, 10)}...` : 'NOT FOUND');

if (!apiKey) {
  console.error('❌ GEMINI_API_KEY not found');
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

async function testImageGeneration() {
  try {
    console.log('🚀 Testing with @google/genai package...');
    
    const contents = "Hi, can you create a 3d rendered image of a pig with wings and a top hat flying over a happy futuristic scifi city with lots of greenery?";
    
    console.log('📝 Contents:', contents);
    console.log('🔄 Calling generateContent with correct API structure...');
    
    // Use the exact API structure from your working JavaScript code
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-preview-image-generation",
      contents: contents,
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE],
      },
    });
    
    console.log('✅ API call successful!');
    
    // Process the response exactly like your working code
    for (const part of response.candidates[0].content.parts) {
      if (part.text) {
        console.log('📝 Text part:', part.text);
      } else if (part.inlineData) {
        console.log('🎯 Found image data!');
        console.log('📊 Data length:', part.inlineData.data?.length);
        console.log('📊 MIME type:', part.inlineData.mimeType);
        
        const imageData = part.inlineData.data;
        const buffer = Buffer.from(imageData, "base64");
        fs.writeFileSync("gemini-native-image.png", buffer);
        console.log("💾 Image saved as gemini-native-image.png");
        console.log("🎉 SUCCESS! Image generation working!");
        return;
      }
    }
    
    console.log('⚠️ No image found in response');
    
  } catch (error) {
    console.error('❌ Error:', error);
    console.error('🔍 Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
  }
}

testImageGeneration();