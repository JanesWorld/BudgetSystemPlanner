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
  Card,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { categorizeExpenses } from "../Utils/categoriseExpenses";
import { formatName } from "../Utils/formatName";
import { jarsPercentages, system503020Percentages } from "../Utils/System_Jars";
import { compareExpensesWithSystem } from "../Utils/compareExpensesWithJars";
import { getBudgetAdvice } from "../Utils/getBudgetAdvice";
import { KeySystem } from "../Components/Key";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const DisplayResult = () => {
  const location = useLocation();
  const { budgetAllocation, budgetMethod } = location.state || {};
  const income = parseFloat(sessionStorage.getItem("income"));
  const expenses = JSON.parse(sessionStorage.getItem("expenses") || "{}");
  const categorisedUserExpenses = categorizeExpenses(expenses, budgetMethod);

  const totalExpenses = Object.values(categorisedUserExpenses).reduce(
    (sum, value) => sum + value,
    0
  );

  let spendingColor = "black";

  const expensesMessage =
    totalExpenses > 0
      ? totalExpenses > income
        ? `You are spending £${(totalExpenses - income).toFixed(
            2
          )} more than you earn.`
        : `You are spending less than your income by £${(
            income - totalExpenses
          ).toFixed(2)}`
      : "You've entered no expenses.";

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

  const delta = totalExpenses - income;
  const formattedDelta = Math.abs(delta).toFixed(2);
  const overBudget = delta > 0;
  const deltaAmountStyle = {
    color: overBudget ? "red" : "green",
    fontWeight: "bold",
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
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <Typography variant="h4" sx={{ mb: "20px", color: "var(--text-color)" }}>
        Your Budget based on the{" "}
        <span style={{ fontWeight: "bold" }}>
          {budgetSystemNameMap[budgetMethod]}
        </span>
      </Typography>

      <KeySystem />

      <div style={{ display: "flex", flexDirection: "column" }}>
        <Typography
          variant="subtitle1"
          sx={{ mb: "10px", fontWeight: "bold", color: "var(--text-color)" }}
        >
          Monthly Gross Income:{" "}
          <span style={{ fontWeight: "normal" }}>£{income.toFixed(2)}</span>
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ mb: "10px", fontWeight: "bold", color: "var(--text-color)" }}
        >
          Total Expenses:{" "}
          <span style={{ fontWeight: "normal" }}>
            £{totalExpenses.toFixed(2)}
          </span>
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            mb: "20px",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "var(--text-color)",
          }}
        >
          {overBudget ? "You are spending " : "You are saving "}
          <span style={deltaAmountStyle}>
            £{formattedDelta}
            {overBudget ? (
              <ArrowUpwardIcon
                style={{ ...deltaAmountStyle, verticalAlign: "middle" }}
              />
            ) : (
              <ArrowDownwardIcon
                style={{ ...deltaAmountStyle, verticalAlign: "middle" }}
              />
            )}
          </span>
          {overBudget
            ? " more than you earn."
            : " which is less than your income."}
        </Typography>
      </div>

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
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      "&:hover": {
                        backgroundColor: "rgba(25, 118, 210, 0.1)",
                        ".MuiTableCell-root": {
                          boxShadow: "inset 0 0 0 2px black",
                        },
                        cursor: "pointer",
                      },
                    }}
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
