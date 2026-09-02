import Section from "./ui/Section";
import CursorPolaroid from "./CursorPolaroid";
import { useHoverPreview } from "../hooks/useHoverPreview";
import { achievements } from "../data/achievements";

const Achievements = () => {
  const { hovered, setHovered, cursor, trackCursor, showPreview } = useHoverPreview();

  return (
    <div className="relative">
      <Section id="achievements" title="Achievements">
        <div onMouseLeave={() => setHovered(null)}>
          {achievements.map((item, index) => (
            <div
              key={item.name}
              onMouseEnter={(event) => showPreview(index, event)}
              onMouseMove={trackCursor}
              className="py-2 first:pt-0"
            >
              <div className="flex items-baseline justify-between gap-3">
                {item.link && item.link !== "#" ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[15px] font-semibold text-(--ink) transition-colors hover:text-(--accent)"
                  >
                    {item.name}
                  </a>
                ) : (
                  <div className="text-[15px] font-semibold text-(--ink)">{item.name}</div>
                )}
                {item.place && (
                  <span className="shrink-0 text-[13px] text-(--muted)">{item.place}</span>
                )}
              </div>
              <p className="text-[13px] leading-[19px] text-(--muted)">{item.content}</p>
            </div>
          ))}
        </div>

        <CursorPolaroid items={achievements} hovered={hovered} cursor={cursor} />
      </Section>

      <svg
        aria-hidden="true"
        viewBox="0 0 196 58"
        className="polaroid-callout pointer-events-none absolute left-[calc(100%-28px)] top-1/2 hidden w-48 -translate-y-1/2 overflow-visible text-(--muted) min-[1000px]:block"
      >
        <path
          d="M188 18C142 8 78 14 10 28M10 28l9-7M10 28l10 5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text x="48" y="51" fill="currentColor">
          hover for polaroids
        </text>
      </svg>
    </div>
  );
};

export default Achievements;
