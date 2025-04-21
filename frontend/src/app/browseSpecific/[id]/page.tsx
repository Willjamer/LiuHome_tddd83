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
  recieved_reviews: Review[];
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
  liked: boolean;
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

      console.log(data.user.recieved_reviews)
      setUser(data.user)
      setShowUserModal(true);
      
      const recieved_reviews : Review[] = data.user.recieved_reviews;
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
                  {/* <Badge className="bg-green-500 text-white text-sm px-2 py-1">Verified Student</Badge> */}
                    <Badge 
                      className="gl-button btn btn-block btn-md btn-default gl-mt-5 gl-px-4 gl-text-center gl-display-flex gl-flex-direction-column gl-gap-2"
                      style={{
                        backgroundColor: '#54d8e0',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '11pt',            
                        borderRadius: '10px',          
                        border: '1.5px solid #d3d3d3', 
                        padding: '6px 14px',           
                      }}
                    >
                      <span className="gl-button-text">Verified</span>
                    </Badge>
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
                    {/* <div className="text-sm text-muted-foreground">Student at {"LiU"}</div> */}
                    {/* <div className="text-xs">{apartment.address}</div> */}
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
                {/* <div>
                  <strong>Description:</strong> {apartment.description || "No description available"}
                </div> */}

                
                {/* <Button
                  className="w-full"
                  onClick={() => {
                    window.location.href = `mailto:${apartment.user?.email}?subject=LiuHome - Hyra lägenhet&body=Hej, jag är intresserad av att hyra din lägenhet.` 
                  }}
                >
                  Send email
                </Button> */}
                
                <Button
                  className="w-full"
                  onClick={() => {
                    const email = apartment.user?.email;
                    const subject = encodeURIComponent("LiuHome - Hyra lägenhet");
                    const body = encodeURIComponent("Hej, jag är intresserad av att hyra din lägenhet.");
                    const outlookUrl = `https://outlook.office.com/mail/deeplink/compose?to=${email}&subject=${subject}&body=${body}`;
                    window.open(outlookUrl, "_blank");
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-[600px] h-[600px] relative flex flex-col">
            {/* Close Button */}
            <button
              onClick={() => setShowUserModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black text-xl"
              aria-label="Close modal"
            >
              ✕
            </button>

            {/* User Info (non-scrollable) */}
            <div className="mb-4">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src="/images/Icon.png"
                  alt="User Icon"
                  className="w-16 h-16 rounded-full border border-gray-300"
                />
                <div>
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  <p className="text-gray-500 text-sm">{user.email}</p>
                </div>
              </div>
              <p>
                <strong className="text-gray-900">Studies:</strong> {user.program}
              </p>
              <p>
                <strong className="text-gray-900">Year:</strong> {user.year}
              </p>
              <div>
                <strong className="text-gray-900">Bio:</strong>
                <p className="mt-1 text-sm text-gray-600 whitespace-pre-line">
                  {user.bio || "No bio provided."}
                </p>
              </div>
            </div>

            {/* Scrollable Reviews */}
            <div className="flex-1 overflow-y-auto pr-2">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Reviews</h3>
              {user.recieved_reviews.length === 0 ? (
                <p className="text-sm text-gray-500">No reviews yet.</p>
              ) : (
                <div className="space-y-4">
                  {user.recieved_reviews.map((review, index) => (
                    <div key={index} className="border rounded-lg p-4 shadow-sm bg-gray-50">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-900">{review.reviewer.name}</span>
                        <span className={`text-sm font-medium ${review.liked ? "text-green-600" : "text-red-600"}`}>
                          {review.liked ? "Approved 👍" : "Disapproved 👎"}
                        </span>
                      </div>
                      {review.content && (
                        <p className="text-sm text-gray-700 mb-1">{review.content}</p>
                      )}
                      <p className="text-xs text-gray-400">
                        {new Date(review.review_date).toLocaleDateString("sv-SE", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Right Button */}
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowReviewModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors duration-200"
              >
                Leave a Review
              </button>
            </div>
          </div>
        </div>
      )}
      {showReviewModal && user && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-xl relative">
            <button
              onClick={() => setShowReviewModal(false)}
              className="absolute top-3 right-4 text-gray-400 hover:text-black text-xl"
              aria-label="Close modal"
            >
              ✕
            </button>
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Leave {user.name.split(' ')} a Review!</h2>
            <div className="flex justify-center gap-6 mb-4">
              <Button
                onClick={() => setLiked(true)}
                className={`px-6 py-2 rounded-md transition-all ${
                  liked === true
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-green-100"
                }`}
              >
                👍 Approve
              </Button>
              <Button
                onClick={() => setLiked(false)}
                className={`px-6 py-2 rounded-md transition-all ${
                  liked === false
                    ? "bg-red-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-red-100"
                }`}
              >
                👎 Disapprove
              </Button>
            </div>
            <textarea
              className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              rows={4}
              placeholder="Write a short message about your experience..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={leaveReview}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-md transition duration-200"
              >
                Publish Review
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}