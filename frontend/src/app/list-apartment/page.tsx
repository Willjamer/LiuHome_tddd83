"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlignJustify, Calendar, Home, House, MapPin, Maximize, SquareUser } from "lucide-react";
import { Textarea } from "@/components/ui/textarea"; // Adjusted path to match the correct location
import { DollarSign } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function AddApartmentPage() {
  const router = useRouter();
  const [apartment, setApartment] = useState({
    title: "",
    description: "",
    address: "",
    size: 0,
    number_of_rooms: 0,
    area: "", // Bytt från location till area
    rent_amount: 0,
    is_available: true,
    available_from: "",
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPaymentSuccessVisible, setIsPaymentSuccessVisible] = useState(false);
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvc, setCvc] = useState("");
  const [expirationDate, setExpirationDate] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setApartment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isFormValid = () => {
    return (
      apartment.title.trim() !== "" &&
      apartment.description.trim() !== "" &&
      apartment.address.trim() !== "" &&
      apartment.size > 0 &&
      apartment.number_of_rooms > 0 &&
      apartment.area.trim() !== "" &&
      apartment.rent_amount > 0 &&
      apartment.available_from.trim() !== ""
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const sso_id = localStorage.getItem("sso_id");

    const payload = {
      sso_id,
      apartment,
      payment: {
        name,
        cardNumber: cardNumber.replace(/\s/g, ""),
        cvc,
        expirationDate,
      },
    };
    console.log("Submitting:", payload);

    try {
      const response = await fetch("http://localhost:3001/api/add-apartment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to add apartment");

      const result = await response.json();
      console.log("Apartment added:", result);

      // Visa framgångsmeddelande
      setIsPaymentSuccessVisible(true);
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col w-full">
     
      {/* Main Content - Redesigned Form */}
      <main className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <Card className="max-w-3xl mx-auto shadow-lg border-0 rounded-xl overflow-hidden">
          <CardHeader className="bg-gray-100 text-black p-8"> {/* Ändrad bakgrund och textfärg */}
            <CardTitle className="text-3xl font-bold flex items-center gap-2 text-black"> {/* Ändrad textfärg */}
              <Home className="h-7 w-7 text-black" /> {/* Ändrad ikonfärg */}
              List Your Apartment
            </CardTitle>
            <CardDescription className="text-gray-700 mt-2"> {/* Ändrad textfärg */}
            Please make sure to fill out all fields in the form below. All fields are required for listing your apartment.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-8">
            <form id="apartmentForm" className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <AlignJustify className="h-4 w-4 text-blue-600" />
                    Title
                  </label>
                  <Input
                    type="text"
                    name="title"
                    value={apartment.title}
                    onChange={handleChange}
                    placeholder="Enter the title of your apartment"
                    className="focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <AlignJustify className="h-4 w-4 text-blue-600" />
                    Description
                  </label>
                  <Textarea
                    name="description"
                    value={apartment.description}
                    onChange={handleChange}
                    placeholder="Describe your apartment"
                    className="resize-none h-32 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    Address
                  </label>
                  <Input
                    type="text"
                    name="address"
                    value={apartment.address}
                    onChange={handleChange}
                    placeholder="Enter the address"
                    className="focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Maximize className="h-4 w-4 text-blue-600" />
                      Size (sqm)
                    </label>
                    <Input
                      type="number"
                      name="size"
                      value={apartment.size}
                      onChange={handleChange}
                      placeholder="Enter the size"
                      className="focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <SquareUser className="h-4 w-4 text-blue-600" />
                      Number of Rooms
                    </label>
                    <Input
                      type="number"
                      name="number_of_rooms"
                      value={apartment.number_of_rooms}
                      onChange={handleChange}
                      placeholder="Enter the number of rooms"
                      className="focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    Area
                  </label>
                  <select
                    name="area"
                    value={apartment.area}
                    onChange={handleChange}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="" disabled>
                      Select an area
                    </option>
                    <option value="Ryd">Ryd</option>
                    <option value="Colonia">Colonia</option>
                    <option value="Valla">Valla</option>
                    <option value="Lambohov">Lambohov</option>
                    <option value="T1">T1</option>
                    <option value="Irrblosset">Irrblosset</option>
                    <option value="Vallastaden">Vallastaden</option>
                    <option value="Ebbepark">Ebbepark</option>
                    <option value="Gottfridsberg">Gottfridsberg</option>  
                    <option value="Skäggetorp">Skäggetorp</option>
                    <option value="Berga">Berga</option>
                    <option value="Flamman">Flamman</option>
                    <option value="Fjärilen">Fjärilen</option>
                    <option value="City">City</option>
                  
                  </select>
                </div>
                
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <DollarSign className="h-4 w-4 text-blue-600" />
                    Rent Amount (SEK/month)
                  </label>
                  <Input
                    type="number"
                    name="rent_amount"
                    value={apartment.rent_amount}
                    onChange={handleChange}
                    placeholder="Enter the rent amount"
                    className="focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    Available From
                  </label>
                  <Input
                    type="date"
                    name="available_from"
                    value={apartment.available_from}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]} // Sätter dagens datum som minsta tillåtna datum
                    className="focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div className="pt-4">
                <Button
                  type="button"
                  onClick={() => setIsModalVisible(true)}
                  className={`w-full py-3 rounded-lg transition-all duration-200 font-medium text-lg shadow-md ${
                    isFormValid() ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-400 text-gray-700 cursor-not-allowed"
                  }`}
                  disabled={!isFormValid()}
                >
                  {isFormValid() ? "List Apartment - 10 SEK" : "Please fill in all required information above"}
                </Button>
                <p className="text-xs text-center text-gray-500 mt-4">
                  By submitting this form, you agree to our terms and conditions for apartment listings
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
      </div>
  );
}