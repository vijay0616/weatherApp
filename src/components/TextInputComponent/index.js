import React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

export default function TextInputComponent(props) {
  const { id, label, inputValue, variant, size, endAdornment, handleChange } =
    props;
  return (
    <FormControl fullWidth variant={variant}>
      <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
      <OutlinedInput
        id={id}
        label={label}
        size={size}
        value={inputValue}
        onChange={(e) => handleChange(e)}
        endAdornment={endAdornment}
      />
    </FormControl>
  );
}
