import { FormControl, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";

const IncomeInput = ({ onIncomeChange }) => {
  const [error, setError] = useState("");
  const [income, setIncome] = useState("");

  const handleInputChange = (event) => {
    const value = event.target.value;
    setIncome(value);
    if (/^[0-9]*\.?[0-9]+$/.test(value) || value === "") {
      onIncomeChange(value);
      setError("");
    } else {
      setError("Please enter a valid number");
    }
  };

  const handleBlur = () => {
    if (!income || parseFloat(income) < 0) {
      setError("Income is required and must be greater than 0");
    }
  };

  return (
    <>
      <h5 style={{ color: "var(--text-color)" }}>Income Input</h5>
      <FormControl>
        <TextField
          label="Gross Monthly Income"
          onChange={handleInputChange}
          value={income}
          onBlur={handleBlur}
          error={!!error}
          helperText={error}
          fullWidth
          variant="outlined"
          sx={{
            backgroundColor: "var(--select-background-color)",
            borderRadius: "5px",
            color: "var(--text-color)",
            "& .MuiInputBase-input": {
              color: "var(--text-color)",
            },
            "& label": {
              color: "var(--text-color)",
            },
          }}
        />
      </FormControl>
    </>
  );
};

export default IncomeInput;
