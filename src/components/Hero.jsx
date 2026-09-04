import { useEffect, useRef } from "react";
import profilePic from "../assets/avatar-cutout.png";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FiFileText, FiMail } from "react-icons/fi";
import DitheredPortrait from "./DitheredPortrait";
import GitHubContributions from "./GitHubContributions";

const links = [
  { label: "LinkedIn", href: "https://linkedin.com/in/goh-han-sheng", icon: FaLinkedinIn },
  { label: "GitHub", href: "https://github.com/Fiyxxx", icon: FaGithub },
  { label: "Email", href: "mailto:gohhansheng@outlook.com", icon: FiMail },
  { label: "Resume", href: "/resume.pdf", resume: true, icon: FiFileText },
];

const introSegments = [
  { text: "hi, i'm han sheng/hans. ", accent: true },
  { text: "currently super interested in " },
  { text: "browser agents, harnesses, cybersecurity", accent: true },
  {
    text: " and how i can build a better world with ai. i study computing in national university of singapore (nus), but more than that, i love ",
  },
  { text: "entrepreneurship", accent: true },
  { text: " and " },
  { text: "bartending", accent: true },
  { text: ". looking for " },
  { text: "tech roles", accent: true },
  { text: " in " },
  { text: "silicon valley", accent: true },
  { text: " rn (for jan 27 onwards), reach out to me for a chat or if you need a bartender ;)" },
];

const introText = introSegments.map(({ text }) => text).join("");

const TypedIntro = () => {
  const introRef = useRef(null);

  useEffect(() => {
    const tokens = Array.from(introRef.current?.querySelectorAll("[data-intro-token]") ?? []);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      tokens.forEach((token) => token.classList.add("is-visible"));
      return undefined;
    }

    let animationFrame;
    let startedAt;
    let visibleTokens = 0;

    const revealTokens = (timestamp) => {
      startedAt ??= timestamp;
      const progress = Math.min((timestamp - startedAt) / 1100, 1);
      const nextVisibleCount = Math.ceil(progress * tokens.length);

      while (visibleTokens < nextVisibleCount) {
        tokens[visibleTokens].classList.add("is-visible");
        visibleTokens += 1;
      }

      if (progress < 1) animationFrame = requestAnimationFrame(revealTokens);
    };

    animationFrame = requestAnimationFrame(revealTokens);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <p
      ref={introRef}
      aria-label={introText}
      className="col-span-2 mt-4 text-[14px] leading-[1.65] text-(--muted) sm:col-span-1 sm:col-start-1 sm:row-start-2"
    >
      <span aria-hidden="true">
        {introSegments.map((segment, segmentIndex) => {
          const Segment = segment.accent ? "strong" : "span";

          return (
            <Segment
              key={`${segmentIndex}-${segment.text}`}
              className={segment.accent ? "font-semibold text-(--accent)" : undefined}
            >
              {segment.text.split(/(\s+)/).map((token, tokenIndex) => {
                if (/^\s+$/.test(token)) return token;

                return (
                  <span
                    key={`${segmentIndex}-${tokenIndex}`}
                    data-intro-token
                    className="intro-token whitespace-nowrap"
                  >
                    {token}
                  </span>
                );
              })}
            </Segment>
          );
        })}
      </span>
    </p>
  );
};

const Hero = () => {
  return (
    <section className="grid w-full grid-cols-[minmax(0,1fr)_7rem] items-start gap-x-4 pt-10 pb-2.5 sm:grid-cols-[minmax(0,1fr)_11.5rem] sm:gap-x-2 sm:pt-12 sm:pb-3.5">
      <h1 className="flex min-w-0 flex-wrap items-baseline gap-x-2 text-[30px] font-semibold leading-none tracking-[-0.025em] text-(--ink)">
        Han Sheng
        <span className="text-[15px] font-normal tracking-normal text-(--muted)">(Hans)</span>
      </h1>

      <div className="relative col-start-2 row-start-1 w-full max-w-[112px] justify-self-end sm:row-span-2 sm:max-w-[184px]">
        <DitheredPortrait src={profilePic} alt="Illustrated portrait of Han Sheng" />
        <svg
          aria-hidden="true"
          viewBox="0 0 112 56"
          className="portrait-callout pointer-events-none absolute left-[calc(100%-4px)] top-5 hidden w-28 overflow-visible text-(--muted) min-[840px]:block"
        >
          <path
            d="M87 28C62 20 37 23 8 28M8 28l8-6M8 28l8 5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text x="88" y="33" fill="currentColor">
            me!
          </text>
        </svg>
      </div>

      <TypedIntro />

      <div className="col-span-2 mt-5 flex flex-row items-start gap-5 sm:col-span-1 sm:col-start-1 sm:row-start-3 sm:flex-col sm:gap-3">
        {links.map(({ icon: Icon, ...link }) => (
          <a
            key={link.label}
            target="_blank"
            rel="noopener noreferrer"
            href={link.href}
            aria-label={link.label}
            title={link.label}
            className={`text-(--muted) transition-colors hover:text-(--ink) ${
              link.resume ? "relative" : ""
            }`}
          >
            <Icon size={17} />
            {link.resume && (
              <svg
                aria-hidden="true"
                viewBox="0 0 112 48"
                className="resume-callout pointer-events-none absolute right-[calc(100%-5px)] top-[-10px] hidden w-28 overflow-visible text-(--muted) min-[840px]:block"
              >
                <path
                  d="M72 31C82 30 92 25 104 18M104 18l-8 1M104 18l-3 8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <text x="2" y="37" fill="currentColor">
                  my résumé
                </text>
              </svg>
            )}
          </a>
        ))}
      </div>

      <GitHubContributions />
    </section>
  );
};

export default Hero;
