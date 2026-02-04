import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SERVICES } from '@/lib/constants';
import ServiceContent from '@/components/services/ServiceContent';

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

    if (!service || !details) {
        notFound();
    }

    return <ServiceContent service={service} details={details} />;
}
