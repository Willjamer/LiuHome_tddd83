"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Calendar, House, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image";


//TESTING COMMENT 1232323
export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/data")
      .then(response => {
        setData(response.data.message);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const featuredListings = [
    {
      id: 1,
      title: "Modern Student Apartment",
      price: "5000 SEK/month",
      location: "Linköping, Sweden",
      imageUrl: "/images/apartment1.jpg",
    },
    {
      id: 2,
      title: "Cozy Studio Near Campus",
      price: "4500 SEK/month",
      location: "Linköping, Sweden",
      imageUrl: "/images/apartment2.jpg",
    },
    {
      id: 3,
      title: "Spacious Shared Apartment",
      price: "4000 SEK/month",
      location: "Linköping, Sweden",
      imageUrl: "/images/apartment3.jpg",
    },
  ];


  return (
    <div className="flex min-h-screen flex-col w-full">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 ">

        <div className="flex h-16 items-center justify-between px-4 ">
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
      <main className="flex-1">
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 z-0 " />
          <div
            className="relative h-[500px] bg-cover bg-center"
            style={{ backgroundImage: "url('/images/Hero.jpg')" }}
          >
            <div className="h-full flex flex-col justify-center items-center sm:pl-8">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Find Your Perfect Student Apartment</h1>
                <p className="text-lg text-muted-foreground">
                  Rent directly from other students. No middlemen, no agency fees.
                </p>

                <div className="bg-card rounded-lg shadow-lg p-4 w-full">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Size or neighborhood" className="pl-9" />
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="whitespace-nowrap ">
                        <Calendar className=" h-4 w-4" />
                        Dates
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        <section className="py-12 bg-muted/30 flex justify-center">
          <div className="container">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold ">Featured Listings</h2>
              <Link href="/listings">
                <Button variant="link">View all</Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-between">
              {featuredListings.map((listing) => (
                <Link href={`/listings/${listing.id}`} key={listing.id}>
                  <Card className="overflow-hidden rounded-lg shadow-lg border-none pt-0 group">
                    <div className="relative w-full h-56 rounded-t-lg overflow-hidden">
                      <Image src={listing.imageUrl} alt={listing.title} width={500} height={300} className="object-cover w-full h-full transition-transform duration-300 ease-in-out transform group-hover:scale-105" />


                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold">{listing.title}</h3>
                      <p className="text-sm text-gray-500">{listing.location}</p>
                      <p className="text-md font-bold mt-2">{listing.price}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 px-6 ">
            <h2 className="text-2xl font-bold text-center mb-8">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Find</h3>
                <p className="text-muted-foreground">Browse verified listings from students at your university.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Connect</h3>
                <p className="text-muted-foreground">Message directly with student landlords to arrange viewings.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <House className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Move In</h3>
                <p className="text-muted-foreground">Secure your new home with our safe payment system.</p>
              </div>
            </div>
        </section>
      </main>

      <footer className="border-t py-6 md:py-8 flex flex-col ">
        <div className=" px-4 sm:px-6 lg:px-8 flex justify-between w-full items-center ">
          <div className="flex  font-semibold w-1/3 justify-center">
            <House className="h-5 w-5" />
            <span>liuHome</span>
          </div>
          <p className="text-sm text-muted-foreground w-1/3 justify-center flex">
            © 2030 liuHome. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0 w-1/3 justify-center">
            <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>


      <div className="bg-blue-500  justify-center flex">
        <h1>Next.js Frontend</h1>
        <p>Flask says: {data || "Loading..."}</p>
      </div>
    </div>
  );
}
