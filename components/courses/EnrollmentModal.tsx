'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import { HiX } from 'react-icons/hi';
// import { submitContactForm } from '@/app/actions/contact';

interface EnrollmentModalProps {
    courseTitle: string;
    isOpen: boolean;
    onClose: () => void;
}

const EnrollmentModal = ({ courseTitle, isOpen, onClose }: EnrollmentModalProps) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // try {
        //     const data = await submitContactForm({
        //         type: 'COURSE_ENROLLMENT',
        //         subject: `Course Enrollment Request: ${courseTitle}`,
        //         ...formData,
        //         courseTitle
        //     });

        //     if (data.success) {
        //         alert('Thank you for your interest! Our team will contact you shortly regarding the enrollment process.');
        //         onClose();
        //     } else {
        //         alert('Something went wrong. Please try again.');
        //     }
        // } catch (error) {
        //     console.error('Enrollment error:', error);
        //     alert('Failed to submit request.');
        // } finally {
        //     setIsSubmitting(false);
        // }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl animate-scale-in">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <HiX size={20} />
                </button>

                <h2 className="text-2xl font-black mb-2">Enroll Now</h2>
                <p className="text-gray-600 mb-6 font-medium">
                    Applying for: <span className="text-blue-600 font-bold">{courseTitle}</span>
                </p>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
                        <input
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all"
                            placeholder="John Doe"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
                        <input
                            required
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all"
                            placeholder="john@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Phone Number</label>
                        <input
                            required
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all"
                            placeholder="+91 98765 43210"
                        />
                    </div>

                    <Button variant="primary" size="lg" className="w-full mt-4" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Confirm Interest'}
                    </Button>
                </form>

                <p className="text-xs text-center text-gray-400 mt-6">
                    By submitting, you agree to our Terms and Privacy Policy.
                </p>
            </div>
        </div>
    );
};

export default EnrollmentModal;
