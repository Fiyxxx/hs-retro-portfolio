import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Mark from "./Mark";
import { orgs } from "../data/orgs";

const org = (key) => {
  const { name, href, logo } = orgs[key];
  return { mark: { label: name, href, logos: [logo] } };
};
const accent = (text) => ({ accent: text });
const link = (label, href) => ({ mark: { label, href } });

// Each paragraph is a list of parts: plain strings and accents are revealed
// word by word, marks (logo + link) are revealed as a single token.
const paragraphs = [
  [
    "hi, i'm han sheng/hans. currently super interested in ",
    accent("agent infra"),
    ", ",
    accent("robotics"),
    ", ",
    accent("cybersecurity"),
    " and how i can build a better world with ai.",
  ],
  [
    "incoming at an ai robotics startup backed by ",
    org("yc"),
    ". i study computing at ",
    org("nus"),
    ", but more than that, i love ",
    accent("entrepreneurship"),
    ". in my free time, i love to ",
    accent("bartend"),
    ", so reach out for a chat or if you need a bartender ;)",
  ],
  [
    "say hi over ",
    link("email", "mailto:gohhansheng@outlook.com"),
    " or ",
    link("linkedin", "https://linkedin.com/in/goh-han-sheng"),
    ", see what i'm building on ",
    link("github", "https://github.com/Fiyxxx"),
    ", grab my ",
    link("résumé", "/resume.pdf"),
    ", or read my ",
    { route: { label: "writing", to: "/writing" } },
    ".",
  ],
];

const tokenize = (part) => {
  if (typeof part === "string" || part.accent) {
    const text = typeof part === "string" ? part : part.accent;
    return text.split(/(\s+)/).filter(Boolean).map((word) =>
      /^\s+$/.test(word) ? word : { word, accent: Boolean(part.accent) },
    );
  }
  return [part];
};

const Token = ({ token }) => {
  if (token.mark) return <Mark {...token.mark} />;
  if (token.route) {
    return (
      <Link to={token.route.to} className="mark">
        <span className="link">{token.route.label}</span>
      </Link>
    );
  }
  return token.accent ? <strong className="font-semibold text-(--accent)">{token.word}</strong> : token.word;
};

const Intro = () => {
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
      const progress = Math.min((timestamp - startedAt) / 1400, 1);
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
    <section ref={introRef} className="flex flex-col gap-4">
      <h1 className="sr-only">Han Sheng</h1>
      {paragraphs.map((parts, paragraphIndex) => (
        <p key={paragraphIndex}>
          {parts.flatMap(tokenize).map((token, tokenIndex) =>
            typeof token === "string" ? (
              token
            ) : (
              <span key={tokenIndex} data-intro-token className="intro-token">
                <Token token={token} />
              </span>
            ),
          )}
        </p>
      ))}
    </section>
  );
};

export default Intro;
