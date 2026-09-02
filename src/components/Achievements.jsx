import Section from "./ui/Section";
import CursorPolaroid from "./CursorPolaroid";
import { useHoverPreview } from "../hooks/useHoverPreview";
import { achievements } from "../data/achievements";

const Achievements = () => {
  const { hovered, setHovered, cursor, trackCursor, showPreview } = useHoverPreview();

  return (
    <div className="relative">
      <Section id="achievements" title="Achievements">
        <div className="relative" onMouseLeave={() => setHovered(null)}>
          <div className="pointer-events-none absolute inset-y-0 right-[calc(100%+12px)] hidden items-center gap-2 text-(--muted) min-[1000px]:flex">
            <span className="polaroid-brace-label whitespace-nowrap">hover for polaroids</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 32 200"
              preserveAspectRatio="none"
              className="h-full w-7 overflow-visible"
            >
              <path
                d="M30 2C14 2 14 22 14 42V78C14 92 9 99 2 100C9 101 14 108 14 122V158C14 178 14 198 30 198"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>

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
    </div>
  );
};

export default Achievements;
