'use client';

import React from 'react';
import Link from 'next/link';
import AnimatedTitle from '@/components/ui/AnimatedTitle';
import StaggerCards from '@/components/ui/StaggerCards';
import Button from '@/components/ui/Button';
import { TiLocationArrow } from 'react-icons/ti';
import { HiClock, HiUsers, HiStar, HiAcademicCap } from 'react-icons/hi';

const COURSES = [
    {
        id: 1,
        slug: 'mern-stack-development',
        title: 'Full-Stack MERN Development',
        category: 'Web Development',
        duration: '6 months',
        mode: 'Online + Offline',
        students: 450,
        price: 49999,
        discountPrice: 39999,
        rating: 4.8,
        image: '🎯',
        level: 'Beginner to Advanced',
        description: 'Master the MERN stack and build production-ready web applications',
        highlights: ['Live Projects', 'Placement Support', 'Industry Mentors', 'Certificate'],
    },
    {
        id: 2,
        slug: 'ai-machine-learning',
        title: 'AI & Machine Learning Mastery',
        category: 'AI/ML',
        duration: '8 months',
        mode: 'Online',
        students: 320,
        price: 59999,
        discountPrice: 49999,
        rating: 4.9,
        image: '🤖',
        level: 'Intermediate',
        description: 'Deep dive into AI, ML, and Deep Learning with hands-on projects',
        highlights: ['Real Datasets', 'Research Papers', 'Kaggle Competitions', 'Job Assistance'],
    },
    {
        id: 3,
        slug: 'react-nextjs-advanced',
        title: 'React & Next.js Advanced',
        category: 'Frontend',
        duration: '4 months',
        mode: 'Online',
        students: 580,
        price: 39999,
        discountPrice: 29999,
        rating: 4.7,
        image: '⚛️',
        level: 'Intermediate',
        description: 'Build modern, scalable React applications with Next.js',
        highlights: ['SSR & SSG', 'Performance Optimization', 'Real Projects', 'Portfolio Building'],
    },
    {
        id: 4,
        slug: 'devops-cloud-engineering',
        title: 'DevOps & Cloud Engineering',
        category: 'DevOps',
        duration: '5 months',
        mode: 'Hybrid',
        students: 280,
        price: 54999,
        discountPrice: 44999,
        rating: 4.8,
        image: '☁️',
        level: 'Intermediate to Advanced',
        description: 'Master DevOps practices and cloud platforms (AWS, Azure, GCP)',
        highlights: ['CI/CD Pipelines', 'Docker & Kubernetes', 'Cloud Certifications', 'Live Infrastructure'],
    },
    {
        id: 5,
        slug: 'python-backend-development',
        title: 'Python Backend Development',
        category: 'Backend',
        duration: '5 months',
        mode: 'Online',
        students: 390,
        price: 44999,
        discountPrice: 34999,
        rating: 4.7,
        image: '🐍',
        level: 'Beginner to Intermediate',
        description: 'Build robust backend systems with Python, Django, and FastAPI',
        highlights: ['RESTful APIs', 'Database Design', 'Authentication', 'Deployment'],
    },
    {
        id: 6,
        slug: 'mobile-app-development',
        title: 'Mobile App Development',
        category: 'Mobile',
        duration: '6 months',
        mode: 'Hybrid',
        students: 310,
        price: 49999,
        discountPrice: 39999,
        rating: 4.8,
        image: '📱',
        level: 'Beginner to Advanced',
        description: 'Create cross-platform mobile apps with React Native and Flutter',
        highlights: ['iOS & Android', 'App Store Deployment', 'Push Notifications', 'Real Apps'],
    },
];

const CATEGORIES = ['All', 'Web Development', 'AI/ML', 'Frontend', 'Backend', 'DevOps', 'Mobile'];

export default function CoursesPage() {
    const [selectedCategory, setSelectedCategory] = React.useState('All');

    const filteredCourses = selectedCategory === 'All'
        ? COURSES
        : COURSES.filter(course => course.category === selectedCategory);

    return (
        <main className="relative min-h-screen w-screen overflow-x-hidden">
            {/* Hero */}
            <section className="relative bg-gradient-to-br from-purple-50 via-white to-blue-50 pt-32 pb-20">
                <div className="container mx-auto px-4 md:px-10">
                    <div className="text-center max-w-4xl mx-auto mb-12">
                        <AnimatedTitle title="Professional <b>Training</b> Courses" containerClass="mb-6" />
                        <p className="text-xl md:text-2xl text-gray-600 mb-8">
                            Industry-leading courses designed by experts to accelerate your career
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center text-sm md:text-base">
                            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md">
                                <HiAcademicCap className="text-purple-600 text-xl" />
                                <span className="font-semibold">1000+ Students Trained</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md">
                                <HiStar className="text-yellow-500 text-xl" />
                                <span className="font-semibold">4.8 Average Rating</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md">
                                <span className="font-semibold">95% Placement Rate</span>
                            </div>
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap gap-3 justify-center mb-12">
                        {CATEGORIES.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${selectedCategory === category
                                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg scale-105'
                                        : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-purple-500'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Courses Grid */}
                    <StaggerCards className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCourses.map((course) => (
                            <Link key={course.id} href={`/courses/${course.slug}`}>
                                <div className="group bg-white rounded-2xl border-2 border-gray-200 hover:border-purple-500 p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer h-full flex flex-col">
                                    {/* Icon & Badge */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="text-6xl">{course.image}</div>
                                        {course.discountPrice < course.price && (
                                            <span className="px-3 py-1 bg-red-500 text-white rounded-full text-xs font-bold">
                                                SAVE ₹{((course.price - course.discountPrice) / 1000).toFixed(0)}k
                                            </span>
                                        )}
                                    </div>

                                    {/* Category */}
                                    <span className="inline-block px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-semibold mb-3 w-fit">
                                        {course.category}
                                    </span>

                                    {/* Title */}
                                    <h3 className="font-bold text-xl mb-2 group-hover:text-purple-600 transition-colors">
                                        {course.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-gray-600 text-sm mb-4 flex-grow">
                                        {course.description}
                                    </p>

                                    {/* Meta Info */}
                                    <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-4">
                                        <div className="flex items-center gap-1">
                                            <HiClock className="text-blue-500" />
                                            <span>{course.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <HiUsers className="text-green-500" />
                                            <span>{course.students}+</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <HiStar className="text-yellow-400" />
                                            <span className="font-semibold">{course.rating}</span>
                                        </div>
                                    </div>

                                    {/* Highlights */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {course.highlights.slice(0, 2).map((highlight, i) => (
                                            <span key={i} className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded">
                                                ✓ {highlight}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Price & CTA */}
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                        <div>
                                            {course.discountPrice < course.price && (
                                                <span className="text-sm text-gray-400 line-through mr-2">
                                                    ₹{(course.price / 1000).toFixed(0)}k
                                                </span>
                                            )}
                                            <span className="text-2xl font-black text-purple-600">
                                                ₹{(course.discountPrice / 1000).toFixed(0)}k
                                            </span>
                                        </div>
                                        <Button variant="primary" size="sm">
                                            Enroll Now
                                        </Button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </StaggerCards>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="bg-white py-20">
                <div className="container mx-auto px-4 md:px-10">
                    <h2 className="text-4xl md:text-5xl font-black text-center mb-12 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        Why Learn With Us
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: '👨‍🏫', title: 'Expert Instructors', desc: 'Learn from industry professionals' },
                            { icon: '💼', title: 'Placement Support', desc: '95% placement rate with top companies' },
                            { icon: '🏆', title: 'Certifications', desc: 'Industry-recognized certificates' },
                            { icon: '🚀', title: 'Live Projects', desc: 'Build real-world applications' },
                        ].map((item, index) => (
                            <div key={index} className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 hover:scale-105 transition-transform">
                                <div className="text-6xl mb-4">{item.icon}</div>
                                <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                                <p className="text-gray-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-gradient-to-r from-purple-600 to-blue-600 py-20">
                <div className="container mx-auto px-4 md:px-10 text-center">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                        Start Your Learning Journey Today
                    </h2>
                    <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                        Join thousands of students who transformed their careers with our courses
                    </p>
                    <Link href="/contact">
                        <Button variant="accent" size="lg" rightIcon={<TiLocationArrow />}>
                            Get Free Counseling
                        </Button>
                    </Link>
                </div>
            </section>
        </main>
    );
}
