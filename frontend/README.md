# RASPP Frontend

Modern React + TypeScript + Tailwind CSS frontend for the RASPP platform.

## Features

- ✨ Modern, stunning UI with glassmorphism and vibrant colors
- 🎨 Centralized Tailwind CSS design system
- 📊 Interactive data visualizations with Recharts
- 📱 Fully responsive design
- ⚡ Fast development with Vite
- 🔒 Type-safe with TypeScript
- 🎯 Form validation with React Hook Form

## Setup

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:8000
```

### Run Development Server

```bash
npm run dev
```

The application will start at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   └── common/         # Reusable components
│   ├── pages/              # Page components
│   ├── services/           # API service layer
│   ├── types/              # TypeScript interfaces
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── public/
├── index.html
├── package.json
├── tailwind.config.js      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration
```

## Key Technologies

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Routing
- **Axios** - HTTP client
- **Recharts** - Data visualization
- **React Hook Form** - Form handling

## Available Routes

- `/` - Home page
- `/predict` - Student profile input form
- `/results` - Prediction results dashboard
- `/history` - Prediction history

## Design System

The application uses a centralized Tailwind CSS configuration with:
- Custom color palette (primary, secondary, success, warning, danger)
- Glassmorphism effects
- Custom animations
- Modern typography (Inter, Outfit fonts)
- Responsive breakpoints
