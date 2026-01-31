'use client';

import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { HiMail, HiLockClosed, HiUser } from 'react-icons/hi';
import { FaGoogle, FaGithub } from 'react-icons/fa';

export default function SignupPage() {
    return (
        <main className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50 p-4">
            <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-8 transform transition-all hover:scale-[1.01]">
                <div className="text-center mb-8">
                    <Link href="/" className="inline-block mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto shadow-lg">
                            <span className="text-white font-bold text-2xl">BS</span>
                        </div>
                    </Link>
                    <h1 className="text-2xl font-black text-gray-800 mb-2">Create Account</h1>
                    <p className="text-gray-500">Join BytSmartz today</p>
                </div>

                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <HiUser className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                placeholder="Gagan G"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <HiMail className="text-gray-400" />
                            </div>
                            <input
                                type="email"
                                className="block w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                placeholder="name@example.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <HiLockClosed className="text-gray-400" />
                            </div>
                            <input
                                type="password"
                                className="block w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                placeholder="Create a strong password"
                            />
                        </div>
                    </div>

                    <div className="flex items-start gap-2 text-sm text-gray-600">
                        <input type="checkbox" className="mt-1 rounded text-blue-600 focus:ring-blue-500" />
                        <span>
                            I agree to the{' '}
                            <Link href="/terms" className="text-blue-600 hover:text-blue-700 font-medium">
                                Terms of Service
                            </Link>{' '}
                            and{' '}
                            <Link href="/privacy" className="text-blue-600 hover:text-blue-700 font-medium">
                                Privacy Policy
                            </Link>
                        </span>
                    </div>

                    <Button variant="primary" className="w-full justify-center py-3">
                        Create Account
                    </Button>
                </form>

                <div className="my-6 flex items-center">
                    <div className="flex-grow border-t border-gray-200"></div>
                    <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">Or sign up with</span>
                    <div className="flex-grow border-t border-gray-200"></div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <button className="flex items-center justify-center gap-2 py-2.5 border-2 border-gray-100 rounded-xl hover:bg-gray-50 transition-colors font-medium text-gray-600">
                        <FaGoogle className="text-red-500" />
                        Google
                    </button>
                    <button className="flex items-center justify-center gap-2 py-2.5 border-2 border-gray-100 rounded-xl hover:bg-gray-50 transition-colors font-medium text-gray-600">
                        <FaGithub className="text-gray-900" />
                        GitHub
                    </button>
                </div>

                <p className="mt-8 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link href="/login" className="text-blue-600 hover:text-blue-700 font-bold">
                        Sign In
                    </Link>
                </p>
            </div>
        </main>
    );
}
