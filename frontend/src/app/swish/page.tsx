"use client"

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import QRCode from "qrcode.react"; // Optional: If you want to display a QR code

const payeeAlias = "1234679304"; // Your Swish number

const SwishPayment: React.FC = () => {
  const [amount, setAmount] = useState<number>(100);
  const [message, setMessage] = useState<string>("Payment");

  // Generate Swish payment link
  const swishLink = `swish://payment?data={\"version\":1,\"payee\":{\"value\":\"${payeeAlias}\"},\"amount\":{\"value\":${amount}},\"message\":{\"value\":\"${message}\"}}`;

  return (
    <div className="flex flex-col items-center space-y-4 p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-xl font-semibold">Swish Payment</h2>
      <img 
        src="/images/swish-QR-large.png" 
        alt="Swish QR Code" 
        className="max-w-xs" // Apply max-width to limit its size
      />
    </div>
  );
  
};

export default SwishPayment;
