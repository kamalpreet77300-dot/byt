'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Button from '../ui/Button';
import { TiLocationArrow } from 'react-icons/ti';
import { HiClock, HiUsers, HiStar } from 'react-icons/hi';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const POPULAR_COURSES = [
    {
        id: 1,
        title: 'Full-Stack MERN Development',
        slug: 'mern-stack-development',
        duration: '6 months',
        students: 450,
        price: 49999,
        rating: 4.8,
        image: '🎯',
        category: 'Web Development',
        gradient: 'from-blue-100 to-cyan-50'
    },
    {
        id: 2,
        title: 'AI & Machine Learning Mastery',
        slug: 'ai-machine-learning',
        duration: '8 months',
        students: 320,
        price: 59999,
        rating: 4.9,
        image: '🤖',
        category: 'AI/ML',
        gradient: 'from-purple-100 to-pink-50'
    },
    {
        id: 3,
        title: 'React & Next.js Advanced',
        slug: 'react-nextjs-advanced',
        duration: '4 months',
        students: 580,
        price: 39999,
        rating: 4.7,
        image: '⚛️',
        category: 'Frontend',
        gradient: 'from-orange-100 to-amber-50'
    },
    {
        id: 4,
        title: 'DevOps & Cloud Engineering',
        slug: 'devops-cloud-engineering',
        duration: '5 months',
        students: 280,
        price: 54999,
        rating: 4.8,
        image: '☁️',
        category: 'DevOps',
        gradient: 'from-emerald-100 to-teal-50'
    },
];

const PopularCourses = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.to('.course-card', {
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 70%',
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'back.out(1.2)',
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="bg-gray-50/50 py-8 md:py-12 relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-10">
                {/* Section Header */}
                <div className="text-center mb-16 space-y-4">
                    <p className="font-general text-xs uppercase text-purple-600 font-bold tracking-widest">
                        Top Rated Programs
                    </p>
                    <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        Popular Courses
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Industry-leading training programs designed by experts to fast-track your career
                    </p>
                </div>

                {/* Courses Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {POPULAR_COURSES.map((course) => (
                        <Link key={course.id} href={`/courses/${course.slug}`}>
                            <div className={`course-card opacity-0 translate-y-10 h-full group bg-white rounded-3xl p-6 border border-gray-100 shadow-lg shadow-gray-100 hover:shadow-xl hover:shadow-purple-100 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden`}>
                                {/* Gradient Background on Hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${course.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />

                                <div className="flex justify-between items-start mb-6">
                                    <div className="text-6xl filter drop-shadow-sm group-hover:scale-110 transition-transform duration-300 origin-left">
                                        {course.image}
                                    </div>
                                    <span className="px-3 py-1 bg-gray-100 group-hover:bg-white/80 backdrop-blur-sm text-gray-600 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors">
                                        {course.category}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-purple-700 transition-colors leading-tight line-clamp-2 min-h-[3.5rem]">
                                    {course.title}
                                </h3>

                                {/* Meta Info */}
                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                        <div className="flex items-center gap-1.5">
                                            <HiClock className="text-purple-500" />
                                            <span>{course.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <HiUsers className="text-blue-500" />
                                            <span>{course.students}+</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-1 text-sm font-medium text-gray-700 bg-gray-50 group-hover:bg-white/50 p-2 rounded-lg w-fit">
                                        <span className="text-yellow-400"><HiStar size={16} /></span>
                                        <span>{course.rating}</span>
                                        <span className="text-gray-400 font-normal ml-1">Rating</span>
                                    </div>
                                </div>

                                {/* Price & Action */}
                                <div className="flex items-center justify-between pt-4 border-t border-gray-100 group-hover:border-purple-200 transition-colors">
                                    <div>
                                        <span className="text-xs text-gray-400 block">Course Fee</span>
                                        <span className="text-2xl font-black text-gray-900 group-hover:text-purple-700 transition-colors">
                                            ₹{(course.price / 1000).toFixed(0)}k
                                        </span>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-black text-white group-hover:bg-purple-600 flex items-center justify-center transition-all duration-300 group-hover:rotate-45">
                                        <TiLocationArrow size={20} />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center">
                    <Link href="/courses">
                        <Button variant="outline" size="lg" rightIcon={<TiLocationArrow />} className="hover:bg-purple-50 border-purple-200 hover:border-purple-300">
                            Explore All Courses
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default PopularCourses;
