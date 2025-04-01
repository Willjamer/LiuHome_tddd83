"use client";
import { useEffect, useState } from "react";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import SearchBar from "@/components/ui/search-bar";

import {
    House,
    BedDouble,
    Bath,
    Wifi,
    Tv,
    Search
} from "lucide-react"

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
    bathrooms: number
    is_available: boolean;
    available_from?: string;
}

export default function BrowsePage() {
    const [apartments, setApartments] = useState<Apartment[]>([]);
    const [query, setQuery] = useState("");

    const handleSearch = (newQuery: string) => {
        console.log('Search query:', newQuery);
        setQuery(newQuery);
    };

    const filteredApartments = apartments.filter((apartment) =>
        apartment.title.toLowerCase().includes(query.toLowerCase())
    );

    async function fetchApartments(): Promise<void> {
        try {
            const response = await fetch("http://localhost:3001/api/get-apartments", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) throw new Error("Failed to fetch apartments");

            // OM STUB, KÖR DENNA
            const apartments: Apartment[] = await response.json();

            // OM VANLIG (databas), KÖR DESSA TVÅ
            // const data = await response.json();
            // const apartments: Apartment[] = data.Apartments;  

            console.log(apartments);
            console.log(apartments.length)
            setApartments(apartments)
        } catch (error) {
            console.error("Error:", error);
            setApartments([]);
        }
    }

    useEffect(() => {
        fetchApartments();
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 ">
                <div className="flex h-16 items-center justify-between px-4 ">
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl w-1/3 justify-center">
                        <House className="h-5 w-5" />
                        <span>liuHome</span>
                    </Link>
                    <nav className="hidden md:flex gap-6 w-1/3 justify-center">
                        <Link href="/browse" className="text-sm font-medium hover:underline underline-offset-4">
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
            <main className="flex-1 py-8 mx-8">
                <section className="flex justify-center items-center w-full flex-col">
                    <h1 className="text-3xl font-bold text-center">Search for the perfect apartment for you!</h1>
                    <div className="bg-card rounded-lg p-4 w-full max-w-6xl mb-6">
                        <SearchBar onSearch={handleSearch} />
                    </div>
                </section>

                <section className="flex-1 justify-center ">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
                        {filteredApartments.map((apt) => (
                            <Link href={`/listings/${apt.apartment_id}`} key={apt.apartment_id}>
                                <Card className="overflow-hidden rounded-lg shadow-lg border-none p-0 h-full hover:shadow-xl transition-shadow group">
                                    <div className="relative w-full h-48 overflow-hidden">
                                        <img
                                            src={"/images/apartment2.jpg"} // CHANGE THIS SO WE GET DIFF IMAGES BASED ON SOME REQ, AREA/APART
                                            alt={apt.title}
                                            className="object-cover w-full h-full transition-transform duration-300 ease-in-out transform group-hover:scale-105"
                                        />
                                        <Badge className="absolute top-2 right-2">{apt.rent_amount} SEK/month</Badge>
                                    </div>
                                    <CardContent className="p-4">
                                        <h3 className="text-lg font-semibold line-clamp-1">{apt.title}</h3>
                                        <div className="flex flex-wrap gap-4 mt-3">
                                            <div className="flex items-center text-sm">
                                                <BedDouble className="h-4 w-4 mr-1" />
                                                <span>{apt.number_of_rooms}</span>
                                            </div>
                                            <div className="flex items-center text-sm">
                                                <Bath className="h-4 w-4 mr-1" />
                                                <span>{apt.bathrooms}</span>
                                            </div>
                                        </div>
                                        <div className="mt-3 text-sm text-muted-foreground">
                                            Available from: {apt.available_from}
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
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
            {/* 
            <div className="container mx-auto py-10">
                <h1 className="text-3xl font-bold mb-6">Available Apartments</h1>
                {apartments.length > 0 ? (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {apartments.map((apt) => (
                            <li key={apt.apartment_id} className="border p-4 rounded-lg shadow-md">
                                <h3 className="text-lg font-semibold">{apt.title}</h3>
                                <p>{apt.location} - {apt.rent_amount} SEK/month</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No apartments found.</p>
                )}
            </div>
            */}
        </div>








    );
}