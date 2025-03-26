"use client";
import { SetStateAction, useEffect, useState } from "react";
import axios from "axios";

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

  // useEffect(() => {
  //   axios.get("http://localhost:3000/api/get-apartments")
  //     .then((response: { data: SetStateAction<Apartment[]>; }) => {
  //       console.log(response.data);
  //       setApartments(response.data);  
  //     })
  //     .catch((error: any) => {
  //       console.error("Error fetching apartments:", error);
  //     });
  // }, []);

  useEffect(() => {
    fetchApartments();
  }, []);

  const fetchApartments = async () => {
    try {
      console.log('Fetching apartments')
      const response = await fetch('api/get-apartments', {
      method : 'GET',
      headers: {
        'content_type': 'application/json'
      }
      });

      if (response.ok) {
        throw new Error ("fail");
      }
      const data = await response.json()
      console.log("recieved data:", data)
    } catch (error) {
      console.error('Error fetching BOM items:', error);
  }

  }

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
        <p>Loading apartments...</p>
      )}
    </div>
  );
}
