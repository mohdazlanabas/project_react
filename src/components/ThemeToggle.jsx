import Button from "./Button.jsx";
import { useTheme } from "../context/ThemeContext.jsx";

export default function ThemeToggle() {
  const { isLight, toggleTheme } = useTheme();
  return (
    <Button onClick={toggleTheme}>
      Theme: {isLight ? "Light" : "Dark"} (useContext)
    </Button>
  );
}
