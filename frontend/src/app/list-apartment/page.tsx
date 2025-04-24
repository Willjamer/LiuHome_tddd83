"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlignJustify,
  Calendar,
  Home,
  House,
  MapPin,
  Maximize,
  SquareUser,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea"; // Adjusted path to match the correct location
import { DollarSign } from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { useUser } from "../ssologin/page";

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
    available_to: "",
  });

  const [payer, setPayer] = useState("");
  const amount = 10;
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [originalPaymentReference, setOriginalPaymentReference] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [paid, setPaid] = useState(false);

  const [showForm, setShowForm] = useState(true);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPaymentSuccessVisible, setIsPaymentSuccessVisible] = useState(false);
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvc, setCvc] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const loggedInUser = useUser();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setApartment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateStatus = (msg: string) => {
    setStatus(`${msg}`);
  };

  useEffect(() => {
    if (paid) {
      const timeout = setTimeout(() => {
        router.push("/"); // Redirect to main page
      }, 2000); // Wait 2 seconds
      return () => clearTimeout(timeout); // Cleanup
    }
  }, [paid, router]);

  const isFormValid = () => {
    return (
      apartment.description.trim() !== "" &&
      apartment.address.trim() !== "" &&
      apartment.size > 0 &&
      apartment.number_of_rooms > 0 &&
      apartment.area.trim() !== "" &&
      apartment.rent_amount > 0 &&
      apartment.available_from.trim() !== "" &&
      apartment.available_to.trim() !== ""

    );
  };

  const handlePaymentAndSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Step 1: Validate payer information
    if (!payer || !payer.startsWith("46")) {
      updateStatus(
        !payer ? "Payer is required" : "Telefonnummer ska börja med 46"
      );
      return;
    }

    // Step 2: Create a payment request

    try {
      const paymentRes = await fetch(
        "http://localhost:3001/api/paymentrequests",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ payerAlias: payer, amount, message }),
        }
      );

      if (paymentRes.status !== 201) {
        updateStatus(`Payment request failure: ${paymentRes.statusText}`);
        return;
      }

      const paymentJson = await paymentRes.json();
      setIdentifier(paymentJson.id);
      updateStatus(
        `Payment request created with identifier ${paymentJson.id}, open app.`
      );
      setIsLoading(true); // Start loading screen

      // Step 3: Polling for payment status
      const interval = setInterval(async () => {
        try {
          const statusRes = await fetch(
            `http://localhost:3001/api/payment-status/${paymentJson.id}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );

          const statusJson = await statusRes.json();

          if (statusJson.status === "PAID") {
            // Payment successful, proceed to submit apartment
            setOriginalPaymentReference(statusJson.paymentReference);
            setPaid(true);
            setIsLoading(false);
            updateStatus(
              `Payment (identifier: ${paymentJson.id}, paymentReference: ${statusJson.paymentReference}) PAID`
            );

            clearInterval(interval); // Clear polling interval

            // Step 4: Submit apartment details
            const sso_id = loggedInUser?.user?.email.split("@")[0];
            const payload = {
              sso_id,
              apartment,
            };

            try {
              const apartmentRes = await fetch(
                "http://localhost:3001/api/add-apartment",
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(payload),
                }
              );

              if (!apartmentRes.ok) throw new Error("Failed to add apartment");

              const result = await apartmentRes.json();
            } catch (error) {
              console.error("Apartment submission error:", error);
              alert("Something went wrong. Please try again.");
            }
          }
        } catch (error) {
          console.error("Polling error:", error);
        }
      }, 2000); // Poll every 2 seconds
    } catch (error) {
      console.error("Payment request failure:", error);
      updateStatus("Something went wrong with the payment request.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col w-full">
      {showForm ? (
        // Apartment Form
        <main className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <Card className="max-w-3xl mx-auto shadow-lg border-0 rounded-xl overflow-hidden">
            <CardHeader className="bg-gray-100 text-black p-8">
              <CardTitle className="text-3xl font-bold flex items-center gap-2 text-black">
                <Home className="h-7 w-7 text-black" />
                List Your Apartment
              </CardTitle>
              <CardDescription className="text-gray-700 mt-2">
                Please make sure to fill out all fields in the form below. All
                fields are required.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-8">
              <form id="apartmentForm" className="space-y-6">
                <div className="space-y-4">
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Size Input */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Maximize className="h-4 w-4 text-blue-600" />
                        Size (sqm)
                      </label>
                      <Input
                        type="number"
                        name="size"
                        value={apartment.size || ""} // Ingen autofill av 0
                        onChange={(e) => {
                          const value = e.target.value;
                          if (
                            value === "" ||
                            (!isNaN(parseInt(value, 10)) &&
                              parseInt(value, 10) >= 0)
                          ) {
                            handleChange(e);
                          }
                        }}
                        onKeyDown={(e) => {
                          // Tillåt endast siffror, Backspace, Delete, Tab, piltangenter
                          if (
                            !/^[0-9]$/.test(e.key) &&
                            e.key !== "Backspace" &&
                            e.key !== "Delete" &&
                            e.key !== "ArrowLeft" &&
                            e.key !== "ArrowRight" &&
                            e.key !== "Tab"
                          ) {
                            e.preventDefault();
                          }
                        }}
                        placeholder="Enter the size"
                        className="focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>

                    {/* Number of Rooms Input */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <SquareUser className="h-4 w-4 text-blue-600" />
                        Number of Rooms
                      </label>
                      <Input
                        type="number"
                        name="number_of_rooms"
                        value={apartment.number_of_rooms || ""} // Ingen autofill av 0
                        onChange={(e) => {
                          const value = e.target.value;
                          if (
                            value === "" ||
                            (!isNaN(parseInt(value, 10)) &&
                              parseInt(value, 10) >= 0)
                          ) {
                            handleChange(e);
                          }
                        }}
                        onKeyDown={(e) => {
                          // Tillåt endast siffror, Backspace, Delete, Tab, piltangenter
                          if (
                            !/^[0-9]$/.test(e.key) &&
                            e.key !== "Backspace" &&
                            e.key !== "Delete" &&
                            e.key !== "ArrowLeft" &&
                            e.key !== "ArrowRight" &&
                            e.key !== "Tab"
                          ) {
                            e.preventDefault();
                          }
                        }}
                        placeholder="Enter the number of rooms"
                        className="focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>

                  {/* Rent Amount Input */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <DollarSign className="h-4 w-4 text-blue-600" />
                      Rent Amount (SEK/month)
                    </label>
                    <Input
                      type="number"
                      name="rent_amount"
                      value={apartment.rent_amount || ""} // Ingen autofill av 0
                      onChange={(e) => {
                        const value = e.target.value;
                        if (
                          value === "" ||
                          (!isNaN(parseInt(value, 10)) &&
                            parseInt(value, 10) >= 0)
                        ) {
                          handleChange(e);
                        }
                      }}
                      onKeyDown={(e) => {
                        // Tillåt endast siffror, Backspace, Delete, Tab, piltangenter
                        if (
                          !/^[0-9]$/.test(e.key) &&
                          e.key !== "Backspace" &&
                          e.key !== "Delete" &&
                          e.key !== "ArrowLeft" &&
                          e.key !== "ArrowRight" &&
                          e.key !== "Tab"
                        ) {
                          e.preventDefault();
                        }
                      }}
                      placeholder="Enter the rent amount"
                      className="focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
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
                      <option value="Ebbe Park">Ebbe Park</option>
                      <option value="Gottfridsberg">Gottfridsberg</option>
                      <option value="Skäggetorp">Skäggetorp</option>
                      <option value="Berga">Berga</option>
                      <option value="Flamman">Flamman</option>
                      <option value="Fjärillen">Fjärillen</option>
                      <option value="City">City</option>
                    </select>
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
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      Available To
                    </label>
                    <Input
                      type="date"
                      name="available_to"
                      value={apartment.available_to}
                      onChange={handleChange}
                      min={apartment.available_from} // Sätter tillgängligt datum till som minst available_from
                      // min={new Date().toISOString().split("T")[0]} // Sätter dagens datum som minsta tillåtna datum
                      className="focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
                <div className="pt-4">
                  <Button
                    type="button"
                    onClick={() => setShowForm(false)} // 👈 switch to payment
                    className={`w-full py-3 rounded-lg transition-all duration-200 font-medium text-lg shadow-md ${
                      isFormValid()
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-400 text-gray-700 cursor-not-allowed"
                    }`}
                    disabled={!isFormValid()}
                  >
                    {isFormValid()
                      ? "List Apartment - 10 SEK"
                      : "Please fill in all required information above"}
                  </Button>
                  <p className="text-xs text-center text-gray-500 mt-4">
                    By submitting this form, you agree to our terms and
                    conditions
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </main>
      ) : (
        // Payment Form
        <div className="max-w-xl mx-auto mt-10 p-8 border-2 rounded-2xl shadow-sm relative">
          <h2 className="text-2xl font-bold mb-6">Betalsätt</h2>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center p-10">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-blue-600 font-medium">
                Väntar på Swish-betalning...
              </p>
            </div>
          ) : paid ? (
            <div className="flex flex-col items-center justify-center p-10">
              <div className="text-green-600 text-4xl mb-2">✅</div>
              <p className="text-green-700 text-xl font-semibold">
                Swish betalning genomförd!
              </p>
            </div>
          ) : (
            <>
              <div className="absolute top-6 right-6">
                <img
                  src="/images/swish-logo.png"
                  alt="Swish logo"
                  className="w-16"
                />
              </div>

              <div className="flex items-center space-x-3 mb-4">
                <div className="w-5 h-5 border-2 border-green-500 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-lg font-medium">Swish</span>
              </div>

              <hr className="my-4" />

              <p className="mb-4 text-gray-700">
                Fyll i mobilnumret du har kopplat till Swish. Du behöver ha
                Swish och BankID installerat.
              </p>

              <input
                type="tel"
                placeholder="Mobilnummer"
                className="w-full border border-gray-300 rounded-lg p-3 placeholder-gray-400 focus:outline-none"
                value={payer}
                onChange={(e) => setPayer(e.target.value)}
              />

              <div className="flex justify-between items-center mt-4">
                <h3 className="text-sm text-gray-700">{status}</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePaymentAndSubmit(e);
                  }}
                >
                  Betala
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
