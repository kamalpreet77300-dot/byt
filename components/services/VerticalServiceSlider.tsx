'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { SERVICES } from '@/lib/constants';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const VerticalServiceSlider = () => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        const totalHeight = slider.scrollHeight / 2; // Since we duplicate content

        const tl = gsap.timeline({
            repeat: -1,
            defaults: { ease: 'none' },
        });

        tl.to(slider, {
            y: -totalHeight,
            duration: 20, // Adjust speed here
        });

        // Pause on hover
        const handleMouseEnter = () => tl.pause();
        const handleMouseLeave = () => tl.play();

        slider.addEventListener('mouseenter', handleMouseEnter);
        slider.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            slider.removeEventListener('mouseenter', handleMouseEnter);
            slider.removeEventListener('mouseleave', handleMouseLeave);
            tl.kill();
        };
    }, { scope: wrapperRef });

    // Duplicate services for seamless loop
    const displayServices = [...SERVICES, ...SERVICES, ...SERVICES];

    return (
        <div ref={wrapperRef} className="relative w-full overflow-hidden bg-gray-50 py-20 border-t border-gray-100">
            <div className="container mx-auto px-4 md:px-10 flex flex-col md:flex-row items-center gap-12">
                {/* Text Content */}
                <div className="w-full md:w-1/2 text-center md:text-left z-10">
                    <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Explore More Services
                    </h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-lg">
                        Discover our comprehensive range of IT solutions designed to help your business grow and succeed in the digital age.
                    </p>
                    <Link href="/services" className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                        View All Services
                    </Link>
                </div>

                {/* Slider */}
                <div className="w-full md:w-1/2 h-[400px] relative overflow-hidden mask-linear-gradient">
                    {/* Gradient Overlays for smooth fade effect */}
                    <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-gray-50 to-transparent z-10 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent z-10 pointer-events-none" />

                    <div ref={sliderRef} className="flex flex-col gap-4">
                        {displayServices.map((service, index) => (
                            <Link key={`${service.id}-${index}`} href={`/services/${service.slug}`} className="block">
                                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all duration-300 flex items-center gap-4 group cursor-pointer">
                                    <div className={`p-4 rounded-lg bg-gradient-to-br ${service.gradient} text-white text-2xl group-hover:scale-110 transition-transform`}>
                                        {service.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{service.title}</h3>
                                        <p className="text-xs text-gray-500 line-clamp-1">{service.shortDesc}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerticalServiceSlider;
