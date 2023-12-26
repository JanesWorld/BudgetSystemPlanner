import ReactSwitch from "react-switch";
import { useTheme } from "../ThemeContext";
import { Container } from "@mui/material";

const Header = () => {
  const { toggleTheme, theme } = useTheme();

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
          offColor="#6750a4"
        />
      </label>
    </Container>
  );
};

export default Header;
