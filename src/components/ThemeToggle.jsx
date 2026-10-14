import { useRef, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

const FADE_MS = 500;

const ThemeToggle = () => {
  const fadeTimer = useRef(null);
  const [theme, setTheme] = useState(() =>
    document.documentElement.classList.contains("dark") ? "dark" : "light",
  );
  const isDark = theme === "dark";

  const toggleTheme = () => {
    const root = document.documentElement;
    const nextTheme = isDark ? "light" : "dark";

    // Colours are CSS variables, so a short global colour transition lets the
    // whole page ease into the other palette instead of snapping.
    root.classList.add("theme-fading");
    root.classList.remove("dark", "light");
    root.classList.add(nextTheme);
    setTheme(nextTheme);

    clearTimeout(fadeTimer.current);
    fadeTimer.current = setTimeout(() => root.classList.remove("theme-fading"), FADE_MS);
  };

  return (
    <button
      onClick={toggleTheme}
      className="cursor-pointer transition-colors hover:text-(--ink)"
      aria-label="Toggle theme"
      title={isDark ? "Use light theme" : "Use dark theme"}
    >
      {isDark ? <FiSun size={14} /> : <FiMoon size={14} />}
    </button>
  );
};

export default ThemeToggle;
