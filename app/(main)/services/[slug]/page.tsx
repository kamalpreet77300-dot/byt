import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SERVICES } from '@/lib/constants';
import AnimatedTitle from '@/components/ui/AnimatedTitle';
import Button from '@/components/ui/Button';
import { TiLocationArrow } from 'react-icons/ti';
import { HiCheckCircle, HiCode, HiLightningBolt } from 'react-icons/hi';

const SERVICE_DETAILS: Record<string, any> = {
    'web-development': {
        problem: 'Businesses struggle with outdated websites that don\'t convert visitors into customers',
        solution: 'We build modern, responsive web applications that drive engagement and sales',
        techStack: ['React', 'Next.js', 'Node.js', 'MongoDB', 'PostgreSQL', 'TypeScript'],
        process: [
            { step: 'Discovery', desc: 'Understanding your business goals and requirements' },
            { step: 'Design', desc: 'Creating wireframes and UI/UX designs' },
            { step: 'Development', desc: 'Building with modern technologies' },
            { step: 'Testing', desc: 'Rigorous quality assurance' },
            { step: 'Deployment', desc: 'Launch and ongoing support' },
        ],
        features: [
            { title: 'Custom Design', desc: 'Tailor-made designs that reflect your brand identity.' },
            { title: 'SEO Optimized', desc: 'Built-in best practices to rank higher on search engines.' },
            { title: 'Responsive Layout', desc: 'Flawless experience on mobile, tablet, and desktop.' },
            { title: 'CMS Integration', desc: 'Easy content management with Strapi or Sanity.' },
            { title: 'Performance', desc: 'Blazing fast load times with Next.js optimization.' },
            { title: 'Security', desc: 'Enterprise-grade security implementation.' },
        ],
        benefits: [
            '100% Client Satisfaction',
            'On-time Delivery',
            'Post-launch Support',
            'Scalable Architecture',
        ],
        faq: [
            { q: 'How long does it take to build a website?', a: 'Typically 4-8 weeks depending on complexity.' },
            { q: 'Do you provide hosting services?', a: 'Yes, we handle cloud hosting and domain setup.' },
            { q: 'Can I update the content myself?', a: 'Absolute! We integrate a user-friendly CMS.' },
        ],
        caseStudies: [
            { title: 'E-Commerce Platform', result: '300% increase in sales', tech: 'Next.js, Stripe' },
            { title: 'SaaS Dashboard', result: '50K+ active users', tech: 'React, Node.js' },
        ],
        pricing: [
            { name: 'Starter', price: 49999, features: ['5 Pages', 'Responsive Design', 'SEO Optimized', '1 Month Support'] },
            { name: 'Professional', price: 99999, features: ['15 Pages', 'Custom Design', 'CMS Integration', '3 Months Support', 'Analytics'] },
            { name: 'Enterprise', price: 199999, features: ['Unlimited Pages', 'Advanced Features', 'API Integration', '12 Months Support', 'Priority Support'] },
        ],
    },
    'mobile-app-development': {
        problem: 'Reaching customers on mobile requires native apps that work seamlessly',
        solution: 'Cross-platform mobile apps that deliver native performance on iOS and Android',
        techStack: ['React Native', 'Flutter', 'Firebase', 'Redux', 'Native APIs'],
        process: [
            { step: 'Planning', desc: 'App strategy and feature planning' },
            { step: 'UI/UX Design', desc: 'Mobile-first design approach' },
            { step: 'Development', desc: 'Cross-platform development' },
            { step: 'Testing', desc: 'Device and OS testing' },
            { step: 'Launch', desc: 'App store deployment' },
        ],
        features: [
            { title: 'Native Performance', desc: 'Smooth animations and fast response times.' },
            { title: 'Offline Mode', desc: 'Functional connectivity even without internet.' },
            { title: 'Push Notifications', desc: 'Engage users with real-time updates.' },
            { title: 'App Store Optimization', desc: 'Rank higher in Play Store and App Store.' },
            { title: 'Cross-Platform', desc: 'One codebase for both iOS and Android.' },
            { title: 'Analytics', desc: 'Track user behavior and app performance.' },
        ],
        benefits: [
            'Wider Market Reach',
            'Higher Engagement',
            'Brand Recognition',
            'Direct Marketing Channel',
        ],
        faq: [
            { q: 'Do you build for both iOS and Android?', a: 'Yes, we use cross-platform frameworks to target both.' },
            { q: 'How much does an app cost?', a: 'It varies based on features, but starts from ₹80k.' },
            { q: 'Do you provide maintenance?', a: 'Yes, we offer ongoing support and updates.' },
        ],
        caseStudies: [
            { title: 'Food Delivery App', result: '100K+ downloads', tech: 'React Native' },
            { title: 'Fitness Tracker', result: '4.8★ rating', tech: 'Flutter' },
        ],
        pricing: [
            { name: 'Basic', price: 79999, features: ['Single Platform', 'Basic Features', 'App Store Submission', '2 Months Support'] },
            { name: 'Standard', price: 149999, features: ['iOS + Android', 'Advanced Features', 'Push Notifications', '6 Months Support'] },
            { name: 'Premium', price: 299999, features: ['Full Features', 'Backend Integration', 'Analytics', '12 Months Support', 'Maintenance'] },
        ],
    },
    'ai-ml-solutions': {
        problem: 'Businesses need intelligent automation to stay competitive',
        solution: 'AI-powered solutions that automate processes and provide insights',
        techStack: ['Python', 'TensorFlow', 'PyTorch', 'scikit-learn', 'FastAPI', 'OpenAI'],
        process: [
            { step: 'Data Analysis', desc: 'Understanding your data landscape' },
            { step: 'Model Design', desc: 'Selecting appropriate algorithms' },
            { step: 'Training', desc: 'Model training and optimization' },
            { step: 'Integration', desc: 'Deploying into your systems' },
            { step: 'Monitoring', desc: 'Continuous improvement' },
        ],
        features: [
            { title: 'Predictive Analytics', desc: 'Forecast trends and make data-driven decisions.' },
            { title: 'NLP', desc: 'Natural Language Processing for text and speech.' },
            { title: 'Computer Vision', desc: 'Image and video analysis automation.' },
            { title: 'Process Automation', desc: 'Automate repetitive tasks with intelligence.' },
            { title: 'Data Mining', desc: 'Extract valuable insights from large datasets.' },
            { title: 'Custom Models', desc: 'Tailored ML models for your specific needs.' },
        ],
        benefits: [
            'Data-driven Decisions',
            'Operational Efficiency',
            'Competitive Advantage',
            'Reduced Errors',
        ],
        faq: [
            { q: 'Is my data secure?', a: 'We strictly adhere to data privacy and security protocols.' },
            { q: 'What is the ROI of AI?', a: 'High efficiency gains often lead to significant cost savings.' },
            { q: 'Can this integrate with current systems?', a: 'Yes, we build APIs for seamless integration.' },
        ],
        caseStudies: [
            { title: 'Chatbot System', result: '80% automation rate', tech: 'NLP, GPT' },
            { title: 'Recommendation Engine', result: '45% increase in engagement', tech: 'ML, Python' },
        ],
        pricing: [
            { name: 'Starter', price: 99999, features: ['Basic ML Model', 'Data Analysis', 'API Integration', '3 Months Support'] },
            { name: 'Advanced', price: 199999, features: ['Custom AI Solution', 'Deep Learning', 'Real-time Processing', '6 Months Support'] },
            { name: 'Enterprise', price: 399999, features: ['Full AI Platform', 'Custom Training', 'Scalable Infrastructure', '12 Months Support'] },
        ],
    },
    'saas-development': {
        problem: 'Building and scaling software-as-a-service requires complex architecture and multi-tenancy management',
        solution: 'End-to-end SaaS development with robust multi-tenancy, subscription management, and scalable cloud infrastructure',
        techStack: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS', 'Docker'],
        process: [
            { step: 'Market Analysis', desc: 'Analyzing competition and identifying USP' },
            { step: 'Architecture', desc: 'Designing multi-tenant scalable architecture' },
            { step: 'MVP Development', desc: 'Building core features for rapid launch' },
            { step: 'Testing', desc: 'Security and load testing' },
            { step: 'Scaling', desc: 'Post-launch monitoring and scaling' },
        ],
        features: [
            { title: 'Multi-tenancy', desc: 'Secure data isolation for each customer.' },
            { title: 'Subscription Management', desc: 'Integrated billing and recurring payments.' },
            { title: 'Role-Based Access', desc: 'Granular controls for user permissions.' },
            { title: 'Scalable Infrastructure', desc: 'Auto-scaling to handle growth.' },
            { title: 'Analytics Dashboard', desc: 'Insights for you and your customers.' },
            { title: 'API First', desc: 'Easy external integrations.' },
        ],
        benefits: [
            'Recurring Revenue',
            'Global Accessibility',
            'Scalability',
            'Seamless Updates',
        ],
        faq: [
            { q: 'Which payment gateways do you support?', a: 'Stripe, Razorpay, PayPal, and more.' },
            { q: 'Is it secure?', a: 'Yes, we implement enterprise-grade security standards.' },
            { q: 'Can you help with scaling?', a: 'Absolutely, our architecture is cloud-native.' },
        ],
        caseStudies: [
            { title: 'HR Management SaaS', result: '1000+ companies onboarded', tech: 'Next.js, Prisma' },
            { title: 'Fleet Tracking System', result: 'Real-time tracking for 10k+ vehicles', tech: 'Node.js, Redis' },
        ],
        pricing: [
            { name: 'MVP', price: 149999, features: ['Core Features', 'Multi-tenant Auth', 'Stripe Integration', '3 Months Support'] },
            { name: 'Growth', price: 299999, features: ['Advanced Features', 'Custom Analytics', 'API Access', '6 Months Support'] },
            { name: 'Enterprise', price: 599999, features: ['Unlimited Scaling', 'White Labeling', 'Priority Support', 'Custom Integrations'] },
        ],
    },
    'api-backend-development': {
        problem: 'Poorly architected backends lead to slow performance and security vulnerabilities',
        solution: 'High-performance, secure, and well-documented API and backend systems',
        techStack: ['Node.js', 'Express', 'FastAPI', 'PostgreSQL', 'Redis', 'Swagger'],
        process: [
            { step: 'API Design', desc: 'RESTful/GraphQL API documentation' },
            { step: 'Database Design', desc: 'Schema optimization and modeling' },
            { step: 'Core Dev', desc: 'Robust business logic implementation' },
            { step: 'Security', desc: 'JWT, OAuth, and data encryption' },
            { step: 'Optimization', desc: 'Caching and query optimization' },
        ],
        features: [
            { title: 'REST & GraphQL', desc: 'Flexible and standardized API designs.' },
            { title: 'Microservices', desc: 'Decoupled architecture for maintainability.' },
            { title: 'Caching', desc: 'Redis implementation for ultra-fast response.' },
            { title: 'Load Balancing', desc: 'Distribute traffic efficiently.' },
            { title: 'Swagger Docs', desc: 'Interactive API documentation.' },
            { title: 'OAuth 2.0', desc: 'Secure authentication standards.' },
        ],
        benefits: [
            'High Performance',
            'Reliability',
            'Enhanced Security',
            'Easy Integration',
        ],
        faq: [
            { q: 'What database do you use?', a: 'PostgreSQL, MongoDB, or whatever fits best.' },
            { q: 'Do you provide documentation?', a: 'Yes, comprehensive Swagger/OpenAPI docs.' },
            { q: 'How do you test APIs?', a: 'Automated unit and integration testing.' },
        ],
        caseStudies: [
            { title: 'Payment Gateway API', result: 'Processed ₹10Cr+ monthly', tech: 'Node.js, PostgreSQL' },
            { title: 'Social Network Backend', result: 'Supported 500k+ concurrent users', tech: 'Python, Redis' },
        ],
        pricing: [
            { name: 'Basic', price: 39999, features: ['10 Endpoints', 'Database Setup', 'JWT Auth', '1 Month Support'] },
            { name: 'Pro', price: 89999, features: ['Unlimited Endpoints', 'Third-party Integrations', 'Redis Caching', '3 Months Support'] },
            { name: 'Enterprise', price: 179999, features: ['Microservices Arch', 'High Availability', 'Load Balancing', 'Annual Maintenance'] },
        ],
    },
    'cloud-devops': {
        problem: 'Manual deployments and unoptimized infrastructure lead to downtime and high costs',
        solution: 'Automated CI/CD pipelines and optimized cloud infrastructure for maximum uptime',
        techStack: ['AWS', 'Docker', 'Kubernetes', 'GitHub Actions', 'Terraform', 'Nginx'],
        process: [
            { step: 'Audit', desc: 'Analyzing current infra and bottlenecks' },
            { step: 'Strategy', desc: 'Cloud migration or optimization plan' },
            { step: 'Automation', desc: 'Setting up CI/CD pipelines' },
            { step: 'Monitoring', desc: 'Implementing logging and alerts' },
            { step: 'Hardening', desc: 'Security audits and firewalls' },
        ],
        features: [
            { title: 'CI/CD Pipelines', desc: 'Automate build, test, and deployment.' },
            { title: 'Infrastructure as Code', desc: 'Manage infra with Terraform/Ansible.' },
            { title: 'Containerization', desc: 'Docker/Kubernetes for consistency.' },
            { title: 'Monitoring', desc: 'Real-time metrics with Prometheus/Grafana.' },
            { title: 'Auto-scaling', desc: 'Handle traffic spikes automatically.' },
            { title: 'Security Audits', desc: 'Identify and patch vulnerabilities.' },
        ],
        benefits: [
            'Faster Time to Market',
            'Reduced Cloud Costs',
            '99.9% Uptime',
            'Improved Security',
        ],
        faq: [
            { q: 'Which cloud providers?', a: 'AWS, Azure, Google Cloud, and DigitalOcean.' },
            { q: 'Do you handle migration?', a: 'Yes, we manage zero-downtime migrations.' },
            { q: 'Is there 24/7 support?', a: 'Yes, in our enterprise packages.' },
        ],
        caseStudies: [
            { title: 'Fintech Migration', result: 'Infrastructure cost reduced by 40%', tech: 'AWS, Terraform' },
            { title: 'Autoscale Setup', result: 'Zero downtime during 10x traffic surge', tech: 'Kubernetes, Docker' },
        ],
        pricing: [
            { name: 'Starter', price: 29999, features: ['AWS Setup', 'Basic CI/CD', 'Dockerization', '1 Month Support'] },
            { name: 'Standard', price: 69999, features: ['K8s Cluster', 'Advanced Pipelines', 'Auto-scaling', '3 Months Support'] },
            { name: 'Enterprise', price: 149999, features: ['24/7 Monitoring', 'Security Hardening', 'Disaster Recovery', 'Priority On-call'] },
        ],
    },
};

export async function generateStaticParams() {
    return SERVICES.map((service) => ({
        slug: service.slug,
    }));
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const service = SERVICES.find((s) => s.slug === slug);
    const details = SERVICE_DETAILS[slug];

    if (!service || !details) {
        notFound();
    }

    return (
        <main className="relative min-h-screen w-screen overflow-x-hidden">
            {/* Hero */}
            <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-32 pb-20">
                <div className="container mx-auto px-4 md:px-10">
                    <Link href="/services" className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors mb-8">
                        <TiLocationArrow className="rotate-180" />
                        <span>Back to Services</span>
                    </Link>
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="text-7xl mb-6">{service.icon}</div>
                        <h1 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {service.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 mb-8">
                            {service.shortDesc}
                        </p>
                        <Link href="/contact">
                            <Button variant="primary" size="lg" rightIcon={<TiLocationArrow />}>
                                Get Started
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Problem → Solution */}
            <section className="bg-white py-20">
                <div className="container mx-auto px-4 md:px-10">
                    <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        <div className="bg-red-50 p-8 rounded-2xl border-2 border-red-200">
                            <h2 className="text-3xl font-black mb-4 text-red-600">The Problem</h2>
                            <p className="text-lg text-gray-700">{details.problem}</p>
                        </div>
                        <div className="bg-green-50 p-8 rounded-2xl border-2 border-green-200">
                            <h2 className="text-3xl font-black mb-4 text-green-600">Our Solution</h2>
                            <p className="text-lg text-gray-700">{details.solution}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tech Stack */}
            <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-20">
                <div className="container mx-auto px-4 md:px-10">
                    <h2 className="text-4xl md:text-5xl font-black text-center mb-12">Technology Stack</h2>
                    <div className="flex flex-wrap gap-4 justify-center max-w-4xl mx-auto">
                        {details.techStack.map((tech: string, index: number) => (
                            <div key={index} className="px-6 py-3 bg-white rounded-full border-2 border-blue-200 font-semibold text-blue-600 hover:scale-110 transition-transform">
                                {tech}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Development Process */}
            <section className="bg-white py-20">
                <div className="container mx-auto px-4 md:px-10">
                    <h2 className="text-4xl md:text-5xl font-black text-center mb-12">Our Process</h2>
                    <div className="grid md:grid-cols-5 gap-6 max-w-6xl mx-auto">
                        {details.process.map((item: any, index: number) => (
                            <div key={index} className="text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-black mx-auto mb-4">
                                    {index + 1}
                                </div>
                                <h3 className="font-bold text-lg mb-2">{item.step}</h3>
                                <p className="text-sm text-gray-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Key Features */}
            <section className="bg-gray-50 py-20">
                <div className="container mx-auto px-4 md:px-10">
                    <h2 className="text-4xl md:text-5xl font-black text-center mb-12">Key Features</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {details.features.map((feature: any, index: number) => (
                            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                                <h3 className="text-xl font-bold mb-3 text-blue-600">{feature.title}</h3>
                                <p className="text-gray-600">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="bg-white py-20">
                <div className="container mx-auto px-4 md:px-10">
                    <h2 className="text-4xl md:text-5xl font-black text-center mb-12">Why Choose Us</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {details.benefits.map((benefit: string, index: number) => (
                            <div key={index} className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                                <HiCheckCircle className="text-blue-600 text-2xl flex-shrink-0" />
                                <span className="font-bold text-gray-800">{benefit}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="bg-white py-20 border-t border-gray-100">
                <div className="container mx-auto px-4 md:px-10 max-w-4xl">
                    <h2 className="text-4xl md:text-5xl font-black text-center mb-12">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        {details.faq.map((item: any, index: number) => (
                            <div key={index} className="bg-gray-50 p-6 rounded-2xl">
                                <h3 className="text-xl font-bold mb-2 text-gray-900">{item.q}</h3>
                                <p className="text-gray-600">{item.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Case Studies */}
            <section className="bg-gradient-to-br from-purple-50 to-pink-50 py-20">
                <div className="container mx-auto px-4 md:px-10">
                    <h2 className="text-4xl md:text-5xl font-black text-center mb-12">Success Stories</h2>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {details.caseStudies.map((study: any, index: number) => (
                            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg">
                                <h3 className="text-2xl font-bold mb-3">{study.title}</h3>
                                <p className="text-green-600 font-semibold text-lg mb-3">✓ {study.result}</p>
                                <p className="text-gray-600">Tech: {study.tech}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section className="bg-white py-20">
                <div className="container mx-auto px-4 md:px-10">
                    <h2 className="text-4xl md:text-5xl font-black text-center mb-12">Pricing Plans</h2>
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {details.pricing.map((plan: any, index: number) => (
                            <div key={index} className={`p-8 rounded-2xl border-2 ${index === 1 ? 'border-blue-500 scale-105 shadow-2xl' : 'border-gray-200'}`}>
                                <h3 className="text-2xl font-black mb-4">{plan.name}</h3>
                                <div className="text-4xl font-black mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    ₹{(plan.price / 1000).toFixed(0)}k
                                </div>
                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature: string, i: number) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <HiCheckCircle className="text-green-500 text-xl mt-0.5 flex-shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link href="/contact">
                                    <Button variant={index === 1 ? 'primary' : 'outline'} size="md" className="w-full">
                                        Get Started
                                    </Button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
                <div className="container mx-auto px-4 md:px-10 text-center">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                        Ready to Get Started?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Let's discuss your project and create something amazing together
                    </p>
                    <Link href="/contact">
                        <Button variant="accent" size="lg" rightIcon={<TiLocationArrow />}>
                            Contact Us Now
                        </Button>
                    </Link>
                </div>
            </section>
        </main>
    );
}
