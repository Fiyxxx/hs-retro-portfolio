import { useEffect, useRef } from "react";
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
    ", and will be in sf for the whole of 2027. i study computing at ",
    org("nus"),
    ", but more than that, i love ",
    accent("entrepreneurship"),
    " and ",
    accent("bartending"),
    ". in my free time, i make a mean cocktail, so reach out for a ",
    link("chat", "https://linkedin.com/in/goh-han-sheng"),
    " or if you need a bartender ;)",
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
    <section ref={introRef} className="flex flex-col gap-2.5">
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
