import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import React, { useState } from "react";

const RsDropdown = ({ id, value, label, items, onChange, placeholder }) => {
  return (
    <>
      <InputLabel
        sx={{
          textAlign: "right",
          width: "100%",
          fontSize: "18.5px",
          fontWeight: "550",
        }}
      >
        {label}
      </InputLabel>
      <Select
        fullWidth
        variant="standard"
        id="demo-simple-select-standard"
        value={value}
        onChange={(e) => onChange(id, e.target.value)}
        label=""
        color="success"
        sx={{
          textAlign: "right",
          "& .MuiSelect-select": { textAlign: "right" }, // Adjust text alignment
          "& .MuiOutlinedInput-notchedOutline": { textAlign: "right" },
        }}
        required
      >
        {items.map((item) => (
          <MenuItem sx={{ textAlign: "right" }} value={item.label}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default RsDropdown;
