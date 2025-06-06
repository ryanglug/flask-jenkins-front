import { useTheme } from "../../contexts/theme-context";
import { Classic } from "@theme-toggles/react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const handleToggle = () => {
    if (theme === "dark") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("dark");
    }
  };

  return (
    <Classic
      toggled={theme === "dark" ? true : false}
      onToggle={handleToggle}
      className="theme-toggler"
    />
  );
};

export default ThemeToggle;
