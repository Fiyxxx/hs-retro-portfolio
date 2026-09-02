import { useEffect, useState } from "react";
const PROFILE_URL = "https://github.com/Fiyxxx";
const CONTRIBUTIONS_URL = "https://github-contributions-api.jogruber.de/v4/Fiyxxx?y=last";
const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  year: "numeric",
});
const EMPTY_DAYS = Array.from({ length: 371 }, (_, index) => ({
  date: "",
  count: 0,
  level: 0,
  key: `empty-${index}`,
}));

const GitHubContributions = () => {
  const [activity, setActivity] = useState({ contributions: EMPTY_DAYS, total: null });
  const [hoveredDay, setHoveredDay] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch(CONTRIBUTIONS_URL, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Could not load GitHub contributions");
        return response.json();
      })
      .then((data) => {
        setActivity({
          contributions: data.contributions.slice(-371),
          total: data.total.lastYear,
        });
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setActivity({ contributions: EMPTY_DAYS, total: undefined });
        }
      });

    return () => controller.abort();
  }, []);

  return (
    <section className="mt-5 w-full max-w-[184px] sm:w-[34.5rem] sm:max-w-none" aria-label="GitHub activity">
      <div className="mb-2 flex flex-nowrap items-baseline justify-between gap-2 whitespace-nowrap">
        <a
          href={PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[12px] font-semibold text-(--ink) transition-colors hover:text-(--accent)"
        >
          contributions
        </a>
        <span className="whitespace-nowrap text-[9px] text-(--muted)">
          {activity.total === null ? (
            "loading…"
          ) : activity.total === undefined ? (
            "— this year"
          ) : (
            <>
              <strong className="font-semibold text-[#4774d5]">{activity.total}</strong> this year
            </>
          )}
        </span>
      </div>

      <div
        className="github-contributions-grid"
        aria-label={`${activity.total ?? 0} GitHub contributions in the last year`}
        onMouseLeave={() => setHoveredDay(null)}
      >
        <div className="github-contributions-cells">
          {activity.contributions.map((day, index) => (
            <span
              key={day.date || day.key || index}
              className={`github-contribution-level-${day.level}`}
              title={day.date ? `${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}` : undefined}
              onMouseEnter={() => day.date && setHoveredDay(day)}
            />
          ))}
        </div>
      </div>

      <div className="mt-2 flex min-h-3 items-center justify-between gap-3 text-[8px] text-(--muted)">
        <span aria-live="polite" className="whitespace-nowrap">
          {hoveredDay
            ? `${hoveredDay.count} contribution${hoveredDay.count === 1 ? "" : "s"} · ${dateFormatter.format(new Date(`${hoveredDay.date}T00:00:00`))}`
            : "\u00a0"}
        </span>
        <div className="flex shrink-0 items-center gap-1" aria-label="Contribution intensity from less to more">
          <span className="mr-0.5">less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <span key={level} className={`github-contribution-swatch github-contribution-level-${level}`} />
          ))}
          <span className="ml-0.5">more</span>
        </div>
      </div>
    </section>
  );
};

export default GitHubContributions;
