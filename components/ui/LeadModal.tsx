'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import { HiX } from 'react-icons/hi';
import { submitContactForm } from '@/app/actions/contact';
import { toast } from 'react-toastify';

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
        resumeUrl: ''
    });
    const [isUploading, setIsUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    if (!isOpen) return null;

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name.trim()) newErrors.name = 'Full name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
            newErrors.phone = 'Phone number is invalid';
        }

        if ((type === 'JOB_APPLICATION' || type === 'COURSE_ENROLLMENT') && !formData.resumeUrl) {
            newErrors.resume = 'Please upload your resume';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const isWord = file.type.includes('msword') ||
            file.type.includes('officedocument') ||
            file.name.toLowerCase().endsWith('.doc') ||
            file.name.toLowerCase().endsWith('.docx');

        if (!isWord) {
            toast.error('Please upload a Word document (.doc, .docx)');
            return;
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            toast.error('File size should be less than 5MB');
            return;
        }

        setIsUploading(true);
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

        if (!cloudName || cloudName === 'your_cloud_name') {
            toast.error('Cloudinary is not configured. Please contact support.');
            setIsUploading(false);
            return;
        }

        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', uploadPreset || '');

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
                {
                    method: 'POST',
                    body: data,
                }
            );
            const result = await response.json();
            if (result.secure_url) {
                setFormData(prev => ({ ...prev, resumeUrl: result.secure_url }));
                setErrors(prev => {
                    const next = { ...prev };
                    delete next.resume;
                    return next;
                });
            } else {
                alert('Upload failed. Please try again.');
            }
        } catch (error) {
            console.error('Upload Error:', error);
            alert('Error uploading file.');
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            const data = await submitContactForm({
                type,
                subject: `${subtitle}: ${title}`,
                ...formData,
                target: title
            });

            if (data.success) {
                toast.success('Your message has been sent successfully!');
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    message: '',
                    resumeUrl: ''
                });
                onClose();
            } else {
                toast.error('Failed to send message. Please try again later.');
            }
        } catch (error) {
            console.error('Lead submission error:', error);
            toast.error('Failed to send message. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl animate-scale-in overflow-hidden max-h-[90vh] overflow-y-auto">
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
                            value={formData.name}
                            onChange={(e) => {
                                setFormData({ ...formData, name: e.target.value });
                                if (errors.name) setErrors({ ...errors, name: '' });
                            }}
                            className={`w-full px-4 py-2 bg-gray-50 border ${errors.name ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:border-blue-500 focus:outline-none transition-all`}
                            placeholder="John Doe"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => {
                                setFormData({ ...formData, email: e.target.value });
                                if (errors.email) setErrors({ ...errors, email: '' });
                            }}
                            className={`w-full px-4 py-2 bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:border-blue-500 focus:outline-none transition-all`}
                            placeholder="john@example.com"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Phone Number</label>
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => {
                                setFormData({ ...formData, phone: e.target.value });
                                if (errors.phone) setErrors({ ...errors, phone: '' });
                            }}
                            className={`w-full px-4 py-2 bg-gray-50 border ${errors.phone ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:border-blue-500 focus:outline-none transition-all`}
                            placeholder="+91 98765 43210"
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1 font-medium">{errors.phone}</p>}
                    </div>

                    {(type === 'JOB_APPLICATION' || type === 'COURSE_ENROLLMENT') && (
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Upload Resume (Word Document)</label>
                            <div className="relative">
                                <input
                                    type="file"
                                    accept=".doc,.docx"
                                    onChange={handleFileUpload}
                                    className={`w-full px-4 py-2 bg-gray-50 border ${errors.resume ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:border-blue-500 focus:outline-none transition-all file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100`}
                                />
                                {isUploading && (
                                    <div className="absolute right-3 top-2.5">
                                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent" />
                                    </div>
                                )}
                            </div>
                            {formData.resumeUrl && (
                                <p className="text-green-600 text-xs mt-1 font-medium flex items-center gap-1">
                                    ✓ Resume uploaded successfully
                                </p>
                            )}
                            {errors.resume && <p className="text-red-500 text-xs mt-1 font-medium">{errors.resume}</p>}
                        </div>
                    )}

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

                    <Button
                        variant="primary"
                        size="lg"
                        className="w-full mt-4"
                        disabled={isSubmitting || isUploading}
                    >
                        {isSubmitting ? 'Submitting...' : isUploading ? 'Uploading Resume...' : 'Send Request'}
                    </Button>
                </form>

                <p className="text-xs text-center text-gray-400 mt-6">
                    {type === 'PROJECT_PURCHASE'
                        ? 'Our sales team will contact you for payment and delivery.'
                        : 'Our team will review your details and contact you via email shortly.'}
                </p>
            </div>
        </div>
    );
};


export default LeadModal;
