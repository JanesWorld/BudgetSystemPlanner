import ReactSwitch from "react-switch";
import { useTheme } from "../ThemeContext";
import { Container } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const Header = () => {
  const { toggleTheme, theme } = useTheme();
  const moonColor = "black";
  const sunColor = "#ffd54f";

  return (
    <Container
      className="header"
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        margin: 0,
        paddingTop: "1rem",
      }}
    >
      <label
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <span style={{ marginRight: "1rem" }}>
          {theme === "light" ? "Light Mode" : "Dark Mode"}
        </span>
        <ReactSwitch
          onChange={toggleTheme}
          checked={theme === "dark"}
          height={25}
          onColor="#d0bcff"
          checkedIcon={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: moonColor,
              }}
            >
              <DarkModeIcon />
            </div>
          }
          uncheckedIcon={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: sunColor,
              }}
            >
              <LightModeIcon />
            </div>
          }
          offColor="#6750a4"
        />
      </label>
    </Container>
  );
};

export default Header;
