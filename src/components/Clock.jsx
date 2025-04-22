import { useEffect, useState } from "react";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date()); // update every second
    }, 1000);

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <div className="text-sm text-gray-400 light:text-gray-500 font-mono">
      {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
    </div>
  );
};

export default Clock;