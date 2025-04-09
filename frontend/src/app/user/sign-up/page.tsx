"use client"

import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function SignUpPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    try {
      const response = await axios.post("http://localhost:3001/sign-up", {
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        password: form.password,
      })

      if (response.data.message === "user created successfully") {
        router.push("/user/login") // Eller startsida, beroende på flow
      } else {
        setError(response.data.error || "Registration failed")
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Something went wrong")
    }
  }

  return (
    <div className="flex flex-col h-screen gap-8 pb-32 justify-center items-center w-full">

    <img
      src={"/images/liu-logga.png"}
      alt={"YOOOOOO"}
      className="w-1/4"
    />
    <div className="w-full flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input placeholder="First name" name="first_name" value={form.first_name} onChange={handleChange} required />
            <Input placeholder="Last name" name="last_name" value={form.last_name} onChange={handleChange} required />
            <Input placeholder="Email" name="email" value={form.email} onChange={handleChange} type="email" required />
            <Input placeholder="Password" name="password" value={form.password} onChange={handleChange} type="password" required />
            <Input placeholder="Confirm Password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} type="password" required />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button type="submit" className="w-full">Create Account</Button>
          </form>

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link href="/user/login" className="text-blue-500 underline">Log in</Link>
          </p>
        </CardContent>
      </Card>
    </div>
    </div>
  )
}
