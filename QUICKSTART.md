# Quick Start Guide

## ⚠️ Important: Node.js Version

This project requires **Node.js 20.9.0 or higher**. Your current version is 18.19.1.

### Upgrade Node.js

**Option 1: Using nvm (recommended)**
```bash
# Install nvm if you don't have it
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install Node.js 20
nvm install 20
nvm use 20
nvm alias default 20
```

**Option 2: Download from nodejs.org**
Visit https://nodejs.org/ and download Node.js 20 LTS

### Verify Installation
```bash
node --version  # Should show v20.x.x or higher
```

## 🚀 Running the Project

Once Node.js is upgraded:

```bash
cd /home/gagan/React/project/it-services-platform

# Run development server
npm run dev

# Open http://localhost:3000
```

## 📁 Project Structure

- `app/page.tsx` - Home page with all sections
- `components/` - Reusable UI components
- `lib/` - Utilities and constants
- `prisma/schema.prisma` - Database schema

## 🎨 Features Implemented

✅ Complete home page with:
- Hero section with animated gradient
- Services overview (bento grid)
- Popular courses
- Featured projects
- Testimonials

✅ Responsive navbar and footer
✅ Light theme design system
✅ GSAP animations
✅ Database schema ready

## 📝 Next Steps

1. Upgrade Node.js to version 20+
2. Run `npm run dev`
3. View the application at http://localhost:3000
4. Continue building individual module pages

See [README.md](file:///home/gagan/React/project/it-services-platform/README.md) for full documentation.
