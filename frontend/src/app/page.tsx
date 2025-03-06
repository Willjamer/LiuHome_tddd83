"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Calendar, Wifi, House, Users, Bath, BedDouble } from "lucide-react"


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

  return (
    <div className="flex min-h-screen flex-col w-full">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
        <div className="container flex h-16 items-center justify-between min-w-full px-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <House className="h-5 w-5" />
            <span>liuHome</span>
          </Link>
          <nav className="hidden md:flex gap-6">
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
          <div className="flex items-center gap-4">
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
    
      <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 z-0" />
          <div
            className="relative h-[500px] bg-cover bg-center"
            style={{ backgroundImage: "url('/placeholder.svg?height=500&width=1200')" }}
          >
            <div className="container h-full flex flex-col justify-center items-start">
              <div className="max-w-xl space-y-4">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Find Your Perfect Student Apartment</h1>
                <p className="text-lg text-muted-foreground">
                  Rent directly from other students. No middlemen, no agency fees.
                </p>

                <div className="bg-card rounded-lg shadow-lg p-4 w-full">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="University or neighborhood" className="pl-9" />
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="whitespace-nowrap">
                        <Calendar className="mr-2 h-4 w-4" />
                        Dates
                      </Button>
                      <Button className="whitespace-nowrap">Search</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>





      <div>
        <h1>Next.js Frontend</h1>
        <p>Flask says: {data || "Loading..."}</p>
      </div>
    </div>
  );
}
