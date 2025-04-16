import React, { useState } from "react";
import { Box, Slider, TextField, Typography } from "@mui/material";

const PriceFilter: React.FC<{
  onPriceChange: (range: [number, number]) => void;
}> = ({ onPriceChange }) => {
  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>([
    200, 1000000,
  ]);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    const newRange = newValue as [number, number];
    setLocalPriceRange(newRange);
    onPriceChange(newRange); // Skicka tillbaka det uppdaterade intervallet
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const newValue = Number(event.target.value);
    const updatedRange = [...localPriceRange] as [number, number];
    updatedRange[index] = newValue;
    setLocalPriceRange(updatedRange);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 600, margin: "0 auto", padding: 4 }}>
      <Typography variant="h6" gutterBottom>
        Price (SEK)
      </Typography>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <TextField
          label="Minimum"
          type="number"
          value={localPriceRange[0]}
          onChange={(e) => handleInputChange(e, 0)}
          InputProps={{ inputProps: { min: 0, max: localPriceRange[1] } }}
          sx={{ width: "45%" }}
        />
        <TextField
          label="Maximum"
          type="number"
          value={localPriceRange[1]}
          onChange={(e) => handleInputChange(e, 1)}
          InputProps={{ inputProps: { min: localPriceRange[0] } }}
          sx={{ width: "45%" }}
        />
      </Box>
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
    </Box>
  );
};

export default PriceFilter;
