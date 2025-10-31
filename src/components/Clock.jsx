import { useEffect, useState } from "react";

const timezones = [
  { name: 'Singapore', flag: '🇸🇬', timezone: 'Asia/Singapore' },
  { name: 'New York', flag: '🇺🇸', timezone: 'America/New_York' },
  { name: 'Tokyo', flag: '🇯🇵', timezone: 'Asia/Tokyo' },
  { name: 'Sydney', flag: '🇦🇺', timezone: 'Australia/Sydney' }
];

const Clock = () => {
  const [currentTimezone, setCurrentTimezone] = useState(0);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleTimezoneClick = () => {
    setCurrentTimezone((prev) => (prev + 1) % timezones.length);
  };

  const formatTime = (date, timezone) => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      timeZone: timezone
    });
  };

  const current = timezones[currentTimezone];

  return (
    <button
      onClick={handleTimezoneClick}
      className="text-sm text-gray-400 light:text-gray-500 font-mono hover:text-violet-400 transition-colors cursor-pointer"
      title={`Click to switch timezone (Current: ${current.name})`}
    >
      <span className="mr-1">{current.flag}</span>
      {formatTime(time, current.timezone)}
    </button>
  );
};

export default Clock;