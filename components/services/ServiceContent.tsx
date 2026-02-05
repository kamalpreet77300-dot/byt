'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import LeadModal from '@/components/ui/LeadModal';
import { TiLocationArrow } from 'react-icons/ti';
import { HiCheckCircle } from 'react-icons/hi';
import VerticalServiceSlider from './VerticalServiceSlider';
import ThreeServiceBackground from './ThreeServiceBackground';
import Roadmap3D from './Roadmap3D';
import AnimatedTitle from '../ui/AnimatedTitle';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface ServiceContentProps {
    service: any;
    details: any;
}

const ServiceContent = ({ service, details }: ServiceContentProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleGetStarted = () => {
        setIsModalOpen(true);
    };

    useGSAP(() => {
        // Hero Content Animation
        const tl = gsap.timeline();
        tl.from('.hero-content > *', {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power4.out',
        })
            .from('.hero-3d', {
                x: 100,
                opacity: 0,
                duration: 1.5,
                ease: 'power3.out',
            }, '-=0.5');

        // Section Fade-in staggered
        const sections = gsap.utils.toArray('section:not(.hero)');
        sections.forEach((section: any) => {
            gsap.from(section, {
                opacity: 0,
                y: 50,
                duration: 1,
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
            });
        });

        // Benefits Grid Animation
        gsap.from('.benefit-card', {
            scale: 0.8,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: '.benefits-grid',
                start: 'top 85%',
            }
        });

    }, { scope: containerRef });

    return (
        <main ref={containerRef} className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-900">
            {/* Hero Section with 3D Workflow */}
            <section className="hero relative min-h-[100vh] flex items-center pt-20 overflow-hidden">
                {/* Background Blobs (Synced with Hero.tsx) */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                    <div className="absolute top-20 left-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
                    <div className="absolute top-40 right-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
                </div>

                <div className="container mx-auto px-4 md:px-10 relative z-10 w-full">
                    <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-0">
                        {/* Left Content */}
                        <div className="hero-content w-full lg:w-[45%] text-left lg:pr-10">
                            <Link href="/services" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors mb-8 bg-blue-50 px-4 py-2 rounded-full border border-blue-100 backdrop-blur-sm">
                                <TiLocationArrow className="rotate-180" />
                                <span className="font-bold text-xs tracking-widest uppercase">Our Ecosystem</span>
                            </Link>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="text-3xl text-blue-600 bg-blue-50 p-3 rounded-xl border border-blue-100">{service.icon}</div>
                                <span className="text-xs font-black tracking-[0.3em] uppercase text-gray-500">Service Insight</span>
                            </div>

                            <AnimatedTitle
                                title={service.title}
                                containerClass="!text-left !px-0 mb-8 !text-5xl md:!text-7xl font-black leading-[1.1] tracking-tight"
                            />

                            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-xl leading-relaxed font-medium">
                                {service.shortDesc}
                            </p>

                            <div className="flex flex-col sm:flex-row items-center gap-6">
                                <Button onClick={handleGetStarted} variant="primary" size="lg" className="px-10 py-5 text-lg rounded-xl shadow-xl shadow-blue-500/20" rightIcon={<TiLocationArrow />}>
                                    Initialize Project
                                </Button>
                                <Link href="#details" className="text-gray-500 font-bold hover:text-blue-600 transition-colors flex items-center gap-2 group text-sm uppercase tracking-widest">
                                    Process Flow
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </Link>
                            </div>
                        </div>

                        {/* Right 3D Content */}
                        <div className="hero-3d w-full lg:w-[55%] h-[600px] lg:h-[700px] relative">
                            <div className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-[3rem] border border-white/20 shadow-2xl overflow-hidden">
                                <ThreeServiceBackground color={service.color} slug={service.slug} />

                                {/* Interaction Hint */}
                                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
                                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Interactive Workflow Ecosystem</div>
                                    <div className="w-10 h-[1px] bg-gray-300" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Problem → Solution */}
            <section id="details" className="bg-white py-32 border-y border-gray-100">
                <div className="container mx-auto px-4 md:px-10">
                    <div className="text-center mb-20">
                        <p className="font-bold text-sm uppercase text-blue-600 tracking-widest mb-4">Strategic Framework</p>
                        <AnimatedTitle
                            title="The <b>Vision</b>"
                            containerClass="!text-black text-center !text-4xl md:!text-6xl font-black"
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        <div className="bg-blue-50/50 p-12 rounded-[2.5rem] border border-blue-100 hover:border-red-500/30 transition-all duration-500 group">
                            <div className="text-red-600 text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                                <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse" /> The Friction
                            </div>
                            <h3 className="text-3xl font-black mb-6 text-gray-900 leading-tight">Identify the Barrier</h3>
                            <p className="text-xl text-gray-600 leading-relaxed font-medium">{details.problem}</p>
                        </div>

                        <div className="bg-blue-50/50 p-12 rounded-[2.5rem] border border-blue-100 hover:border-green-500/30 transition-all duration-500 group">
                            <div className="text-green-600 text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse" /> The Solution
                            </div>
                            <h3 className="text-3xl font-black mb-6 text-gray-900 leading-tight">Architect the Future</h3>
                            <p className="text-xl text-gray-600 leading-relaxed font-medium">{details.solution}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Execution Roadmap */}
            <section className="bg-white py-32 overflow-hidden relative">
                <div className="container mx-auto px-4 md:px-10 mb-16">
                    <p className="font-bold text-sm uppercase text-blue-600 tracking-widest mb-4 text-center">Project Lifecycle</p>
                    <AnimatedTitle
                        title="Execution <b>Roadmap</b>"
                        containerClass="!text-black text-center !text-4xl md:!text-6xl font-black"
                    />
                </div>

                {/* 3D Roadmap Container */}
                <div className="relative w-full h-[800px] bg-gray-50 border-y border-gray-100">
                    <div className="absolute inset-0 pointer-events-none z-10">
                        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent" />
                        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent" />
                    </div>
                    <div className="w-full h-full relative z-0">
                        <Roadmap3D process={details.process} />
                    </div>
                </div>

                <div className="container mx-auto px-4 md:px-10 mt-16 text-center">
                    <p className="text-gray-400 font-bold uppercase tracking-[0.3em] text-[10px]">Explore the process landscape through the 3D viewport</p>
                </div>
            </section>

            {/* Tech Stack Horizontal Glow Cards */}
            <section className="bg-gray-50 py-32 border-t border-gray-200">
                <div className="container mx-auto px-4 md:px-10">
                    <p className="font-bold text-sm uppercase text-blue-600 tracking-widest text-center mb-4">Our Technology</p>
                    <AnimatedTitle
                        title="Core <b>Tech Stack</b>"
                        containerClass="!text-black text-center !text-3xl md:!text-5xl font-black mb-20"
                    />
                    <div className="flex flex-wrap gap-6 justify-center max-w-5xl mx-auto">
                        {details.techStack.map((tech: string, index: number) => (
                            <div key={index} className="px-10 py-5 bg-white rounded-2xl border border-gray-200 font-black text-gray-700 hover:border-blue-500/50 hover:bg-blue-50 transition-all hover:-translate-y-2 uppercase tracking-tighter text-sm shadow-sm">
                                {tech}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Key Capabilities Grid */}
            <section className="bg-white py-32">
                <div className="container mx-auto px-4 md:px-10">
                    <p className="font-bold text-sm uppercase text-purple-600 tracking-widest text-center mb-4">Advanced Solutions</p>
                    <AnimatedTitle
                        title="Key <b>Capabilities</b>"
                        containerClass="!text-black text-center !text-3xl md:!text-5xl font-black mb-24"
                    />
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {details.features.map((feature: any, index: number) => (
                            <div key={index} className="p-10 rounded-[2.5rem] bg-gray-50 border border-gray-100 hover:border-purple-300 transition-all duration-500 hover:-translate-y-2 shadow-sm group">
                                <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center text-2xl mb-8 border border-purple-200 group-hover:bg-purple-600 group-hover:text-white transition-colors">✨</div>
                                <h3 className="text-2xl font-black mb-4 text-gray-900 uppercase tracking-tighter">{feature.title}</h3>
                                <p className="text-gray-600 text-lg leading-relaxed font-medium">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us Icons */}
            <section className="bg-blue-50/30 py-32 benefits-grid">
                <div className="container mx-auto px-4 md:px-10">
                    <p className="font-bold text-sm uppercase text-blue-600 tracking-widest text-center mb-4">Value Proposition</p>
                    <AnimatedTitle
                        title="Strategic <b>Benefits</b>"
                        containerClass="!text-black text-center !text-3xl md:!text-5xl font-black mb-20"
                    />
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                        {details.benefits.map((benefit: string, index: number) => (
                            <div key={index} className="benefit-card flex flex-col gap-6 p-10 bg-white rounded-[2.5rem] border border-gray-100 items-center text-center hover:shadow-xl transition-all shadow-sm">
                                <div className="p-4 bg-blue-50 rounded-full border border-blue-100">
                                    <HiCheckCircle className="text-blue-600 text-4xl" />
                                </div>
                                <span className="font-black text-gray-900 text-lg leading-tight uppercase tracking-tighter">{benefit}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="bg-white py-32 border-t border-gray-100">
                <div className="container mx-auto px-4 md:px-10 max-w-4xl">
                    <p className="font-bold text-sm uppercase text-gray-500 tracking-widest text-center mb-4">Common Inquiries</p>
                    <AnimatedTitle
                        title="Global <b>FAQ</b>"
                        containerClass="!text-black text-center !text-3xl md:!text-5xl font-black mb-20"
                    />
                    <div className="space-y-6">
                        {details.faq.map((item: any, index: number) => (
                            <div key={index} className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                                <h3 className="text-xl font-black mb-4 text-gray-900 underline decoration-blue-500/30 underline-offset-8 decoration-4">{item.q}</h3>
                                <p className="text-gray-600 text-lg leading-relaxed font-medium">{item.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Case Studies */}
            <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-32 border-y border-gray-100">
                <div className="container mx-auto px-4 md:px-10">
                    <p className="font-bold text-sm uppercase text-blue-600 tracking-widest text-center mb-4">Proven Results</p>
                    <AnimatedTitle
                        title="Success <b>Engagements</b>"
                        containerClass="!text-black text-center !text-3xl md:!text-5xl font-black mb-20"
                    />
                    <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
                        {details.caseStudies.map((study: any, index: number) => (
                            <div key={index} className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-xl hover:border-blue-300 transition-all">
                                <h3 className="text-3xl font-black mb-4 text-gray-900 uppercase tracking-tighter">{study.title}</h3>
                                <p className="text-blue-600 font-extrabold text-xl mb-6">✓ {study.result}</p>
                                <div className="pt-6 border-t border-gray-100">
                                    <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Stack: {study.tech}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section className="bg-white py-32">
                <div className="container mx-auto px-4 md:px-10">
                    <p className="font-bold text-sm uppercase text-blue-600 tracking-widest text-center mb-4">Investment Scale</p>
                    <AnimatedTitle
                        title="Investment <b>Tiers</b>"
                        containerClass="!text-black text-center !text-3xl md:!text-5xl font-black mb-24"
                    />
                    <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">
                        {details.pricing.map((plan: any, index: number) => (
                            <div key={index} className={`p-12 rounded-[3.5rem] border transition-all duration-500 ${index === 1 ? 'border-blue-500 bg-blue-50 scale-105 shadow-2xl' : 'border-gray-100 bg-gray-50'}`}>
                                <h3 className="text-2xl font-black mb-6 uppercase tracking-widest text-gray-900">{plan.name}</h3>
                                <div className="text-5xl font-black mb-10 text-gray-900 flex items-end gap-1">
                                    <span className="text-2xl text-blue-600 mb-2">₹</span>
                                    {(plan.price / 1000).toFixed(0)}k
                                    <span className="text-sm text-gray-400 mb-2 font-bold uppercase tracking-widest ml-1">/ Start</span>
                                </div>
                                <ul className="space-y-4 mb-12">
                                    {plan.features.map((feature: string, i: number) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <HiCheckCircle className="text-blue-600 text-2xl flex-shrink-0" />
                                            <span className="text-gray-700 font-bold tracking-tight">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Button onClick={handleGetStarted} variant={index === 1 ? 'primary' : 'outline'} size="lg" className="w-full py-6 rounded-2xl font-black text-lg uppercase tracking-widest">
                                    Establish Node
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <VerticalServiceSlider />

            {/* Premium CTA */}
            <section className="py-40 px-4 relative bg-white overflow-hidden">
                {/* Background Blobs (Synced with Hero.tsx) */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                    <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-100/50 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />
                </div>

                <div className="max-w-7xl mx-auto bg-gray-900 rounded-[5rem] p-20 md:p-32 text-center relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[150px]" />

                    <div className="relative z-10 w-full">
                        <AnimatedTitle
                            title="Initialize <br /> <b>Your Vision</b>"
                            containerClass="!text-white text-center !text-5xl md:!text-8xl font-black mb-10 leading-[0.9] tracking-tighter uppercase"
                        />
                        <p className="text-xl md:text-2xl text-gray-400 mb-14 max-w-2xl mx-auto font-medium leading-relaxed opacity-80">
                            Our architecture is ready to scale. Let's build the next generation of digital infrastructure together.
                        </p>
                        <Button onClick={handleGetStarted} variant="primary" size="lg" className="px-16 py-7 text-2xl rounded-2xl shadow-3xl bg-blue-600 text-white hover:scale-110 transition-all font-black uppercase tracking-widest" rightIcon={<TiLocationArrow />}>
                            Establish Connection
                        </Button>
                    </div>
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
