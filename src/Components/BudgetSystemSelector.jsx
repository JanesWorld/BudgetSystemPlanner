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
      <h5>Select Budget System</h5>
      <FormControl sx={{ width: "30%" }}>
        <Select
          value={selectedBudget}
          onChange={handleBudgetSystem}
          variant="outlined"
          fullWidth
        >
          <MenuItem value="JARS">JARS System</MenuItem>
          <MenuItem value="503020">50/30/20 System</MenuItem>
          <MenuItem value="Zero">Zero-Based Budget</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default BudgetSystemSelector;
