# BytSmartz - IT Services & Training Platform

A modern, production-ready website for an IT Services & Training Company built with Next.js, featuring a clean light theme inspired by the Zentry clone structure.

## 🚀 Features

- **IT Services Module**: Comprehensive IT solutions (Web Dev, Mobile Apps, AI/ML, SaaS, APIs, Cloud/DevOps)
- **Training Courses**: Paid professional courses with enrollment and payment integration
- **Project Marketplace**: Ready-made projects for sale
- **Job Opportunities**: Career listings and application system
- **Admin Dashboard**: Complete management system
- **Modern UI**: Light theme with GSAP animations, bento grid layouts, and responsive design

## 🛠️ Tech Stack

- **Frontend**: Next.js 16 (App Router), React, TypeScript, Tailwind CSS
- **Animations**: GSAP with ScrollTrigger
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js (ready to configure)
- **Payments**: Razorpay/Stripe integration (placeholder)
- **Icons**: React Icons

## 📦 Installation

1. **Clone the repository**:
   ```bash
   cd /home/gagan/React/project/it-services-platform
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and configure your database URL:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/itservices?schema=public"
   ```

4. **Set up the database**:
   ```bash
   # Generate Prisma Client
   npx prisma generate
   
   # Run migrations (when you have a database)
   npx prisma db push
   
   # Seed the database (optional)
   npx prisma db seed
   ```

5. **Run the development server**:
   ```bash
   npm run dev
   ```

6. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
it-services-platform/
├── app/                      # Next.js App Router
│   ├── (main)/              # Main site routes
│   │   ├── page.tsx         # Home page
│   │   ├── services/        # Services pages
│   │   ├── courses/         # Courses pages
│   │   ├── jobs/            # Jobs pages
│   │   ├── projects/        # Projects pages
│   │   ├── about/           # About page
│   │   └── contact/         # Contact page
│   ├── (admin)/             # Admin dashboard
│   ├── api/                 # API routes
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── components/
│   ├── ui/                  # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── AnimatedTitle.tsx
│   │   ├── BentoTilt.tsx
│   │   └── BentoCard.tsx
│   ├── layout/              # Layout components
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── home/                # Home page sections
│   ├── services/            # Service components
│   ├── courses/             # Course components
│   ├── jobs/                # Job components
│   └── projects/            # Project components
├── lib/
│   ├── prisma.ts            # Prisma client
│   ├── utils.ts             # Utility functions
│   └── constants.ts         # App constants
├── prisma/
│   └── schema.prisma        # Database schema
└── public/                  # Static assets
```

## 🎨 Design System

### Colors (Light Theme)
- **Primary**: Blue (#3B82F6, #2563EB)
- **Secondary**: Purple (#8B5CF6, #7C3AED)
- **Accent**: Green (#10B981, #059669)
- **Background**: White (#FFFFFF), Light Gray (#F9FAFB)
- **Text**: Dark Gray (#111827), Medium Gray (#6B7280)

### Typography
- **Headings**: Poppins (bold, black)
- **Body**: Inter
- **Code**: JetBrains Mono

## 🗄️ Database Schema

The application uses Prisma with PostgreSQL. Key models:
- **User**: Authentication and user management
- **Service**: IT services catalog
- **Course**: Training courses
- **Enrollment**: Course enrollments
- **Job**: Job postings
- **Application**: Job applications
- **Project**: Marketplace projects
- **Purchase**: Project purchases
- **Payment**: Payment records
- **Testimonial**: Client testimonials

## 🚧 Development Status

### ✅ Completed
- [x] Project setup with Next.js and TypeScript
- [x] Light theme design system
- [x] Core UI components (Button, AnimatedTitle, BentoTilt, BentoCard)
- [x] Navbar with scroll behavior and mobile menu
- [x] Footer with contact info
- [x] Home page with all sections:
  - Hero with animated gradient
  - Services overview (bento grid)
  - Popular courses
  - Featured projects
  - Testimonials
- [x] Database schema with Prisma

### 🔄 In Progress
- [ ] Individual service pages
- [ ] Course listing and detail pages
- [ ] Job listings and application system
- [ ] Project marketplace
- [ ] Admin dashboard
- [ ] API routes
- [ ] Authentication
- [ ] Payment integration

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Build
npm run build        # Build for production
npm start            # Start production server

# Database
npx prisma studio    # Open Prisma Studio
npx prisma generate  # Generate Prisma Client
npx prisma db push   # Push schema to database
npx prisma migrate dev  # Create and apply migrations

# Linting
npm run lint         # Run ESLint
```

## 🌐 Key Pages

- **Home** (`/`): Landing page with all sections
- **Services** (`/services`): IT services catalog
- **Courses** (`/courses`): Training courses
- **Projects** (`/projects`): Ready-made projects marketplace
- **Jobs** (`/jobs`): Career opportunities
- **About** (`/about`): Company information
- **Contact** (`/contact`): Contact form

## 🎯 Next Steps

1. **Complete remaining pages**: Services, Courses, Jobs, Projects detail pages
2. **Build Admin Dashboard**: CRUD operations for all modules
3. **Implement API routes**: Backend functionality
4. **Add Authentication**: User login and registration
5. **Integrate Payments**: Razorpay/Stripe for course enrollment and project purchases
6. **Add SEO**: Meta tags, sitemap, robots.txt
7. **Deploy**: Vercel/Netlify deployment

## 📄 License

This project is created for demonstration purposes.

## 🤝 Support

For questions or support, contact: contact@bytsmartz.com

---

Built with ❤️ using Next.js, React, and Tailwind CSS
