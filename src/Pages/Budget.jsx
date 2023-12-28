import React, { useState } from "react";
import { Paper, Typography, Grid } from "@mui/material";
import BudgetSystemSelector from "../Components/BudgetSystemSelector";
import IncomeInput from "../Components/IncomeInput";
import ExpenseOption from "../Components/ExpenseOptions";
import ManualExpenseInput from "../Components/ManualExpenseInput";
import { useNavigate } from "react-router-dom";
import { calculateBudget } from "../Utils/System_Jars";

const Budget = ({ onBudgetMethodChange }) => {
  const navigate = useNavigate();
  const [budgetMethod, setBudgetMethod] = useState("JARS");
  const [expenseOption, setExpenseOption] = useState("Automated");
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState({});
  const [isIncomeValid, setIsIncomeValid] = useState(false);

  const handleIncomeChange = (value) => {
    setIncome(value);
    setIsIncomeValid(value !== "" && parseFloat(value) > 0);
  };

  const handleBudgetMethodChange = (value) => {
    setBudgetMethod(value);
    onBudgetMethodChange(value);
  };

  const handleSubmit = () => {
    if (isIncomeValid) {
      const budgetAllocation = calculateBudget(
        budgetMethod,
        parseFloat(income),
        expenses
      );
      sessionStorage.setItem("income", income);
      sessionStorage.setItem("expenses", JSON.stringify(expenses));
      navigate("/result", {
        state: {
          budgetAllocation,
          income,
          expenses,
          budgetMethod,
        },
      });
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: "2rem",
        margin: "2rem",
        borderRadius: "8px",
        backgroundColor: "var(--paper-bg-color)",
      }}
    >
      <h1 style={{ textAlign: "center", color: "var(--header-color)" }}>
        Budget Planner
      </h1>
      <Typography
        variant="subtitle1"
        gutterBottom
        sx={{ textAlign: "center", color: "var(--text-subtitle-color)" }}
      >
        Get an automated budget or input your expenses to see how you compare.
      </Typography>

      <Grid container spacing={2}>
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
      </Grid>
    </Paper>
  );
};

export default Budget;
