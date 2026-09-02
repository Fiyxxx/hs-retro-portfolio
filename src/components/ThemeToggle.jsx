import { useState, useEffect, useRef } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

const ThemeToggle = () => {
  const activeTransition = useRef(null);
  const [theme, setTheme] = useState(() => {
    if (typeof document === "undefined") return "light";
    return document.documentElement.classList.contains("dark") ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(theme);
  }, [theme]);

  const isDark = theme === "dark";

  const commitTheme = (nextTheme) => {
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(nextTheme);
    setTheme(nextTheme);
  };

  const runTransition = (nextTheme, originPoint) => {
    const root = document.getElementById("root");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!root || reduceMotion || typeof root.animate !== "function") {
      commitTheme(nextTheme);
      return;
    }

    const ripple = document.createElement("div");
    const clone = root.cloneNode(true);
    ripple.className = "theme-ripple";
    ripple.dataset.rippleTheme = nextTheme;
    ripple.setAttribute("aria-hidden", "true");
    ripple.inert = true;
    clone.style.marginTop = `-${window.scrollY}px`;
    clone.querySelectorAll("[id]").forEach((element) => element.removeAttribute("id"));
    ripple.append(clone);
    document.body.append(ripple);

    const nextInk = getComputedStyle(ripple).getPropertyValue("--ink").trim();
    const sourceCanvases = root.querySelectorAll("canvas");
    clone.querySelectorAll("canvas").forEach((clonedCanvas, index) => {
      const sourceCanvas = sourceCanvases[index];
      if (!sourceCanvas) return;
      clonedCanvas.width = sourceCanvas.width;
      clonedCanvas.height = sourceCanvas.height;
      const themeFrame = sourceCanvas.createThemeFrame?.(nextTheme, nextInk) ?? sourceCanvas;
      clonedCanvas.getContext("2d")?.drawImage(themeFrame, 0, 0);
    });

    const origin = `${Math.round(originPoint.x)}px ${Math.round(originPoint.y)}px`;
    const animation = ripple.animate(
      [
        { clipPath: `circle(0 at ${origin})` },
        { clipPath: `circle(150vmax at ${origin})` },
      ],
      {
        duration: 730,
        easing: "cubic-bezier(.2, .7, .2, 1)",
        fill: "forwards",
      },
    );

    const transition = {
      animation,
      reversing: false,
      settling: false,
      pendingToggle: false,
      pendingOrigin: originPoint,
    };
    activeTransition.current = transition;

    animation.onfinish = () => {
      if (activeTransition.current !== transition) return;

      if (transition.reversing) {
        ripple.remove();
        activeTransition.current = null;
        return;
      }

      transition.settling = true;
      document.documentElement.classList.add("theme-transitioning");
      commitTheme(nextTheme);
      void document.body.offsetWidth;

      // The portrait is canvas-backed and repaints after the class mutation.
      // Keep the fully revealed clone above it for two complete paint frames so
      // the user never sees the old canvas or an in-between theme underneath.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          ripple.remove();
          document.documentElement.classList.remove("theme-transitioning");
          activeTransition.current = null;

          if (transition.pendingToggle) {
            const queuedTheme = nextTheme === "dark" ? "light" : "dark";
            requestAnimationFrame(() => runTransition(queuedTheme, transition.pendingOrigin));
          }
        });
      });
    };
  };

  const toggleTheme = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const originPoint = {
      x: event.clientX || bounds.left + bounds.width / 2,
      y: event.clientY || bounds.top + bounds.height / 2,
    };

    const transition = activeTransition.current;
    if (transition) {
      if (transition.settling) {
        transition.pendingToggle = !transition.pendingToggle;
        transition.pendingOrigin = originPoint;
        return;
      }

      transition.reversing = !transition.reversing;
      transition.animation.reverse();
      return;
    }

    runTransition(isDark ? "light" : "dark", originPoint);
  };

  return (
    <button
      onClick={toggleTheme}
      className="shrink-0 cursor-pointer text-(--muted) transition-colors hover:text-(--ink)"
      aria-label="Toggle theme"
      title={isDark ? "Use light theme" : "Use dark theme"}
    >
      {isDark ? <FiSun size={16} /> : <FiMoon size={16} />}
    </button>
  );
};

export default ThemeToggle;
