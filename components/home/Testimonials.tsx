'use client';

import React from 'react';
import { HiStar } from 'react-icons/hi';

const TESTIMONIALS = [
    {
        id: 1,
        name: 'Rajesh Kumar',
        role: 'Full-Stack Developer',
        company: 'Tech Innovations Pvt Ltd',
        image: '👨‍💼',
        rating: 5,
        text: 'The MERN stack course transformed my career. The instructors are industry experts and the hands-on projects were invaluable. Highly recommended!',
    },
    {
        id: 2,
        name: 'Priya Sharma',
        role: 'AI/ML Engineer',
        company: 'DataSci Solutions',
        image: '👩‍💻',
        rating: 5,
        text: 'Excellent AI/ML training program! The curriculum is up-to-date with industry standards. Got placed within 2 months of completion.',
    },
    {
        id: 3,
        name: 'Amit Patel',
        role: 'DevOps Engineer',
        company: 'Cloud Systems Inc',
        image: '👨‍🔧',
        rating: 5,
        text: 'Best DevOps course I have taken. Practical approach with real-world scenarios. The placement assistance was outstanding.',
    },
    {
        id: 4,
        name: 'Sneha Reddy',
        role: 'React Developer',
        company: 'WebTech Studios',
        image: '👩‍🎨',
        rating: 5,
        text: 'The React & Next.js course exceeded my expectations. Great mentorship and career guidance. Worth every penny!',
    },
];

const Testimonials = () => {
    return (
        <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-10 md:py-16">
            <div className="container mx-auto px-4 md:px-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Success Stories
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                        Hear from our students who transformed their careers
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {TESTIMONIALS.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100"
                        >
                            {/* Rating */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <HiStar key={i} className="text-yellow-400 text-xl" />
                                ))}
                            </div>

                            {/* Testimonial Text */}
                            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                                "{testimonial.text}"
                            </p>

                            {/* Author Info */}
                            <div className="flex items-center gap-4">
                                <div className="text-5xl">{testimonial.image}</div>
                                <div>
                                    <h4 className="font-bold text-lg">{testimonial.name}</h4>
                                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                                    <p className="text-blue-600 text-sm font-medium">{testimonial.company}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                    {[
                        { number: '95%', label: 'Placement Rate' },
                        { number: '4.8/5', label: 'Average Rating' },
                        { number: '1000+', label: 'Alumni Network' },
                        { number: '50+', label: 'Hiring Partners' },
                    ].map((stat, index) => (
                        <div key={index} className="text-center p-6 bg-white rounded-xl shadow-md">
                            <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                                {stat.number}
                            </div>
                            <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
