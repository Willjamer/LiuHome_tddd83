"use client";
import { useEffect, useState } from "react";

interface Apartment {
  apartment_id: number;      
  user_id: number;           
  title: string;
  description?: string;      
  location: string;
  rent_amount: number;
  is_available: boolean;     
  available_from?: string;   
}

export default function BrowsePage() {
  const [apartments, setApartments] = useState<Apartment[]>([]); 

async function fetchApartments(): Promise<void> {
  try {
    const response = await fetch("http://localhost:3001/api/get-apartments", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) throw new Error("Failed to fetch apartments");

    const apartments: Apartment[] = await response.json();
    console.log(apartments);
    setApartments(apartments);
  } catch (error) {
    console.error("Error:", error);
    setApartments([]); // Reset apartments on failure
  }
}


  useEffect(() => {
    fetchApartments();
  }, []);

  return (
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
  );
}