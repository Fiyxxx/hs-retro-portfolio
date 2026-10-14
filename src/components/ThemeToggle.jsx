import { useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() =>
    document.documentElement.classList.contains("dark") ? "dark" : "light",
  );
  const isDark = theme === "dark";

  const toggleTheme = () => {
    const nextTheme = isDark ? "light" : "dark";
    const root = document.documentElement;
    const apply = () => {
      root.classList.remove("dark", "light");
      root.classList.add(nextTheme);
      setTheme(nextTheme);
    };

    // Cross-fade one snapshot of the whole page so every colour lands at once,
    // rather than each element running its own transition.
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduceMotion) {
      apply();
      return;
    }
    // Hover colour transitions would otherwise lag behind the swap.
    root.classList.add("theme-switching");
    document
      .startViewTransition(apply)
      .finished.finally(() => root.classList.remove("theme-switching"));
  };

  return (
    <button
      onClick={toggleTheme}
      className="cursor-pointer transition-colors hover:text-(--ink)"
      aria-label="Toggle theme"
      title={isDark ? "Use light theme" : "Use dark theme"}
    >
      {isDark ? <FiSun size={13} /> : <FiMoon size={13} />}
    </button>
  );
};

export default ThemeToggle;
