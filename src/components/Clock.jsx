import { useEffect, useState } from "react";

const timezones = [
  { name: "sg", timezone: "Asia/Singapore" },
  { name: "sf", timezone: "America/Los_Angeles" },
  { name: "nyc", timezone: "America/New_York" },
  { name: "tokyo", timezone: "Asia/Tokyo" },
];

const Clock = () => {
  const [currentTimezone, setCurrentTimezone] = useState(0);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const current = timezones[currentTimezone];

  return (
    <button
      onClick={() => setCurrentTimezone((prev) => (prev + 1) % timezones.length)}
      className="cursor-pointer tabular-nums transition-colors hover:text-(--ink)"
      title="Click to switch timezone"
    >
      {current.name}{" "}
      {time.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: current.timezone,
      })}
    </button>
  );
};

export default Clock;
