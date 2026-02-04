import React from 'react';
import Link from 'next/link';
import { SITE_CONFIG, NAV_ITEMS, SOCIAL_LINKS, IMAGES } from '@/lib/constants';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';
import Image from 'next/image';

const Footer = () => {
    const currentYear = 2025;

    return (
        <footer className="bg-gradient-to-br from-gray-50 to-blue-50 border-t border-gray-200">
            <div className="container mx-auto px-4 md:px-10 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Company Info */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            {/* <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">BS</span>
                            </div> */}
                            <Image src={IMAGES.logo} alt="Logo" width={50} height={50} />
                            <span className="font-bold text-xl">{SITE_CONFIG.name}</span>
                        </div>
                        <p className="text-gray-600 mb-4">
                            {SITE_CONFIG.description}
                        </p>
                        <div className="flex gap-3">
                            <a href={`${SOCIAL_LINKS.facebook}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-colors">
                                <FaFacebook />
                            </a>
                            <a href={`${SOCIAL_LINKS.twitter}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-sky-500 hover:bg-sky-600 text-white rounded-full flex items-center justify-center transition-colors">
                                <FaTwitter />
                            </a>
                            <a href={`${SOCIAL_LINKS.linkedin}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-700 hover:bg-blue-800 text-white rounded-full flex items-center justify-center transition-colors">
                                <FaLinkedin />
                            </a>
                            <a href={`${SOCIAL_LINKS.instagram}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-pink-500 hover:bg-pink-600 text-white rounded-full flex items-center justify-center transition-colors">
                                <FaInstagram />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {NAV_ITEMS.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-gray-600 hover:text-blue-600 transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">Our Services</h3>
                        <ul className="space-y-2">
                            <li><Link href="/services" className="text-gray-600 hover:text-blue-600 transition-colors">Web Development</Link></li>
                            <li><Link href="/services" className="text-gray-600 hover:text-blue-600 transition-colors">Mobile Apps</Link></li>
                            <li><Link href="/services" className="text-gray-600 hover:text-blue-600 transition-colors">AI/ML Solutions</Link></li>
                            <li><Link href="/services" className="text-gray-600 hover:text-blue-600 transition-colors">SaaS Development</Link></li>
                            <li><Link href="/courses" className="text-gray-600 hover:text-blue-600 transition-colors">Training Courses</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2 text-gray-600">
                                <HiMail className="text-xl mt-0.5 text-blue-500" />
                                <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-blue-600 transition-colors">
                                    {SITE_CONFIG.email}
                                </a>
                            </li>
                            <li className="flex items-start gap-2 text-gray-600">
                                <HiPhone className="text-xl mt-0.5 text-blue-500" />
                                <a href={`tel:${SITE_CONFIG.phone}`} className="hover:text-blue-600 transition-colors">
                                    {SITE_CONFIG.phone}
                                </a>
                            </li>
                            <li className="flex items-start gap-2 text-gray-600">
                                <FaWhatsapp className="text-xl mt-0.5 text-green-500" />
                                <a
                                    href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-green-600 transition-colors"
                                >
                                    WhatsApp Us
                                </a>
                            </li>
                            <li className="flex items-start gap-2 text-gray-600">
                                <HiLocationMarker className="text-xl mt-0.5 text-red-500" />
                                <span>{SITE_CONFIG.address}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-300 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-600 text-sm text-center md:text-left">
                        © {currentYear} {SITE_CONFIG.name}. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm">
                        <Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
