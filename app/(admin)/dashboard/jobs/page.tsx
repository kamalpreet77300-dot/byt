'use client';

import React, { useState } from 'react';
import { HiPlus, HiPencil, HiTrash, HiSearch, HiFilter, HiLocationMarker } from 'react-icons/hi';
import Button from '@/components/ui/Button';

// Mock data
const initialJobs = [
    { id: 1, title: 'Senior React Developer', type: 'Full-time', location: 'Bangalore (Hybrid)', salary: '₹12-18 LPA', applicants: 45, status: 'Active', experience: '3-5 Years' },
    { id: 2, title: 'UI/UX Designer', type: 'Full-time', location: 'Remote', salary: '₹8-12 LPA', applicants: 32, status: 'Active', experience: '2-4 Years' },
    { id: 3, title: 'DevOps Intern', type: 'Internship', location: 'Bangalore', salary: '₹15-25k/mo', applicants: 128, status: 'Closed', experience: 'Fresher' },
    { id: 4, title: 'Python Backend Dev', type: 'Contract', location: 'Remote', salary: '₹15-20 LPA', applicants: 18, status: 'Active', experience: '4+ Years' },
    { id: 5, title: 'Project Manager', type: 'Full-time', location: 'Bangalore', salary: '₹18-25 LPA', applicants: 12, status: 'Draft', experience: '5+ Years' },
];

export default function JobsAdminPage() {
    const [jobs, setJobs] = useState(initialJobs);
    const [searchTerm, setSearchTerm] = useState('');

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this job posting?')) {
            setJobs(jobs.filter(job => job.id !== id));
        }
    };

    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Manage Jobs</h1>
                    <p className="text-sm text-gray-500">Post new opportunities and manage applications</p>
                </div>
                <Button
                    variant="primary"
                    size="md"
                    leftIcon={<HiPlus />}
                    onClick={() => alert('Add Job Modal would open here')}
                >
                    Post New Job
                </Button>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <div className="relative flex-1">
                    <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search jobs..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
                        <HiFilter />
                        <span>Filter</span>
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Job Title</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Location / Type</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Salary / Exp</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Applicants</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredJobs.map((job) => (
                                <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900">{job.title}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-gray-900">{job.type}</span>
                                            <span className="text-xs text-gray-500 flex items-center gap-1">
                                                <HiLocationMarker className="text-gray-400" />
                                                {job.location}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-gray-900">{job.salary}</div>
                                        <div className="text-xs text-gray-500">{job.experience}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex -space-x-2 overflow-hidden">
                                            {[...Array(Math.min(3, job.applicants))].map((_, i) => (
                                                <div key={i} className="inline-block h-6 w-6 rounded-full bg-gray-200 ring-2 ring-white" />
                                            ))}
                                            {job.applicants > 3 && (
                                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-2 ring-white text-xs text-gray-500">
                                                    +{job.applicants - 3}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${job.status === 'Active' ? 'bg-green-100 text-green-800' :
                                                job.status === 'Draft' ? 'bg-gray-100 text-gray-800' :
                                                    'bg-red-100 text-red-800'
                                            }`}>
                                            {job.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                                <HiPencil size={18} />
                                            </button>
                                            <button
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                onClick={() => handleDelete(job.id)}
                                            >
                                                <HiTrash size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
