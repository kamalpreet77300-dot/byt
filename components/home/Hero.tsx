'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import Button from '../ui/Button';
import { TiLocationArrow } from 'react-icons/ti';
import { HiCode, HiAcademicCap, HiBriefcase, HiShoppingCart } from 'react-icons/hi';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import HeroParticles from './HeroParticles';

const Hero = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const subheadingRef = useRef<HTMLParagraphElement>(null);
    const ctaCardsRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const floatingShapesRef = useRef<HTMLDivElement>(null);

    // Mouse move handler for parallax effects
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Parallax effect on floating shapes
            if (floatingShapesRef.current) {
                const shapes = floatingShapesRef.current.children;
                Array.from(shapes).forEach((shape, index) => {
                    const speed = (index + 1) * 0.015;
                    const x = (e.clientX - window.innerWidth / 2) * speed;
                    const y = (e.clientY - window.innerHeight / 2) * speed;

                    gsap.to(shape, {
                        x,
                        y,
                        duration: 1.2,
                        ease: 'power2.out',
                    });
                });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // Heading animation
        if (headingRef.current) {
            tl.fromTo(
                headingRef.current,
                {
                    opacity: 0,
                    y: 80,
                    scale: 0.9,
                    rotationX: -20,
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    rotationX: 0,
                    duration: 1.2,
                    ease: 'back.out(1.7)',
                },
                0.3
            );
        }

        // Subheading slide up
        if (subheadingRef.current) {
            tl.fromTo(
                subheadingRef.current,
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 1 },
                0.8
            );
        }

        // CTA Cards with 3D flip
        if (ctaCardsRef.current) {
            const cards = Array.from(ctaCardsRef.current.children);

            tl.fromTo(
                cards,
                {
                    opacity: 0,
                    y: 120,
                    rotateY: -90,
                    scale: 0.7,
                },
                {
                    opacity: 1,
                    y: 0,
                    rotateY: 0,
                    scale: 1,
                    duration: 1.2,
                    stagger: 0.1,
                    ease: 'elastic.out(1, 0.75)',
                },
                1.1
            );

            // Add magnetic hover effect to cards
            cards.forEach((card) => {
                const cardElement = card as HTMLElement;

                cardElement.addEventListener('mouseenter', function (this: HTMLElement) {
                    gsap.to(this, {
                        scale: 1.1,
                        rotateY: 8,
                        rotateX: 8,
                        z: 50,
                        duration: 0.5,
                        ease: 'power2.out',
                    });
                });

                cardElement.addEventListener('mouseleave', function (this: HTMLElement) {
                    gsap.to(this, {
                        scale: 1,
                        rotateY: 0,
                        rotateX: 0,
                        z: 0,
                        duration: 0.5,
                        ease: 'elastic.out(1, 0.5)',
                    });
                });

                // Mouse move within card for tilt effect
                cardElement.addEventListener('mousemove', function (this: HTMLElement, e: MouseEvent) {
                    const rect = this.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = (y - centerY) / 10;
                    const rotateY = (centerX - x) / 10;

                    gsap.to(this, {
                        rotateX,
                        rotateY,
                        duration: 0.3,
                        ease: 'power2.out',
                    });
                });
            });
        }

        // Floating shapes animation
        if (floatingShapesRef.current) {
            const shapes = Array.from(floatingShapesRef.current.children);

            shapes.forEach((shape, index) => {
                gsap.fromTo(
                    shape,
                    {
                        opacity: 0,
                        scale: 0,
                        rotation: gsap.utils.random(-180, 180),
                    },
                    {
                        opacity: 0.7,
                        scale: 1,
                        rotation: 0,
                        duration: 1.5,
                        delay: index * 0.15,
                        ease: 'elastic.out(1, 0.6)',
                    }
                );

                // Continuous floating animation
                gsap.to(shape, {
                    y: `${gsap.utils.random(-40, 40)}`,
                    x: `${gsap.utils.random(-30, 30)}`,
                    rotation: `${gsap.utils.random(-20, 20)}`,
                    scale: gsap.utils.random(0.9, 1.1),
                    duration: gsap.utils.random(4, 7),
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                    delay: index * 0.2,
                });
            });
        }

        // Stats animation
        if (statsRef.current) {
            gsap.fromTo(
                statsRef.current.children,
                { opacity: 0, scale: 0, rotation: -180 },
                {
                    opacity: 1,
                    scale: 1,
                    rotation: 0,
                    duration: 1,
                    stagger: 0.12,
                    ease: 'elastic.out(1, 0.6)',
                    scrollTrigger: {
                        trigger: statsRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        }

        // Parallax scroll effect
        gsap.to(heroRef.current, {
            yPercent: 25,
            ease: 'none',
            scrollTrigger: {
                trigger: heroRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: 1.5,
            },
        });

        // Enhanced blob animations
        const blobs = gsap.utils.toArray('.animate-blob');
        blobs.forEach((blob: any, index) => {
            gsap.to(blob, {
                y: gsap.utils.random(-100, 100),
                x: gsap.utils.random(-80, 80),
                scale: gsap.utils.random(0.9, 1.2),
                duration: gsap.utils.random(5, 8),
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1,
                delay: index * 0.7,
            });
        });
    }, []);

    return (
        <div ref={heroRef} style={{
            minHeight: 1200
        }} className="relative  w-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Floating Geometric Shapes */}
            <div ref={floatingShapesRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                {/* Triangle */}
                <div className="absolute top-20 left-[10%] w-10 h-10 border-4 border-blue-400 opacity-30" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />

                {/* Circle */}
                <div className="absolute top-40 right-[15%] w-10 h-10 border-4 border-purple-400 rounded-full opacity-30" />

                {/* Square */}
                <div className="absolute bottom-40 left-[20%] w-10 h-10 border-4 border-pink-400 opacity-30 rotate-45" />

                {/* Hexagon */}
                <div className="absolute top-60 right-[25%] w-10 h-10 border-4 border-cyan-400 opacity-30" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} />

                {/* Small Circle */}
                <div className="absolute bottom-60 right-[10%] w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-20" />

                {/* Diamond */}
                <div className="absolute top-[30%] left-[5%] w-10 h-10 border-4 border-green-400 opacity-30 rotate-45" />
            </div>

            {/* Animated Background Blobs */}
            <div className="absolute inset-0 overflow-hidden z-0">
                <div className="absolute top-20 left-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
                <div className="absolute top-40 right-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
                <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
                <div className="absolute top-[50%] left-[50%] w-80 h-80 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob" />
            </div>

            {/* Interactive Particles */}
            <HeroParticles />

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 md:px-10 pt-32 md:pt-40 pb-20">
                <div className="max-w-5xl mx-auto text-center">
                    {/* Main Heading */}
                    <h1
                        ref={headingRef}
                        className="hero-heading mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                        style={{ perspective: '1000px' }}
                    >
                        Transform Your <br />
                        <span className="font-black">Digital Future</span>
                    </h1>

                    {/* Subheading */}
                    <p ref={subheadingRef} className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto font-medium">
                        Leading IT Services, Professional Training, Ready-Made Projects & Career Opportunities
                    </p>

                    {/* CTA Buttons Grid */}
                    <div
                        ref={ctaCardsRef}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16"
                        style={{ perspective: '2000px' }}
                    >
                        <Link href="/services">
                            <div className="group relative overflow-hidden rounded-xl bg-white border-2 border-blue-200 hover:border-blue-500 p-6 transition-all duration-300 cursor-pointer" style={{ transformStyle: 'preserve-3d' }}>
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-10 transition-opacity" />
                                <div className="relative z-10">
                                    <HiCode className="text-5xl text-blue-500 mb-3 mx-auto" />
                                    <h3 className="font-bold text-lg mb-2">IT Services</h3>
                                    <p className="text-sm text-gray-600">Development solutions</p>
                                </div>
                            </div>
                        </Link>

                        <Link href="/courses">
                            <div className="group relative overflow-hidden rounded-xl bg-white border-2 border-purple-200 hover:border-purple-500 p-6 transition-all duration-300 cursor-pointer" style={{ transformStyle: 'preserve-3d' }}>
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity" />
                                <div className="relative z-10">
                                    <HiAcademicCap className="text-5xl text-purple-500 mb-3 mx-auto" />
                                    <h3 className="font-bold text-lg mb-2">Join Training</h3>
                                    <p className="text-sm text-gray-600">Professional courses</p>
                                </div>
                            </div>
                        </Link>

                        <Link href="/projects">
                            <div className="group relative overflow-hidden rounded-xl bg-white border-2 border-green-200 hover:border-green-500 p-6 transition-all duration-300 cursor-pointer" style={{ transformStyle: 'preserve-3d' }}>
                                <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-500 opacity-0 group-hover:opacity-10 transition-opacity" />
                                <div className="relative z-10">
                                    <HiShoppingCart className="text-5xl text-green-500 mb-3 mx-auto" />
                                    <h3 className="font-bold text-lg mb-2">Buy Projects</h3>
                                    <p className="text-sm text-gray-600">Ready-made solutions</p>
                                </div>
                            </div>
                        </Link>

                        <Link href="/jobs">
                            <div className="group relative overflow-hidden rounded-xl bg-white border-2 border-orange-200 hover:border-orange-500 p-6 transition-all duration-300 cursor-pointer" style={{ transformStyle: 'preserve-3d' }}>
                                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-500 opacity-0 group-hover:opacity-10 transition-opacity" />
                                <div className="relative z-10">
                                    <HiBriefcase className="text-5xl text-orange-500 mb-3 mx-auto" />
                                    <h3 className="font-bold text-lg mb-2">Apply for Jobs</h3>
                                    <p className="text-sm text-gray-600">Career opportunities</p>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Secondary CTA */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href="/services">
                            <Button
                                variant="primary"
                                size="lg"
                                rightIcon={<TiLocationArrow />}
                            >
                                Explore Our Services
                            </Button>
                        </Link>
                        <Link href="/about">
                            <Button
                                variant="outline"
                                size="lg"
                            >
                                View Success Stories
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Stats Section */}
                <div ref={statsRef} className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                    {[
                        { number: '500+', label: 'Projects Delivered' },
                        { number: '1000+', label: 'Students Trained' },
                        { number: '50+', label: 'Expert Trainers' },
                        { number: '98%', label: 'Client Satisfaction' },
                    ].map((stat, index) => (
                        <div key={index} className="text-center p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-gray-200 hover:scale-110 transition-transform duration-300">
                            <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                                {stat.number}
                            </div>
                            <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Hero;
