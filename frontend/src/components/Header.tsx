"use client";

import { useState, useEffect } from "react";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {House} from "lucide-react"

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);
  }, []);

    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 ">
        <div className="flex h-16 items-center justify-between px-4 ">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl w-1/3 justify-center">
            <House className="h-5 w-5" />
            <span>liuHome</span>
          </Link>
          <nav className="hidden md:flex gap-6 w-1/3 justify-center">
            <Link href="/browse" className="text-sm font-medium hover:underline underline-offset-4">
              Browse
            </Link>
            <Link href="/how-it-works" className="text-sm font-medium hover:underline underline-offset-4">
              How It Works
            </Link>
            <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-4 w-1/3 justify-center">
            <Link href="/list-apartment">
              <Button variant="outline" size="sm">
                List Your Place
              </Button>
            </Link>
            {isLoggedIn ? (
            <Link href="/user/my-pages">
              <Button size="sm">My Pages</Button>
            </Link>
          ) : (
            <Link href="/user/login">
              <Button size="sm">Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
  