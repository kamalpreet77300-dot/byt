import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SERVICES } from '@/lib/constants';
import AnimatedTitle from '@/components/ui/AnimatedTitle';
import Button from '@/components/ui/Button';
import { TiLocationArrow } from 'react-icons/ti';
import { HiCheckCircle, HiCode, HiLightningBolt } from 'react-icons/hi';

const SERVICE_DETAILS: Record<string, any> = {
    'web-development': {
        problem: 'Businesses struggle with outdated websites that don\'t convert visitors into customers',
        solution: 'We build modern, responsive web applications that drive engagement and sales',
        techStack: ['React', 'Next.js', 'Node.js', 'MongoDB', 'PostgreSQL', 'TypeScript'],
        process: [
            { step: 'Discovery', desc: 'Understanding your business goals and requirements' },
            { step: 'Design', desc: 'Creating wireframes and UI/UX designs' },
            { step: 'Development', desc: 'Building with modern technologies' },
            { step: 'Testing', desc: 'Rigorous quality assurance' },
            { step: 'Deployment', desc: 'Launch and ongoing support' },
        ],
        caseStudies: [
            { title: 'E-Commerce Platform', result: '300% increase in sales', tech: 'Next.js, Stripe' },
            { title: 'SaaS Dashboard', result: '50K+ active users', tech: 'React, Node.js' },
        ],
        pricing: [
            { name: 'Starter', price: 49999, features: ['5 Pages', 'Responsive Design', 'SEO Optimized', '1 Month Support'] },
            { name: 'Professional', price: 99999, features: ['15 Pages', 'Custom Design', 'CMS Integration', '3 Months Support', 'Analytics'] },
            { name: 'Enterprise', price: 199999, features: ['Unlimited Pages', 'Advanced Features', 'API Integration', '12 Months Support', 'Priority Support'] },
        ],
    },
    'mobile-app-development': {
        problem: 'Reaching customers on mobile requires native apps that work seamlessly',
        solution: 'Cross-platform mobile apps that deliver native performance on iOS and Android',
        techStack: ['React Native', 'Flutter', 'Firebase', 'Redux', 'Native APIs'],
        process: [
            { step: 'Planning', desc: 'App strategy and feature planning' },
            { step: 'UI/UX Design', desc: 'Mobile-first design approach' },
            { step: 'Development', desc: 'Cross-platform development' },
            { step: 'Testing', desc: 'Device and OS testing' },
            { step: 'Launch', desc: 'App store deployment' },
        ],
        caseStudies: [
            { title: 'Food Delivery App', result: '100K+ downloads', tech: 'React Native' },
            { title: 'Fitness Tracker', result: '4.8★ rating', tech: 'Flutter' },
        ],
        pricing: [
            { name: 'Basic', price: 79999, features: ['Single Platform', 'Basic Features', 'App Store Submission', '2 Months Support'] },
            { name: 'Standard', price: 149999, features: ['iOS + Android', 'Advanced Features', 'Push Notifications', '6 Months Support'] },
            { name: 'Premium', price: 299999, features: ['Full Features', 'Backend Integration', 'Analytics', '12 Months Support', 'Maintenance'] },
        ],
    },
    'ai-ml-solutions': {
        problem: 'Businesses need intelligent automation to stay competitive',
        solution: 'AI-powered solutions that automate processes and provide insights',
        techStack: ['Python', 'TensorFlow', 'PyTorch', 'scikit-learn', 'FastAPI', 'OpenAI'],
        process: [
            { step: 'Data Analysis', desc: 'Understanding your data landscape' },
            { step: 'Model Design', desc: 'Selecting appropriate algorithms' },
            { step: 'Training', desc: 'Model training and optimization' },
            { step: 'Integration', desc: 'Deploying into your systems' },
            { step: 'Monitoring', desc: 'Continuous improvement' },
        ],
        caseStudies: [
            { title: 'Chatbot System', result: '80% automation rate', tech: 'NLP, GPT' },
            { title: 'Recommendation Engine', result: '45% increase in engagement', tech: 'ML, Python' },
        ],
        pricing: [
            { name: 'Starter', price: 99999, features: ['Basic ML Model', 'Data Analysis', 'API Integration', '3 Months Support'] },
            { name: 'Advanced', price: 199999, features: ['Custom AI Solution', 'Deep Learning', 'Real-time Processing', '6 Months Support'] },
            { name: 'Enterprise', price: 399999, features: ['Full AI Platform', 'Custom Training', 'Scalable Infrastructure', '12 Months Support'] },
        ],
    },
};

export async function generateStaticParams() {
    return SERVICES.map((service) => ({
        slug: service.slug,
    }));
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
    const service = SERVICES.find((s) => s.slug === params.slug);
    const details = SERVICE_DETAILS[params.slug];

    if (!service || !details) {
        notFound();
    }

    return (
        <main className="relative min-h-screen w-screen overflow-x-hidden">
            {/* Hero */}
            <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-32 pb-20">
                <div className="container mx-auto px-4 md:px-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="text-7xl mb-6">{service.icon}</div>
                        <h1 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {service.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 mb-8">
                            {service.shortDesc}
                        </p>
                        <Link href="/contact">
                            <Button variant="primary" size="lg" rightIcon={<TiLocationArrow />}>
                                Get Started
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Problem → Solution */}
            <section className="bg-white py-20">
                <div className="container mx-auto px-4 md:px-10">
                    <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        <div className="bg-red-50 p-8 rounded-2xl border-2 border-red-200">
                            <h2 className="text-3xl font-black mb-4 text-red-600">The Problem</h2>
                            <p className="text-lg text-gray-700">{details.problem}</p>
                        </div>
                        <div className="bg-green-50 p-8 rounded-2xl border-2 border-green-200">
                            <h2 className="text-3xl font-black mb-4 text-green-600">Our Solution</h2>
                            <p className="text-lg text-gray-700">{details.solution}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tech Stack */}
            <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-20">
                <div className="container mx-auto px-4 md:px-10">
                    <h2 className="text-4xl md:text-5xl font-black text-center mb-12">Technology Stack</h2>
                    <div className="flex flex-wrap gap-4 justify-center max-w-4xl mx-auto">
                        {details.techStack.map((tech: string, index: number) => (
                            <div key={index} className="px-6 py-3 bg-white rounded-full border-2 border-blue-200 font-semibold text-blue-600 hover:scale-110 transition-transform">
                                {tech}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Development Process */}
            <section className="bg-white py-20">
                <div className="container mx-auto px-4 md:px-10">
                    <h2 className="text-4xl md:text-5xl font-black text-center mb-12">Our Process</h2>
                    <div className="grid md:grid-cols-5 gap-6 max-w-6xl mx-auto">
                        {details.process.map((item: any, index: number) => (
                            <div key={index} className="text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-black mx-auto mb-4">
                                    {index + 1}
                                </div>
                                <h3 className="font-bold text-lg mb-2">{item.step}</h3>
                                <p className="text-sm text-gray-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Case Studies */}
            <section className="bg-gradient-to-br from-purple-50 to-pink-50 py-20">
                <div className="container mx-auto px-4 md:px-10">
                    <h2 className="text-4xl md:text-5xl font-black text-center mb-12">Success Stories</h2>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {details.caseStudies.map((study: any, index: number) => (
                            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg">
                                <h3 className="text-2xl font-bold mb-3">{study.title}</h3>
                                <p className="text-green-600 font-semibold text-lg mb-3">✓ {study.result}</p>
                                <p className="text-gray-600">Tech: {study.tech}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section className="bg-white py-20">
                <div className="container mx-auto px-4 md:px-10">
                    <h2 className="text-4xl md:text-5xl font-black text-center mb-12">Pricing Plans</h2>
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {details.pricing.map((plan: any, index: number) => (
                            <div key={index} className={`p-8 rounded-2xl border-2 ${index === 1 ? 'border-blue-500 scale-105 shadow-2xl' : 'border-gray-200'}`}>
                                <h3 className="text-2xl font-black mb-4">{plan.name}</h3>
                                <div className="text-4xl font-black mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    ₹{(plan.price / 1000).toFixed(0)}k
                                </div>
                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature: string, i: number) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <HiCheckCircle className="text-green-500 text-xl mt-0.5 flex-shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link href="/contact">
                                    <Button variant={index === 1 ? 'primary' : 'outline'} size="md" className="w-full">
                                        Get Started
                                    </Button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
                <div className="container mx-auto px-4 md:px-10 text-center">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                        Ready to Get Started?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Let's discuss your project and create something amazing together
                    </p>
                    <Link href="/contact">
                        <Button variant="accent" size="lg" rightIcon={<TiLocationArrow />}>
                            Contact Us Now
                        </Button>
                    </Link>
                </div>
            </section>
        </main>
    );
}
