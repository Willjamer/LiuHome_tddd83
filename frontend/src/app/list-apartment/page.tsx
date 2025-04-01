"use client";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Apartment {
  apartment_id: number;      
  user_id: number;           
  title: string;
  description?: string;      
  address: string;
  size: number;
  number_of_rooms: number;
  location: string;
  rent_amount: number;
  is_available: boolean;     
  available_from?: string;  
}

export default function AddApartmentPage() {
  const [apartment, setApartment] = useState<Partial<Apartment>>({
    apartment_id: 0,
    user_id: 0,
    title: "",
    description: "",
    address: "",
    size: 0,
    number_of_rooms: 0,
    location: "",
    rent_amount: 0,
    is_available: true,
    available_from: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setApartment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (date: Date) => {
    setApartment(prev => ({
      ...prev,
      available_from: date.toISOString()
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/add-apartment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(apartment)
      });

      if (!response.ok) throw new Error("Failed to add apartment");

      const result = await response.json();
      console.log("Apartment added:", result);
      // Reset form or show success message
    } catch (error) {
      console.error("Error:", error);
      // Show error message
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Add New Apartment</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">(Temp) Apartment ID</label>
          <input
            type="number"
            name="apartment_id"
            value={apartment.apartment_id}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
          <div>
          <label className="block text-sm font-medium text-gray-700">(Temp) User ID</label>
          <input
            type="number"
            name="user_id"
            value={apartment.user_id}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={apartment.title}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={apartment.description}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={apartment.address}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Size (sqm)</label>
          <input
            type="number"
            name="size"
            value={apartment.size}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Number of Rooms</label>
          <input
            type="number"
            name="number_of_rooms"
            value={apartment.number_of_rooms}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={apartment.location}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Rent Amount (SEK/month)</label>
          <input
            type="number"
            name="rent_amount"
            value={apartment.rent_amount}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Available From</label>
          <DatePicker
            selected={apartment.available_from ? new Date(apartment.available_from) : null}
            onChange={handleDateChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            dateFormat="yyyy-MM-dd"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Is Available</label>
          <input
            type="checkbox"
            name="is_available"
            checked={apartment.is_available}
            onChange={(e) => setApartment(prev => ({ ...prev, is_available: e.target.checked }))}
            className="mt-1"
          />
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm"
        >
          Add Apartment
        </button>
      </form>
    </div>
  );
}