'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { SERVICES } from '@/lib/constants';
import BentoCard from '../ui/BentoCard';
import AnimatedTitle from '../ui/AnimatedTitle';
import Button from '../ui/Button';
import { TiLocationArrow } from 'react-icons/ti';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ServicesOverview = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.to('.bento-item', {
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 80%',
            },
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out',
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="bg-white py-10 md:py-16 relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-3xl -z-10" />

            <div className="container mx-auto px-4 md:px-10">
                {/* Section Header */}
                <div className="mb-20 space-y-4">
                    <p className="font-general text-sm uppercase md:text-[10px] text-blue-600 font-bold tracking-widest text-center">
                        What We Do
                    </p>
                    <AnimatedTitle
                        title="Our <b>Services</b>"
                        containerClass="mt-5 !text-black text-center text-4xl md:text-6xl font-black"
                    />
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto text-center leading-relaxed">
                        Comprehensive IT solutions customized to elevate your business operations and drive sustainable growth
                    </p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
                    {SERVICES.map((service, index) => (
                        <Link key={service.id} href={`/services/${service.slug}`} className="bento-item opacity-0 translate-y-10">
                            <BentoCard
                                title={service.title}
                                description={service.shortDesc}
                                icon={service.icon}
                                gradient={service.gradient}
                                className={index === 0 || index === 3 ? 'md:col-span-2' : ''}
                            >
                                <div className="mt-8 flex items-center justify-between group-hover:px-2 transition-all duration-300">
                                    <span className="text-sm font-semibold text-gray-500 group-hover:text-blue-600 transition-colors">Explore Solution</span>
                                    <div className="p-2 rounded-full bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                        <TiLocationArrow className="text-lg" />
                                    </div>
                                </div>
                            </BentoCard>
                        </Link>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center">
                    <Link href="/services">
                        <Button variant="outline" size="lg" rightIcon={<TiLocationArrow />} className="hover:bg-blue-50 border-blue-200">
                            View All Services
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ServicesOverview;
