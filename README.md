# SAI Admin System

A comprehensive React-based admin panel for the Sports Authority of India (SAI) to manage athlete data, performance analytics, and evaluations.

## Features

- **Authentication System** - Sign in/Sign up with form validation
- **Dashboard** - Overview of key metrics with animated counters
- **Athlete Management** - Browse, filter, and manage athlete data
- **Leaderboard** - Track top performers across different sports
- **Analytics** - Performance trends and category breakdowns
- **Athlete Profiles** - Detailed individual athlete information

## Technologies Used

- **React 18** - Frontend framework
- **Vite** - Build tool and development server
- **Tailwind CSS** - Styling framework
- **Lucide React** - Icon library
- **JavaScript/ES6+** - Programming language

## Setup Instructions

1. **Install Node.js** (if not already installed)
   - Download from https://nodejs.org/
   - Recommended version: 18.x or later

2. **Navigate to the project directory**
   ```bash
   cd "C:\SIH 2025\SAI_2.0"
   ```

3. **Install dependencies** (already done)
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - The application will automatically open at `http://localhost:3000`
   - If not, manually navigate to this URL

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## Usage

### Authentication
- Use the "Quick Demo Access" button for instant access
- Or fill in the sign-in/sign-up forms (any valid email format works for demo)

### Navigation
- **Dashboard**: Overview with key statistics and trends
- **Athletes**: Manage athlete data with search and filters
- **Leaderboard**: View top performers ranked by scores
- **Analytics**: Performance trends and category analysis
- **Profiles**: Detailed athlete information and history

### Features
- Animated counters on dashboard statistics
- Responsive design that works on desktop and mobile
- Smooth transitions and hover effects
- Search and filter functionality for athletes
- Professional UI with Sports Authority of India branding

## Project Structure

```
SAI_2.0/
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles with Tailwind
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── tailwind.config.js   # Tailwind configuration
├── vite.config.js       # Vite configuration
└── postcss.config.js    # PostCSS configuration
```

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Development Notes

- The application is built with React 18 and uses modern JavaScript features
- Tailwind CSS provides utility-first styling
- Vite offers fast hot module replacement during development
- All icons are from Lucide React for consistency
- The app is fully responsive and mobile-friendly

## Troubleshooting

If you encounter any issues:

1. **Port already in use**: The app will automatically use the next available port
2. **Dependencies issues**: Run `npm install --force` if needed
3. **Build errors**: Make sure you're using Node.js 18+ 

For any other issues, check the console for error messages and ensure all files are properly saved.