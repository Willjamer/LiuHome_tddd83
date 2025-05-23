"use client";

import { useEffect, useState, createContext, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { House } from "lucide-react"

export const UserContext = createContext<any>(null);
export const useUser = () => useContext(UserContext)


export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState({
    sso_id: "",
    email: "",
    name: "",
    profile_picture: "",
    program: "",
    year: "",
    bio: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const ssoId = localStorage.getItem("sso_id");

    if (!token || !ssoId) {
      router.push("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        console.log(ssoId)
        const response = await axios.get("http://localhost:3001/api/get-user-profile", {
          params: { sso_id: ssoId },
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.data && response.data.user) {
          setProfile(response.data.user);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    axios
      .post("http://localhost:3001/api/update-user-profile", profile, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUpdateMessage("Profile updated successfully!");
      })
      .catch((err) => {
        setError("Failed to update profile");
      });
  };

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
    <UserContext.Provider value = {{ user: profile, setUser: setProfile}}>
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
              src = {"/images/Icon.png"}
              alt = {"user icon"}
              className = "h-20 mx-auto mb-4 rounded-full border-1 border-black bg-gray-100 hover:bg-gray-300 transition-colors duration-200 ease-in-out"
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
          </CardContent>
        </Card>
      </div>
    </div>
    </UserContext.Provider>
    
  );
}
