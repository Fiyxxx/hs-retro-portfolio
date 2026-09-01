import profilePic from "../assets/avatar-cutout.png";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FiFileText, FiMail } from "react-icons/fi";
import DitheredPortrait from "./DitheredPortrait";

const links = [
  { label: "LinkedIn", href: "https://linkedin.com/in/goh-han-sheng", icon: FaLinkedinIn },
  { label: "GitHub", href: "https://github.com/Fiyxxx", icon: FaGithub },
  { label: "Email", href: "mailto:gohhansheng@outlook.com", icon: FiMail },
  { label: "Resume", href: "/resume.pdf", download: true, icon: FiFileText },
];

const Hero = () => {
  return (
    <section className="grid w-full grid-cols-[minmax(0,1fr)_8.25rem] items-start gap-6 py-10 sm:grid-cols-[minmax(0,1fr)_11.5rem] sm:gap-2 sm:py-12">
        <div className="flex min-w-0 flex-col items-start text-left">
          <h1 className="flex flex-wrap items-baseline gap-x-2 text-[30px] font-semibold leading-none tracking-[-0.025em] text-(--ink)">
            Han Sheng
            <span className="text-[15px] font-normal tracking-normal text-(--muted)">(Hans)</span>
          </h1>
          <p className="mt-4 text-[14px] leading-[1.65] text-(--muted)">
            <strong className="font-semibold text-(--accent)">hi, i&apos;m han sheng/hans.</strong>{" "}
            currently super interested in{" "}
            <strong className="font-semibold text-(--accent)">
              browser agents, harnesses, cybersecurity
            </strong>{" "}
            and how i can build a better world with ai. i study computing in national university
            of singapore (nus), but more than that, i love{" "}
            <strong className="font-semibold text-(--accent)">entrepreneurship</strong> and{" "}
            <strong className="font-semibold text-(--accent)">bartending</strong>. looking for tech
            roles in silicon valley rn (for jan 27 onwards), reach out to me for a chat or if you
            need a bartender ;)
          </p>
          <div className="mt-5 flex items-center gap-4">
            {links.map(({ icon: Icon, ...link }) => (
              <a
                key={link.label}
                target={link.download ? undefined : "_blank"}
                rel={link.download ? undefined : "noopener noreferrer"}
                download={link.download}
                href={link.href}
                aria-label={link.label}
                title={link.label}
                className={`text-(--muted) transition-colors hover:text-(--ink) ${
                  link.download ? "relative" : ""
                }`}
              >
                <Icon size={17} />
                {link.download && (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 112 48"
                    className="resume-callout pointer-events-none absolute left-[calc(100%-5px)] top-[-2px] hidden w-28 overflow-visible text-(--muted) sm:block"
                  >
                    <path
                      d="M29 31C20 30 14 25 8 18M8 18l3 8M8 18l8 1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <text x="34" y="37" fill="currentColor">
                      my résumé
                    </text>
                  </svg>
                )}
              </a>
            ))}
          </div>
        </div>

        <DitheredPortrait src={profilePic} alt="Illustrated portrait of Han Sheng" />
    </section>
  );
};

export default Hero;
