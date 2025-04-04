"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {House} from "lucide-react"
import { useUser } from "@/app/ssologin/page"

export default function Header() {

  const { user } = useUser();
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
            <Link href="/swish" className="text-sm font-medium hover:underline underline-offset-4">
              Swish
            </Link>
          </nav>
          <div className="flex items-center gap-4 w-1/3 justify-center">
            <Link href="/list-apartment">
              <Button variant="outline" size="sm">
                List Your Place
              </Button>
            </Link>
            {!user ? (
              <>
                <Link href="/login">
                  <Button size="sm">Sign In</Button>
                </Link>
                <Link href="/ssologin">
                  <Button size="sm">Sign In SSO</Button>
                </Link>
              </>
            ) : (
              <div className="text-sm text-muted-foreground">
                Welcome, {user.first_name || user.name}!
              </div>
            )}
          </div>
        </div>
      </header>
    );
  }
  