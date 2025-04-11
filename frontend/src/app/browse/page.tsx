"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SearchBar from "@/components/ui/search-bar";

import {
    Home, // Ny ikon för antal rum
    MapPin, // Ny ikon för area
} from "lucide-react";

interface Apartment {
    apartment_id: number;
    user_id: number;
    title: string;
    description?: string;
    address: string;
    size: number;
    number_of_rooms: number;
    location: string; // Byt till "area" om backend använder det
    rent_amount: number;
    is_available: boolean;
    available_from?: string;
}

export default function BrowsePage() {
    const [apartments, setApartments] = useState<Apartment[]>([]);
    const [query, setQuery] = useState("");

    const handleSearch = (newQuery: string) => {
        console.log("Search query:", newQuery);
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
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) throw new Error("Failed to fetch apartments");

            const data = await response.json();
            const apartments: Apartment[] = data.Apartments;

            setApartments(apartments);
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
            <main className="flex-1 py-8 mx-8">
                {/* Söksektion */}
                <section className="flex justify-center items-center w-full flex-col">
                    <h1 className="text-3xl font-bold text-center">Search for the perfect apartment for you!</h1>
                    <div className="bg-card rounded-lg p-4 w-full max-w-6xl mb-6">
                        <SearchBar onSearch={handleSearch} />
                    </div>
                </section>

                {/* Lägenhetskort */}
                <section className="flex-1 justify-center">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
                        {filteredApartments.map((apt) => (
                            <Link href={`/browseSpecific/${apt.apartment_id}`} key={apt.apartment_id}>
                                <Card className="overflow-hidden rounded-lg shadow-lg border-none p-0 h-full hover:shadow-xl transition-shadow group">
                                    <div className="relative w-full h-48 overflow-hidden">
                                        <img
                                            src={"/images/apartment2.jpg"} // Ändra till dynamiska bilder om möjligt
                                            alt={apt.title}
                                            className="object-cover w-full h-full transition-transform duration-300 ease-in-out transform group-hover:scale-105"
                                        />
                                        <Badge className="absolute top-2 right-2">{apt.rent_amount} SEK/month</Badge>
                                    </div>
                                    <CardContent className="p-4">
                                        <h3 className="text-lg font-semibold line-clamp-1">{apt.title}</h3>
                                        <div className="flex flex-wrap gap-4 mt-3">
                                            {/* Antal rum */}
                                            <div className="flex items-center text-sm">
                                                <Home className="h-4 w-4 mr-1" />
                                                <span>
                                                    {apt.number_of_rooms} {apt.number_of_rooms === 1 ? "room" : "rooms"}
                                                </span>
                                            </div>

                                            {/* Area */}
                                            <div className="flex items-center text-sm">
                                                <MapPin className="h-4 w-4 mr-1" />
                                                <span>{apt.location}</span> {/* Byt till apt.area om backend använder "area" */}
                                            </div>
                                        </div>
                                        <div className="mt-3 text-sm text-muted-foreground">
                                            Available from:{" "}
                                            {apt.available_from
                                                ? new Date(apt.available_from).toISOString().split("T")[0]
                                                : "Not specified"}
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}