'use client';

import React, { useState } from 'react';
import { HiPlus, HiPencil, HiTrash, HiSearch, HiFilter, HiDownload, HiStar } from 'react-icons/hi';
import Button from '@/components/ui/Button';

// Mock data
const initialProjects = [
    { id: 1, title: 'E-Commerce Platform', category: 'Web App', price: '₹29,999', sales: 45, rating: 4.8, status: 'Published' },
    { id: 2, title: 'Food Delivery App', category: 'Mobile App', price: '₹34,999', sales: 28, rating: 4.5, status: 'Published' },
    { id: 3, title: 'AI Chatbot System', category: 'AI/ML', price: '₹39,999', sales: 15, rating: 4.9, status: 'Published' },
    { id: 4, title: 'SaaS Dashboard Template', category: 'Web App', price: '₹14,999', sales: 82, rating: 4.6, status: 'Published' },
    { id: 5, title: 'Crypto Exchange Clone', category: 'Web3', price: '₹44,999', sales: 5, rating: 4.2, status: 'Draft' },
];

export default function ProjectsAdminPage() {
    const [projects, setProjects] = useState(initialProjects);
    const [searchTerm, setSearchTerm] = useState('');

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this project?')) {
            setProjects(projects.filter(project => project.id !== id));
        }
    };

    const filteredProjects = projects.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Manage Projects</h1>
                    <p className="text-sm text-gray-500">Update marketplace listings and track sales</p>
                </div>
                <Button
                    variant="primary"
                    size="md"
                    leftIcon={<HiPlus />}
                    onClick={() => alert('Add Project Modal would open here')}
                >
                    Add New Project
                </Button>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <div className="relative flex-1">
                    <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search projects..."
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
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Project Name</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Price / Sales</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Rating</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredProjects.map((project) => (
                                <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900">{project.title}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                            {project.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-gray-900">{project.price}</div>
                                        <div className="text-xs text-gray-500 flex items-center gap-1">
                                            <HiDownload className="text-gray-400" />
                                            {project.sales} Sales
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1 text-sm text-gray-600">
                                            <HiStar className="text-yellow-400" />
                                            {project.rating}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${project.status === 'Published'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {project.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                                <HiPencil size={18} />
                                            </button>
                                            <button
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                onClick={() => handleDelete(project.id)}
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
