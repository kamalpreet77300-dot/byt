'use client';

import React, { ReactNode } from 'react';
import BentoTilt from './BentoTilt';

interface BentoCardProps {
    title: ReactNode;
    description?: string;
    icon?: string;
    gradient?: string;
    children?: ReactNode;
    className?: string;
}

const BentoCard: React.FC<BentoCardProps> = ({
    title,
    description,
    icon,
    gradient = 'from-blue-500 to-cyan-500',
    children,
    className = '',
}) => {
    return (
        <BentoTilt className={`bento-tilt_1 group relative h-full rounded-3xl bg-white border border-gray-100 shadow-lg shadow-gray-100/50 hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-500 overflow-hidden ${className}`}>

            {/* Hover Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

            {/* Animated Border Gradient */}
            <div className="absolute animated-titleinset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex size-full flex-col justify-between p-8">
                <div>
                    <div className="mb-6 flex items-center justify-between">
                        {icon && (
                            <div className="text-5xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 origin-left">
                                {icon}
                            </div>
                        )}
                        <div className={`size-12 rounded-full bg-gradient-to-br ${gradient} opacity-10 group-hover:opacity-20 transition-all duration-500 blur-xl absolute top-8 right-8`} />
                    </div>

                    <h3 className="bento-title text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                        {title}
                    </h3>

                    {description && (
                        <p className="text-gray-500 text-sm leading-relaxed max-w-sm group-hover:text-gray-700 transition-colors">
                            {description}
                        </p>
                    )}
                </div>
                {children}
            </div>
        </BentoTilt>
    );
};

export default BentoCard;
