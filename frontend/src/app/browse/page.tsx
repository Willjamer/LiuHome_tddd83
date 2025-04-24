"use client";

// npm install @mui/material @emotion/react @emotion/styled

import { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import PriceFilter from "@/components/ui/PriceFilter";
import SizeFilter from "@/components/ui/SizeFilter";
import { Button } from "@/components/ui/button";
import { Search, Calendar, House, Users } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SearchBar from "@/components/ui/search-bar";

import {
    Home, // Ny ikon för antal rum
    MapPin, // Ny ikon för area
} from "lucide-react"

interface Apartment {
    apartment_id: number;
    user_id: number;
    title: string;
    description?: string;
    address: string;
    size: number;
    number_of_rooms: number;
    location: string; // Byt till "area" om backend använder det
    rent_amount: number;
    is_available: boolean;
    available_from?: string;

}

export default function BrowsePage() {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [query, setQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([200, 20000]); // Declare and initialize the priceRange variable

  const [sortOption, setSortOption] = useState<string>("priceLowToHigh");

  const [sizeRange, setSizeRange] = useState<[number, number]>([10, 200]); // Storleksintervall

  const [isSizeDropdownOpen, setIsSizeDropdownOpen] = useState(false);
  const [isAreaDropdownOpen, setIsAreaDropdownOpen] = useState(false);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]); // Hanterar valda områden

  const [isRoomsDropdownOpen, setIsRoomsDropdownOpen] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);

  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false); // Hanterar om sorteringsdropdownen är öppen
  const [sortOrder, setSortOrder] = useState<string>(""); // Håller reda på vald sorteringsordning
  const [filteredApartments, setFilteredApartments] = useState<Apartment[]>([]);

  async function applyFilters(): Promise<void> {
    console.log(selectedAreas);
    console.log(priceRange);
    console.log(sizeRange);
    console.log(selectedRooms);
    console.log(sortOption);

    const numericRooms = selectedRooms.map(Number);
    const minRooms = numericRooms.length > 0 ? Math.min(...numericRooms) : 1;
    let maxRooms = numericRooms.length > 0 ? Math.max(...numericRooms) : 8;

    if (maxRooms == 4) {
      maxRooms = 8;
    }

    const roomRange = [minRooms, maxRooms];

    const filterLoad = {
      priceRange,
      sizeRange,
      selectedAreas,
      roomRange,
      sortOption,

    };

    console.log(filterLoad);

    try {
      const response = await fetch("http://localhost:3001/api/get-apartments", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filterLoad),
      });
      if (!response.ok) throw new Error("Failed to fetch apartments");

      const data = await response.json();
      const apartments: Apartment[] = data.Apartments;

      setApartments(apartments);
    } catch (error) {
      console.error("Error:", error);
      setApartments([]);
    }
  }

  const toggleAreaSelection = (area: string) => {
    setSelectedAreas(
      (prev) =>
        prev.includes(area)
          ? prev.filter((a) => a !== area) // Ta bort om redan vald
          : [...prev, area] // Lägg till om inte vald
    );
  };

  const handleSort = (order: string) => {
    setSortOrder(order); // Uppdaterar sorteringsordningen
    setIsSortDropdownOpen(false); // Stänger dropdownen efter val
  };

  const toggleRoomsSelection = (room: string) => {
    setSelectedRooms(
      (prev) =>
        prev.includes(room)
          ? prev.filter((r) => r !== room) // Ta bort om redan vald
          : [...prev, room] // Lägg till om inte vald
    );
  };

  const handleSearch = (newQuery: string) => {
    console.log("Search query:", newQuery);
    setQuery(newQuery);
  };

  //const filteredApartments = apartments.filter((apartment) =>
  //  apartment.title.toLowerCase().includes(query.toLowerCase())
  // );

  async function fetchApartments(): Promise<void> {
    try {
      const response = await fetch("http://localhost:3001/api/get-apartments", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch apartments");

      // OM STUB, KÖR DENNA
      // const apartments: Apartment[] = await response.json();

      // OM VANLIG (databas), KÖR DESSA TVÅ
      const data = await response.json();
      const apartments: Apartment[] = data.Apartments;

      setApartments(apartments);
    } catch (error) {
      console.error("Error:", error);
      setApartments([]);
    }
  }

  useEffect(() => {
    fetchApartments();
  }, []);

  useEffect(() => {
    (async () => {
      await applyFilters();
    })();
  }, [selectedAreas, priceRange, sizeRange, selectedRooms, sortOrder]);
  // Add state for filtering


  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 py-8 mx-8">
        <section className="flex justify-center items-center w-full flex-col">
          <h1 className="text-3xl font-bold text-center">
            Search for the perfect apartment for you!
          </h1>
        </section>

        <section className="flex flex-col items-center w-full mb-6">
          {/* Sökfältet */}
          <div className="flex items-center w-full max-w-6xl gap-4">
            <div className="flex-grow">
              <SearchBar onSearch={handleSearch} />
            </div>

            <div className="flex-shrink-0">
              <Button
                variant="outline"
                className="whitespace-nowrap h-full flex items-center"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Dates
              </Button>
            </div>
          </div>

          {/* Dropdown-knappar */}
          <div className="flex justify-center items-center w-full max-w-6xl gap-4 mt-4">
            <div className="relative w-full max-w-xs">
              <button
                className="px-4 py-2 bg-white text-black rounded-lg shadow-md flex items-center justify-between w-full hover:shadow-lg transition-shadow"
                onClick={() => setIsPriceDropdownOpen(!isPriceDropdownOpen)}
              >
                {`Price: ${priceRange[0]} - ${priceRange[1]}`}{" "}
                {/* Visa alltid intervallet */}
                <span
                  className={`ml-2 transform ${
                    isPriceDropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                >
                  ▼
                </span>
              </button>
              {isPriceDropdownOpen && (
                <div className="absolute mt-2 bg-white shadow-lg rounded-lg p-4 w-full z-10">
                  <PriceFilter
                    onPriceChange={(range) => setPriceRange(range)}
                    //   priceRange={priceRange}
                  />
                </div>
              )}
            </div>


            {/* Dropdown för Size */}
            <div className="relative w-full max-w-xs">
              <button
                className="px-4 py-2 bg-white text-black rounded-lg shadow-md flex items-center justify-between w-full hover:shadow-lg transition-shadow"
                onClick={() => setIsSizeDropdownOpen(!isSizeDropdownOpen)}
              >
                {`Size: ${sizeRange[0]} - ${sizeRange[1]} sqm`}{" "}
                {/* Visa alltid intervallet */}
                <span
                  className={`ml-2 transform ${
                    isSizeDropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                >
                  ▼
                </span>
              </button>
              {isSizeDropdownOpen && (
                <div className="absolute mt-2 bg-white shadow-lg rounded-lg p-4 w-full z-10">
                  <SizeFilter
                    onSizeChange={(range: [number, number]) =>
                      setSizeRange(range)
                    }
                  />
                </div>
              )}
            </div>
            {/* Dropdown för Area */}
            <div className="relative w-full max-w-xs">
              <button
                className="px-4 py-2 bg-white text-black rounded-lg shadow-md flex items-center justify-between w-full hover:shadow-lg transition-shadow"
                onClick={() => setIsAreaDropdownOpen(!isAreaDropdownOpen)}
              >
                {selectedAreas.length > 0
                  ? selectedAreas.join(", ") // Visa valda områden
                  : "Area"}{" "}
                {/* Standardtext om inget är valt */}
                <span
                  className={`ml-2 transform ${
                    isAreaDropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                >
                  ▼
                </span>
              </button>
              {isAreaDropdownOpen && (
                <div className="absolute mt-2 bg-white shadow-lg rounded-lg p-4 w-full z-10">
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedAreas.includes("Ryd")}
                        onChange={() => toggleAreaSelection("Ryd")}
                        className="mr-2"
                      />
                      Ryd
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedAreas.includes("Colonia")}
                        onChange={() => toggleAreaSelection("Colonia")}
                        className="mr-2"
                      />
                      Colonia
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedAreas.includes("Valla")}
                        onChange={() => toggleAreaSelection("Valla")}
                        className="mr-2"
                      />
                      Valla
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedAreas.includes("Lambohov")}
                        onChange={() => toggleAreaSelection("Lambohov")}
                        className="mr-2"
                      />
                      Lambohov
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedAreas.includes("T1")}
                        onChange={() => toggleAreaSelection("T1")}
                        className="mr-2"
                      />
                      T1
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedAreas.includes("Irrblosset")}
                        onChange={() => toggleAreaSelection("Irrblosset")}
                        className="mr-2"
                      />
                      Irrblosset
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedAreas.includes("Vallastaden")}
                        onChange={() => toggleAreaSelection("Vallastaden")}
                        className="mr-2"
                      />
                      Vallastaden
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedAreas.includes("Ebbepark")}
                        onChange={() => toggleAreaSelection("Ebbepark")}
                        className="mr-2"
                      />
                      Ebbepark
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedAreas.includes("Gottfridsberg")}
                        onChange={() => toggleAreaSelection("Gottfridsberg")}
                        className="mr-2"
                      />
                      Gottfridsberg
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedAreas.includes("Skäggetorp")}
                        onChange={() => toggleAreaSelection("Skäggetorp")}
                        className="mr-2"
                      />
                      Skäggetorp
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedAreas.includes("Berga")}
                        onChange={() => toggleAreaSelection("Berga")}
                        className="mr-2"
                      />
                      Berga
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedAreas.includes("Flamman")}
                        onChange={() => toggleAreaSelection("Flamman")}
                        className="mr-2"
                      />
                      Flamman
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedAreas.includes("Fjärilen")}
                        onChange={() => toggleAreaSelection("Fjärilen")}
                        className="mr-2"
                      />
                      Fjärilen
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedAreas.includes("City")}
                        onChange={() => toggleAreaSelection("City")}
                        className="mr-2"
                      />
                      City
                    </label>
                  </div>
                </div>
              )}
            </div>
            {/* Dropdown för Number of Rooms */}
            <div className="relative w-full max-w-xs">
              <button
                className="px-4 py-2 bg-white text-black rounded-lg shadow-md flex items-center justify-between w-full hover:shadow-lg transition-shadow"
                onClick={() => setIsRoomsDropdownOpen(!isRoomsDropdownOpen)}
              >
                {selectedRooms.length === 0
                  ? "Any rooms"
                  : selectedRooms.includes("4")
                  ? "4+ rooms"
                  : `${selectedRooms.join(", ")} rooms`}
                {/* Standardtext om inget är valt */}
                <span
                  className={`ml-2 transform ${
                    isRoomsDropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                >
                  ▼
                </span>
              </button>
              {isRoomsDropdownOpen && (
                <div className="absolute mt-2 bg-white shadow-lg rounded-lg p-4 w-full z-10">
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedRooms.includes("1")}
                        onChange={() => toggleRoomsSelection("1")}
                        className="mr-2"
                      />
                      1 Room
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedRooms.includes("2")}
                        onChange={() => toggleRoomsSelection("2")}
                        className="mr-2"
                      />
                      2 Rooms
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedRooms.includes("3")}
                        onChange={() => toggleRoomsSelection("3")}
                        className="mr-2"
                      />
                      3 Rooms
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedRooms.includes("4")}
                        onChange={() => toggleRoomsSelection("4")}
                        className="mr-2"
                      />
                      4+ Rooms
                    </label>
                  </div>
                </div>
              )}
            </div>
            {/* Dropdown för Sort by */}
            <div className="relative w-full max-w-xs">
              <button
                className="px-4 py-2 bg-white text-black rounded-lg shadow-md flex items-center justify-between w-full hover:shadow-lg transition-shadow"
                onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
              >
                {`Sort: ${
                  sortOption === "priceLowToHigh"
                    ? "Price ↑"
                    : sortOption === "priceHighToLow"
                    ? "Price ↓"
                    : sortOption === "sizeLowToHigh"
                    ? "Size ↑"
                    : "Size ↓"
                }`}
                <span
                  className={`ml-2 transform ${
                    isSortDropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                >
                  ▼
                </span>
              </button>
              {isSortDropdownOpen && (
                <div className="absolute mt-2 bg-white shadow-lg rounded-lg p-4 w-full z-10">
                  <ul className="flex flex-col gap-2">
                    <li>
                      <button
                        className={`w-full text-left px-2 py-1 rounded ${
                          sortOption === "priceLowToHigh"
                            ? "bg-gray-200"
                            : "hover:bg-gray-100"
                        }`}
                        onClick={() => {
                          setSortOption("priceLowToHigh");
                          handleSort(sortOption);
                          console.log(sortOption);
                          setIsSortDropdownOpen(false); // Stäng dropdownen
                        }}
                      >
                        Price ↑
                      </button>
                    </li>
                    <li>
                      <button
                        className={`w-full text-left px-2 py-1 rounded ${
                          sortOption === "priceHighToLow"
                            ? "bg-gray-200"
                            : "hover:bg-gray-100"
                        }`}
                        onClick={() => {
                          setSortOption("priceHighToLow");
                          setIsSortDropdownOpen(false); // Stäng dropdownen
                        }}
                      >
                        Price ↓
                      </button>
                    </li>
                    <li>
                      <button
                        className={`w-full text-left px-2 py-1 rounded ${
                          sortOption === "sizeLowToHigh"
                            ? "bg-gray-200"
                            : "hover:bg-gray-100"
                        }`}
                        onClick={() => {
                          setSortOption("sizeLowToHigh");
                          setIsSortDropdownOpen(false); // Stäng dropdownen
                        }}
                      >
                        Size ↑
                      </button>
                    </li>
                    <li>
                      <button
                        className={`w-full text-left px-2 py-1 rounded ${
                          sortOption === "sizeHighToLow"
                            ? "bg-gray-200"
                            : "hover:bg-gray-100"
                        }`}
                        onClick={() => {
                          setSortOption("sizeHighToLow");
                          setIsSortDropdownOpen(false); // Stäng dropdownen
                        }}
                      >
                        Size ↓
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <button
              onClick={applyFilters}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition min-w-[140px] text-center"
            >
              Apply Filters
            </button>
          </div>
        </section>
        <section className="flex-1 justify-center ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
            {apartments.map((apt) => (
              <Link
                href={`/browseSpecific/${apt.apartment_id}`}
                key={apt.apartment_id}
              >
                <Card className="overflow-hidden rounded-lg shadow-lg border-none p-0 h-full hover:shadow-xl transition-shadow group">
                  <div className="relative w-full h-48 overflow-hidden">
                    <img
                      src={`/images/${apt.location || "apartment1"}.jpg`} // Ändra till dynamiska bilder om möjligt
                      alt={apt.title}
                      className="object-cover w-full h-full transition-transform duration-300 ease-in-out transform group-hover:scale-105"
                    />
                    <Badge className="absolute top-2 right-2">{apt.rent_amount} SEK/month</Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold line-clamp-1">{apt.address}</h3>
                    <div className="flex flex-wrap gap-4 mt-3">
                      <div className="flex items-center text-sm">
                        <Home className="h-4 w-4 mr-1" />
                        <span>
                          {apt.number_of_rooms} {apt.number_of_rooms === 1 ? "room, " : "rooms, "}
                          {apt.size ? `${apt.size} m²` : ""}
                        </span>
                      </div>

                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{apt.location}</span>
                      </div>
                      {/* <div className="flex items-center text-sm">
                        <Bath className="h-4 w-4 mr-1" />
                        <span>{apt.bathrooms}</span>
                      </div> */}
                    </div>
                    <div className="mt-3 text-sm text-muted-foreground">
                      Available from: {apt.available_from ? new Date(apt.available_from).toISOString().split("T")[0] : "Not specified"}

                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

