"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { useUser } from "@/app/ssologin/page";

interface User {
  sso_id: string;
  name: string;
  email: string;
  program: string;
  year: number;
  bio: string;
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

interface Review {
  like: boolean;
  content?: string;
  review_date: string;
  reviewer: User;
  reviewed: User;
}

export default function BrowseSpecificPage() {
  const { id } = useParams(); // Hämta ID från URL:en
  const [apartment, setApartment] = useState<Apartment | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [liked, setLiked] = useState<boolean | null>(null);


  const loggedInUser = useUser();

  useEffect(() => {
    async function fetchApartment() {
      try {
        const response = await fetch(`http://localhost:3001/api/browseSpecific/${id}`);
        if (!response.ok) throw new Error("Failed to fetch apartment");
        const data: Apartment = await response.json();
        setApartment(data.apartment);
      } catch (error) {
        console.error("Error fetching apartment:", error);
      }
    }
    console.log(loggedInUser)
    if (id) {
      fetchApartment();
    }
  }, [id]);

  if (!apartment) {
    return <div>Loading...</div>;
  }

  async function showUser() {

    try {
      const this_sso_id = apartment?.user?.sso_id
      const response = await fetch(`http://localhost:3001/api/get-user/${this_sso_id}`, {

        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) throw new Error('Failed to fetch user information');
      const data: User = await response.json();
      setUser(data.user)
      setShowUserModal(true);
    } catch (error) {
      console.error("Error fetching user:", error)
    }

  }

  async function leaveReview() {
    const loggedInSSOId = loggedInUser?.user?.email.split("@")[0];
    const this_sso_id = apartment?.user?.sso_id
    if (!loggedInSSOId || !this_sso_id || liked === null) return;

    const data = {
      reviewer_id: loggedInSSOId,
      liked,
      content: reviewText,
    };

    try {
      const response = await fetch(`http://localhost:3001/api/get-user/${this_sso_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error ("Failed to submit review")

      setShowReviewModal(false);
      setReviewText("");
      setLiked(null);
      alert("Reivew submitted");
    } catch (error) {
      console.error("Error submitting review:", error)
    }
  }


  return (
    <main className="w-min-screen">
      <div className="flex flex-row w-screen px-16 gap-8">
        {/* Bildsektion */}
        <div className="w-2/3">
          <Image
            src={"/images/apartment2.jpg"}
            alt={apartment.title}
            width={500}
            height={300}
            className="object-cover w-full h-full rounded-lg overflow-hidden"
            style={{ height: "100%" }}
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
                      <div>
                        {apartment.available_from
                          ? new Date(apartment.available_from).toISOString().split("T")[0]
                          : "Not specified"}
                      </div>
                    </div>
                  </div>
                </div>
  
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full overflow-hidden">
                    <img
                      src={"/images/apartment2.jpg"} // Replace with real profile picture
                      alt={apartment.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium">{apartment.user?.name}</div>
                    <div className="text-sm text-muted-foreground">Student at {"liu"}</div>
                    <div className="text-xs">{apartment.address}</div>
                  </div>
  
                  <button
                    onClick={showUser}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm"
                  >
                    View profile
                  </button>
  
                  {loggedInUser?.user?.email.split("@")[0] === apartment.user?.sso_id && (
                    <>
                      <button
                        onClick={() => console.log("Edit clicked")}
                        className="px-3 py-2 bg-yellow-400 text-black rounded-md shadow-sm hover:bg-yellow-500"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => console.log("Delete clicked")}
                        className="px-3 py-2 bg-red-600 text-white rounded-md shadow-sm hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
  
                <div>
                  <strong>Description:</strong> {apartment.description || "No description available"}
                </div>
                <Button
                  className="w-full"
                  onClick={() => {
                    window.location.href = `mailto:${apartment.user?.email}?subject=LiuHome - Hyra lägenhet&body=Hej, jag är intresserad av att hyra din lägenhet.` 
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
            <div className="space-y-">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Studies:</strong> {user.program}</p>
              <p><strong>Year:</strong> {user.year}</p>
              <p><strong>Bio:</strong> {user.bio}</p>


            </div>
            <button
              onClick={() => setShowReviewModal(true)}
              className="absolute bottom-4 right-4 bg-blue-600 text-white"
            >
              Leave a review
            </button>
            {/* <h2 className="text-xl font-semibold mb-4">User Profile</h2> */}
            <div className="space-y-"></div>
          </div>
        </div>
      )}

      {showReviewModal && user && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-[600px] h-[300px] relative">
          <h2 className="text-xl font-semibold mb-4">Leave a review</h2>
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => setShowReviewModal(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>
            <Button
              onClick={() => setLiked(true)}
              className={liked === true ? "bg-green-600 text-white" : ""}
            >
              👍 Like
            </Button>  
            <Button
              onClick={() => setLiked(false)}
              className={liked === false ? "bg-red-600 text-white" : ""}
            >
              👎 Dislike
            </Button>
          </div>
          
          <textarea className="w-full border rounded p-2" rows={4} placeholder="Add a description" value={reviewText} onChange={(e) => setReviewText(e.target.value)} />

          <button
            onClick={leaveReview}
            className="absolute bottom-4 right-4 bg-blue-600 text-white"
          >
              Publish review
          </button>
          </div>
        </div>
      )}
    </main>
  );
}