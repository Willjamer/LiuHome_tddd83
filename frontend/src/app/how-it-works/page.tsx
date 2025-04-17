import React from "react";
import Link from "next/link";
import { Contact, House, List, ListCheck, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SearchBar from "@/components/ui/search-bar";

const HowItWorksPage: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col w-full" style={{ backgroundImage: "url('/images/tvåstudenterdark.png')", backgroundSize: "cover", backgroundPosition: "right" }}>
      <main className="flex-1 p-8 space-y-16">
        <h1 className="text-4xl font-bold text-center text-white mb-4">How It Works</h1>
        {/* <p className="text-lg text-muted-foreground text-center">
          Here's a guide to how our website works.
        </p> */}
        <hr className="border-b" />


        <Card className="mb-8 bg-transparent border-4 border-white">
          <CardContent>
            <div className="flex justify-center mb-4">
              <House className="text-white w-10 h-10" />
            </div>
            <h2 className="text-2xl font-semibold text-center text-white mb-4">
              1. Sign Up
            </h2>
            <p className="text-white">
              To get started, you can create a liuHome account. This will allow
              you to browse and save your favorite listings, contact landlords,
              and list your own property. You can sign up by clicking the "Sign
              In", where you'll be prompted to enter your email and password.
              Once you've signed up, you'll be able to access all the features
              of our website.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8 bg-transparent border-4 border-white">
          <CardContent>
          <div className="flex justify-center mb-4">
              <Search className="text-white w-10 h-10" />
            </div>
            <h2 className="text-2xl font-semibold text-center text-white mb-4">
              2. Browse Listings
            </h2>
            <p className="text-white">
              To get started, you can either browse the listings or search for a
              specific property using the search bar. As a student seeking to
              rent a property, you can find a variety of housing options that
              fit your needs and budget. To ensure this, we've developed unique
              and relevant filters to help you narrow down your search and find
              the perfect place to live and make your visit to liuHome as smooth
              and easy as it needs to be.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8 bg-transparent border-4 border-white">
          <CardContent>
          <div className="flex justify-center mb-4">
              <Contact className="text-white w-10 h-10" />
            </div>
            <h2 className="text-2xl font-semibold text-center text-white mb-4">
              3. Contact Landlords
            </h2>
            <p className="text-white">
              Once you've found a listing that interests you, you can contact
              the landlord directly through our website. You can send them a
              message to inquire about the property, ask for more information,
              or schedule a viewing. Establishing direct communication between
              users through a platform with minimal involvement from the
              developers, aims to consolidate liuHome as an intermediary. Our
              messaging system is secure and private, ensuring that your
              personal information remains confidential.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8 bg-transparent border-4 border-white">
          <CardContent>
          <div className="flex justify-center mb-4">
              <ListCheck className="text-white w-10 h-10" />
            </div>
            <h2 className="text-2xl font-semibold text-center text-white mb-4">
              4. List Your Property
            </h2>
            <p className="text-white">
              If you're a landlord looking to rent out your property, you can
              list it on liuHome. To do this, you'll need to have an account and
              provide details about your property, such as location, price, and
              amenities. Once your listing is live, students can view it and
              contact you if they're interested. We aim to make the process of
              listing your property as simple and straightforward as possible,
              ensuring that you can reach a wide audience of potential tenants.
            </p>
          </CardContent>
        </Card>
      </main>

  
    </div>
  );
};

export default HowItWorksPage;
