import React from "react";
import {
  Grid,
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
import { jarsPercentages } from "../Utils/System_Jars";
import { compareExpensesWithJars } from "../Utils/compareExpensesWithJars";
import { getBudgetAdvice } from "../Utils/getBudgetAdvice";

const DisplayResult = () => {
  const location = useLocation();
  const { jarsAllocation } = location.state || {};
  const income = parseFloat(sessionStorage.getItem("income"));
  const expenses = JSON.parse(sessionStorage.getItem("expenses") || "{}");

  const categorisedUserExpenses = categorizeExpenses(expenses);
  const expenseComparison = compareExpensesWithJars(
    categorisedUserExpenses,
    jarsAllocation,
    income
  );

  return (
    <Paper
      elevation={3}
      sx={{ padding: "2rem", borderRadius: "8px", marginTop: "20px" }}
    >
      <Typography variant="h4" sx={{ mb: "20px" }}>
        Your Budget based on the SELECTION system
      </Typography>

      <Typography variant="subtitle1" sx={{ mb: "20px", fontWeight: "bold" }}>
        Monthly Gross Income: £{income}
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>JARS</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                JARS System %
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                JARS System Budget (£)
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Current Spend (£)
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                % of Monthly Income
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

              const delta = parseFloat(expenseComparison[category].delta);
              const isOverBudget = delta < 0;
              const deltaColor = isOverBudget ? "red" : "green";
              const budgetStatus = isOverBudget
                ? "(overbudget)"
                : "(underbudget)";
              const adviceMessage = getBudgetAdvice(category, isOverBudget);

              return (
                <TableRow
                  key={category}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {formatName(category)}
                  </TableCell>
                  <TableCell align="right">
                    {jarsSystemPercentage.toFixed(0)}%
                  </TableCell>
                  <TableCell align="right">
                    £{jarsSystemBudget.toFixed(2)}
                  </TableCell>
                  <TableCell align="right">
                    £
                    {parseFloat(
                      expenseComparison[category].spentAmount
                    ).toFixed(2)}
                  </TableCell>
                  <TableCell align="right">
                    {parseFloat(
                      expenseComparison[category].spentPercentage
                    ).toFixed(2)}
                    %
                  </TableCell>
                  <TableCell align="right" sx={{ color: deltaColor }}>
                    {delta.toFixed(2)}% {budgetStatus}
                    <div style={{ color: deltaColor }}>
                      <Typography variant="caption">
                        {getBudgetAdvice(category, delta)}
                      </Typography>
                    </div>
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
