import { Link } from "react-router-dom";
import Clock from "./Clock";

const Header = () => {
  return (
    <header className="w-full py-4 border-b border-gray-700">
      <div className="max-w-screen-md mx-auto px-6 flex items-center">
    
        {/* LEFT: Emoji */}
        <div className="text-xl pr-1">🇸🇬</div><Clock />

        {/* RIGHT: Navigation Links */}
        <nav className="flex gap-6 text-sm font-semibold text-gray-400 mx-auto md:w-1/3">
          <a href="/" className="hover:text-violet-400">Home</a>
          <a href="/showcase" className="hover:text-violet-400">Showcase</a>
          <a href="/blog" className="hover:text-violet-400">Blog</a>
        </nav>
    
      </div>
    </header>
  )
}

export default Header;