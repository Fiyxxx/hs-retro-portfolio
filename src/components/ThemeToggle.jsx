import { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(theme);
  }, [theme]);

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex items-center w-14 h-7 rounded-full bg-gray-700 light:bg-yellow-300 transition-colors duration-300 px-1 cursor-pointer"
      aria-label="Toggle theme"
    >
      {/* Sun icon (left) */}
      <span className="absolute left-1.5 text-xs select-none">
        ☀️
      </span>
      {/* Moon icon (right) */}
      <span className="absolute right-1.5 text-xs select-none">
        🌙
      </span>
      {/* Sliding knob */}
      <span
        className={`absolute w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out ${
          isDark ? "translate-x-7" : "translate-x-0"
        }`}
      />
    </button>
  );
};

export default ThemeToggle;
