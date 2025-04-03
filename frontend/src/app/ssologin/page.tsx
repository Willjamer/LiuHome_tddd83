"use client";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    fetch("/api/check-session")
      .then(response => response.json())
      .then(data => {
        if (data.user) {
          setUser(data.user);
        }
      });
  }, []);

  const handleLogin = () => {
    window.location.href = "http://localhost:3001/login";
  };

  const handleLogout = () => {
    fetch("http://localhost:3001/logout", {
      method: "POST",
      credentials: "include"
    }).then(() => {
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
        <button
          onClick={handleLogin}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm"
        >
          Login with Microsoft
        </button>
      )}
    </div>
  );
}
