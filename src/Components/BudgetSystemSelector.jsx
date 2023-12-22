import { FormControl, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";

const BudgetSystemSelector = ({ onBudgetSystemChange }) => {
  const [selectedBudget, setSelectedBudget] = useState("JARS");

  const handleBudgetSystem = (event) => {
    setSelectedBudget(event.target.value);
    onBudgetSystemChange(event.target.value);
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
          <MenuItem value="503020">50/30/20</MenuItem>
          <MenuItem value="Zero">Zero Budget</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default BudgetSystemSelector;
