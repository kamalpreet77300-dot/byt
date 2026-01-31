'use client';

import React from 'react';
import {
    HiCurrencyDollar,
    HiUsers,
    HiBriefcase,
    HiCode,
    HiTrendingUp,
    HiTrendingDown
} from 'react-icons/hi';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

// Mock data (replace with real data later)
const stats = [
    {
        title: 'Total Revenue',
        value: '₹12,45,000',
        change: '+15%',
        trend: 'up',
        icon: HiCurrencyDollar,
        color: 'bg-blue-500'
    },
    {
        title: 'Active Students',
        value: '1,234',
        change: '+8%',
        trend: 'up',
        icon: HiUsers,
        color: 'bg-purple-500'
    },
    {
        title: 'Job Applications',
        value: '56',
        change: '-2%',
        trend: 'down',
        icon: HiBriefcase,
        color: 'bg-orange-500'
    },
    {
        title: 'Projects Sold',
        value: '89',
        change: '+24%',
        trend: 'up',
        icon: HiCode,
        color: 'bg-green-500'
    },
];

const chartData = [
    { name: 'Jan', revenue: 40000 },
    { name: 'Feb', revenue: 30000 },
    { name: 'Mar', revenue: 20000 },
    { name: 'Apr', revenue: 27800 },
    { name: 'May', revenue: 18900 },
    { name: 'Jun', revenue: 23900 },
    { name: 'Jul', revenue: 34900 },
];

const recentActivity = [
    { id: 1, user: 'Rahul Kumar', action: 'Enrolled in MERN Stack Course', time: '2 hours ago', type: 'enrollment' },
    { id: 2, user: 'Priya Singh', action: 'Applied for React Developer Job', time: '4 hours ago', type: 'application' },
    { id: 3, user: 'Amit Patel', action: 'Purchased E-commerce Project', time: '1 day ago', type: 'purchase' },
    { id: 4, user: 'Sneha Gupta', action: 'New Contact Inquiry', time: '1 day ago', type: 'inquiry' },
];

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10 text-white`}>
                                <stat.icon className={`text-2xl ${stat.color.replace('bg-', 'text-')}`} />
                            </div>
                            <span className={`flex items-center text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                                }`}>
                                {stat.trend === 'up' ? <HiTrendingUp className="mr-1" /> : <HiTrendingDown className="mr-1" />}
                                {stat.change}
                            </span>
                        </div>
                        <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Chart */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-800 mb-6">Revenue Analytics</h2>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #E5E7EB' }}
                                    itemStyle={{ color: '#1F2937' }}
                                />
                                <Area type="monotone" dataKey="revenue" stroke="#3B82F6" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-800 mb-6">Recent Activity</h2>
                    <div className="space-y-6">
                        {recentActivity.map((activity) => (
                            <div key={activity.id} className="flex gap-4">
                                <div className={`w-2 h-2 mt-2 rounded-full ${activity.type === 'enrollment' ? 'bg-purple-500' :
                                        activity.type === 'application' ? 'bg-orange-500' :
                                            activity.type === 'purchase' ? 'bg-green-500' : 'bg-blue-500'
                                    }`} />
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        by <span className="font-semibold">{activity.user}</span> • {activity.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-6 py-2 text-sm text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition-colors">
                        View All Activity
                    </button>
                </div>
            </div>
        </div>
    );
}
