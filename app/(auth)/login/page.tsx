'use client';

import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { HiMail, HiLockClosed } from 'react-icons/hi';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import AnimatedTitle from '@/components/ui/AnimatedTitle';

export default function LoginPage() {
    return (
        <main className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
            <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-8 transform transition-all hover:scale-[1.01]">
                <div className="text-center mb-8">
                    <Link href="/" className="inline-block mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto shadow-lg">
                            <span className="text-white font-bold text-2xl">BS</span>
                        </div>
                    </Link>
                    <h1 className="text-2xl font-black text-gray-800 mb-2">Welcome Back!</h1>
                    <p className="text-gray-500">Sign in to continue to BytSmartz</p>
                </div>

                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
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
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center text-gray-600 cursor-pointer">
                            <input type="checkbox" className="mr-2 rounded text-blue-600 focus:ring-blue-500" />
                            Remember me
                        </label>
                        <Link href="/forgot-password" className="text-blue-600 hover:text-blue-700 font-medium">
                            Forgot Password?
                        </Link>
                    </div>

                    <Button variant="primary" className="w-full justify-center py-3">
                        Sign In
                    </Button>
                </form>

                <div className="my-6 flex items-center">
                    <div className="flex-grow border-t border-gray-200"></div>
                    <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">Or continue with</span>
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
                    Don't have an account?{' '}
                    <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-bold">
                        Create Account
                    </Link>
                </p>
            </div>
        </main>
    );
}
