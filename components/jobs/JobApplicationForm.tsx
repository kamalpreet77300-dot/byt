'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import { HiPaperClip } from 'react-icons/hi';
import { submitContactForm } from '@/app/actions/contact';

interface JobApplicationFormProps {
    jobTitle: string;
    jobId: string;
}

const JobApplicationForm = ({ jobTitle, jobId }: JobApplicationFormProps) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        resumeUrl: '',
    });
    const [isUploading, setIsUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

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
        if (!formData.resumeUrl) {
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
            alert('Please upload a Word document (.doc, .docx)');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert('File size should be less than 5MB');
            return;
        }

        setIsUploading(true);
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

        if (!cloudName || cloudName === 'your_cloud_name') {
            alert('Cloudinary is not configured. Please add cloud name in .env');
            setIsUploading(false);
            return;
        }

        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', uploadPreset || '');

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
                { method: 'POST', body: data }
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
                type: 'JOB_APPLICATION',
                subject: `Job Application: ${jobTitle}`,
                ...formData,
                jobId,
                jobTitle
            });

            if (data.success) {
                alert('Application submitted successfully! Our team will review it and get back to you.');
                setFormData({ name: '', email: '', phone: '', resumeUrl: '' });
                setErrors({});
            } else {
                alert('Failed to submit application. Please try again.');
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert('Error submitting application.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-gray-50 rounded-2xl p-8 sticky top-24 border border-gray-200">
            <h2 className="text-2xl font-black mb-6">Apply for this Job</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                        value={formData.name}
                        onChange={(e) => {
                            setFormData({ ...formData, name: e.target.value });
                            if (errors.name) setErrors({ ...errors, name: '' });
                        }}
                        className={`w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all`}
                        placeholder="John Doe"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            if (errors.email) setErrors({ ...errors, email: '' });
                        }}
                        className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all`}
                        placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => {
                            setFormData({ ...formData, phone: e.target.value });
                            if (errors.phone) setErrors({ ...errors, phone: '' });
                        }}
                        className={`w-full px-4 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all`}
                        placeholder="+91 98765 43210"
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Upload Resume (Word Document)</label>
                    <div className="relative">
                        <input
                            type="file"
                            accept=".doc,.docx"
                            onChange={handleFileUpload}
                            className={`w-full px-4 py-2 border ${errors.resume ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100`}
                        />
                        {isUploading && (
                            <div className="absolute right-3 top-2.5">
                                <div className="animate-spin rounded-full h-5 w-5 border-2 border-orange-600 border-t-transparent" />
                            </div>
                        )}
                    </div>
                    {formData.resumeUrl && (
                        <p className="text-green-600 text-xs mt-1 font-medium">✓ Resume uploaded successfully</p>
                    )}
                    {errors.resume && <p className="text-red-500 text-xs mt-1">{errors.resume}</p>}
                </div>
                <Button
                    variant="primary"
                    size="lg"
                    className="w-full justify-center mt-6"
                    disabled={isSubmitting || isUploading}
                >
                    {isSubmitting ? 'Submitting...' : isUploading ? 'Uploading Resume...' : 'Submit Application'}
                </Button>
            </form>
        </div>
    );
};


export default JobApplicationForm;
