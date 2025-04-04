"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/router";

type User = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  name: string;
} | null;

const UserContext = createContext<{
  user: User;
  setUser: (user: User) => void;
}>({
  user: null,
  setUser: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export default function LoginPage() {
  const { user, setUser } = useUser(); 

  useEffect(() => {
    const storedUser = localStorage.getItem("mockUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("login") === "success") {
      window.history.replaceState({}, document.title, "/");

      fetch("/api/check-session", { credentials: "include" })
        .then(response => response.json())
        .then(data => {
          if (data.user) {
            setUser(data.user);
          }
        });
    }
  }, [setUser]);

  const handleLogin = () => {
    window.location.href = "http://localhost:3001/login";
  };

  const handleMockLogin = () => {
    const mockUser = {
      id: "12345",
      email: "jonbi171@student.liu.se",
      first_name: "Jonatan",
      last_name: "Billger",
      name: "Jonatan Billger",
    };

    localStorage.setItem("mockUser", JSON.stringify(mockUser));

    setUser(mockUser);

    fetch("http://localhost:3001/mock-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ user: mockUser }),
    });
  };

  const handleLogout = () => {
    fetch("http://localhost:3001/logout", {
      method: "POST",
      credentials: "include",
    }).then(() => {
      localStorage.removeItem("mockUser")
      setUser(null);
    });
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Login Page</h1>
      {user ? (
        <div>
          <p>Welcome, {user.name}!</p>
          <button
            onClick={handleLogout}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md shadow-sm"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <button
            onClick={handleLogin}
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm"
          >
            Login with Microsoft
          </button>
          <button
            onClick={handleMockLogin}
            className="px-4 py-2 bg-gray-500 text-white rounded-md shadow-sm"
          >
            Use Mock Login
          </button>
        </div>
      )}
    </div>
  );
}
