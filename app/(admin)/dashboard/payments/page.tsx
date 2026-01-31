'use client';

import React, { useState } from 'react';
import { HiSearch, HiFilter, HiDownload, HiCheckCircle, HiExclamationCircle, HiClock } from 'react-icons/hi';

// Mock data
const initialPayments = [
    { id: 'PAY-12345', user: 'Rahul Kumar', item: 'MERN Stack Course', amount: '₹49,999', date: '2024-02-28', status: 'Completed', method: 'Razorpay' },
    { id: 'PAY-12346', user: 'Priya Singh', item: 'E-Commerce Project', amount: '₹29,999', date: '2024-02-27', status: 'Completed', method: 'Stripe' },
    { id: 'PAY-12347', user: 'Amit Patel', item: 'Python Course', amount: '₹59,999', date: '2024-02-26', status: 'Pending', method: 'Razorpay' },
    { id: 'PAY-12348', user: 'Vikram Singh', item: 'SaaS Dashboard', amount: '₹14,999', date: '2024-02-25', status: 'Failed', method: 'Razorpay' },
    { id: 'PAY-12349', user: 'Sneha Gupta', item: 'UI/UX Design Course', amount: '₹39,999', date: '2024-02-24', status: 'Completed', method: 'Razorpay' },
];

export default function PaymentsAdminPage() {
    const [payments, setPayments] = useState(initialPayments);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredPayments = payments.filter(payment =>
        payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.item.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Payment History</h1>
                    <p className="text-sm text-gray-500">Track all transactions and financial records</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 font-medium">
                    <HiDownload />
                    Export Report
                </button>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <div className="relative flex-1">
                    <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search transaction ID, user or item..."
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
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Transaction ID</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">User / Item</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Method</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredPayments.map((payment) => (
                                <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <span className="font-mono text-xs text-gray-600">{payment.id}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-medium text-gray-900">{payment.user}</span>
                                            <span className="text-xs text-gray-500">{payment.item}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="font-bold text-gray-900">{payment.amount}</span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 text-sm">{payment.date}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${payment.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                payment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                            }`}>
                                            {payment.status === 'Completed' && <HiCheckCircle />}
                                            {payment.status === 'Pending' && <HiClock />}
                                            {payment.status === 'Failed' && <HiExclamationCircle />}
                                            {payment.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right text-sm text-gray-600">
                                        {payment.method}
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
