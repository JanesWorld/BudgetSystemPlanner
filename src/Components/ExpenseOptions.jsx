import { FormControl, Input, Select, MenuItem } from "@mui/material";
import { useState } from "react";

const ExpenseOption = ({ onOptionChange }) => {
  const [expenseOption, setExpenseOption] = useState("Automated");
  const handleExpenseOptionChange = (event) => {
    setExpenseOption(event.target.value);
    onOptionChange(event.target.value);
  };
  return (
    <>
      <h5 style={{ color: "var(--text-color)" }}>Add Expenses</h5>
      <FormControl sx={{ width: "30%" }}>
        <Select
          value={expenseOption}
          onChange={handleExpenseOptionChange}
          variant="outlined"
          sx={{
            backgroundColor: "var(--select-background-color)",
            color: "var(--text-color)",
          }}
        >
          <MenuItem value="Automated">No</MenuItem>
          <MenuItem value="Manual">Yes</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default ExpenseOption;
