import React from 'react';
import ThemeToggle from '../common/ThemeToggle';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen transition-colors duration-300">
            {/* Fixed Theme Toggle */}
            <div className="fixed top-4 right-4 z-50">
                <ThemeToggle />
            </div>

            {/* Page Content */}
            <main>
                {children}
            </main>
        </div>
    );
};

export default MainLayout;
