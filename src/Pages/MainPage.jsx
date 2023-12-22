import React from "react";
import { Card, Grid, CardContent, Typography, Button } from "@mui/material";
import { BudgetingSystems } from "../Components/BudgetSystemInfo";
import ArrowForward from "@mui/icons-material/ArrowForward";

const MainPage = () => {
  const handleGetStarted = () => {
    window.location.href = "/budget";
  };
  return (
    <div className="mainPage">
      <h1>Welcome to the Budgeting System App</h1>
      <Grid
        container
        spacing={1}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          marginBottom: "20px",
          marginTop: "20px",
        }}
      >
        {BudgetingSystems.map((system, id) => (
          <Grid item md={3} key={id}>
            <Card sx={{ minHeight: "500px", minWidth: "300px" }}>
              <CardContent>
                <h4>{system.name}</h4>
                <p>{system.description}</p>
                <ul>
                  {system.system.map((account, index) => (
                    <li key={account.id || index}>
                      <strong>{account.name}:</strong> {account.description}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <button className="button" onClick={handleGetStarted}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          Get Started
          <ArrowForward sx={{ paddingLeft: "5px" }} />
        </div>
      </button>
    </div>
  );
};

export default MainPage;
