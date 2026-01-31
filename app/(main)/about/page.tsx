'use client';

import React from 'react';
import AnimatedTitle from '@/components/ui/AnimatedTitle';
import StaggerCards from '@/components/ui/StaggerCards';
import Button from '@/components/ui/Button';
import { TiLocationArrow } from 'react-icons/ti';
import { HiUsers, HiLightBulb, HiTrendingUp, HiHeart } from 'react-icons/hi';

export default function AboutPage() {
    return (
        <main className="relative min-h-screen w-screen overflow-x-hidden">
            {/* Hero */}
            <section className="relative bg-gradient-to-br from-indigo-50 via-white to-blue-50 pt-32 pb-20">
                <div className="container mx-auto px-4 md:px-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <AnimatedTitle title="About <b>BytSmartz</b>" containerClass="mb-6" />
                        <p className="text-xl md:text-2xl text-gray-600 mb-8">
                            Empowering businesses and individuals with cutting-edge technology solutions since 2015
                        </p>
                    </div>
                </div>
            </section>

            {/* Our Story */}
            <section className="bg-white py-20">
                <div className="container mx-auto px-4 md:px-10">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-black text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Our Story
                        </h2>
                        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
                            <p className="text-lg leading-relaxed">
                                Founded in 2015, BytSmartz started with a simple mission: to bridge the gap between technology and business success. What began as a small team of passionate developers has grown into a full-service IT company serving clients worldwide.
                            </p>
                            <p className="text-lg leading-relaxed">
                                We specialize in custom software development, professional training, and providing ready-made solutions that help businesses accelerate their digital transformation. Our team of 50+ experts brings together decades of combined experience in cutting-edge technologies.
                            </p>
                            <p className="text-lg leading-relaxed">
                                Today, we're proud to have delivered 500+ successful projects, trained over 1000 students, and maintained a 98% client satisfaction rate. Our commitment to excellence and innovation continues to drive everything we do.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
                <div className="container mx-auto px-4 md:px-10">
                    <h2 className="text-4xl md:text-5xl font-black text-center mb-12">Our Values</h2>
                    <StaggerCards className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                icon: <HiLightBulb className="text-6xl text-yellow-500" />,
                                title: 'Innovation',
                                desc: 'Constantly exploring new technologies and approaches',
                            },
                            {
                                icon: <HiUsers className="text-6xl text-blue-500" />,
                                title: 'Collaboration',
                                desc: 'Working together to achieve exceptional results',
                            },
                            {
                                icon: <HiTrendingUp className="text-6xl text-green-500" />,
                                title: 'Excellence',
                                desc: 'Delivering quality that exceeds expectations',
                            },
                            {
                                icon: <HiHeart className="text-6xl text-red-500" />,
                                title: 'Integrity',
                                desc: 'Building trust through transparency and honesty',
                            },
                        ].map((value, index) => (
                            <div key={index} className="bg-white rounded-2xl p-8 text-center border-2 border-gray-200 hover:border-blue-500 transition-all hover:scale-105">
                                <div className="mb-4">{value.icon}</div>
                                <h3 className="font-bold text-xl mb-3">{value.title}</h3>
                                <p className="text-gray-600">{value.desc}</p>
                            </div>
                        ))}
                    </StaggerCards>
                </div>
            </section>

            {/* Team */}
            <section className="bg-white py-20">
                <div className="container mx-auto px-4 md:px-10">
                    <h2 className="text-4xl md:text-5xl font-black text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Our Leadership Team
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {[
                            { name: 'Rajesh Kumar', role: 'CEO & Founder', emoji: '👨‍💼' },
                            { name: 'Priya Sharma', role: 'CTO', emoji: '👩‍💻' },
                            { name: 'Amit Patel', role: 'Head of Training', emoji: '👨‍🏫' },
                        ].map((member, index) => (
                            <div key={index} className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 hover:border-blue-500 transition-all hover:scale-105">
                                <div className="text-8xl mb-4">{member.emoji}</div>
                                <h3 className="font-bold text-xl mb-2">{member.name}</h3>
                                <p className="text-blue-600 font-semibold">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
                <div className="container mx-auto px-4 md:px-10">
                    <h2 className="text-4xl md:text-5xl font-black text-center text-white mb-12">
                        Our Impact
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        {[
                            { number: '500+', label: 'Projects Completed' },
                            { number: '1000+', label: 'Students Trained' },
                            { number: '50+', label: 'Team Members' },
                            { number: '98%', label: 'Satisfaction Rate' },
                        ].map((stat, index) => (
                            <div key={index} className="text-center p-6 rounded-xl bg-white/10 backdrop-blur-sm">
                                <div className="text-4xl md:text-5xl font-black text-white mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-blue-100">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-white py-20">
                <div className="container mx-auto px-4 md:px-10 text-center">
                    <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Ready to Work With Us?
                    </h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Let's discuss how we can help you achieve your goals
                    </p>
                    <Button variant="primary" size="lg" rightIcon={<TiLocationArrow />}>
                        Get In Touch
                    </Button>
                </div>
            </section>
        </main>
    );
}
