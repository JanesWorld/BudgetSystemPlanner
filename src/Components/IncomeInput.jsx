import { FormControl, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";

const IncomeInput = ({ onIncomeChange }) => {
  const [error, setError] = useState("");
  const [income, setIncome] = useState(""); // income is a string, not a number

  const handleInputChange = (event) => {
    const value = event.target.value; // we cannot get typeof event because it is an object
    setIncome(value);
    if (/^[0-9]*\.?[0-9]+$/.test(value) || value === "") {
      onIncomeChange(value);
      setError(""); // Clear any previous error message
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
      <h5>Income Input</h5>
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
        />
      </FormControl>
    </>
  );
};

export default IncomeInput;
