import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Button from '@/components/ui/Button';
import { TiLocationArrow } from 'react-icons/ti';
import { HiClock, HiUsers, HiStar, HiCheckCircle, HiPlay, HiDownload } from 'react-icons/hi';

const COURSES = [
    {
        id: 1,
        title: 'Full-Stack MERN Development',
        slug: 'mern-stack-development',
        duration: '6 months',
        students: 450,
        price: 49999,
        rating: 4.8,
        image: '🎯',
        category: 'Web Development',
        gradient: 'from-blue-100 to-cyan-50',
        description: 'Master the MERN stack (MongoDB, Express, React, Node.js) and build production-ready web applications.',
        syllabus: [
            { title: 'HTML, CSS & JavaScript Mastery', duration: '4 Weeks' },
            { title: 'React.js & State Management', duration: '6 Weeks' },
            { title: 'Node.js & Express Bundler', duration: '4 Weeks' },
            { title: 'MongoDB & Database Design', duration: '3 Weeks' },
            { title: 'Real-world Projects & Deployment', duration: '7 Weeks' },
        ],
        features: [
            'Live Interactive Sessions',
            'Real-world Projects',
            'Job Placement Support',
            'Certificate of Completion',
            '24/7 Mentor Support'
        ]
    },
    {
        id: 2,
        title: 'AI & Machine Learning Mastery',
        slug: 'ai-machine-learning',
        duration: '8 months',
        students: 320,
        price: 59999,
        rating: 4.9,
        image: '🤖',
        category: 'AI/ML',
        gradient: 'from-purple-100 to-pink-50',
        description: 'Deep dive into Artificial Intelligence and Machine Learning algorithms using Python.',
        syllabus: [
            { title: 'Python Programming Adv', duration: '4 Weeks' },
            { title: 'Data Analysis with Pandas', duration: '4 Weeks' },
            { title: 'Machine Learning Algorithms', duration: '8 Weeks' },
            { title: 'Deep Learning & Neural Networks', duration: '8 Weeks' },
            { title: 'Capstone Project', duration: '8 Weeks' },
        ],
        features: [
            'Industry Expert Trainers',
            'Hands-on with TensorFlow',
            'Intership Opportunity',
            'Global Certification',
            'Career Guidance'
        ]
    },
    {
        id: 3,
        title: 'React & Next.js Advanced',
        slug: 'react-nextjs-advanced',
        duration: '4 months',
        students: 580,
        price: 39999,
        rating: 4.7,
        image: '⚛️',
        category: 'Frontend',
        gradient: 'from-orange-100 to-amber-50',
        description: 'Become a React expert and master Next.js 14 App Router for modern web development.',
        syllabus: [
            { title: 'Advanced React Patterns', duration: '3 Weeks' },
            { title: 'Next.js App Router', duration: '4 Weeks' },
            { title: 'Server Components & Actions', duration: '3 Weeks' },
            { title: 'Authentication & Database', duration: '3 Weeks' },
            { title: 'Performance Optimization', duration: '3 Weeks' },
        ],
        features: [
            'Modern Tech Stack',
            'Code Reviews',
            'Portfolio Building',
            'Interview Preparation',
            'Lifetime Access'
        ]
    },
    {
        id: 4,
        title: 'DevOps & Cloud Engineering',
        slug: 'devops-cloud-engineering',
        duration: '5 months',
        students: 280,
        price: 54999,
        rating: 4.8,
        image: '☁️',
        category: 'DevOps',
        gradient: 'from-emerald-100 to-teal-50',
        description: 'Learn to automate, deploy, and scale applications using AWS, Docker, and Kubernetes.',
        syllabus: [
            { title: 'Linux & Shell Scripting', duration: '3 Weeks' },
            { title: 'AWS Cloud Fundamentals', duration: '4 Weeks' },
            { title: 'Docker & Containerization', duration: '4 Weeks' },
            { title: 'Kubernetes Orchestration', duration: '5 Weeks' },
            { title: 'CI/CD Pipelines', duration: '4 Weeks' },
        ],
        features: [
            'Hands-on Labs',
            'AWS Certification Prep',
            'Real Infrastructure',
            'DevOps Best Practices',
            'Placement Assistance'
        ]
    },
];

export async function generateStaticParams() {
    return COURSES.map((course) => ({
        slug: course.slug,
    }));
}

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
    const course = COURSES.find((c) => c.slug === params.slug);

    if (!course) {
        notFound();
    }

    return (
        <main className="relative min-h-screen w-screen overflow-x-hidden">
            {/* Hero Section */}
            <section className={`relative bg-gradient-to-br ${course.gradient} pt-32 pb-20`}>
                <div className="container mx-auto px-4 md:px-10">
                    <Link href="/courses" className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors mb-8 bg-white/50 px-4 py-2 rounded-full backdrop-blur-sm">
                        <TiLocationArrow className="rotate-180" />
                        <span>Back to Courses</span>
                    </Link>

                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="flex-1">
                            <span className="inline-block px-4 py-1.5 bg-white/80 backdrop-blur-md rounded-full text-sm font-bold text-gray-800 mb-6 border border-white/50 shadow-sm">
                                {course.category}
                            </span>
                            <h1 className="text-4xl md:text-6xl font-black mb-6 text-gray-900 leading-tight">
                                {course.title}
                            </h1>
                            <p className="text-xl text-gray-700 mb-8 leading-relaxed max-w-xl">
                                {course.description}
                            </p>

                            <div className="flex flex-wrap gap-6 mb-8 text-gray-700 font-medium">
                                <div className="flex items-center gap-2 bg-white/50 px-4 py-2 rounded-xl backdrop-blur-sm">
                                    <HiClock className="text-purple-600 text-xl" />
                                    <span>{course.duration}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/50 px-4 py-2 rounded-xl backdrop-blur-sm">
                                    <HiUsers className="text-blue-600 text-xl" />
                                    <span>{course.students}+ Enrolled</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/50 px-4 py-2 rounded-xl backdrop-blur-sm">
                                    <HiStar className="text-yellow-500 text-xl" />
                                    <span>{course.rating} (120+ Reviews)</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <Button variant="primary" size="lg" rightIcon={<TiLocationArrow />}>
                                    Enroll Now
                                </Button>
                                <Button variant="outline" size="lg" className="bg-white/50 border-white hover:bg-white">
                                    Download Syllabus
                                    <HiDownload className="ml-2" />
                                </Button>
                            </div>
                        </div>

                        <div className="flex-1 flex justify-center">
                            <div className="text-[12rem] filter drop-shadow-2xl animate-float">
                                {course.image}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Course Content */}
            <section className="bg-white py-20">
                <div className="container mx-auto px-4 md:px-10">
                    <div className="grid md:grid-cols-3 gap-12">
                        {/* Syllabus - Left Side */}
                        <div className="md:col-span-2 space-y-8">
                            <h2 className="text-3xl font-black mb-8">Course Curriculum</h2>
                            <div className="space-y-4">
                                {course.syllabus.map((item, index) => (
                                    <div key={index} className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow bg-gray-50/50">
                                        <div className="flex justify-between items-center mb-2">
                                            <h3 className="text-xl font-bold text-gray-900">Module {index + 1}: {item.title}</h3>
                                            <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{item.duration}</span>
                                        </div>
                                        <div className="flex gap-2 text-sm text-gray-500 mt-2">
                                            <span className="flex items-center gap-1"><HiPlay className="text-gray-400" /> 5 Lessons</span>
                                            <span className="flex items-center gap-1"><HiClock className="text-gray-400" /> 4h 30m</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Sidebar - Right Side */}
                        <div className="space-y-8">
                            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 sticky top-24">
                                <h3 className="text-2xl font-black mb-6">Course Fee</h3>
                                <div className="text-5xl font-black mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    ₹{(course.price / 1000).toFixed(0)}k
                                </div>
                                <p className="text-gray-500 mb-8 text-sm">One-time payment. Lifetime access.</p>

                                <ul className="space-y-4 mb-8">
                                    {course.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <HiCheckCircle className="text-green-500 text-xl mt-0.5 flex-shrink-0" />
                                            <span className="font-medium text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Button variant="primary" size="lg" className="w-full justify-center">
                                    Enroll Now
                                </Button>
                                <p className="text-xs text-center text-gray-400 mt-4">30-Day Money-Back Guarantee</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
