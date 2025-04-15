"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Calendar, House, Users, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image";
import { useRouter } from 'next/navigation';

interface Apartment {
  apartment_id: number;
  user_id: number;
  title: string;
  description?: string;
  address: string;
  size: number;
  number_of_rooms: number;
  location: string;
  rent_amount: number;
  is_available: boolean;
  available_from?: string;
}

//TESTING COMMENT 1232323
export default function Home() {
  const [data, setData] = useState(null);
  const router = useRouter();
  const [apartments, setApartments] = useState<Apartment[]>([]);

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
  async function fetchApartments(): Promise<void> {
    // localStorage.clear();
    try {
      const response = await fetch("http://localhost:3001/api/get-apartments", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) throw new Error("Failed to fetch apartments");

      // OM STUB, KÖR DENNA
      // const apartments: Apartment[] = await response.json();

      // OM VANLIG (databas), KÖR DESSA TVÅ
      const data = await response.json();
      const apartments: Apartment[] = data.Apartments;
      setApartments(apartments.slice(0, 3));
      console.log("Apartments:", apartments);

    } catch (error) {
      console.error("Error:", error);
      setApartments([]);
    }
  }
  useEffect(() => {
    fetchApartments();
  }, []);

  return (


    <div className="flex min-h-screen flex-col w-full" >

      <main className="flex-1">

        <section className="relative">
          <div className="absolute" />
          <div
            className="relative h-[75vh] bg-cover bg-center"
            style={{ backgroundImage: "url('/images/Studenthuset.jpg')", backgroundPosition: "center 1%", }}
          >
            <div className="h-full flex flex-col justify-center items-center sm:pl-8 space-y-4 backdrop-blur-md ">

              <h1 className="text-4xl  font-bold text-black tracking-tight sm:text-5xl">Find Your Perfect Student Apartment</h1>
              <p className="text-lg text-black">
                Rent directly from other students. No middlemen, no agency fees.
              </p>
              <Button onClick={() => router.push('/browse')} variant="outline" className="whitespace-nowrap font-bold">
                Browse Apartments
              </Button>

            </div>

          </div>
          <div className="h-[8vh] absolute inset-0 top-[67vh] bg-gradient-to-b from-transparent to-white"></div>
        </section>


        <section className="py-0 flex justify-center">
          <div className="container">
            <div className="flex items-center justify-between mt-12 mb-8">
              <div className="w-24"></div>
              <h2 className="text-2xl font-bold text-center">Featured Listings</h2>
              <Link href="/browse">
                <Button variant="link">View all</Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-between px-2">
              {apartments.map((apt) => (
                <Link href={`browseSpecific/${apt.apartment_id}`} key={apt.apartment_id}>
                  <Card className="overflow-hidden rounded-lg shadow-lg border-none pt-0 group">
                    <div className="relative w-full h-56 rounded-t-lg overflow-hidden">
                      <Image  src={`/images/${apt.location || "apartment1"}.jpg`}  alt={apt.title} width={500} height={300} className="object-cover w-full h-full transition-transform duration-300 ease-in-out transform group-hover:scale-105" />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold line-clamp-1">{apt.address}</h3>
                      <div className="flex flex-wrap gap-4 mt-3">
                        {/* Antal rum */}
                        <div className="flex items-center text-sm">
                          <House className="h-4 w-4 mr-1" />
                          <span>
                            {apt.number_of_rooms} {apt.number_of_rooms === 1 ? "room, " : "rooms, "}
                            {apt.size ? `${apt.size} m²` : ""}
                          </span>
                        </div>

                        {/* Area */}
                        <div className="flex items-center text-sm">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{apt.location}</span> {/* Byt till apt.area om backend använder "area" */}
                        </div>
                      </div>
                      <div className="mt-3 text-sm text-muted-foreground">
                        Available from: {apt.available_from ? new Date(apt.available_from).toISOString().split("T")[0] : "Not specified"}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>



        <section className="py-12 px-6 ">
          <h2 className="text-2xl font-bold text-center mb-8 ">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Search className="h-6 w-6 " />
              </div>
              <h3 className="text-lg font-semibold mb-2text-white">Find</h3>
              <p className="text-muted-foreground">Browse verified listings from students at your university.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Connect</h3>
              <p className="text-muted-foreground ">Message directly with student landlords to arrange viewings.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <House className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2 ">Move In</h3>
              <p className="text-muted-foreground ">Secure your new home with our safe payment system.</p>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}
