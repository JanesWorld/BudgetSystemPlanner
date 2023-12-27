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
      sx={{
        padding: "2rem",
        borderRadius: "8px",
        marginTop: "20px",
        backgroundColor: "var(--paper-bg-color)",
      }}
    >
      <Typography variant="h4" sx={{ mb: "20px", color: "var(--text-color)" }}>
        Your Budget based on the{" "}
        <span style={{ fontWeight: "bold" }}>
          {budgetSystemNameMap[budgetMethod]}
        </span>
      </Typography>
      <KeySystem />
      <Typography
        variant="subtitle1"
        sx={{ mb: "20px", fontWeight: "bold", color: "var(--text-color)" }}
      >
        Monthly Gross Income: £{income}
      </Typography>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650, backgroundColor: "var(--table-color)" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>
                {budgetMethod === "JARS" ? "JARS" : "Category"}
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "var(--table-header-row)",
                }}
              >
                {budgetMethod === "JARS" ? "JARS System %" : "% Allocation"}
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "var(--table-header-row)",
                }}
              >
                System Budget (£)
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "var(--table-header-row-user)",
                }}
              >
                Current Spend (£)
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "var(--table-header-row-user)",
                }}
              >
                % of Monthly Income
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "var(--table-header-difference)",
                  color: "var(--text-color)",
                }}
              >
                Difference (£)
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "var(--table-header-advice)",
                  color: "var(--text-color)",
                }}
              >
                Comment
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(expenseComparison).length > 0 ? (
              Object.keys(expenseComparison).map((category) => {
                const categoryKey =
                  category.charAt(0).toUpperCase() + category.slice(1);
                const systemPercentage = systemPercentages[categoryKey] * 100;
                const systemBudget = systemPercentages[categoryKey] * income;

                const userExpense = parseFloat(
                  categorisedUserExpenses[categoryKey] || 0
                );
                const deltaValue = systemBudget - userExpense;
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
                    <TableCell
                      align="right"
                      sx={{ backgroundColor: "var(--table-data-system)" }}
                    >
                      {systemPercentage.toFixed(0)}%
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ backgroundColor: "var(--table-data-system)" }}
                    >
                      £{systemBudget.toFixed(2)}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        backgroundColor: "var(--table-header-row-user)",
                      }}
                    >
                      £{userExpense.toFixed(2)}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        backgroundColor: "var(--table-header-row-user)",
                      }}
                    >
                      {((userExpense / income) * 100).toFixed(2)}%
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        color: color,
                        fontWeight: "bold",
                        fontStyle: "italic",
                        backgroundColor: "var(--table-header-difference)",
                        color: "var(--text-color)",
                      }}
                    >
                      {userExpense > systemBudget
                        ? `(${Math.abs(deltaValue).toFixed(2)})`
                        : Math.abs(deltaValue).toFixed(2)}{" "}
                      <Typography
                        variant="caption"
                        sx={{ display: "block", mt: 1 }}
                      >
                        {userExpense > systemBudget
                          ? "Over Budget"
                          : "Under Budget"}
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        color: "var(--text-color)",
                        backgroundColor: "var(--table-header-advice)",
                      }}
                    >
                      <Typography variant="caption">
                        {getBudgetAdvice(
                          categoryKey,
                          userExpense,
                          systemBudget
                        )}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell colSpan={7} align="center">
                  Expenses not entered
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default DisplayResult;
