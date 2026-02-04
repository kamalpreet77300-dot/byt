'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AnimatedTitle from '@/components/ui/AnimatedTitle';
import StaggerCards from '@/components/ui/StaggerCards';
import Button from '@/components/ui/Button';
import { TiLocationArrow } from 'react-icons/ti';
import { HiLocationMarker, HiBriefcase, HiClock, HiCurrencyRupee } from 'react-icons/hi';
import LeadModal from '@/components/ui/LeadModal';

const JOBS = [
    {
        id: 1,
        title: 'Full-Stack Developer',
        type: 'Full-time',
        location: 'Bangalore',
        experience: '2-4 years',
        salary: '8-15 LPA',
        skills: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
        description: 'Build scalable web applications using modern tech stack',
        posted: '2 days ago',
    },
    {
        id: 2,
        title: 'React Developer',
        type: 'Full-time',
        location: 'Remote',
        experience: '1-3 years',
        salary: '6-12 LPA',
        skills: ['React', 'JavaScript', 'Redux', 'CSS'],
        description: 'Create beautiful and responsive user interfaces',
        posted: '5 days ago',
    },
    {
        id: 3,
        title: 'AI/ML Engineer',
        type: 'Full-time',
        location: 'Hyderabad',
        experience: '3-5 years',
        salary: '12-20 LPA',
        skills: ['Python', 'TensorFlow', 'PyTorch', 'ML'],
        description: 'Develop cutting-edge AI solutions',
        posted: '1 week ago',
    },
    {
        id: 4,
        title: 'DevOps Engineer',
        type: 'Full-time',
        location: 'Pune',
        experience: '2-4 years',
        salary: '10-18 LPA',
        skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
        description: 'Manage cloud infrastructure and deployment pipelines',
        posted: '3 days ago',
    },
    {
        id: 5,
        title: 'Frontend Developer Intern',
        type: 'Internship',
        location: 'Bangalore',
        experience: 'Fresher',
        salary: '₹20k-30k/month',
        skills: ['HTML', 'CSS', 'JavaScript', 'React'],
        description: 'Learn and grow with our experienced team',
        posted: '1 day ago',
    },
    {
        id: 6,
        title: 'Backend Developer',
        type: 'Full-time',
        location: 'Mumbai',
        experience: '2-5 years',
        salary: '8-16 LPA',
        skills: ['Node.js', 'Express', 'PostgreSQL', 'Redis'],
        description: 'Build robust backend systems and APIs',
        posted: '4 days ago',
    },
];

const JOB_TYPES = ['All', 'Full-time', 'Part-time', 'Internship', 'Fresher'];

export default function JobsPage() {
    const [selectedType, setSelectedType] = useState('All');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState<typeof JOBS[0] | null>(null);

    const handleApply = (job: typeof JOBS[0]) => {
        setSelectedJob(job);
        setIsModalOpen(true);
    };

    const filteredJobs = selectedType === 'All'
        ? JOBS
        : JOBS.filter(job => job.type === selectedType);

    return (
        <main className="relative min-h-screen w-screen overflow-x-hidden">
            {/* Hero */}
            <section className="relative bg-gradient-to-br from-orange-50 via-white to-red-50 pt-32 pb-20">
                <div className="container mx-auto px-4 md:px-10">
                    <div className="text-center max-w-4xl mx-auto mb-12">
                        <AnimatedTitle title="Career <b>Opportunities</b>" containerClass="mb-6" />
                        <p className="text-xl md:text-2xl text-gray-600 mb-8">
                            Join our team and work on exciting projects with cutting-edge technologies
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <div className="px-6 py-3 bg-white rounded-full shadow-md font-semibold">
                                🏢 50+ Open Positions
                            </div>
                            <div className="px-6 py-3 bg-white rounded-full shadow-md font-semibold">
                                🌟 Great Work Culture
                            </div>
                            <div className="px-6 py-3 bg-white rounded-full shadow-md font-semibold">
                                💰 Competitive Salary
                            </div>
                        </div>
                    </div>

                    {/* Job Type Filter */}
                    <div className="flex flex-wrap gap-3 justify-center mb-12">
                        {JOB_TYPES.map((type) => (
                            <button
                                key={type}
                                onClick={() => setSelectedType(type)}
                                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${selectedType === type
                                    ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg scale-105'
                                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-orange-500'
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>

                    {/* Jobs Grid */}
                    <StaggerCards className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredJobs.map((job) => (
                            <div key={job.id} className="h-full">
                                <div className="group bg-white rounded-2xl border-2 border-gray-200 hover:border-orange-500 p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full flex flex-col">
                                    {/* Type Badge */}
                                    <div className="flex items-center justify-between mb-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${job.type === 'Internship' ? 'bg-blue-100 text-blue-600' :
                                            job.type === 'Fresher' ? 'bg-green-100 text-green-600' :
                                                'bg-orange-100 text-orange-600'
                                            }`}>
                                            {job.type}
                                        </span>
                                        <span className="text-xs text-gray-500">{job.posted}</span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="font-bold text-xl mb-3 group-hover:text-orange-600 transition-colors">
                                        {job.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-gray-600 text-sm mb-4 flex-grow">
                                        {job.description}
                                    </p>

                                    {/* Meta Info */}
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <HiLocationMarker className="text-red-500" />
                                            <span>{job.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <HiBriefcase className="text-blue-500" />
                                            <span>{job.experience}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <HiCurrencyRupee className="text-green-500" />
                                            <span className="font-semibold">{job.salary}</span>
                                        </div>
                                    </div>

                                    {/* Skills */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {job.skills.map((skill, i) => (
                                            <span key={i} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>

                                    {/* CTA */}
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        className="w-full"
                                        onClick={() => handleApply(job)}
                                    >
                                        Apply Now
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </StaggerCards>
                </div>
            </section>

            {/* Benefits */}
            <section className="bg-white py-20">
                <div className="container mx-auto px-4 md:px-10">
                    <h2 className="text-4xl md:text-5xl font-black text-center mb-12 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                        Why Work With Us
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: '🚀', title: 'Career Growth', desc: 'Fast-track your career with us' },
                            { icon: '🏖️', title: 'Work-Life Balance', desc: 'Flexible working hours' },
                            { icon: '🎓', title: 'Learning & Development', desc: 'Continuous skill upgrades' },
                            { icon: '🎉', title: 'Great Perks', desc: 'Health insurance, team outings & more' },
                        ].map((item, index) => (
                            <div key={index} className="text-center p-6 rounded-xl bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 hover:scale-105 transition-transform">
                                <div className="text-6xl mb-4">{item.icon}</div>
                                <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                                <p className="text-gray-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-gradient-to-r from-orange-600 to-red-600 py-20">
                <div className="container mx-auto px-4 md:px-10 text-center">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                        Don't See a Perfect Match?
                    </h2>
                    <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
                        Send us your resume and we'll keep you in mind for future opportunities
                    </p>
                    <Link href="/contact">
                        <Button variant="accent" size="lg" rightIcon={<TiLocationArrow />}>
                            Submit Your Resume
                        </Button>
                    </Link>
                </div>
            </section>

            <LeadModal
                type="JOB_APPLICATION"
                title={selectedJob?.title || ''}
                subtitle="Apply for Job"
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </main>
    );
}
