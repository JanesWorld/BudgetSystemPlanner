import { useTheme } from "../ThemeContext";

const Layout = ({ children }) => {
  const { theme } = useTheme();

  return <div className={`layout ${theme}`}>{children}</div>;
};

export default Layout;
