"use client";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CheckCircle, Home } from "react-feather"; //npm install react-feather

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

interface PaymentSuccessProps {
  onClose: () => void;
  isApartment?: boolean;
}

const PaymentSuccess = ({ onClose, isApartment = false }: PaymentSuccessProps) => {
  return (
    <div className="text-center py-6">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4" >
        <span className="text-green-500 text-4xl">success</span>
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        {isApartment ? "Lägenhet tillagd!" : "Betalning godkänd!"}
      </h3>
      
      <button
        onClick={onClose}
        className=" bg-gray-200 text-gray-800 px-4 py-2 rounded-md shadow-sm"
      >
        {isApartment ? (
          <>
            <Home className="w-6 h-6 -ml-1 mr-2" />
            Back to homepage
          </>
        ) : ( 
          "Close"
        )}
      </button>
    </div>
  );
};

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

  const [isModalVisible, setIsModalVisible] = useState(false); // State för modalens synlighet
  const [isPaymentSuccessVisible, setIsPaymentSuccessVisible] = useState(false); // Nytt state
  const [name, setName] = useState(""); // State för namn
  const [cardNumber, setCardNumber] = useState(""); // State för kortnummer
  const [cvc, setCvc] = useState(""); // State för CVC
  const [expirationDate, setExpirationDate] = useState(""); // State för utgångsdatum

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
      <form
        id="apartmentForm" // Lägg till ett ID för att referera till formuläret
        onSubmit={handleSubmit}
        className="space-y-4"
      >
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
        <button
          type="button"
          onClick={() => {
            const form = document.getElementById("apartmentForm") as HTMLFormElement;
            if (form.checkValidity()) {
              setIsModalVisible(true); // Öppna modalen om formuläret är giltigt
            } else {
              form.reportValidity(); // Visa valideringsfel
            }
          }}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md shadow-sm"
        >
          Pay and Add Apartment
        </button>
      </form>
      {isModalVisible && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-md w-1/3">
            <h2 className="text-2xl font-bold mb-4">Payment Information</h2>
            <p className="text-sm text-gray-600 mb-4">
              Please enter your payment information to complete the listing.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log("Name submitted:", name);
                console.log("Card Number:", cardNumber);
                console.log("CVC:", cvc);
                console.log("Expiration Date:", expirationDate);

                
                handleSubmit(e);

              
                setIsModalVisible(false);
                setIsPaymentSuccessVisible(true); // Visa PaymentSuccess
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)} // Uppdatera namn
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">CVC</label>
                <input
                  type="text"
                  name="cvc"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Expiration Date</label>
                <input
                  type="text"
                  name="expirationDate"
                  placeholder="MM/YY"
                  value={expirationDate}
                  onChange={(e) => setExpirationDate(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <button
                type="submit"
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm"
              >
                Submit Payment
              </button>
              <button
                type="button"
                onClick={() => setIsModalVisible(false)} // Stäng modalen
                className="mt-4 px-4 py-2 bg-gray-400 text-white rounded-md shadow-sm"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
      {isPaymentSuccessVisible && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-md w-1/3">
            <PaymentSuccess
              onClose={() => setIsPaymentSuccessVisible(false)} // Stäng PaymentSuccess
              isApartment={true} // Visa meddelande för lägenhet
            />
          </div>
        </div>
      )}
    </div>
  );
}