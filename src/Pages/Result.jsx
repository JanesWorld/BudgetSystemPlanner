import React from "react";
import {
  Paper,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { categorizeExpenses } from "../Utils/categoriseExpenses";
import { formatName } from "../Utils/formatName";
import { jarsPercentages, system503020Percentages } from "../Utils/System_Jars";
import { compareExpensesWithSystem } from "../Utils/compareExpensesWithJars";
import { getBudgetAdvice } from "../Utils/getBudgetAdvice";
import { KeySystem } from "../Components/Key";

const DisplayResult = () => {
  const location = useLocation();
  const { budgetAllocation, budgetMethod } = location.state || {};
  const income = parseFloat(sessionStorage.getItem("income"));
  const expenses = JSON.parse(sessionStorage.getItem("expenses") || "{}");
  const categorisedUserExpenses = categorizeExpenses(expenses, budgetMethod);
  const systemPercentages =
    budgetMethod === "503020" ? system503020Percentages : jarsPercentages;
  const expenseComparison = compareExpensesWithSystem(
    categorisedUserExpenses,
    budgetAllocation,
    income,
    systemPercentages
  );
  const areExpensesEntered = Object.keys(expenses).length > 0;
  const budgetSystemNameMap = {
    JARS: "JARS System",
    503020: "50/30/20 System",
    Zero: "Zero-Based Budget",
  };

  const getArrowAndColor = (category, delta) => {
    const isPositiveCategory = [
      "FinancialFreedom",
      "Education",
      "LongTermSavings",
    ].includes(category);
    const isOverBudget = delta < 0;
    const arrow = isOverBudget ? "↓" : "↑";
    let color = isOverBudget
      ? isPositiveCategory
        ? "green"
        : "red"
      : isPositiveCategory
      ? "red"
      : "green";
    return { arrow, color };
  };

  return (
    <Paper
      elevation={3}
      sx={{ padding: "2rem", borderRadius: "8px", marginTop: "20px" }}
    >
      <Typography variant="h4" sx={{ mb: "20px" }}>
        Your Budget based on the {budgetSystemNameMap[budgetMethod]}
      </Typography>
      <KeySystem />
      <Typography variant="subtitle1" sx={{ mb: "20px", fontWeight: "bold" }}>
        Monthly Gross Income: £{income}
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>JARS</TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: "bold", backgroundColor: "#f2b8b5" }}
              >
                JARS System %
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: "bold", backgroundColor: "#f2b8b5" }}
              >
                JARS System Budget (£)
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: "bold", backgroundColor: "#ccc2dc" }}
              >
                Current Spend (£)
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: "bold", backgroundColor: "#ccc2dc" }}
              >
                % of Monthly Income
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: "bold", backgroundColor: "#ccc2dc" }}
              >
                Difference (£)
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                JARS System vs Your Current Budget Delta (%)
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(expenseComparison).map((category) => {
              const categoryKey =
                category.charAt(0).toUpperCase() + category.slice(1);
              const jarsSystemPercentage = jarsPercentages[categoryKey] * 100;
              const jarsSystemBudget = jarsPercentages[categoryKey] * income;

              if (!areExpensesEntered) {
                return (
                  <TableRow
                    key={category}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ fontWeight: "bold" }}
                    >
                      {formatName(category)}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ backgroundColor: "#fef8f8" }}
                    >
                      {jarsSystemPercentage.toFixed(0)}%
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ backgroundColor: "#fef8f8" }}
                    >
                      £{jarsSystemBudget.toFixed(2)}
                    </TableCell>
                    <TableCell align="right" colSpan={4}>
                      Expenses not entered
                    </TableCell>
                  </TableRow>
                );
              }

              const userExpense = parseFloat(
                categorisedUserExpenses[categoryKey] || 0
              );
              const deltaValue = jarsSystemBudget - userExpense;
              const { arrow, color } = getArrowAndColor(
                categoryKey,
                deltaValue
              );

              return (
                <TableRow
                  key={category}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ fontWeight: "bold" }}
                  >
                    {formatName(category)}
                  </TableCell>
                  <TableCell align="right" sx={{ backgroundColor: "#fef8f8" }}>
                    {jarsSystemPercentage.toFixed(0)}%
                  </TableCell>
                  <TableCell align="right" sx={{ backgroundColor: "#fef8f8" }}>
                    £{jarsSystemBudget.toFixed(2)}
                  </TableCell>
                  <TableCell align="right" sx={{ backgroundColor: "#f0edf5" }}>
                    £{userExpense.toFixed(2)}
                  </TableCell>
                  <TableCell align="right" sx={{ backgroundColor: "#f0edf5" }}>
                    {((userExpense / income) * 100).toFixed(2)}%
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ backgroundColor: "#f0edf5", color: color }}
                  >
                    £{Math.abs(deltaValue).toFixed(2)} {arrow}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ color: deltaValue < 0 ? "red" : "green" }}
                  >
                    <Typography variant="caption">
                      {getBudgetAdvice(categoryKey, deltaValue < 0)}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default DisplayResult;
