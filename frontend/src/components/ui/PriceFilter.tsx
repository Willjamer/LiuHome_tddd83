import React, { useState, useEffect } from "react";
import { Box, Slider, TextField } from "@mui/material";

const PriceFilter: React.FC<{
  priceRange: [number, number]; // Receive the price range as a prop
  onPriceChange: (range: [number, number]) => void; // Callback to update the price range
}> = ({ priceRange, onPriceChange }) => {
  // Sync the local state with the incoming price range prop
  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>(priceRange);

  useEffect(() => {
    // If the priceRange prop changes (e.g., when the parent component's state updates), sync it with the local state
    setLocalPriceRange(priceRange);
  }, [priceRange]);

  // Handle the slider change and update the local state
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    const newRange = newValue as [number, number];
    setLocalPriceRange(newRange);
    onPriceChange(newRange); // Propagate the change to the parent component
  };

  // Handle manual input change for the price fields
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const newValue = Number(event.target.value);
    const updatedRange = [...localPriceRange] as [number, number];

    // Ensure that minimum price is not greater than the maximum price and vice versa
    if (index === 0) {
      updatedRange[0] = Math.min(newValue, localPriceRange[1]);
    } else {
      updatedRange[1] = Math.max(newValue, localPriceRange[0]);
    }

    setLocalPriceRange(updatedRange);
    onPriceChange(updatedRange); // Propagate the change to the parent component
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 600, margin: "0 auto", padding: 4 }}>

      <Box position="relative" width="100%">
        <Slider
          value={localPriceRange}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          min={500}
          max={20000}
          sx={{
            "& .MuiSlider-thumb": {
              backgroundColor: "#1976d2",
            },
          }}
        />

        {/* Left value above the left end of the slider */}
        <Box
          position="absolute"
          left={0}
          sx={{ transform: "translateX(-50%)", bottom: -30 }}
        >
          {localPriceRange[0]} SEK
        </Box>

        {/* Right value above the right end of the slider */}
        <Box
          position="absolute"
          right={0}
          sx={{ transform: "translateX(50%)", bottom: -30 }}
        >
          {localPriceRange[1]} SEK
        </Box>
      </Box>     
    </Box>
  );
};

export default PriceFilter;
