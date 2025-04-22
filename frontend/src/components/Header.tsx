
"use client"


import Link from "next/link"
import { Button } from "@/components/ui/button"
import { House } from "lucide-react"

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("access_token");
      setIsLoggedIn(!!token);
    };

    checkAuth(); 
    window.addEventListener("authChanged", checkAuth);

    return () => {
      window.removeEventListener("authChanged", checkAuth);
    };
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

          {user ? (
            <>
              <Link href="/list-apartment">
                <Button variant="outline" size="sm">
                  List Your Place
                </Button>
              </Link>
              <Link href="/user">
                <Button size="sm">My Pages</Button>
              </Link>
              <Button
                onClick={logout}
                variant="ghost"
                size="sm"
                className="text-xs text-red-600 hover:text-red-700"
              >
                Logout
              </Button>
            </>

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
