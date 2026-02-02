import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Button from '@/components/ui/Button';
import { TiLocationArrow } from 'react-icons/ti';
import { HiCode, HiChip, HiShoppingCart, HiCheck, HiServer, HiDatabase, HiDeviceMobile } from 'react-icons/hi';

const PROJECTS = [
    {
        id: 1,
        title: 'E-Commerce Platform',
        slug: 'ecommerce-platform',
        description: 'Full-featured online store with payment integration, admin dashboard, and inventory tracking.',
        price: 29999,
        tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
        category: 'Web Apps',
        image: '🛒',
        gradient: 'from-emerald-100 to-green-50',
        features: [
            'User Authentication & Authorization',
            'Product Search & Filtering',
            'Shopping Cart & Checkout',
            'Payment Gateway Integration',
            'Order Management System',
            'Admin Dashboard',
            'Responsive Design'
        ]
    },
    {
        id: 2,
        title: 'AI Chatbot System',
        slug: 'ai-chatbot-system',
        description: 'Intelligent chatbot with NLP capabilities, custom training data support, and multi-platform integration.',
        price: 39999,
        tech: ['Python', 'TensorFlow', 'FastAPI', 'Redis', 'Docker'],
        category: 'AI/ML',
        image: '💬',
        gradient: 'from-blue-100 to-indigo-50',
        features: [
            'Natural Language Processing',
            'Context Awareness',
            'Custom Intent Classification',
            'Real-time WebSocket API',
            'Conversation History',
            'Admin Training Interface',
            'Multi-language Support'
        ]
    },
    {
        id: 3,
        title: 'Mobile Food Delivery App',
        slug: 'food-delivery-app',
        description: 'Cross-platform food ordering application with live tracking, driver app, and restaurant portal.',
        price: 34999,
        tech: ['React Native', 'Firebase', 'Google Maps API', 'Redux'],
        category: 'Mobile Apps',
        image: '🍔',
        gradient: 'from-orange-100 to-red-50',
        features: [
            'User, Driver & Restaurant Apps',
            'Real-time GPS Tracking',
            'Push Notifications',
            'Order Scheduling',
            'Payment Wallet',
            'Rating & Review System',
            'Dark Mode Support'
        ]
    },
    {
        id: 4,
        title: 'SaaS Dashboard',
        slug: 'saas-dashboard',
        description: 'Analytics dashboard with real-time data visualization, user management, and subscription handling.',
        price: 24999,
        tech: ['Next.js', 'PostgreSQL', 'Prisma', 'Tremor', 'Tailwind'],
        category: 'SaaS',
        image: '📊',
        gradient: 'from-purple-100 to-violet-50',
        features: [
            'Interactive Charts & Graphs',
            'Team Collaboration Tools',
            'Role-based Access Control',
            'Subscription Handling (Stripe)',
            'Email Notifications',
            'Data Export (PDF/CSV)',
            'Activity Logs'
        ]
    },
    {
        id: 5,
        title: 'Social Media Platform',
        slug: 'social-media-platform',
        description: 'Complete social networking application with feed, chat, stories, and user profiles.',
        price: 44999,
        tech: ['MERN Stack', 'Socket.io', 'AWS S3', 'Redis'],
        category: 'Web Apps',
        image: '📱',
        gradient: 'from-teal-100 to-cyan-50',
        features: [
            'News Feed with Algorithm',
            'Real-time Chat',
            'Story Updates (24h expiry)',
            'Media Upload & Optimization',
            'User Follow/Unfollow',
            'Notifications System',
            'Search & Explore'
        ]
    },
    {
        id: 6,
        title: 'Inventory Management',
        slug: 'inventory-management',
        description: 'Business inventory tracking system with barcode scanning, reporting, and low stock alerts.',
        price: 19999,
        tech: ['React', 'Express', 'MySQL', 'Sequelize'],
        category: 'Final Year',
        image: '📦',
        gradient: 'from-yellow-100 to-amber-50',
        features: [
            'Barcode & QR Scanning',
            'Stock Level Tracking',
            'Automated Low Stock Alerts',
            'Supplier Management',
            'Purchase Order Generation',
            'Sales Reporting',
            'Multi-warehouse Support'
        ]
    },
];

export async function generateStaticParams() {
    return PROJECTS.map((project) => ({
        slug: project.slug,
    }));
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
    const project = PROJECTS.find((p) => p.slug === params.slug);

    if (!project) {
        notFound();
    }

    return (
        <main className="relative min-h-screen w-screen overflow-x-hidden">
            {/* Hero Section */}
            <section className={`relative bg-gradient-to-br ${project.gradient} pt-32 pb-20`}>
                <div className="container mx-auto px-4 md:px-10">
                    <Link href="/projects" className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors mb-8 bg-white/50 px-4 py-2 rounded-full backdrop-blur-sm">
                        <TiLocationArrow className="rotate-180" />
                        <span>Back to Projects</span>
                    </Link>

                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="flex-1">
                            <span className="inline-block px-4 py-1.5 bg-white/80 backdrop-blur-md rounded-full text-sm font-bold text-gray-800 mb-6 border border-white/50 shadow-sm">
                                {project.category}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-black mb-6 text-gray-900 leading-tight">
                                {project.title}
                            </h1>
                            <p className="text-xl text-gray-700 mb-8 leading-relaxed max-w-xl">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {project.tech.map((tech, i) => (
                                    <span key={i} className="px-3 py-1 bg-white/60 rounded-md border border-white/50 text-sm font-semibold text-gray-800">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center gap-4">
                                <Button variant="primary" size="lg" rightIcon={<HiShoppingCart />}>
                                    Buy Source Code
                                </Button>
                                <Button variant="outline" size="lg" className="bg-white/50 border-white hover:bg-white">
                                    View Live Demo
                                </Button>
                            </div>
                        </div>

                        <div className="flex-1 flex justify-center">
                            <div className="text-[10rem] filter drop-shadow-2xl animate-pulse">
                                {project.image}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Project Details */}
            <section className="bg-white py-20">
                <div className="container mx-auto px-4 md:px-10">
                    <div className="grid md:grid-cols-2 gap-16">
                        {/* Features */}
                        <div>
                            <h2 className="text-3xl font-black mb-8">Key Features</h2>
                            <ul className="space-y-4">
                                {project.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                                        <div className="bg-green-100 p-1.5 rounded-full text-green-600 mt-1">
                                            <HiCheck size={16} />
                                        </div>
                                        <span className="text-lg text-gray-700 font-medium">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Purchase Info */}
                        <div>
                            <div className="bg-white rounded-3xl p-8 border-2 border-gray-100 shadow-xl">
                                <h3 className="text-2xl font-black mb-2">Purchase License</h3>
                                <p className="text-gray-500 mb-8">Get full access to the source code and documentation.</p>

                                <div className="flex items-end gap-2 mb-8">
                                    <div className="text-5xl font-black text-gray-900">
                                        ₹{(project.price / 1000).toFixed(0)}k
                                    </div>
                                    <span className="text-gray-400 text-lg mb-2 line-through">
                                        ₹{((project.price * 1.5) / 1000).toFixed(0)}k
                                    </span>
                                </div>

                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <HiCode className="text-blue-500 text-xl" />
                                        <span>Full Source Code</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <HiDatabase className="text-purple-500 text-xl" />
                                        <span>Database Schema</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <HiServer className="text-orange-500 text-xl" />
                                        <span>Setup Documentation</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <HiDeviceMobile className="text-green-500 text-xl" />
                                        <span>Responsive Design</span>
                                    </div>
                                </div>

                                <Button variant="accent" size="lg" className="w-full justify-center" rightIcon={<HiChip />}>
                                    Buy Now
                                </Button>
                                <p className="text-xs text-center text-gray-400 mt-4">Instant Download after Payment</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
