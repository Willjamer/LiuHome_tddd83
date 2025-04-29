"use client";

import { useEffect, useState, createContext, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { House } from "lucide-react"
import { useUser } from "../ssologin/page";


export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>({
    sso_id: "",
    email: "",
    name: "",
    profile_picture: "",
    program: "",
    year: "",
    bio: "",
    apartment: null,
    created_reviews: [],
    recieved_reviews: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");
  const user = useUser().user;
  const ssoId = user?.email.split("@")[0];
  useEffect(() => {


    console.log(user)
    console.log(user?.id)
    if (!ssoId) {
      router.push("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        console.log(ssoId)
        const response = await fetch(`http://localhost:3001/api/get-user/${ssoId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (!response.ok) throw new Error('Failed to fetch user information');
        const data = await response.json();

        console.log(data)
        if (response && data) {
          setProfile(data.user);
        } else {
          setError("Could not load profile data");
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/get-user/${ssoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(profile)
      });

      if (response.ok) {
        setUpdateMessage("Profile updated successfully!");
      }
    } catch (error) {
      setError("Failed to update profile");
    }
  }
  //   const handleSubmit = (e: React.FormEvent) => {
  //     try {
  //         const response = await 
  //     }
  //     e.preventDefault();
  //     const token = localStorage.getItem("access_token");
  //     axios
  //       .post("http://localhost:3001/api/update-user-profile", profile, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       })
  //       .then((response) => {
  //         setUpdateMessage("Profile updated successfully!");
  //       })
  //       .catch((err) => {
  //         setError("Failed to update profile");
  //       });
  //   };

  // Log Out
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("sso_id");
    window.dispatchEvent(new Event('authChanged'));
    router.push("/user/login");
  };

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    // <UserContext.Provider value = {{ user: profile, setUser: setProfile}}>
    <div className="flex flex-col h-screen gap-8 pb-32 justify-center items-center w-full">
      <img
        src={"/images/liu-logga.png"}
        alt={"YOOOOOO"}
        className="w-1/4"
      />

      <div className=" flex flex-col items-center justify-center w-full ">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <img
              src={"/images/Icon.png"}
              alt={"user icon"}
              className="h-20 mx-auto mb-4 rounded-full border-1 border-black bg-gray-100 hover:bg-gray-300 transition-colors duration-200 ease-in-out"
            />
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Name"
                name="name"
                value={profile.name}
                onChange={handleChange}
                required
                disabled
              />
              <Input
                placeholder="Email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                type="email"
                required
                disabled
              />
              <Input
                placeholder="Program"
                name="program"
                value={profile.program}
                onChange={handleChange}
              />
              <Input
                placeholder="Year"
                name="year"
                value={profile.year}
                onChange={handleChange}
                type="number"
                min="1"
                max="7"
              />
              <textarea
                name="bio"
                placeholder="Bio"
                value={profile.bio}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              {updateMessage && <p className="text-green-500">{updateMessage}</p>}
              {error && <p className="text-red-500">{error}</p>}
              <div className="flex flex-row justify-between pt-4">
                <Button type="submit">Update Profile</Button>
                <Button onClick={handleLogout} className="self-end mb-4" variant="outline">
                  Log Out
                </Button>
              </div>

            </form>

            {/* Created Reviews */}
            <div className="w-full max-w-md mt-8">
              <h2 className="text-xl font-bold mb-2">Created Reviews</h2>
              {profile.created_reviews.length === 0 ? (
                <p className="text-gray-500">You haven't written any reviews yet.</p>
              ) : (
                profile.created_reviews.map((review: any) => (
                  <Card key={review.review_id} className="mb-2">
                    <CardContent className="p-4">
                      <p className="font-semibold text-sm text-gray-600">To: {review.reviewed_user?.name || review.reviewed_sso_id}</p>
                      <p className="text-sm">{review.content}</p>
                      <p className="text-xs text-gray-400">{new Date(review.review_date).toLocaleDateString()}</p>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {/* Received Reviews */}
            <div className="w-full max-w-md mt-8">
              <h2 className="text-xl font-bold mb-2">Received Reviews</h2>
              {profile.recieved_reviews.length === 0 ? (
                <p className="text-gray-500">You haven't received any reviews yet.</p>
              ) : (
                profile.recieved_reviews.map((review: any) => (
                  <Card key={review.review_id} className="mb-2">
                    <CardContent className="p-4">
                      <p className="font-semibold text-sm text-gray-600">From: {review.reviewer?.name || review.reviewer_sso_id}</p>
                      <p className="text-sm">{review.content}</p>
                      <p className="text-xs text-gray-400">{new Date(review.review_date).toLocaleDateString()}</p>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
            {/* ----------  My Listings  ---------- */}
            <div className="w-full max-w-md mt-8">
              <h2 className="text-xl font-bold mb-2">My Listings</h2>

              {!profile.apartment ? (
                <p className="text-gray-500">You have no current listings.</p>
              ) : (
                <Card>
                  <CardContent className="flex gap-4 p-4">
                    <House className="w-10 h-10 shrink-0" />
                    <div>
                      <p className="font-semibold">{profile.apartment.title}</p>
                      <p>{profile.apartment.address}</p>
                      <p className="text-sm">
                        {profile.apartment.size} m² • {profile.apartment.number_of_rooms} rum
                      </p>
                      <p className="font-medium">
                        {profile.apartment.rent_amount} kr/mån
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
            {/* ----------  slut  My Listings  ---------- */}


          </CardContent>
        </Card>
      </div>
    </div>
    // </UserContext.Provider>

  );
}