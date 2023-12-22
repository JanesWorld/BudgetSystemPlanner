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
      <h5>Add Expenses</h5>
      <FormControl sx={{ width: "30%" }}>
        <Select
          value={expenseOption}
          onChange={handleExpenseOptionChange}
          variant="outlined"
        >
          <MenuItem value="Automated">No</MenuItem>
          <MenuItem value="Manual">Yes</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default ExpenseOption;
