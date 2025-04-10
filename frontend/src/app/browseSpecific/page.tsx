"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    BedDouble,
    Bath,
} from "lucide-react";

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
    bathrooms: number;
    is_available: boolean;
    available_from?: string;
}

export default function BrowseSpecificPage() {
    const router = useRouter();
    const [apartment, setApartment] = useState<Apartment | null>(null);
    const [loading, setLoading] = useState(true);

    const searchParams = new URLSearchParams(window.location.search);
    const apartmentId = searchParams.get("apartment_id"); // Extract apartment_id from URL

    async function fetchApartmentDetails(id: string): Promise<void> {
        try {
            const response = await fetch(`http://localhost:3001/api/getApt/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) throw new Error("Failed to fetch apartment details");

            const data: Apartment = await response.json();
            setApartment(data);
        } catch (error) {
            console.error("Error:", error);
            setApartment(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (apartmentId) {
            fetchApartmentDetails(apartmentId as string);
        }
    }, [apartmentId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!apartment) {
        return <p>Apartment not found.</p>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <Card className="w-full max-w-2xl">
                <div className="relative w-full h-64 overflow-hidden">
                    <img
                        src={"/images/apartment2.jpg"} // byt mot riktig bild sen
                        alt={apartment.title}
                        className="object-cover w-full h-full"
                    />
                    <Badge className="absolute top-2 right-2">{apartment.rent_amount} SEK/month</Badge>
                </div>
                <CardContent className="p-4">
                    <h1 className="text-2xl font-bold">{apartment.title}</h1>
                    <p className="text-muted-foreground mt-2">{apartment.description}</p>
                    <div className="flex flex-wrap gap-4 mt-4">
                        <div className="flex items-center text-sm">
                            <BedDouble className="h-4 w-4 mr-1" />
                            <span>{apartment.number_of_rooms} rooms</span>
                        </div>
                        <div className="flex items-center text-sm">
                            <Bath className="h-4 w-4 mr-1" />
                            <span>{apartment.bathrooms} bathrooms</span>
                        </div>
                    </div>
                    <div className="mt-4 text-sm">
                        <p>Address: {apartment.address}</p>
                        <p>Size: {apartment.size} m²</p>
                        <p>Available from: {apartment.available_from}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
