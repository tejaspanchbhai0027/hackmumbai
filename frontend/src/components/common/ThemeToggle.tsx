import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'; // Adjust import based on available icons

const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full transition-colors duration-200 
                bg-gray-200 hover:bg-gray-300 text-gray-800
                dark:bg-white/10 dark:hover:bg-white/20 dark:text-yellow-400
                focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Toggle theme"
        >
            {theme === 'light' ? (
                <MoonIcon className="w-6 h-6" />
            ) : (
                <SunIcon className="w-6 h-6" />
            )}
        </button>
    );
};

export default ThemeToggle;
