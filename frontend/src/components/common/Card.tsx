import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', hover = true, ...props }) => {
    return (
        <div
            className={`card ${hover ? 'hover:shadow-glow-lg' : ''} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
