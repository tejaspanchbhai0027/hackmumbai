import React from 'react';

const Loader: React.FC<{ size?: 'sm' | 'md' | 'lg'; text?: string }> = ({
    size = 'md',
    text = 'Loading...'
}) => {
    const sizes = {
        sm: 'w-8 h-8',
        md: 'w-12 h-12',
        lg: 'w-16 h-16',
    };

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <div className={`${sizes[size]} relative`}>
                <div className="absolute inset-0 rounded-full border-4 border-primary-200/30"></div>
                <div className="absolute inset-0 rounded-full border-4 border-primary-500 border-t-transparent animate-spin"></div>
            </div>
            {text && <p className="text-gray-300 text-sm animate-pulse">{text}</p>}
        </div>
    );
};

export default Loader;
