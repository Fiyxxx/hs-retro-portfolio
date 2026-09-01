import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const links = [
  { to: "/", label: "Home" },
  { to: "/writing", label: "Writing" },
];

const NavSwitch = () => {
  const { pathname } = useLocation();
  const activeIndex = pathname.startsWith("/writing") ? 1 : 0;

  return (
    <nav className="flex gap-5 text-[13px]">
      {links.map((link, i) => {
        const isActive = i === activeIndex;
        return (
          <Link key={link.to} to={link.to} className="relative py-1">
            {isActive && (
              <motion.div
                layoutId="nav-pill"
                className="absolute inset-x-0 -bottom-[17px] h-[3px] bg-(--ink)"
                transition={{ type: "spring", stiffness: 320, damping: 32 }}
              />
            )}
            <span
              className={`relative z-10 block transition-colors ${
                isActive ? "font-bold text-(--ink)" : "font-medium text-(--muted) hover:text-(--ink)"
              }`}
            >
              {link.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

export default NavSwitch;
