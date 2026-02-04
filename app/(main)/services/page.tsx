import React from 'react';
import Link from 'next/link';
import { SERVICES } from '@/lib/constants';
import AnimatedTitle from '@/components/ui/AnimatedTitle';
import BentoCard from '@/components/ui/BentoCard';
import StaggerCards from '@/components/ui/StaggerCards';
import Button from '@/components/ui/Button';
import { TiLocationArrow } from 'react-icons/ti';
import { HiCheckCircle } from 'react-icons/hi';

export const metadata = {
    title: 'Our Services - BytSmartz',
    description: 'Comprehensive IT services including web development, mobile apps, AI/ML, SaaS, APIs, and cloud solutions',
};

export default function ServicesPage() {
    return (
        <main className="relative min-h-screen w-screen overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-32 pb-20">
                <div className="container mx-auto px-4 md:px-10">
                    <div className="text-center max-w-4xl mx-auto mb-16">
                        <AnimatedTitle
                            title="Our <b>Services</b>"
                            containerClass="mb-6"
                        />
                        <p className="text-xl md:text-2xl text-gray-600 mb-8">
                            Transforming businesses with cutting-edge technology solutions
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <div className="flex items-center gap-2 text-gray-700">
                                <HiCheckCircle className="text-green-500 text-xl" />
                                <span>500+ Projects Delivered</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-700">
                                <HiCheckCircle className="text-green-500 text-xl" />
                                <span>Expert Team</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-700">
                                <HiCheckCircle className="text-green-500 text-xl" />
                                <span>24/7 Support</span>
                            </div>
                        </div>
                    </div>

                    {/* Services Grid */}
                    <StaggerCards className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {SERVICES.map((service) => (
                            <Link key={service.id} href={`/services`}>
                                <BentoCard
                                    title={service.title}
                                    description={service.shortDesc}
                                    icon={service.icon}
                                    gradient={service.gradient}
                                    className="h-full"
                                >
                                    <div className="mt-6">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            rightIcon={<TiLocationArrow />}
                                        >
                                            Learn More
                                        </Button>
                                    </div>
                                </BentoCard>
                            </Link>
                        ))}
                    </StaggerCards>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="bg-white py-20">
                <div className="container mx-auto px-4 md:px-10">
                    <h2 className="text-4xl md:text-5xl font-black text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Why Choose Us
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: '🎯', title: 'Expert Team', desc: 'Skilled professionals with years of experience' },
                            { icon: '⚡', title: 'Fast Delivery', desc: 'Quick turnaround without compromising quality' },
                            { icon: '💰', title: 'Competitive Pricing', desc: 'Best value for your investment' },
                            { icon: '🔒', title: 'Secure & Reliable', desc: 'Enterprise-grade security standards' },
                        ].map((item, index) => (
                            <div key={index} className="text-center p-6 rounded-xl bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 hover:border-blue-500 transition-all duration-300 hover:scale-105">
                                <div className="text-6xl mb-4">{item.icon}</div>
                                <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                                <p className="text-gray-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
                <div className="container mx-auto px-4 md:px-10 text-center">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                        Ready to Start Your Project?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Let's discuss how we can help transform your business with our expert IT services
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/contact">
                            <Button variant="accent" size="lg" rightIcon={<TiLocationArrow />}>
                                Get Free Consultation
                            </Button>
                        </Link>
                        <Link href="/projects">
                            <Button variant="outline" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                                View Our Work
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
