import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Button from '@/components/ui/Button';
import { TiLocationArrow } from 'react-icons/ti';
import { HiLocationMarker, HiBriefcase, HiCurrencyRupee, HiCheck, HiPaperClip, HiCalendar } from 'react-icons/hi';

const JOBS = [
    {
        id: 1,
        title: 'Full-Stack Developer',
        type: 'Full-time',
        location: 'Bangalore',
        experience: '2-4 years',
        salary: '8-15 LPA',
        skills: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
        description: 'We are looking for a skilled Full-Stack Developer to build scalable web applications. You will be responsible for both frontend and backend development, ensuring high performance and responsiveness.',
        posted: '2 days ago',
        responsibilities: [
            'Develop and maintain web applications using the MERN stack',
            'Collaborate with cross-functional teams to define and design new features',
            'Write clean, maintainable, and efficient code',
            'Troubleshoot, debug and upgrade existing systems',
            'Ensure software quality through testing and code reviews'
        ],
        requirements: [
            'Proven experience as a Full Stack Developer',
            'Strong knowledge of React, Node.js, and MongoDB',
            'Experience with TypeScript and modern ES6+ features',
            'Familiarity with Git and Agile methodologies',
            'Bachelor’s degree in Computer Science or related field'
        ]
    },
    {
        id: 2,
        title: 'React Developer',
        type: 'Full-time',
        location: 'Remote',
        experience: '1-3 years',
        salary: '6-12 LPA',
        skills: ['React', 'JavaScript', 'Redux', 'CSS'],
        description: 'Join our frontend team to create beautiful and responsive user interfaces. You will work closely with designers and backend developers to deliver high-quality web experiences.',
        posted: '5 days ago',
        responsibilities: [
            'Develop new user-facing features using React.js',
            'Build reusable code and libraries for future use',
            'Ensure the technical feasibility of UI/UX designs',
            'Optimize application for maximum speed and scalability'
        ],
        requirements: [
            'Strong proficiency in JavaScript, including DOM manipulation and the JavaScript object model',
            'Thorough understanding of React.js and its core principles',
            'Experience with popular React.js workflows (such as Flux or Redux)',
            'Familiarity with newer specifications of EcmaScript'
        ]
    },
    {
        id: 3,
        title: 'AI/ML Engineer',
        type: 'Full-time',
        location: 'Hyderabad',
        experience: '3-5 years',
        salary: '12-20 LPA',
        skills: ['Python', 'TensorFlow', 'PyTorch', 'ML'],
        description: 'We are seeking an AI/ML Engineer to develop cutting-edge solutions. You will be working on improving our core algorithms and building new machine learning models.',
        posted: '1 week ago',
        responsibilities: [
            'Design and build machine learning models',
            'Train and retrain systems when necessary',
            'Extend existing ML libraries and frameworks',
            'Research and implement appropriate ML algorithms and tools'
        ],
        requirements: [
            'Proven experience as a Machine Learning Engineer or similar role',
            'Understanding of data structures, data modeling and software architecture',
            'Deep knowledge of math, probability, statistics and algorithms',
            'Ability to write robust code in Python'
        ]
    },
    {
        id: 4,
        title: 'DevOps Engineer',
        type: 'Full-time',
        location: 'Pune',
        experience: '2-4 years',
        salary: '10-18 LPA',
        skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
        description: 'We need a DevOps Engineer to manage our cloud infrastructure and deployment pipelines. You will ensure our systems are reliable, scalable, and secure.',
        posted: '3 days ago',
        responsibilities: [
            'Implement and maintain CI/CD pipelines',
            'Manage cloud infrastructure on AWS',
            'Monitor system performance and reliability',
            'Automate manual processes'
        ],
        requirements: [
            'Experience with AWS services (EC2, S3, RDS, etc.)',
            'Strong knowledge of Docker and Kubernetes',
            'Experience with Jenkins, GitHub Actions or similar tools',
            'Proficiency in scripting (Bash, Python)'
        ]
    },
    {
        id: 5,
        title: 'Frontend Developer Intern',
        type: 'Internship',
        location: 'Bangalore',
        experience: 'Fresher',
        salary: '₹20k-30k/month',
        skills: ['HTML', 'CSS', 'JavaScript', 'React'],
        description: 'Kickstart your career with our internship program. You will learn from experienced developers and work on real-world projects.',
        posted: '1 day ago',
        responsibilities: [
            'Assist in developing frontend components',
            'Fix bugs and improve site performance',
            'Participate in code reviews and team meetings',
            'Learn best practices in web development'
        ],
        requirements: [
            'Basic understanding of HTML, CSS, JavaScript',
            'Familiarity with React is a plus',
            'Eagerness to learn and grow',
            'Good communication skills'
        ]
    },
    {
        id: 6,
        title: 'Backend Developer',
        type: 'Full-time',
        location: 'Mumbai',
        experience: '2-5 years',
        salary: '8-16 LPA',
        skills: ['Node.js', 'Express', 'PostgreSQL', 'Redis'],
        description: 'We are looking for a Backend Developer to build robust APIs and server-side logic. You will ensure high performance and responsiveness to requests from the frontend.',
        posted: '4 days ago',
        responsibilities: [
            'Design and implementation of low-latency, high-availability, and performant applications',
            'Implementation of security and data protection',
            'Integration of data storage solutions',
            'Building and maintaining RESTful APIs'
        ],
        requirements: [
            'Strong proficiency in Node.js and frameworks available for it',
            'Understanding the nature of asynchronous programming',
            'Basic understanding of front-end technologies',
            'User authentication and authorization between multiple systems, servers, and environments'
        ]
    },
];

export async function generateStaticParams() {
    return JOBS.map((job) => ({
        id: job.id.toString(),
    }));
}

export default function JobDetailPage({ params }: { params: { id: string } }) {
    const job = JOBS.find((j) => j.id.toString() === params.id);

    if (!job) {
        notFound();
    }

    return (
        <main className="relative min-h-screen w-screen overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-orange-50 via-white to-red-50 pt-32 pb-20">
                <div className="container mx-auto px-4 md:px-10">
                    <Link href="/jobs" className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-600 transition-colors mb-8">
                        <TiLocationArrow className="rotate-180" />
                        <span>Back to Jobs</span>
                    </Link>

                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
                            <div>
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 ${job.type === 'Internship' ? 'bg-blue-100 text-blue-600' :
                                        job.type === 'Fresher' ? 'bg-green-100 text-green-600' :
                                            'bg-orange-100 text-orange-600'
                                    }`}>
                                    {job.type}
                                </span>
                                <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
                                    {job.title}
                                </h1>

                                <div className="flex flex-wrap gap-4 md:gap-8 text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <HiLocationMarker className="text-red-500 text-xl" />
                                        <span>{job.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <HiBriefcase className="text-blue-500 text-xl" />
                                        <span>{job.experience}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <HiCurrencyRupee className="text-green-500 text-xl" />
                                        <span className="font-semibold">{job.salary}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <HiCalendar className="text-purple-500 text-xl" />
                                        <span>Posted {job.posted}</span>
                                    </div>
                                </div>
                            </div>

                            <Button variant="primary" size="lg" className="w-full md:w-auto shrink-0">
                                Apply Now
                            </Button>
                        </div>

                        <p className="text-lg text-gray-700 leading-relaxed border-t border-gray-100 pt-8">
                            {job.description}
                        </p>
                    </div>
                </div>
            </section>

            {/* Job Details & Application */}
            <section className="bg-white py-20">
                <div className="container mx-auto px-4 md:px-10">
                    <div className="grid md:grid-cols-3 gap-12">
                        {/* Requirements */}
                        <div className="md:col-span-2 space-y-12">
                            <div>
                                <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center text-lg">⚠️</span>
                                    Key Responsibilities
                                </h2>
                                <ul className="space-y-4">
                                    {job.responsibilities?.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-gray-700">
                                            <HiCheck className="text-green-500 text-xl mt-0.5" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-lg">📋</span>
                                    Requirements
                                </h2>
                                <ul className="space-y-4">
                                    {job.requirements?.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-gray-700">
                                            <HiCheck className="text-blue-500 text-xl mt-0.5" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Application Form */}
                        <div>
                            <div className="bg-gray-50 rounded-2xl p-8 sticky top-24 border border-gray-200">
                                <h2 className="text-2xl font-black mb-6">Apply for this Job</h2>
                                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                        <input className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" placeholder="John Doe" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <input className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" placeholder="john@example.com" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                        <input className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" placeholder="+91 98765 43210" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Resume / CV</label>
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-white transition-colors cursor-pointer">
                                            <HiPaperClip className="mx-auto text-gray-400 text-2xl mb-2" />
                                            <span className="text-sm text-gray-500">Click to upload PDF</span>
                                        </div>
                                    </div>
                                    <Button variant="primary" size="lg" className="w-full justify-center mt-6">
                                        Submit Application
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
