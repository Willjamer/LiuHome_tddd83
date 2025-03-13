import React from 'react';
import Link from 'next/link';
import { House } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
      <main className="flex-1 p-8 space-y-16">
        <h1 className="text-4xl font-bold mb-8">About Us</h1>
        <section id="what-we-do" className="mb-16">
          <h2 className="text-2xl font-semibold mb-4">What We Do</h2>
          <p>
            LiuHome was founded in August 2025 with a simple yet powerful vision: to make the process of finding housing easier for students. As students ourselves, we understand the challenges of securing affordable, convenient, and comfortable living spaces while studying. That’s why we created LiuHome, a platform dedicated to helping students find second-hand apartments that fit their needs and budget.
          </p>

          <p>
            Our goal is to bridge the gap between students and landlords, offering an easy-to-use website where students can quickly search for available housing options. Whether you're looking for a small studio near your university or a shared apartment with friends, LiuHome aims to make the process simple, transparent, and stress-free.
          </p>

          <p>
            At LiuHome, we believe that finding a place to live should be one less worry on your list. We’re committed to providing a variety of affordable housing options that meet the different needs of students. Whether you're studying full-time or doing an internship, we want to make sure you can focus on your studies without the distraction of housing concerns.
          </p>

          <p>
            We also believe in the power of community. Our platform encourages students to connect with each other, helping to foster a sense of belonging and support. By offering second-hand apartments, we not only make housing more affordable but also contribute to a sustainable and resource-efficient way of living.
          </p>

          <p>
            Our team is made up of passionate individuals who are committed to improving the student housing experience. We continuously strive to make our website more user-friendly, ensuring that you can easily find the right place to live, no matter where you are in your student journey.
          </p>

          <p>
            Thank you for choosing LiuHome. We are excited to be part of your housing journey, and we look forward to helping you find your next home.
          </p>
        </section>
        <section id="who-we-are" className="mb-16">
          <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
          <p>
            We are a group of 9 students from the Industrial Engineering and Management section at Linköping University (LiU), currently working on this project as part of our bachelor thesis. Our team consists of individuals with diverse backgrounds and expertise, all united by our passion for creating innovative solutions to real-world problems. Throughout our studies, we have gained a broad understanding of business, technology, and management, which we are now applying to this project.
          </p>

          <p>
            The goal of our thesis is not only to meet the requirements for graduation but also to contribute to a meaningful project that has the potential to make a difference. By combining our knowledge in engineering, management, and problem-solving, we aim to bring fresh perspectives and valuable insights to the task at hand. This project allows us to collaborate closely, leveraging each other's strengths to develop practical and effective solutions.
          </p>
        </section>
        <section id="contact" className="mb-16">
          <h2 className="text-2xl font-semibold mb-4">Contact</h2>
          <p>
            If you have any questions, feel free to contact us at <a href="mailto:nilvo233@student.liu.se" className="text-blue-500 hover:underline">nilvo233@student.liu.se</a>.
          </p>
        </section>
        <section id="terms" className="mb-16">
          <h2 className="text-2xl font-semibold mb-4">Terms</h2>
          <p>
            We act solely as an intermediary and disclaim any responsibility for matters such as contracts and other agreements between users.
          </p>
        </section>
        <section id="privacy" className="mb-16">
          <h2 className="text-2xl font-semibold mb-4">Privacy</h2>
          <p>
            We value your privacy and are committed to protecting your personal information. We collect and use your data only for the purpose of providing our services and improving your experience on our website.
          </p>
        </section>
      </main>
      <footer className="border-t py-6 md:py-8 flex flex-col">
        <div className="px-4 sm:px-6 lg:px-8 flex justify-between w-full items-center">
          <div className="flex font-semibold w-1/3 justify-center">
            <House className="h-5 w-5" />
            <span>liuHome</span>
          </div>
          <p className="text-sm text-muted-foreground w-1/3 justify-center flex">
            © 2030 liuHome. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0 w-1/3 justify-center">
            <Link href="/about#terms" className="text-sm text-muted-foreground hover:underline">
              Terms
            </Link>
            <Link href="/about#privacy" className="text-sm text-muted-foreground hover:underline">
              Privacy
            </Link>
            <Link href="/about#contact" className="text-sm text-muted-foreground hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;