# HangTime Weather - Air-Drying Assistant

A beautiful, interactive web application that helps you determine the best time to air-dry your clothes based on real-time weather conditions.

## Features

- 🌤️ **Real-time Weather Data**: Get current weather conditions for your location
- 👕 **Smart Drying Estimates**: Calculate drying times based on clothing type and weather
- 📍 **Location Search**: Find your location with autocomplete or GPS
- 🎨 **Beautiful UI**: Weather-themed gradients and smooth animations
- 📱 **Responsive Design**: Works perfectly on mobile and desktop
- 🌙 **Dark Mode**: Built-in theme support

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd hang-time-weather
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Technologies Used

- **React 18** - Modern React with hooks
- **TypeScript** - Type safety and better development experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible UI components
- **React Router** - Client-side routing
- **TanStack Query** - Data fetching and caching
- **Open-Meteo API** - Free weather data service

## Project Structure

```
src/
├── components/
│   ├── hangtime/          # Main app components
│   │   ├── ActivitySuggestions.tsx
│   │   ├── CircularTimer.tsx
│   │   ├── ClothingSelect.tsx
│   │   ├── DryingEstimate.tsx
│   │   ├── LocationSearch.tsx
│   │   ├── LogoIntro.tsx
│   │   ├── WeatherBackground.tsx
│   │   └── WeatherSummary.tsx
│   └── ui/               # Reusable UI components
├── pages/                # Page components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
└── index.css            # Global styles and design system
```

## How It Works

1. **Location Selection**: Users enter their location or use GPS
2. **Weather Analysis**: App fetches real-time weather data
3. **Clothing Type**: Users select their clothing type (light/medium/heavy)
4. **Drying Calculation**: Smart algorithm estimates drying time
5. **Activity Suggestions**: Weather-appropriate activities while waiting

## Deployment

This project can be deployed to any static hosting service:

- **Vercel**: Connect your GitHub repo for automatic deployments
- **Netlify**: Drag and drop the `dist` folder after building
- **GitHub Pages**: Use GitHub Actions for automatic deployment

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).
