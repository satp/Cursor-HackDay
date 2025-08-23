# 🎬 Assets Setup Guide

## Missing Files to Add

### 1. `public/food.png`
- **What**: A food image for the homepage
- **How**: 
  - Find any food/cooking image
  - Rename it to `food.png`
  - Place it in the `public` folder
- **Size**: Recommended 400x400px or larger

### 2. `public/video.mp4`
- **What**: A cooking/food video for loading state
- **How**:
  - Find any cooking video (5-10 seconds)
  - Rename it to `video.mp4`
  - Place it in the `public` folder
- **Size**: Keep under 10MB for fast loading

## Quick Setup
1. **Download** any food image → rename to `food.png`
2. **Download** any cooking video → rename to `video.mp4`
3. **Place both files** in the `public` folder
4. **Restart** your frontend server

## Alternative: Use Placeholder Services
If you don't have assets:
- **Images**: The app will use Unsplash food images
- **Video**: The app will show a loading spinner instead

## File Structure
```
public/
├── food.png     ← Add your food image here
└── video.mp4   ← Add your cooking video here
```

**Note**: These files are referenced in the code as `/food.png` and `/video.mp4` (relative to public folder)
