"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { Router } from "../../../../node_modules/lucide-react/dist/lucide-react";

interface User {
  sso_id: string;
  name: string;
  email: string;
  bio: string;
  program: string;
  year: string;
}

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
  user?: User;
}


export default function BrowseSpecificPage() {
  const { id } = useParams();
  const [apartment, setApartment] = useState<Apartment | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [liked, setLiked] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchApartment() {
      try {
        const response = await fetch(`http://localhost:3001/api/browseSpecific/${id}`);
        if (!response.ok) throw new Error("Failed to fetch apartment");
        const data: Apartment = await response.json();
        console.log(data)
        setApartment(data);

      } catch (error) {
        console.error("Error fetching apartment:", error);
      }
    }


    async function getLoggedInUser() {
      try {
        const loggedin_sso_Id = localStorage.getItem("sso_id");
        if (!loggedin_sso_Id) return;

        const response = await fetch(`http://localhost:3001/api/get-user/${loggedin_sso_Id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to fetch logged-in user");

        const data: { user: User } = await response.json();
        setLoggedInUser(data.user);
      } catch (error) {
        console.error("Error fetching logged-in user:", error);
      }
    }

    if (id) {
      fetchApartment();
      getLoggedInUser();
    }
  }, [id]);

  async function showUser() {
    try {
      const this_sso_id = apartment?.user?.sso_id;

      console.log(this_sso_id)
      const response = await fetch(`http://localhost:3001/api/get-user/${this_sso_id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to fetch user information");
      const data: { user: User } = await response.json();
      console.log(data)
      setUser(data.user);
      setShowUserModal(true);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

  async function removeApartment() {
    const confirmed = window.confirm("Are you sure you want to delete this apartment?");
    if (!confirmed) return;

    try {
      const apartment_id = apartment?.apartment_id

      const response = await fetch('http://localhost:3001/api/remove-apartment', {
        method: "POST",
        headers: { "Content-Type": "application/json",
        },
        body: JSON.stringify(apartment_id),
        credentials: "include",
      });


      if (!response.ok) throw new Error("Failed to remove apartment");
      router.push('/')
    } catch (error) {
      console.error("Error:", error)
    }
  };


  if (!apartment) return <div>Loading...</div>;


  return (
    <main className="w-min-screen">
      <div className="flex flex-row w-screen px-16 gap-8">
        <div className="w-2/3">
          <Image
            src={`/images/${apartment.location || "apartment3"}.jpg`}
            alt={apartment.title}
            width={500}
            height={300}
            className="object-cover w-full h-full rounded-lg overflow-hidden"
            style={{ height: "100%" }}
          />
        </div>

        <div className="w-1/3">
          <Card className="sticky top-24 h-full">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold">
                    {apartment.rent_amount} SEK
                    <span className="text-base font-normal text-muted-foreground">/month</span>
                  </div>
                  {/* <Badge className="bg-green-500 text-white text-sm px-2 py-1">Verified Student</Badge> */}
                </div>

                <div className="border rounded-lg p-4 ">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="h-4 w-4" />
                    <span className="font-medium">Availability</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">From</div>
                      <div>
                        {apartment.available_from
                          ? new Date(apartment.available_from).toISOString().split("T")[0]
                          : "Not specified"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">

                  <div>
                    {/* <div className="font-medium">{apartment.user?.name}</div> */}
                    <div className="font-medium">{apartment?.user?.name}</div>
                   {/* <div className="text-sm text-muted-foreground">Student at {"liu"}</div>*/}
                    {apartment?.user?.year && (
                      <div className="text-sm text-muted-foreground">Year: {apartment.user.year}</div>
                    )}

                    {apartment?.user?.program && (
                      <div className="text-sm text-muted-foreground">Studying: {apartment.user.program}</div>
                    )}
                    <div className="text-sm">{apartment?.user?.email}</div>
                  </div>



                  {loggedInUser?.sso_id === apartment.user?.sso_id && (
                    <>
                      <button
                        onClick={() => console.log("Edit clicked")}
                        className="px-3 py-2 bg-yellow-400 text-black rounded-md shadow-sm hover:bg-yellow-500"
                      >
                        Edit
                      </button>
                      <button
                        onClick={removeApartment}
                        className="px-3 py-2 bg-red-600 text-white rounded-md shadow-sm hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>

                <div className="font-medium text-muted-foreground text-xs">
                  {apartment?.user?.bio || "no biography available"}
                </div>
                <Button
                  className="w-full"
                  onClick={() =>
                    window.location.href = `mailto:${apartment.user?.email}?subject=LiuHome - Hyra lägenhet&body=Hej, jag är intresserad av att hyra din lägenhet.`
                  }
                >
                  Send email
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="w-full px-16 mt-8">
        <Card className="p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">{apartment.address}</h2>
          <div className="space-y-2">
            <p><strong>Description:</strong> {apartment.description || "No description available"}</p>

            <p><strong>Rent:</strong> {apartment.rent_amount ? `${apartment.rent_amount} SEK/month` : "Rent not specified"}</p>
            <p><strong>Location:</strong> {apartment.location ? `${apartment.location}` : "location not specified"}</p>
            <p><strong>Number of rooms:</strong> {apartment.number_of_rooms ? `${apartment.number_of_rooms} ` : "rooms not specified"}</p>
            <p><strong>Size:</strong> {apartment.size ? `${apartment.size} m²` : "Size not specified"}</p>

            <p>
              <strong>Available from:</strong>{" "}
              {apartment.available_from
                ? new Date(apartment.available_from).toISOString().split("T")[0]
                : "Not specified"}
            </p>
          </div>
        </Card>
      </div>

      {showUserModal && user && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-[600px] h-[600px] relative">
            <button
              onClick={() => setShowUserModal(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold mb-4">User Profile</h2>
            <div className="space-y-2">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>SSO ID:</strong> {user.sso_id}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
