import { Link, useLocation } from "react-router-dom";
import Clock from "./Clock";
import ThemeToggle from "./ThemeToggle";

const pages = [
  { to: "/", label: "home" },
  { to: "/writing", label: "writing" },
];

const Footer = () => {
  const { pathname } = useLocation();
  const onWriting = pathname.startsWith("/writing") || pathname.startsWith("/blog");

  return (
    <footer className="reveal mt-10 flex items-center justify-between gap-4 text-[13px] text-(--muted)">
      <nav className="flex gap-4">
        {pages.map((page) => {
          const active = (page.to === "/writing") === onWriting;
          return (
            <Link
              key={page.to}
              to={page.to}
              aria-current={active ? "page" : undefined}
              className={active ? "text-(--ink)" : "transition-colors hover:text-(--ink)"}
            >
              {page.label}
            </Link>
          );
        })}
      </nav>
      <div className="flex items-center gap-4">
        <Clock />
        <ThemeToggle />
      </div>
    </footer>
  );
};

export default Footer;
