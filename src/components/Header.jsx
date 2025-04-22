import Clock from "./Clock";
import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
    <header className="w-full py-4 border-b border-gray-700">
      <div className="max-w-screen-md mx-auto px-6 flex items-center">
    
        {/* LEFT: Emoji */}
        <div className="text-xl pr-1">🇸🇬</div><Clock />

        {/* RIGHT: Navigation Links */}
        <nav className="flex gap-6 text-sm font-semibold text-gray-400 light:text-gray-500 mx-auto md:w-1/4">
          <a href="/" className="hover:text-violet-400">Home</a>
          <a href="/showcase" className="hover:text-violet-400">Showcase</a>
          <a href="/blog" className="hover:text-violet-400">Blog</a>
        </nav>

        <ThemeToggle />
      </div>
    </header>
  )
}

export default Header;