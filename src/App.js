import Header from "./Components/Header";
import "./App.css";
import { ThemeProvider, useTheme } from "./ThemeContext";
import { Container } from "@mui/material";
import BudgetSystemSelector from "./Components/BudgetSystemSelector";
import MainPage from "./Pages/MainPage";
import Budget from "./Pages/Budget";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DisplayResult from "./Pages/Result";

function App() {
  return (
    <Container sx={{ margin: 0, maxWidth: "md", minWidth: "1029px" }}>
      <ThemeProvider>
        <Header />
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/result" element={<DisplayResult />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Container>
  );
}

export default App;
