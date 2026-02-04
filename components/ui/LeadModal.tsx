'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import { HiX } from 'react-icons/hi';
import { submitContactForm } from '@/app/actions/contact';

interface LeadModalProps {
    type: 'CONTACT' | 'JOB_APPLICATION' | 'COURSE_ENROLLMENT' | 'PROJECT_PURCHASE';
    title: string;
    subtitle: string;
    isOpen: boolean;
    onClose: () => void;
}

const LeadModal = ({ type, title, subtitle, isOpen, onClose }: LeadModalProps) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const data = await submitContactForm({
                type,
                subject: `${subtitle}: ${title}`,
                ...formData,
                target: title
            });

            if (data.success) {
                alert('Request submitted! We will contact you via email shortly.');
                onClose();
            } else {
                alert('Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Lead submission error:', error);
            alert('Failed to submit request.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl animate-scale-in overflow-hidden">
                {/* Decoration */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-purple-600" />

                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <HiX size={20} />
                </button>

                <h2 className="text-2xl font-black mb-2">{subtitle}</h2>
                <p className="text-gray-600 mb-6 font-medium">
                    <span className="text-blue-600 font-bold">{title}</span>
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
                    {type === 'PROJECT_PURCHASE' && (
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Notes (Optional)</label>
                            <textarea
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all resize-none"
                                placeholder="Any specific requirements?"
                                rows={2}
                            />
                        </div>
                    )}

                    <Button variant="primary" size="lg" className="w-full mt-4" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Send Request'}
                    </Button>
                </form>

                <p className="text-xs text-center text-gray-400 mt-6">
                    Our sales team will contact you for payment and delivery.
                </p>
            </div>
        </div>
    );
};

export default LeadModal;
