"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:3001/login", {
        email: form.email,
        password: form.password,
      });

      if (response.data.access_token) {
       
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("sso_id", response.data.sso_id)
        window.dispatchEvent(new Event('authChanged'));

        
        router.push("/");
        router.refresh();
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col h-screen gap-8 pb-32 justify-center items-center w-full">

      <img
        src={"/images/liu-logga.png"}
        alt={"YOOOOOO"}
        className="w-1/4"
      />


      <div className="flex items-center justify-center px-2 w-full ">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Log In</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                required
              />
              <Input
                placeholder="Password"
                name="password"
                value={form.password}
                onChange={handleChange}
                type="password"
                required
              />

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <Button type="submit" className="w-full">
                Log In
              </Button>
            </form>

            <p className="text-sm text-center mt-4">
              Don't have an account?{" "}
              <Link href="/user/sign-up" className="text-blue-500 underline">
                Sign Up
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>

  );
}
