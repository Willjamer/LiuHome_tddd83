"use client";
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card"

interface Apartment {
  apartment_id: number;
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
  const { id } = useParams(); // Hämta ID från URL:en
  const [apartment, setApartment] = useState<Apartment | null>(null);

  useEffect(() => {
    async function fetchApartment() {
      try {
        const response = await fetch(`http://localhost:3001/api/browseSpecific/${id}`);
        if (!response.ok) throw new Error('Failed to fetch apartment');
        const data: Apartment = await response.json();
        setApartment(data);
        

      } catch (error) {
        console.error('Error fetching apartment:', error);
      }
    }

    if (id) {
      fetchApartment();
    }
  }, [id]);

  if (!apartment) {
    return <div>Loading...</div>;
  }

  return (

    <main className="w-min-screen">
      <h1 className="text-3xl font-bold text-center py-4">{apartment.title}</h1>
      <div className= "flex flex-row h-min-screen w-screen mx-8 gap-6">
        <div className="w-3/5 rounded-lg overflow-hidden">
          <Image src={"/images/apartment2.jpg"} alt={apartment.title} width={500} height={300} className="object-cover w-full h-full" />
        </div>
        <div>
          <Card>
            <div>

            </div>

          </Card>
        </div>
       


      </div>

      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">{apartment.title}</h1>
          <p>{apartment.description || "No description available"}</p>
          <p>Address: {apartment.address || "No address provided"}</p>
          <p>Rent: {apartment.rent_amount ? `${apartment.rent_amount} SEK/month` : "Rent not specified"}</p>
          <p>Rooms: {apartment.number_of_rooms || "N/A"}</p>
          <p>Bathrooms: {apartment.bathrooms || "N/A"}</p>
          <p>Available from: {apartment.available_from || "Not specified"}</p>
      </div>
    </main>
    
    
  );
}