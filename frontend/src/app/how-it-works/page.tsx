import React from "react";
import Link from "next/link";
import { House } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SearchBar from "@/components/ui/search-bar";

const HowItWorksPage: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col w-full">
      {/* HEADER - Kopierad från AboutPage */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="flex h-16 items-center justify-between px-4">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl w-1/3 justify-center"
          >
            <House className="h-5 w-5" />
            <span>liuHome</span>
          </Link>
          <nav className="hidden md:flex gap-6 w-1/3 justify-center">
            <Link
              href="/browse"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Browse
            </Link>
            <Link
              href="/how-it-works"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              How It Works
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
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

      {/* HUVUDINNEHÅLL - Här lägger du in sidan */}
      <main className="flex-1 p-8 space-y-16">
        <h1 className="text-4xl font-bold text-center mb-4">How It Works</h1>
        <p className="text-lg text-muted-foreground text-center">
          Here's a guide to how our website works.
        </p>
        <hr className="border-b" />

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-center mb-4">
            1. Sign Up
          </h2>
          <p>
            To get started, you can create a liuHome account. This will allow
            you to browse and save your favorite listings, contact landlords,
            and list your own property. You can sign up by clicking the "Sign
            In", where you'll be prompted to enter your email and password. Once
            you've signed up, you'll be able to access all the features of our
            website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-center mb-4">
            2. Browse Listings
          </h2>
          <p>
            To get started, you can either browse the listings or search for a
            specific property using the search bar. As a student seeking to rent
            a property, you can find a variety of housing options that fit your
            needs and budget. To ensure this, we've developed unique and
            relevant filters to help you narrow down your search and find the
            perfect place to live and make your visit to liuHome as smooth and
            easy as it needs to be.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-center mb-4">
            3. Contact Landlords
          </h2>
          <p>
            Once you've found a listing that interests you, you can contact the
            landlord directly through our website. You can send them a message
            to inquire about the property, ask for more information, or schedule
            a viewing. Establishing direct communication between users through a
            platform with minimal involvement from the developers, aims to
            consolidate liuHome as an intermediary. Our messaging system is
            secure and private, ensuring that your personal information remains
            confidential.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-center mb-4">
            4. List Your Property
          </h2>
          <p>
            If you're a landlord looking to rent out your property, you can list
            it on liuHome. To do this, you'll need to have an account and
            provide details about your property, such as location, price, and
            amenities. Once your listing is live, students can view it and
            contact you if they're interested. We aim to make the process of
            listing your property as simple and straightforward as possible,
            ensuring that you can reach a wide audience of potential tenants.
          </p>
        </section>
      </main>

      {/* FOOTER - Kopierad från AboutPage */}
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
            <Link
              href="/about#terms"
              className="text-sm text-muted-foreground hover:underline"
            >
              Terms
            </Link>
            <Link
              href="/about#privacy"
              className="text-sm text-muted-foreground hover:underline"
            >
              Privacy
            </Link>
            <Link
              href="/about#contact"
              className="text-sm text-muted-foreground hover:underline"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HowItWorksPage;
