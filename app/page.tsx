import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import ServicesOverview from '@/components/home/ServicesOverview';
import PopularCourses from '@/components/home/PopularCourses';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import Testimonials from '@/components/home/Testimonials';

export default function Home() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      {/* <Navbar /> */}
      <Hero />
      <ServicesOverview />
      <PopularCourses />
      <FeaturedProjects />
      <Testimonials />
      <Footer />
    </main>
  );
}
