import Header from "./Components/Header";
import "./App.css";
import { ThemeProvider } from "./ThemeContext";
import { Container } from "@mui/material";
import MainPage from "./Pages/MainPage";
import Budget from "./Pages/Budget";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DisplayResult from "./Pages/Result";
import Layout from "./Styles/layout";
import { useTheme } from "@emotion/react";
import { CategoryMappingProvider } from "./CategoryMappingContext";
import { useState } from "react";

function App() {
  const theme = useTheme();
  const [budgetMethod, setBudgetMethod] = useState("JARS");

  const handleBudgetMethodChange = (newMethod) => {
    setBudgetMethod(newMethod);
  };

  return (
    <div
      className={theme}
      style={{
        backgroundColor: "var(--background-color)",
        minHeight: "100vh",
      }}
    >
      <Container
        sx={{
          minWidth: "1029px",
        }}
      >
        <ThemeProvider>
          <CategoryMappingProvider budgetMethod={budgetMethod}>
            <Layout>
              <Header />
              <Router>
                <Routes>
                  <Route path="/" element={<MainPage />} />
                  <Route
                    path="/budget"
                    element={
                      <Budget onBudgetMethodChange={handleBudgetMethodChange} />
                    }
                  />
                  <Route path="/result" element={<DisplayResult />} />
                </Routes>
              </Router>
            </Layout>
          </CategoryMappingProvider>
        </ThemeProvider>
      </Container>
    </div>
  );
}

export default App;
