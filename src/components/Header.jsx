import Clock from "./Clock";
import NavSwitch from "./NavSwitch";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-(--rule) bg-(--paper)/95 py-4">
      <div className="mx-auto flex w-full max-w-[640px] items-center justify-between gap-4 px-5 sm:px-6">
        <Clock />
        <NavSwitch />
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
