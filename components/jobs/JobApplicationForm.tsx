'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import { HiPaperClip } from 'react-icons/hi';

interface JobApplicationFormProps {
    jobTitle: string;
    jobId: string;
}

const JobApplicationForm = ({ jobTitle, jobId }: JobApplicationFormProps) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'JOB_APPLICATION',
                    subject: `Job Application: ${jobTitle}`,
                    ...formData,
                    jobId,
                    jobTitle
                }),
            });

            const data = await response.json();

            if (data.success) {
                alert('Application submitted successfully! Our team will review it and get back to you.');
                setFormData({ name: '', email: '', phone: '' });
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
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                        placeholder="John Doe"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                        placeholder="john@example.com"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                        placeholder="+91 98765 43210"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Resume Link (e.g. Google Drive/Dropbox)</label>
                    <input
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                        placeholder="Paste link to your resume"
                        onChange={(e) => (formData as any).resume = e.target.value}
                    />
                </div>
                <Button variant="primary" size="lg" className="w-full justify-center mt-6" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </Button>
            </form>
        </div>
    );
};

export default JobApplicationForm;
