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
import { useCategoryMapping } from "../CategoryMappingContext";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

const DisplayResult = () => {
  const location = useLocation();
  const { budgetAllocation, budgetMethod } = location.state || {};
  const income = parseFloat(sessionStorage.getItem("income"));
  const expenses = JSON.parse(sessionStorage.getItem("expenses") || "{}");
  const categorisedUserExpenses = categorizeExpenses(expenses, budgetMethod);
  const categoryMapping = useCategoryMapping();
  const totalExpenses = Object.values(categorisedUserExpenses).reduce(
    (sum, value) => sum + value,
    0
  );

  const overBudget = totalExpenses > income;
  const exactlyBudgeted = totalExpenses === income;
  const formattedDelta = Math.abs(totalExpenses - income).toFixed(2);

  const deltaAmountStyle = overBudget
    ? { color: "red", fontWeight: "bold" }
    : { color: "green", fontWeight: "bold" };

  const systemPercentages =
    budgetMethod === "503020" ? system503020Percentages : jarsPercentages;
  const expenseComparison = compareExpensesWithSystem(
    categorisedUserExpenses,
    budgetAllocation,
    income,
    systemPercentages
  );
  console.log("Expense Comparison:", expenseComparison);

  const budgetSystemNameMap = {
    JARS: "JARS System",
    503020: "50/30/20 System",
  };

  const labels = Object.keys(categorisedUserExpenses);
  const dataPoints = labels.map((label) => categorisedUserExpenses[label]);
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: dataPoints,
        backgroundColor: [
          "#ff6978",
          "#e8e9f3",
          "#b1ede8",
          "#6d435a",
          "#352d39",
          "#2a9d8f",
        ],
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const chartContainerStyle = {
    position: "relative",
    width: "40%",
    height: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "20px",
    marginRight: "20px",
  };

  const doghnutCenterText = (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", color: "var(--text-color)" }}
      >
        £{totalExpenses.toFixed(2)}
      </Typography>
    </div>
  );

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

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ width: "50%" }}>
          <KeySystem />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant="subtitle1"
              sx={{
                mb: "10px",
                mt: "20px",
                fontWeight: "bold",
                color: "var(--text-color)",
              }}
            >
              Monthly Gross Income:{" "}
              <span style={{ fontWeight: "normal" }}>£{income.toFixed(2)}</span>
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                mb: "10px",
                fontWeight: "bold",
                color: "var(--text-color)",
              }}
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
              {totalExpenses === 0 ? (
                "You have not entered any expenses to analyse."
              ) : exactlyBudgeted ? (
                "Your expenses are all accounted for."
              ) : (
                <>
                  <Typography variant="body1" fontWeight="bold">
                    You are spending
                  </Typography>
                  <span style={deltaAmountStyle}>
                    £{formattedDelta}
                    {overBudget ? (
                      <ArrowUpwardIcon style={{ verticalAlign: "middle" }} />
                    ) : (
                      <ArrowDownwardIcon style={{ verticalAlign: "middle" }} />
                    )}
                  </span>
                  {overBudget
                    ? "more than you earn."
                    : "less than your income."}
                </>
              )}
            </Typography>
          </div>
        </div>

        <div
          style={{
            width: "calc(2 / 3 * 100%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <div style={chartContainerStyle}>
            <Doughnut data={chartData} options={chartOptions} />
            {doghnutCenterText}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              paddingLeft: "20px",
              justifyContent: "center",
              gap: "0.5rem",
            }}
          >
            {chartData.labels.map((label, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginTop: "0.5rem",
                }}
              >
                <span
                  style={{
                    height: "15px",
                    width: "15px",
                    display: "inline-block",
                    backgroundColor:
                      chartData.datasets[0].backgroundColor[index],
                    borderRadius: "50%",
                  }}
                ></span>
                <Typography
                  variant="body2"
                  style={{
                    textAlign: "left",
                    color: "var(--text-color)",
                    fontSize: "1rem",
                  }}
                >
                  {label}
                </Typography>
              </div>
            ))}
          </div>
        </div>
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

                if (!categoryMapping[categoryKey]) {
                  console.error(
                    `No category mapping found for key: ${categoryKey}`
                  );
                  return null;
                }

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
                      <Tooltip
                        title={categoryMapping[categoryKey].join(", ")}
                        placement="top"
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <InfoIcon
                            fontSize="small"
                            style={{ marginBottom: "2px" }}
                          />
                          <span>{formatName(categoryKey)}</span>
                        </div>
                      </Tooltip>
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
                        fontWeight: "bold",
                        fontStyle: "italic",
                        backgroundColor: "var(--table-header-difference)",
                        color: "var(--text-color)",
                      }}
                    >
                      {userExpense === systemBudget
                        ? "—"
                        : userExpense > systemBudget
                        ? `(${Math.abs(deltaValue).toFixed(2)})`
                        : Math.abs(deltaValue).toFixed(2)}
                      <Typography
                        variant="caption"
                        sx={{ display: "block", mt: 1 }}
                      >
                        {userExpense === systemBudget
                          ? "On Budget"
                          : userExpense > systemBudget
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
