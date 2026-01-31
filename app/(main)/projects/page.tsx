'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AnimatedTitle from '@/components/ui/AnimatedTitle';
import StaggerCards from '@/components/ui/StaggerCards';
import Button from '@/components/ui/Button';
import { TiLocationArrow } from 'react-icons/ti';
import { HiCode, HiShoppingCart } from 'react-icons/hi';

const PROJECTS = [
    {
        id: 1,
        slug: 'ecommerce-platform',
        title: 'E-Commerce Platform',
        category: 'Web Apps',
        description: 'Full-featured online store with payment integration, cart, and admin panel',
        price: 29999,
        tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        features: ['Product Management', 'Shopping Cart', 'Payment Gateway', 'Order Tracking', 'Admin Dashboard'],
        image: '🛒',
        downloads: 250,
        rating: 4.8,
    },
    {
        id: 2,
        slug: 'ai-chatbot-system',
        title: 'AI Chatbot System',
        category: 'AI/ML',
        description: 'Intelligent chatbot with NLP capabilities and custom training',
        price: 39999,
        tech: ['Python', 'TensorFlow', 'FastAPI', 'React'],
        features: ['Natural Language Processing', 'Custom Training', 'Multi-language Support', 'Analytics Dashboard'],
        image: '💬',
        downloads: 180,
        rating: 4.9,
    },
    {
        id: 3,
        slug: 'food-delivery-app',
        title: 'Mobile Food Delivery App',
        category: 'Mobile Apps',
        description: 'Cross-platform food ordering application with real-time tracking',
        price: 34999,
        tech: ['React Native', 'Firebase', 'Google Maps'],
        features: ['Real-time Tracking', 'Payment Integration', 'Restaurant Management', 'Push Notifications'],
        image: '🍔',
        downloads: 320,
        rating: 4.7,
    },
    {
        id: 4,
        slug: 'saas-dashboard',
        title: 'SaaS Analytics Dashboard',
        category: 'SaaS',
        description: 'Analytics dashboard with real-time data visualization',
        price: 24999,
        tech: ['Next.js', 'PostgreSQL', 'Chart.js'],
        features: ['Real-time Analytics', 'Custom Reports', 'Data Export', 'Team Collaboration'],
        image: '📊',
        downloads: 420,
        rating: 4.8,
    },
    {
        id: 5,
        slug: 'social-media-platform',
        title: 'Social Media Platform',
        category: 'Web Apps',
        description: 'Complete social networking application with posts, chat, and stories',
        price: 44999,
        tech: ['MERN Stack', 'Socket.io', 'AWS S3'],
        features: ['User Profiles', 'Posts & Stories', 'Real-time Chat', 'Notifications', 'Media Upload'],
        image: '📱',
        downloads: 290,
        rating: 4.9,
    },
    {
        id: 6,
        slug: 'inventory-management',
        title: 'Inventory Management System',
        category: 'Final Year',
        description: 'Business inventory tracking and management system',
        price: 19999,
        tech: ['React', 'Express', 'MySQL'],
        features: ['Stock Management', 'Supplier Tracking', 'Reports', 'Barcode Scanning'],
        image: '📦',
        downloads: 510,
        rating: 4.6,
    },
    {
        id: 7,
        slug: 'crm-system',
        title: 'CRM System',
        category: 'SaaS',
        description: 'Customer relationship management platform',
        price: 34999,
        tech: ['Vue.js', 'Laravel', 'PostgreSQL'],
        features: ['Lead Management', 'Sales Pipeline', 'Email Integration', 'Reports & Analytics'],
        image: '👥',
        downloads: 210,
        rating: 4.7,
    },
    {
        id: 8,
        slug: 'learning-management-system',
        title: 'Learning Management System',
        category: 'Final Year',
        description: 'Online learning platform with courses and assessments',
        price: 29999,
        tech: ['React', 'Node.js', 'MongoDB'],
        features: ['Course Management', 'Video Streaming', 'Quizzes', 'Certificates', 'Progress Tracking'],
        image: '🎓',
        downloads: 380,
        rating: 4.8,
    },
    {
        id: 9,
        slug: 'hotel-booking-system',
        title: 'Hotel Booking System',
        category: 'Web Apps',
        description: 'Complete hotel reservation and management platform',
        price: 32999,
        tech: ['Angular', 'Spring Boot', 'MySQL'],
        features: ['Room Booking', 'Payment Gateway', 'Booking Management', 'Reviews & Ratings'],
        image: '🏨',
        downloads: 270,
        rating: 4.7,
    },
];

const CATEGORIES = ['All', 'Web Apps', 'Mobile Apps', 'AI/ML', 'SaaS', 'Final Year'];

export default function ProjectsPage() {
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredProjects = selectedCategory === 'All'
        ? PROJECTS
        : PROJECTS.filter(project => project.category === selectedCategory);

    return (
        <main className="relative min-h-screen w-screen overflow-x-hidden">
            {/* Hero */}
            <section className="relative bg-gradient-to-br from-green-50 via-white to-emerald-50 pt-32 pb-20">
                <div className="container mx-auto px-4 md:px-10">
                    <div className="text-center max-w-4xl mx-auto mb-12">
                        <AnimatedTitle title="Ready-Made <b>Projects</b>" containerClass="mb-6" />
                        <p className="text-xl md:text-2xl text-gray-600 mb-8">
                            Production-ready projects with complete source code and documentation
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <div className="px-6 py-3 bg-white rounded-full shadow-md font-semibold">
                                💻 100+ Projects Available
                            </div>
                            <div className="px-6 py-3 bg-white rounded-full shadow-md font-semibold">
                                📚 Full Documentation
                            </div>
                            <div className="px-6 py-3 bg-white rounded-full shadow-md font-semibold">
                                🔧 Lifetime Support
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
                                        ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg scale-105'
                                        : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-green-500'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Projects Grid */}
                    <StaggerCards className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProjects.map((project) => (
                            <Link key={project.id} href={`/projects/${project.slug}`}>
                                <div className="group bg-white rounded-2xl border-2 border-gray-200 hover:border-green-500 p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer h-full flex flex-col">
                                    {/* Icon & Stats */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="text-6xl">{project.image}</div>
                                        <div className="text-right text-xs text-gray-500">
                                            <div>⭐ {project.rating}</div>
                                            <div>📥 {project.downloads}+</div>
                                        </div>
                                    </div>

                                    {/* Category */}
                                    <span className="inline-block px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-semibold mb-3 w-fit">
                                        {project.category}
                                    </span>

                                    {/* Title */}
                                    <h3 className="font-bold text-xl mb-2 group-hover:text-green-600 transition-colors">
                                        {project.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-gray-600 text-sm mb-4 flex-grow">
                                        {project.description}
                                    </p>

                                    {/* Tech Stack */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.tech.map((tech, i) => (
                                            <span key={i} className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Features */}
                                    <div className="mb-4">
                                        <div className="text-xs font-semibold text-gray-700 mb-2">Key Features:</div>
                                        <ul className="text-xs text-gray-600 space-y-1">
                                            {project.features.slice(0, 3).map((feature, i) => (
                                                <li key={i}>✓ {feature}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Price & CTA */}
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                        <span className="text-2xl font-black text-green-600">
                                            ₹{(project.price / 1000).toFixed(0)}k
                                        </span>
                                        <Button variant="accent" size="sm">
                                            Buy Now
                                        </Button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </StaggerCards>
                </div>
            </section>

            {/* What's Included */}
            <section className="bg-white py-20">
                <div className="container mx-auto px-4 md:px-10">
                    <h2 className="text-4xl md:text-5xl font-black text-center mb-12 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        What's Included
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: '💻', title: 'Complete Source Code', desc: 'Well-documented and clean code' },
                            { icon: '📖', title: 'Documentation', desc: 'Setup guides and API docs' },
                            { icon: '🎨', title: 'UI/UX Design Files', desc: 'Figma/Adobe XD files included' },
                            { icon: '🔧', title: 'Lifetime Support', desc: 'Free updates and bug fixes' },
                        ].map((item, index) => (
                            <div key={index} className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 hover:scale-105 transition-transform">
                                <div className="text-6xl mb-4">{item.icon}</div>
                                <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                                <p className="text-gray-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-gradient-to-r from-green-600 to-emerald-600 py-20">
                <div className="container mx-auto px-4 md:px-10 text-center">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                        Need a Custom Project?
                    </h2>
                    <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
                        We can build a custom solution tailored to your specific requirements
                    </p>
                    <Link href="/contact">
                        <Button variant="primary" size="lg" rightIcon={<TiLocationArrow />} className="bg-white text-green-600 hover:bg-gray-100">
                            Request Custom Development
                        </Button>
                    </Link>
                </div>
            </section>
        </main>
    );
}
