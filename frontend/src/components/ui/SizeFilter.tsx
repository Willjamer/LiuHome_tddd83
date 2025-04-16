import React, { useState } from "react";
import { Box, Slider, TextField, Typography } from "@mui/material";

interface SizeFilterProps {
  onSizeChange: (range: [number, number]) => void;
}

const SizeFilter: React.FC<SizeFilterProps> = ({ onSizeChange }) => {
  const [localSizeRange, setLocalSizeRange] = useState<[number, number]>([
    10, 500,
  ]);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    const newRange = newValue as [number, number];
    setLocalSizeRange(newRange);
    onSizeChange(newRange); // Skicka tillbaka det uppdaterade intervallet
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const newValue = Number(event.target.value);
    const updatedRange = [...localSizeRange] as [number, number];
    updatedRange[index] = newValue;
    setLocalSizeRange(updatedRange);
    onSizeChange(updatedRange); // Skicka tillbaka det uppdaterade intervallet
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 600, margin: "0 auto", padding: 4 }}>
      <Typography variant="h6" gutterBottom>
        Size (sqm)
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
          value={localSizeRange[0]}
          onChange={(e) => handleInputChange(e, 0)}
          InputProps={{ inputProps: { min: 0, max: localSizeRange[1] } }}
          sx={{ width: "45%" }}
        />
        <TextField
          label="Maximum"
          type="number"
          value={localSizeRange[1]}
          onChange={(e) => handleInputChange(e, 1)}
          InputProps={{ inputProps: { min: localSizeRange[0] } }}
          sx={{ width: "45%" }}
        />
      </Box>
      <Slider
        value={localSizeRange}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        min={10}
        max={500}
      />
    </Box>
  );
};

export default SizeFilter;
