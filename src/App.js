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

function App() {
  const theme = useTheme();

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
          // margin: 0,
          // maxWidth: "md",
          minWidth: "1029px",
          // backgroundColor: "red",
        }}
      >
        <ThemeProvider>
          <Layout>
            <Header />
            <Router>
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/budget" element={<Budget />} />
                <Route path="/result" element={<DisplayResult />} />
              </Routes>
            </Router>
          </Layout>
        </ThemeProvider>
      </Container>
    </div>
  );
}

export default App;
