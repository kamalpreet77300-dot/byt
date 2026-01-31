'use client';

import React, { useState } from 'react';
import { HiPlus, HiPencil, HiTrash, HiSearch, HiFilter, HiUserGroup } from 'react-icons/hi';
import Button from '@/components/ui/Button';

// Mock data
const initialCourses = [
    { id: 1, title: 'MERN Stack Development', instructor: 'Amit Patel', price: '₹49,999', duration: '6 Months', enrollments: 145, status: 'Active' },
    { id: 2, title: 'Python for Data Science', instructor: 'Sneha Gupta', price: '₹59,999', duration: '8 Months', enrollments: 89, status: 'Active' },
    { id: 3, title: 'AWS Cloud Architect', instructor: 'Rajesh Kumar', price: '₹54,999', duration: '5 Months', enrollments: 62, status: 'Upcoming' },
    { id: 4, title: 'UI/UX Design Mastery', instructor: 'Priya Sharma', price: '₹39,999', duration: '4 Months', enrollments: 110, status: 'Active' },
    { id: 5, title: 'Mobile App Development', instructor: 'Vikram Singh', price: '₹45,999', duration: '6 Months', enrollments: 78, status: 'Paused' },
];

export default function CoursesAdminPage() {
    const [courses, setCourses] = useState(initialCourses);
    const [searchTerm, setSearchTerm] = useState('');

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this course?')) {
            setCourses(courses.filter(course => course.id !== id));
        }
    };

    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Manage Courses</h1>
                    <p className="text-sm text-gray-500">Oversee training programs, instructors, and enrollments</p>
                </div>
                <Button
                    variant="primary"
                    size="md"
                    leftIcon={<HiPlus />}
                    onClick={() => alert('Add Course Modal would open here')}
                >
                    Add New Course
                </Button>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <div className="relative flex-1">
                    <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search courses or instructors..."
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
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Course Title</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Instructor</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Price / Duration</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Students</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredCourses.map((course) => (
                                <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900">{course.title}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                                                {course.instructor.charAt(0)}
                                            </div>
                                            <span className="text-sm text-gray-600">{course.instructor}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-gray-900">{course.price}</div>
                                        <div className="text-xs text-gray-500">{course.duration}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1 text-gray-600">
                                            <HiUserGroup className="text-gray-400" />
                                            {course.enrollments}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${course.status === 'Active' ? 'bg-green-100 text-green-800' :
                                                course.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {course.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                                <HiPencil size={18} />
                                            </button>
                                            <button
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                onClick={() => handleDelete(course.id)}
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
