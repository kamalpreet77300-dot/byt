'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IMAGES, NAV_ITEMS, SITE_CONFIG } from '@/lib/constants';
import Button from '../ui/Button';
import { TiLocationArrow } from 'react-icons/ti';
import { HiMenu, HiX } from 'react-icons/hi';
import gsap from 'gsap';
import Image from 'next/image';

const Navbar = () => {
    const navContainerRef = useRef<HTMLDivElement>(null);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isNavVisible, setIsNavVisible] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY === 0) {
                setIsNavVisible(true);
                navContainerRef.current?.classList.remove('floating-nav');
            } else if (currentScrollY > lastScrollY) {
                setIsNavVisible(false);
                navContainerRef.current?.classList.add('floating-nav');
            } else if (currentScrollY < lastScrollY) {
                setIsNavVisible(true);
                navContainerRef.current?.classList.add('floating-nav');
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    useEffect(() => {
        if (navContainerRef.current) {
            gsap.to(navContainerRef.current, {
                y: isNavVisible ? 0 : -100,
                opacity: isNavVisible ? 1 : 0,
                duration: 0.3,
            });
        }
    }, [isNavVisible]);

    return (
        <div
            ref={navContainerRef}
            className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 px-4 sm:px-6"
        >
            <header className="absolute top-1/2 w-full -translate-y-1/2">
                <nav className="flex size-full items-center justify-between p-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        {/* <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">BS</span>
                        </div> */}
                        <Image src={IMAGES.logo} alt="Logo" width={50} height={50} />
                        <span className="font-bold text-xl hidden sm:block">{SITE_CONFIG.name}</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex h-full items-center">
                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`nav-hover-btn ${(item.href === '/' && pathname === '/') ||
                                    (item.href !== '/' && pathname.startsWith(item.href))
                                    ? 'text-blue-600'
                                    : ''
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* CTA Button & Mobile Menu */}
                    <div className="flex items-center gap-4">
                        {/* <Link href="/signup">
                            <Button
                                variant="primary"
                                size="sm"
                                rightIcon={<TiLocationArrow />}
                                className="hidden md:flex"
                            >
                                Get Started
                            </Button>
                        </Link> */}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden text-2xl p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            {isMobileMenuOpen ? <HiX /> : <HiMenu />}
                        </button>
                    </div>
                </nav>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden absolute top-full left-0 right-0 mt-4 mx-4 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
                        <div className="flex flex-col p-4">
                            {NAV_ITEMS.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors ${(item.href === '/' && pathname === '/') ||
                                        (item.href !== '/' && pathname.startsWith(item.href))
                                        ? 'bg-blue-50 text-blue-600 font-medium'
                                        : ''
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            {/* <Link href="/signup" className="mt-4">
                                <Button
                                    variant="primary"
                                    size="sm"
                                    rightIcon={<TiLocationArrow />}
                                    className="w-full"
                                >
                                    Get Started
                                </Button>
                            </Link> */}
                        </div>
                    </div>
                )}
            </header>
        </div>
    );
};

export default Navbar;
