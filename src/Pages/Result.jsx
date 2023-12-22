import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import JARSResultsDisplay from "../Components/JarsResultsDisplay";
import { categorizeExpenses } from "../Utils/categoriseExpenses";

const DisplayResult = () => {
  const location = useLocation();
  const { jarsAllocation } = location.state || {};
  const income = sessionStorage.getItem("income");
  const expenses = JSON.parse(sessionStorage.getItem("expenses") || "{}");
  console.log("Parsed Expenses", expenses);
  const userExpenses = categorizeExpenses(expenses, parseFloat(income));
  return (
    <Paper elevation={3} sx={{ padding: "2rem", borderRadius: "8px" }}>
      <Typography variant="h4">
        Your Budget based on the SELECTION system
      </Typography>
      <Grid
        container
        sx={{ display: "flex", flexDirection: "row", mt: "40px" }}
      >
        <Grid item xs={6}>
          <Typography sx={{ mb: "20px" }}>JARS System Budget</Typography>
          {jarsAllocation && (
            <JARSResultsDisplay
              jarsAllocation={jarsAllocation}
              income={income}
              userExpenses={expenses}
            />
          )}
        </Grid>
        <Grid item xs={6}>
          <Typography sx={{ mb: "20px" }}>Your Current Budget </Typography>
          {Object.keys(expenses).length > 0 ? (
            Object.entries(userExpenses).map(([category, percentage]) => (
              <Typography key={category}>
                {category}: {percentage}%
              </Typography>
            ))
          ) : (
            <Typography>You have no expenses input.</Typography>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default DisplayResult;
