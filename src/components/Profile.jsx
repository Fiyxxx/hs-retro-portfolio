import { Link } from "react-router-dom";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FiFileText, FiMail } from "react-icons/fi";
import avatar from "../assets/avatar.jpg";

const links = [
  { label: "linkedin", href: "https://linkedin.com/in/goh-han-sheng", icon: FaLinkedinIn },
  { label: "github", href: "https://github.com/Fiyxxx", icon: FaGithub },
  { label: "email", href: "mailto:gohhansheng@outlook.com", icon: FiMail },
  { label: "résumé", href: "/resume.pdf", icon: FiFileText },
];

const Profile = () => {
  return (
    <div className="reveal-early mb-6 flex items-end gap-4">
      <img src={avatar} alt="Han Sheng" className="size-14" />
      <div className="flex items-center gap-3.5 text-(--muted)">
        {links.map(({ icon: Icon, ...link }) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            title={link.label}
            className="transition-colors hover:text-(--ink)"
          >
            <Icon size={14} />
          </a>
        ))}
        <Link to="/writing" className="ml-1 text-[12px] transition-colors hover:text-(--ink)">
          writing →
        </Link>
      </div>
    </div>
  );
};

export default Profile;
