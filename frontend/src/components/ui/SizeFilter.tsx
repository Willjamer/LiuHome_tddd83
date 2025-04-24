import React, { useState, useEffect } from "react";
import { Box, Slider, TextField, Typography } from "@mui/material";

interface SizeFilterProps {
  sizeRange: [number, number]; // Receive the size range as a prop
  onSizeChange: (range: [number, number]) => void; // Callback to update the size range
}

const SizeFilter: React.FC<SizeFilterProps> = ({ sizeRange, onSizeChange }) => {
  const [localSizeRange, setLocalSizeRange] = useState<[number, number]>(sizeRange);

  useEffect(() => {
    // Sync local state with the incoming sizeRange prop
    setLocalSizeRange(sizeRange);
  }, [sizeRange]);

  // Handle the slider change and update the local state
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    const newRange = newValue as [number, number];
    setLocalSizeRange(newRange);
    onSizeChange(newRange); // Propagate the change to the parent component
  };

  // Handle manual input change for the size fields
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const newValue = Number(event.target.value);
    const updatedRange = [...localSizeRange] as [number, number];

    // Ensure that minimum size is not greater than the maximum size and vice versa
    if (index === 0) {
      updatedRange[0] = Math.min(newValue, localSizeRange[1]);
    } else {
      updatedRange[1] = Math.max(newValue, localSizeRange[0]);
    }

    setLocalSizeRange(updatedRange);
    onSizeChange(updatedRange); // Propagate the change to the parent component
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 600, margin: "0 auto", padding: 4 }}>
      {/* <Typography variant="h6" gutterBottom>
        Size [m²]
      </Typography> */}

      <Box position="relative" width="100%">
        {/* Slider */}
        <Slider
          value={localSizeRange}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          min={10}
          max={150}
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
          {localSizeRange[0]} m²
        </Box>

        {/* Right value above the right end of the slider */}
        <Box
          position="absolute"
          right={0}
          sx={{ transform: "translateX(50%)", bottom: -30 }}
        >
          {localSizeRange[1]} m²
        </Box>
      </Box>

    </Box>
  );
};

export default SizeFilter;
