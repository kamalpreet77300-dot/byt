'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    HiHome,
    HiCollection,
    HiAcademicCap,
    HiBriefcase,
    HiCode,
    HiUsers,
    HiCreditCard,
    HiLogout,
    HiMenu,
    HiX
} from 'react-icons/hi';
import { clsx } from 'clsx';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const pathname = usePathname();

    const navItems = [
        { name: 'Dashboard', href: '/dashboard', icon: HiHome },
        { name: 'Services', href: '/dashboard/services', icon: HiCollection },
        { name: 'Courses', href: '/dashboard/courses', icon: HiAcademicCap },
        { name: 'Jobs', href: '/dashboard/jobs', icon: HiBriefcase },
        { name: 'Projects', href: '/dashboard/projects', icon: HiCode },
        { name: 'Users', href: '/dashboard/users', icon: HiUsers },
        { name: 'Payments', href: '/dashboard/payments', icon: HiCreditCard },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside
                className={clsx(
                    "bg-slate-900 text-white fixed inset-y-0 left-0 z-50 w-64 transition-transform duration-300 md:relative md:translate-x-0",
                    !isSidebarOpen && "-translate-x-full md:hidden"
                )}
            >
                <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                    <Link href="/" className="text-2xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        BytSmartz<span className="text-white text-xs block font-normal tracking-widest">ADMIN</span>
                    </Link>
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="md:hidden text-gray-400 hover:text-white"
                    >
                        <HiX size={24} />
                    </button>
                </div>

                <nav className="p-4 space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={clsx(
                                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                                    isActive
                                        ? "bg-blue-600 text-white"
                                        : "text-gray-400 hover:bg-slate-800 hover:text-white"
                                )}
                            >
                                <item.icon size={20} />
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800">
                    <button className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-slate-800 hover:text-red-300 w-full rounded-lg transition-colors">
                        <HiLogout size={20} />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Header */}
                <header className="bg-white border-b border-gray-200 p-4 md:px-8 flex items-center justify-between">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg md:hidden"
                    >
                        <HiMenu size={24} />
                    </button>

                    <div className="flex items-center gap-4 ml-auto">
                        <div className="text-right hidden md:block">
                            <p className="font-bold text-sm">Admin User</p>
                            <p className="text-xs text-gray-500">admin@bytsmartz.com</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                            A
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
                    {children}
                </main>
            </div>

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </div>
    );
}
