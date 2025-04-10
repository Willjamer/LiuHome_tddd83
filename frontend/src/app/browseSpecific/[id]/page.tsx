"use client";
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar} from "lucide-react"

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
      {/* <h1 className="text-3xl font-bold text-center py-4">{apartment.title}</h1>
      <div className= "flex flex-row  w-screen px-16 gap-8 ">
        <div className="w-2/3 ">
          <Image src={"/images/apartment2.jpg"} alt={apartment.title} width={500} height={400} className="object-cover w-full h-3/4 rounded-lg overflow-hidden" />
        </div>
        <div className="w-1/3">
          <Card className="sticky top-24">
          <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold">
                      ${apartment.rent_amount}
                      <span className="text-base font-normal text-muted-foreground">/month</span>
                    </div>
                    <Badge>Student Verified</Badge>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Calendar className="h-4 w-4" />
                      <span className="font-medium">Availability</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">From</div>
                        <div>{apartment.available_from}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full overflow-hidden">
                      <img
                        src={"/images/apartment2.jpg"}                    //BYT GREJERNA MOT REAL PROFILE
                        alt={"jimmy"}
                        className="h-full w-full object-cover"
                      />
                    </div> 
                    <div>
                      <div className="font-medium">{"jimmy"} </div>
                      <div className="text-sm text-muted-foreground">Student at {"liu"}</div>  
                      <div className="text-xs">jimmy.cool@gmail.com</div>
                    </div> 
                     
                  </div>
                  <div>JIMMYS COOL BIO : Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum fugit officia velit quod commodi consequatur maxime aliquid repudiandae quos ab minima nemo ipsum numquam, illum ad debitis excepturi tempore ipsa?
                  </div>
                  <Button className="w-full">Copy email</Button>
        
                </div>
              </CardContent>

          </Card>
        </div>
      </div> */}

      <div className="flex flex-row w-screen px-16 gap-8">
  {/* Bildsektion */}
  <div className="w-2/3">
    <Image
      src={"/images/apartment2.jpg"}
      alt={apartment.title}
      width={500}
      height={300}
      className="object-cover w-full h-full rounded-lg overflow-hidden"
      style={{ height: "100%" }} // Gör att bilden fyller hela höjden
    />
  </div>

  {/* Kort med hyresinformation */}
  <div className="w-1/3">
    <Card className="sticky top-24 h-full">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold">
              {apartment.rent_amount} SEK
              <span className="text-base font-normal text-muted-foreground">/month</span>
            </div>
            <Badge className="bg-green-500 text-white text-sm px-2 py-1">Verified Student</Badge>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-4 w-4" />
              <span className="font-medium">Availability</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">From</div>
                <div>{apartment.available_from}</div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full overflow-hidden">
              <img
                src={"/images/apartment2.jpg"} // BYT GREJERNA MOT REAL PROFILE
                alt={"jimmy"}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <div className="font-medium">{"jimmy"} </div>
              <div className="text-sm text-muted-foreground">Student at {"liu"}</div>
              <div className="text-xs">jimmy.cool@gmail.com</div>
            </div>
          </div>
          <div>
            JIMMYS COOL BIO : Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum fugit officia velit quod commodi consequatur maxime aliquid repudiandae quos ab minima nemo ipsum numquam, illum ad debitis excepturi tempore ipsa?
          </div>
            <Button
            className="w-full"
            onClick={() => {
              window.location.href = `mailto:jimmy.cool@gmail.com?subject=LiuHome - Hyra lägenhet&body=Hej, jag är intresserad av att hyra din lägenhet.`;   //ändra till riktig email sen
            }}
            >
            Send email
            </Button>
        </div>
      </CardContent>
    </Card>
  </div>
</div>

      {/* Ny sektion för detaljerad information */}
    <div className="w-full px-16 mt-8">
      <Card className="p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Apartment Details</h2>
        <div className="space-y-2">
          <p><strong>Description:</strong> {apartment.description || "No description available"}</p>
          <p><strong>Address:</strong> {apartment.address || "No address provided"}</p>
          <p><strong>Rent:</strong> {apartment.rent_amount ? `${apartment.rent_amount} SEK/month` : "Rent not specified"}</p>
          <p><strong>Rooms:</strong> {apartment.number_of_rooms || "N/A"}</p>
          <p><strong>Bathrooms:</strong> {apartment.bathrooms || "N/A"}</p>
          <p><strong>Available from:</strong> {apartment.available_from || "Not specified"}</p>
        </div>
      </Card>
    </div>
{/* 
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">{apartment.title}</h1>
          <p>{apartment.description || "No description available"}</p>
          <p>Address: {apartment.address || "No address provided"}</p>
          <p>Rent: {apartment.rent_amount ? `${apartment.rent_amount} SEK/month` : "Rent not specified"}</p>
          <p>Rooms: {apartment.number_of_rooms || "N/A"}</p>
          <p>Bathrooms: {apartment.bathrooms || "N/A"}</p>
          <p>Available from: {apartment.available_from || "Not specified"}</p>
      </div> */}
    </main>
    
    
  );
}