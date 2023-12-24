import React, { useState } from "react";
import { Button, Paper, Typography, Grid } from "@mui/material";
import BudgetSystemSelector from "../Components/BudgetSystemSelector";
import IncomeInput from "../Components/IncomeInput";
import ExpenseOption from "../Components/ExpenseOptions";
import ManualExpenseInput from "../Components/ManualExpenseInput";
import { useNavigate } from "react-router-dom";
import { calculateBudget, calculateJARS } from "../Utils/System_Jars";
import { Snackbar, Alert } from "@mui/material";

const Budget = () => {
  const navigate = useNavigate();
  const [budgetMethod, setBudgetMethod] = useState("JARS");
  const [expenseOption, setExpenseOption] = useState("Automated");
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState({});
  const [isIncomeValid, setIsIncomeValid] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const handleIncomeChange = (value) => {
    setIncome(value);
    setIsIncomeValid(value !== "" && parseFloat(value) > 0);
  };

  const handleBudgetMethodChange = (value) => {
    setBudgetMethod(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isIncomeValid) {
      const budgetAllocation = calculateBudget(
        budgetMethod,
        parseFloat(income),
        expenses
      );
      sessionStorage.setItem("income", income);
      sessionStorage.setItem("expenses", JSON.stringify(expenses));
      console.log("Selected Budget Method:", budgetMethod);
      console.log("Calculated Budget Allocation:", budgetAllocation);
      console.log("Expenses:", expenses);
      console.log("Income:", income);

      navigate("/result", {
        state: {
          // jarsAllocation,
          budgetAllocation,
          income,
          expenses,
          budgetMethod,
        },
      });
    } else {
      console.log("Snackbar Open");
      setIsSnackbarOpen(true);
    }
  };

  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsSnackbarOpen(false);
  };

  return (
    <Paper
      elevation={3}
      sx={{ padding: "2rem", margin: "2rem", borderRadius: "8px" }}
    >
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
        Budget Planner
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Get an automated budget or input your expenses to see how you compare.
      </Typography>

      <Grid container spacing={2}>
        {/* Left Column */}
        <Grid item xs={12} md={6}>
          <BudgetSystemSelector
            onBudgetSystemChange={handleBudgetMethodChange}
          />
          <IncomeInput onIncomeChange={handleIncomeChange} />
        </Grid>

        <Grid item xs={12} md={6} container direction="column" spacing={2}>
          <Grid item>
            <ExpenseOption onOptionChange={setExpenseOption} />
          </Grid>

          {expenseOption === "Manual" && (
            <Grid item xs={12} md={6}>
              <ManualExpenseInput onExpensesInput={setExpenses} />
            </Grid>
          )}
        </Grid>

        <Grid item xs={12} container justifyContent="center">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isIncomeValid}
            className="button"
          >
            Calculate Budget
          </button>
        </Grid>
        <Snackbar
          open={isSnackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackBarClose}
        >
          <Alert
            onClose={handleSnackBarClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            Please enter a valid monthly income before calculating.
          </Alert>
        </Snackbar>
      </Grid>
    </Paper>
  );
};

export default Budget;
