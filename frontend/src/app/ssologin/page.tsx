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
  logout: () => void;
}>({
  user: null,
  setUser: () => {},
  logout: () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/api/check-session", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        } else {
          const storedUser = localStorage.getItem("mockUser");
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const logout = () => {
    fetch("http://localhost:3001/logout", {
      method: "POST",
      credentials: "include",
    }).then(() => {
      localStorage.removeItem("mockUser");
      setUser(null);
    });
  };

  if (loading) return <div>Loading...</div>; // Optional: remove flicker

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default function LoginPage() {
  const { user, setUser, logout } = useUser();
  // const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("login") === "success") {
      window.history.replaceState({}, document.title, "/");
    }
  }, []);

  const handleLogin = () => {
    window.location.href = "http://localhost:3001/login";
  };

  const handleMockLogin = () => {
    const mockUser = {
      id: "12345",
      email: "jonbi173@student.liu.se",
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
      body: JSON.stringify(mockUser),
    });
  };

  // const handleLogout = () => {
  //   fetch("http://localhost:3001/logout", {
  //     method: "POST",
  //     credentials: "include",
  //   }).then(() => {
  //     localStorage.removeItem("mockUser");
  //     setUser(null);
  //   });
  // };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Login Page</h1>
      {user ? (
        <div>
          <p>Welcome, {user.name}!</p>
          <button
            onClick={logout}
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
