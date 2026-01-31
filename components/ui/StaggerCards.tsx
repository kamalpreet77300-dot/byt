'use client';

import React, { useRef, ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StaggerCardsProps {
    children: ReactNode;
    className?: string;
    staggerDelay?: number;
}

const StaggerCards: React.FC<StaggerCardsProps> = ({
    children,
    className = '',
    staggerDelay = 0.1
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        const cards = containerRef.current.children;

        gsap.fromTo(
            cards,
            {
                opacity: 0,
                y: 60,
                scale: 0.95,
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                stagger: staggerDelay,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
            }
        );
    }, [staggerDelay]);

    return (
        <div ref={containerRef} className={className}>
            {children}
        </div>
    );
};

export default StaggerCards;
