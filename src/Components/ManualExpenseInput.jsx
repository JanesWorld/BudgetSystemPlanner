import React, { useState } from "react";
import { Grid, TextField } from "@mui/material";

const ManualExpenseInput = ({ onExpensesInput }) => {
  const [expenses, setExpenses] = useState({
    rent: "",
    bills: "",
    food: "",
    entertainment: "",
    transportation: "",
    miscellaneous: "",
    other: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (/^[0-9]*$/.test(value)) {
      const updatedExpenses = {
        ...expenses,
        [name]: value,
      };
      setExpenses(updatedExpenses);
      onExpensesInput(updatedExpenses);
    }
  };

  return (
    <>
      <Grid container spacing={2} alignItems="flex-end" sx={{ mt: "20px" }}>
        <h5 style={{ marginLeft: "15px" }}>Add Your Expenses</h5>
        {Object.keys(expenses).map((expenseKey) => (
          <Grid item xs={12} sm={6} key={expenseKey}>
            <TextField
              label={expenseKey.charAt(0).toUpperCase() + expenseKey.slice(1)}
              value={expenses[expenseKey]}
              onChange={handleInputChange}
              fullWidth
              name={expenseKey}
              type="number"
            />
          </Grid>
        ))}
        {console.log("ManualInput", expenses)}
      </Grid>
    </>
  );
};

export default ManualExpenseInput;
