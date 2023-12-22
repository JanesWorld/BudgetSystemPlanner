import React, { useState } from "react";
import { Button, Paper, Typography, Grid } from "@mui/material";
import BudgetSystemSelector from "../Components/BudgetSystemSelector";
import IncomeInput from "../Components/IncomeInput";
import ExpenseOption from "../Components/ExpenseOptions";
import ManualExpenseInput from "../Components/ManualExpenseInput";
import { useNavigate } from "react-router-dom";
import { calculateJARS } from "../Utils/System_Jars";

const Budget = () => {
  const navigate = useNavigate();
  const [budgetMethod, setBudgetMethod] = useState("");
  const [expenseOption, setExpenseOption] = useState("Automated");
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState({});

  const handleBudgetMethodChange = (event) => {
    setBudgetMethod(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const jarsAllocation = calculateJARS(parseFloat(income), expenses);
    sessionStorage.setItem("income", income);
    sessionStorage.setItem("expenses", JSON.stringify(expenses));
    console.log("BudgetExpenses", { income, expenses });
    navigate("/result", { state: { jarsAllocation, income, expenses } });
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
          <IncomeInput onIncomeChange={setIncome} />
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
          <button onClick={handleSubmit} className="button">
            Calculate Budget
          </button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Budget;
