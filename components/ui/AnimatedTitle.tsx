'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTitleProps {
    title: string;
    containerClass?: string;
}

const AnimatedTitle: React.FC<AnimatedTitleProps> = ({ title, containerClass = '' }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            const titleAnimation = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                    end: 'top 50%',
                    toggleActions: 'play none none reverse',
                },
            });

            titleAnimation.to('.animated-word', {
                opacity: 1,
                transform: 'translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)',
                ease: 'power2.inOut',
                stagger: 0.02,
                duration: 1,
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className={`animated-title ${containerClass}`}>
            {title.split('<br />').map((line, index) => (
                <div
                    key={index}
                    className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
                >
                    {line.split(' ').map((word, i) => (
                        <span key={i} className="animated-word" dangerouslySetInnerHTML={{ __html: word }} />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default AnimatedTitle;
