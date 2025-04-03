"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState({
    sso_id: "",
    email: "",
    first_name: "",
    last_name: "",
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
    router.push("/user/login");
  };

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Button onClick={handleLogout} className="self-end mb-4" variant="outline">
        Log Out
      </Button>
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4">User Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="First Name"
              name="first_name"
              value={profile.first_name}
              onChange={handleChange}
              required
            />
            <Input
              placeholder="Last Name"
              name="last_name"
              value={profile.last_name}
              onChange={handleChange}
              required
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
              placeholder="Profile Picture URL"
              name="profile_picture"
              value={profile.profile_picture}
              onChange={handleChange}
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
            <Button type="submit">Update Profile</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
