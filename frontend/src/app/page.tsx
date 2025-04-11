"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Calendar, House, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image";
import { useRouter } from 'next/navigation';


//TESTING COMMENT 1232323
export default function Home() {
  const [data, setData] = useState(null);
  const router = useRouter();

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


    <div className="flex min-h-screen flex-col w-full" style={{ backgroundImage: "url('/images/Studenthuset3.jpg')", backgroundSize: "cover" }}>

      <main className="flex-1">

        <section className="relative">
          <div className="absolute inset-0  from-primary/20 to-primary/5 z-0 " />
          <div
            className="relative h-[500px] bg-cover bg-center"
          // style={{ backgroundImage: "url('/images/Studenthuset.jpg')", backgroundPosition: "center 65%" }}
          >
            <div className="h-full flex flex-col justify-center items-center sm:pl-8 space-y-4">

              <h1 className="text-4xl font-bold text-black tracking-tight sm:text-5xl">Find Your Perfect Student Apartment</h1>
              <p className="text-lg text-black">
                Rent directly from other students. No middlemen, no agency fees.
              </p>
              <Button  onClick={() => router.push('/browse')} variant="outline" className="whitespace-nowrap font-bold">
                Browse Apartments
              </Button>

            </div>
          </div>
        </section>


        <section className="py-0 flex justify-center">
          <div className="container">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-white">Featured Listings</h2>
              <Link href="/browse">
                <Button variant="link" className="text-white">View all</Button>
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
          <h2 className="text-2xl font-bold text-center mb-8 text-white">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Find</h3>
              <p className="text-muted-foreground text-white">Browse verified listings from students at your university.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Connect</h3>
              <p className="text-muted-foreground text-white">Message directly with student landlords to arrange viewings.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <House className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Move In</h3>
              <p className="text-muted-foreground text-white">Secure your new home with our safe payment system.</p>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}
