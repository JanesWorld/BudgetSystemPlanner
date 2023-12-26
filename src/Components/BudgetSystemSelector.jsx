import { FormControl, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";

const BudgetSystemSelector = ({ onBudgetSystemChange }) => {
  const [selectedBudget, setSelectedBudget] = useState("JARS");

  const handleBudgetSystem = (event) => {
    const system = event.target.value;
    setSelectedBudget(system);
    onBudgetSystemChange(system);
    console.log(system);
  };

  return (
    <>
      <h5 style={{ color: "var(--text-color)" }}>Select Budget System</h5>
      <FormControl sx={{ width: "30%" }}>
        <Select
          value={selectedBudget}
          onChange={handleBudgetSystem}
          variant="outlined"
          fullWidth
          sx={{
            backgroundColor: "var(--select-background-color)",
            color: "var(--text-color)",
          }}
        >
          <MenuItem value="JARS">JARS System</MenuItem>
          <MenuItem value="503020">50/30/20 System</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default BudgetSystemSelector;
