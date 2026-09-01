import Section from "./ui/Section";
import CursorPolaroid from "./CursorPolaroid";
import { useHoverPreview } from "../hooks/useHoverPreview";
import { achievements } from "../data/achievements";

const Achievements = () => {
  const { hovered, setHovered, cursor, trackCursor, showPreview } = useHoverPreview();

  return (
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
  );
};

export default Achievements;
