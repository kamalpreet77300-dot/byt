'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import LeadModal from '@/components/ui/LeadModal';
import { TiLocationArrow } from 'react-icons/ti';
import { HiCheckCircle } from 'react-icons/hi';
import VerticalServiceSlider from './VerticalServiceSlider';

interface ServiceContentProps {
    service: any;
    details: any;
}

const ServiceContent = ({ service, details }: ServiceContentProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleGetStarted = () => {
        setIsModalOpen(true);
    };

    return (
        <main className="relative min-h-screen w-screen overflow-x-hidden">
            {/* Hero */}
            <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-32 pb-20">
                <div className="container mx-auto px-4 md:px-10">
                    <Link href="/services" className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors mb-8">
                        <TiLocationArrow className="rotate-180" />
                        <span>Back to Services</span>
                    </Link>
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="text-7xl mb-6">{service.icon}</div>
                        <h1 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {service.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 mb-8">
                            {service.shortDesc}
                        </p>
                        <Button onClick={handleGetStarted} variant="primary" size="lg" rightIcon={<TiLocationArrow />}>
                            Get Started
                        </Button>
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

            {/* Key Features */}
            <section className="bg-gray-50 py-20">
                <div className="container mx-auto px-4 md:px-10">
                    <h2 className="text-4xl md:text-5xl font-black text-center mb-12">Key Features</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {details.features.map((feature: any, index: number) => (
                            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                                <h3 className="text-xl font-bold mb-3 text-blue-600">{feature.title}</h3>
                                <p className="text-gray-600">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="bg-white py-20">
                <div className="container mx-auto px-4 md:px-10">
                    <h2 className="text-4xl md:text-5xl font-black text-center mb-12">Why Choose Us</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {details.benefits.map((benefit: string, index: number) => (
                            <div key={index} className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                                <HiCheckCircle className="text-blue-600 text-2xl flex-shrink-0" />
                                <span className="font-bold text-gray-800">{benefit}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="bg-white py-20 border-t border-gray-100">
                <div className="container mx-auto px-4 md:px-10 max-w-4xl">
                    <h2 className="text-4xl md:text-5xl font-black text-center mb-12">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        {details.faq.map((item: any, index: number) => (
                            <div key={index} className="bg-gray-50 p-6 rounded-2xl">
                                <h3 className="text-xl font-bold mb-2 text-gray-900">{item.q}</h3>
                                <p className="text-gray-600">{item.a}</p>
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
                                <Button onClick={handleGetStarted} variant={index === 1 ? 'primary' : 'outline'} size="md" className="w-full">
                                    Get Started
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Vertical Service Slider */}
            <VerticalServiceSlider />

            {/* CTA */}
            <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
                <div className="container mx-auto px-4 md:px-10 text-center">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                        Ready to Get Started?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Let's discuss your project and create something amazing together
                    </p>
                    <Button onClick={handleGetStarted} variant="accent" size="lg" rightIcon={<TiLocationArrow />}>
                        Contact Us Now
                    </Button>
                </div>
            </section>

            <LeadModal
                type="CONTACT"
                title={`Get Started with ${service.title}`}
                subtitle="Fill out the form below and we'll get back to you shortly."
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </main>
    );
};

export default ServiceContent;
