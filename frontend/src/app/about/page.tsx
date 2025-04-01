import React from 'react';
import Link from 'next/link';
import { House } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const AboutPage: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col w-full">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl w-1/3 justify-center">
            <House className="h-5 w-5" />
            <span>liuHome</span>
          </Link>
          <nav className="hidden md:flex gap-6 w-1/3 justify-center">
            <Link href="/listings" className="text-sm font-medium hover:underline underline-offset-4">
              Browse
            </Link>
            <Link href="/how-it-works" className="text-sm font-medium hover:underline underline-offset-4">
              How It Works
            </Link>
            <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-4 w-1/3 justify-center">
            <Link href="/list-property">
              <Button variant="outline" size="sm">
                List Your Place
              </Button>
            </Link>
            <Link href="/login">
              <Button size="sm">Sign In</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 p-8 space-y-16 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">About Us</h1>
        
        {/* <section className="bg-gray-100 p-6 rounded-lg shadow-md">
        
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p>
            LiuHome was founded in August 2025 with a simple yet powerful vision: to make the process of finding housing easier for students. Our goal is to bridge the gap between students and landlords, offering an easy-to-use website. At LiuHome, we believe that finding a place to live should be one less worry on your list. 
            We also believe in the power of community. Our platform encourages students to connect with each other. Our team is made up of passionate individuals who are committed to improving the student housing experience. Thank you for choosing LiuHome. We are excited to be part of your housing journey.
          </p>
        </section> */}

        {/* <section 
          className="relative bg-cover bg-center shadow-md rounded-lg overflow-hidden" 
          style={{ backgroundImage: "url('/images/About-OurMission.jpg')" }}
        >
          <div className="bg-black/50 p-6 text-white">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p>
              LiuHome was founded in August 2025 with a simple yet powerful vision: to make the process of finding housing easier for students. Our goal is to bridge the gap between students and landlords, offering an easy-to-use website. At LiuHome, we believe that finding a place to live should be one less worry on your list. 
              We also believe in the power of community. Our platform encourages students to connect with each other. Our team is made up of passionate individuals who are committed to improving the student housing experience. Thank you for choosing LiuHome. We are excited to be part of your housing journey.
            </p>
          </div>
        </section> */}

        <section 
        className="relative w-screen min-h-[750px] bg-cover bg-center left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]"
        style={{ backgroundImage: "url('/images/About-OurMission.jpg')" }}
            >
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-6 text-white">
          <div className="max-w-3xl text-center">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p>
        LiuHome was founded in August 2025 with a simple yet powerful vision: to make the process of finding housing easier for students. Our goal is to bridge the gap between students and landlords, offering an easy-to-use website. At LiuHome, we believe that finding a place to live should be one less worry on your list. 
        We also believe in the power of community. Our platform encourages students to connect with each other. Our team is made up of passionate individuals who are committed to improving the student housing experience. Thank you for choosing LiuHome. We are excited to be part of your housing journey.
            </p>
          </div>
        </div>
        </section>

        <section 
        className="relative w-screen min-h-[750px] bg-cover bg-center left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] -mt-[65px]"
        style={{ backgroundImage: "url('/images/WhoWeAre.png')" }}
            >
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-6 text-white">
          <div className="max-w-3xl text-center">
            <h2 className="text-3xl font-bold mb-4">Who We Are</h2>
            <p>
            We are a group of 9 students from the Industrial Engineering and Management section at Linköping University. The goal of our thesis is not only to meet the requirements for graduation but also to contribute to a meaningful project.
            </p>
          </div>
        </div>
        </section>

        <section className="relative w-screen min-h-[200px] bg-white-100 left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] flex items-center justify-center">
          <div className="max-w-3xl p-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
            <p className="text-lg mb-4">
              Have questions or need assistance? We’re here to help! Reach out to us anytime.
            </p>
            <div className="flex flex-col items-center gap-4">
              <a
          href="mailto:nilvo233@student.liu.se"
          className="text-blue-500 hover:underline text-lg"
              >
          nilvo233@student.liu.se
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;