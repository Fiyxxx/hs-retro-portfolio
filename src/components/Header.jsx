import { Link } from 'react-router-dom';
import Clock from "./Clock";
import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
    <header className="w-full py-4 border-b border-gray-700">
      <div className="max-w-screen-md mx-auto px-6 flex items-center">

        {/* LEFT: Clock */}
        <div className="flex items-center text-xl pr-4">
          <Clock />
        </div>

        {/* CENTER: Navigation */}
        <nav className="flex gap-6 text-sm font-semibold text-gray-400 light:text-gray-500 mx-auto md:w-1/4">
          <Link to="/" className="hover:text-violet-400">Home</Link>
          <Link to="/showcase" className="hover:text-violet-400">Showcase</Link>
          <Link to="/blog" className="hover:text-violet-400">Blog</Link>
        </nav>

        {/* RIGHT: Theme Toggle */}
        <ThemeToggle />
      </div>
    </header>
  )
}

export default Header;