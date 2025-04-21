import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header className="w-full py-4 px-6 text-[#a1a1aa] text-sm font-semibold flex justify-center gap-10 border-b border-[#2a2a2a]">
      <Link to="/" className="hover:text-[#a78bfa] transition-colors">Home</Link>
      <Link to="/blog" className="hover:text-[#a78bfa] transition-colors">Blog</Link>
    </header>
  )
}

export default Header