# FlavorForge 🍽️

A modern web application for creating fusion recipes with AI-powered recipe generation. Built with React, Vite, and Tailwind CSS.

## Features

- **Modern Dark Theme**: Beautiful glassy UI with glowing accents and smooth animations
- **Interactive Recipe Form**: Comprehensive form with pill-style buttons for all cooking preferences
- **AI Recipe Generation**: Generate 3 unique fusion recipes based on your inputs
- **Recipe Cards**: Display recipes with beautiful glassy cards showing all details
- **Recipe Modal**: Detailed view with tabs for ingredients, steps, and notes
- **Copy & Download**: Save recipes to clipboard or download as text files
- **Explore Section**: Quick access to popular fusion combinations

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful icons

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd flavorforge
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

1. **Enter Main Ingredients**: Type in your main ingredients (e.g., "chicken, broccoli, rice")

2. **Select Base Cuisine**: Choose your primary cuisine from the dropdown

3. **Add Additional Cuisines**: Click on additional cuisines to create fusion combinations

4. **Set Preferences**: Choose meal type, time limit, difficulty, spice level, and equipment

5. **Generate Recipes**: Click "Generate 3 Recipes" to create fusion recipes

6. **View Results**: Browse the generated recipe cards and click to see full details

7. **Save Recipes**: Copy to clipboard or download as text files

## Project Structure

```
src/
├── components/
│   ├── HeroSection.jsx      # Main hero section with title
│   ├── RecipeForm.jsx       # Interactive recipe form
│   ├── RecipeResults.jsx    # Display generated recipes
│   ├── ExploreSection.jsx   # Fusion combination suggestions
│   └── RecipeModal.jsx      # Detailed recipe view modal
├── App.jsx                  # Main application component
├── main.jsx                 # React entry point
└── index.css               # Global styles and Tailwind imports
```

## Customization

### Colors
The color scheme can be customized in `tailwind.config.js`:
- `dark-*` - Dark theme colors
- `accent-*` - Orange accent colors
- `teal-*` - Teal accent colors

### Animations
Custom animations are defined in `tailwind.config.js`:
- `glow` - Glowing effect for buttons
- `float` - Floating animation
- `pulse-slow` - Slow pulse animation

## API Integration

Currently, the app uses mock data for demonstration. To integrate with a real GPT API:

1. Replace the mock data in `App.jsx` with actual API calls
2. Add your API key to environment variables
3. Update the prompt structure to match your API requirements

Example API integration:
```javascript
const response = await fetch('/api/generate-recipes', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`
  },
  body: JSON.stringify(formData)
})
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Design inspired by modern dark-themed applications
- Icons from Lucide React
- Animations powered by Framer Motion