'use client';

import React, { useState } from 'react';
import { HiPlus, HiPencil, HiTrash, HiSearch, HiFilter } from 'react-icons/hi';
import Button from '@/components/ui/Button';

// Mock data
const initialServices = [
    { id: 1, title: 'Web Development', category: 'Development', price: '₹25,000+', status: 'Active', clients: 45 },
    { id: 2, title: 'Mobile App Development', category: 'App Dev', price: '₹40,000+', status: 'Active', clients: 32 },
    { id: 3, title: 'AI/ML Solutions', category: 'AI', price: '₹80,000+', status: 'Active', clients: 12 },
    { id: 4, title: 'SaaS Development', category: 'Development', price: '₹60,000+', status: 'Active', clients: 18 },
    { id: 5, title: 'Cloud & DevOps', category: 'Infrastructure', price: '₹50,000+', status: 'Inactive', clients: 8 },
];

export default function ServicesAdminPage() {
    const [services, setServices] = useState(initialServices);
    const [searchTerm, setSearchTerm] = useState('');

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this service?')) {
            setServices(services.filter(service => service.id !== id));
        }
    };

    const filteredServices = services.filter(service =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Manage Services</h1>
                    <p className="text-sm text-gray-500">Create, update, and remove service offerings</p>
                </div>
                <Button
                    variant="primary"
                    size="md"
                    leftIcon={<HiPlus />}
                    onClick={() => alert('Add Service Modal would open here')}
                >
                    Add New Service
                </Button>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <div className="relative flex-1">
                    <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search services..."
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
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Service Name</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Starting Price</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Active Clients</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredServices.map((service) => (
                                <tr key={service.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900">{service.title}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            {service.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">{service.price}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${service.status === 'Active'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${service.status === 'Active' ? 'bg-green-600' : 'bg-gray-500'
                                                }`}></span>
                                            {service.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">{service.clients}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                                <HiPencil size={18} />
                                            </button>
                                            <button
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                onClick={() => handleDelete(service.id)}
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

                {/* Pagination (Visual only) */}
                <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center text-sm text-gray-500">
                    <div>Showing 1 to {filteredServices.length} of {filteredServices.length} results</div>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
                        <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50" disabled>Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
