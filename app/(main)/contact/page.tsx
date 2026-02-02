'use client';

import React, { useState } from 'react';
import { submitContactForm } from '@/app/actions/contact';
import AnimatedTitle from '@/components/ui/AnimatedTitle';
import Button from '@/components/ui/Button';
import { TiLocationArrow } from 'react-icons/ti';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';
import { FaWhatsapp, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const data = await submitContactForm({
                type: 'CONTACT',
                ...formData
            });

            if (data.success) {
                alert('Thank you for your message! We\'ll get back to you soon.');
                setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
            } else {
                alert('Something went wrong. Please try again or contact us directly via email.');
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert('Failed to send message. Please check your connection.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <main className="relative min-h-screen w-screen overflow-x-hidden">
            {/* Hero */}
            <section className="relative bg-gradient-to-br from-teal-50 via-white to-cyan-50 pt-32 pb-20">
                <div className="container mx-auto px-4 md:px-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <AnimatedTitle title="Get In <b>Touch</b>" containerClass="mb-6" />
                        <p className="text-xl md:text-2xl text-gray-600 mb-8">
                            Have a question or want to work together? We'd love to hear from you!
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Form & Info */}
            <section className="bg-white py-20">
                <div className="container mx-auto px-4 md:px-10">
                    <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        {/* Contact Form */}
                        <div>
                            <h2 className="text-3xl font-black mb-6">Send Us a Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Full Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2">Email Address *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                        placeholder="+91 98765 43210"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2">Subject *</label>
                                    <select
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                    >
                                        <option value="">Select a subject</option>
                                        <option value="services">IT Services Inquiry</option>
                                        <option value="training">Training Course Inquiry</option>
                                        <option value="projects">Project Purchase</option>
                                        <option value="jobs">Job Application</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2">Message *</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors resize-none"
                                        placeholder="Tell us about your project or inquiry..."
                                    />
                                </div>

                                <Button type="submit" variant="primary" size="lg" className="w-full" rightIcon={<TiLocationArrow />} disabled={isSubmitting}>
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </Button>
                            </form>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h2 className="text-3xl font-black mb-6">Contact Information</h2>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4 p-4 rounded-lg bg-blue-50 border-2 border-blue-200">
                                    <HiMail className="text-3xl text-blue-600 mt-1" />
                                    <div>
                                        <h3 className="font-bold mb-1">Email</h3>
                                        <a href="mailto:contact@bytsmartz.com" className="text-blue-600 hover:underline">
                                            contact@bytsmartz.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 rounded-lg bg-green-50 border-2 border-green-200">
                                    <HiPhone className="text-3xl text-green-600 mt-1" />
                                    <div>
                                        <h3 className="font-bold mb-1">Phone</h3>
                                        <a href="tel:+919876543210" className="text-green-600 hover:underline">
                                            +91 98765 43210
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 rounded-lg bg-purple-50 border-2 border-purple-200">
                                    <FaWhatsapp className="text-3xl text-green-600 mt-1" />
                                    <div>
                                        <h3 className="font-bold mb-1">WhatsApp</h3>
                                        <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">
                                            Chat with us on WhatsApp
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 rounded-lg bg-red-50 border-2 border-red-200">
                                    <HiLocationMarker className="text-3xl text-red-600 mt-1" />
                                    <div>
                                        <h3 className="font-bold mb-1">Address</h3>
                                        <p className="text-gray-700">
                                            123 Tech Park, MG Road<br />
                                            Bangalore, Karnataka 560001<br />
                                            India
                                        </p>
                                    </div>
                                </div>

                                {/* Social Media */}
                                <div className="pt-6">
                                    <h3 className="font-bold mb-4">Follow Us</h3>
                                    <div className="flex gap-4">
                                        {[
                                            { icon: FaFacebook, color: 'text-blue-600', link: '#' },
                                            { icon: FaTwitter, color: 'text-sky-500', link: '#' },
                                            { icon: FaLinkedin, color: 'text-blue-700', link: '#' },
                                            { icon: FaInstagram, color: 'text-pink-600', link: '#' },
                                        ].map((social, index) => (
                                            <a
                                                key={index}
                                                href={social.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`${social.color} text-3xl hover:scale-110 transition-transform`}
                                            >
                                                <social.icon />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section (Placeholder) */}
            <section className="bg-gray-100 py-20">
                <div className="container mx-auto px-4 md:px-10">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-black mb-6 text-center">Visit Our Office</h2>
                        <div className="bg-white rounded-2xl overflow-hidden border-2 border-gray-200 h-[450px]">
                            <iframe
                                src="https://maps.google.com/maps?q=Nexa%20Tower%2C%20F-338%2C%20Sector%2074%20A%2C%20Industrial%20Area%2C%20Sector%2074%2C%20Sahibzada%20Ajit%20Singh%20Nagar%2C%20Punjab%20140307&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>

            {/* Office Hours */}
            <section className="bg-white py-20">
                <div className="container mx-auto px-4 md:px-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-black mb-8">Office Hours</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-6 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
                                <h3 className="font-bold text-lg mb-2">Monday - Friday</h3>
                                <p className="text-gray-700">9:00 AM - 6:00 PM</p>
                            </div>
                            <div className="p-6 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
                                <h3 className="font-bold text-lg mb-2">Saturday</h3>
                                <p className="text-gray-700">10:00 AM - 4:00 PM</p>
                            </div>
                        </div>
                        <p className="mt-6 text-gray-600">
                            <span className="font-semibold">Sunday:</span> Closed
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
