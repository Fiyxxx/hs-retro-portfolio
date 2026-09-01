import { useState } from "react";

export const useHoverPreview = () => {
  const [hovered, setHovered] = useState(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  const trackCursor = (event) => {
    setCursor({ x: event.clientX, y: event.clientY });
  };

  const showPreview = (index, event) => {
    trackCursor(event);
    setHovered(index);
  };

  return { hovered, setHovered, cursor, trackCursor, showPreview };
};
