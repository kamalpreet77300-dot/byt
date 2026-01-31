'use client';

import React, { useRef, ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxSectionProps {
    children: ReactNode;
    speed?: number;
    className?: string;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
    children,
    speed = 0.5,
    className = ''
}) => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!sectionRef.current) return;

        gsap.to(sectionRef.current, {
            y: () => window.innerHeight * speed,
            ease: 'none',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
            },
        });
    }, [speed]);

    return (
        <div ref={sectionRef} className={className}>
            {children}
        </div>
    );
};

export default ParallaxSection;
