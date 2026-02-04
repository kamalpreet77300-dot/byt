'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Button from '../ui/Button';
import { TiLocationArrow } from 'react-icons/ti';
import { HiCode, HiChip } from 'react-icons/hi';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LeadModal from '../ui/LeadModal';

gsap.registerPlugin(ScrollTrigger);

const FEATURED_PROJECTS = [
    {
        id: 1,
        title: 'E-Commerce Platform',
        slug: 'ecommerce-platform',
        description: 'Full-featured online store with payment integration, admin dashboard, and inventory tracking.',
        price: 29999,
        tech: ['React', 'Node.js', 'MongoDB'],
        category: 'Web Apps',
        image: '🛒',
        gradient: 'from-emerald-100 to-green-50'
    },
    {
        id: 2,
        title: 'AI Chatbot System',
        slug: 'ai-chatbot-system',
        description: 'Intelligent chatbot with NLP capabilities, custom training data support, and multi-platform integration.',
        price: 39999,
        tech: ['Python', 'TensorFlow', 'FastAPI'],
        category: 'AI/ML',
        image: '💬',
        gradient: 'from-blue-100 to-indigo-50'
    },
    {
        id: 3,
        title: 'Mobile Food Delivery App',
        slug: 'food-delivery-app',
        description: 'Cross-platform food ordering application with live tracking, driver app, and restaurant portal.',
        price: 34999,
        tech: ['React Native', 'Firebase'],
        category: 'Mobile Apps',
        image: '🍔',
        gradient: 'from-orange-100 to-red-50'
    },
    {
        id: 4,
        title: 'SaaS Dashboard',
        slug: 'saas-dashboard',
        description: 'Analytics dashboard with real-time data visualization, user management, and subscription handling.',
        price: 24999,
        tech: ['Next.js', 'PostgreSQL'],
        category: 'SaaS',
        image: '📊',
        gradient: 'from-purple-100 to-violet-50'
    },
    {
        id: 5,
        title: 'Social Media Platform',
        slug: 'social-media-platform',
        description: 'Complete social networking application with feed, chat, stories, and user profiles.',
        price: 44999,
        tech: ['MERN Stack', 'Socket.io'],
        category: 'Web Apps',
        image: '📱',
        gradient: 'from-teal-100 to-cyan-50'
    },
    {
        id: 6,
        title: 'Inventory Management',
        slug: 'inventory-management',
        description: 'Business inventory tracking system with barcode scanning, reporting, and low stock alerts.',
        price: 19999,
        tech: ['React', 'Express', 'MySQL'],
        category: 'Final Year',
        image: '📦',
        gradient: 'from-yellow-100 to-amber-50'
    },
];

const FeaturedProjects = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [selectedProject, setSelectedProject] = React.useState<typeof FEATURED_PROJECTS[0] | null>(null);

    const handleBuy = (project: typeof FEATURED_PROJECTS[0]) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    useGSAP(() => {
        gsap.to('.project-card', {
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 70%',
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="bg-white py-8 md:py-12 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-green-50/50 rounded-full blur-3xl -z-10" />

            <div className="container mx-auto px-4 md:px-10">
                {/* Section Header */}
                <div className="text-center mb-16 space-y-4">
                    <p className="font-general text-xs uppercase text-green-600 font-bold tracking-widest">
                        Marketplace
                    </p>
                    <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                        Featured Projects
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Production-ready source code with complete documentation, perfect for learning or starting your business
                    </p>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {FEATURED_PROJECTS.map((project) => (
                        <div key={project.id} onClick={() => handleBuy(project)} className="cursor-pointer">
                            <div className="project-card opacity-0 translate-y-10 group h-full bg-white rounded-3xl border border-gray-100 shadow-lg shadow-gray-100 hover:shadow-2xl hover:shadow-green-100/50 p-6 md:p-8 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
                                {/* Hover Gradient */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10`} />

                                <div className="flex justify-between items-start mb-6">
                                    <div className="text-6xl group-hover:scale-110 transition-transform duration-500 ease-out origin-left">
                                        {project.image}
                                    </div>
                                    <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-[10px] font-bold uppercase tracking-wider border border-green-100">
                                        {project.category}
                                    </span>
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors">
                                    {project.title}
                                </h3>

                                <p className="text-gray-600 text-sm mb-6 leading-relaxed min-h-[40px]">
                                    {project.description}
                                </p>

                                {/* Tech Stack */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tech.map((tech, index) => (
                                        <div key={index} className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 rounded-md border border-gray-100 text-xs font-medium text-gray-500 group-hover:bg-white/80 group-hover:border-green-100 transition-colors">
                                            {index === 0 && <HiCode className="text-gray-400" />}
                                            {tech}
                                        </div>
                                    ))}
                                </div>

                                {/* Price & CTA */}
                                <div className="flex items-center justify-between pt-6 border-t border-gray-100 group-hover:border-green-100 transition-colors">
                                    <div>
                                        <p className="text-xs text-gray-400 mb-0.5">One-time License</p>
                                        <span className="text-3xl font-black text-gray-900 group-hover:text-green-600 transition-colors">
                                            ₹{(project.price / 1000).toFixed(0)}k
                                        </span>
                                    </div>
                                    <Button variant="accent" size="sm" rightIcon={<HiChip />} className="text-sm shadow-none">
                                        Get Code
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center">
                    <Link href="/projects">
                        <Button variant="outline" size="lg" rightIcon={<TiLocationArrow />} className="border-green-200 hover:bg-green-50 text-green-700">
                            Browse All Projects
                        </Button>
                    </Link>
                </div>
            </div>

            <LeadModal
                type="PROJECT_PURCHASE"
                title={selectedProject?.title || ''}
                subtitle="Purchase Project"
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </section>
    );
};

export default FeaturedProjects;
