import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { getTileTheme } from "../utils/tileTheme";

const CARD_WIDTH = 216;
const CARD_HEIGHT = 194;
const CURSOR_GAP = 22;
const VIEWPORT_PADDING = 12;

const itemLabel = (item) => item?.title ?? item?.name ?? "";

const cardPosition = ({ x, y }) => {
  const placeLeft = x + CURSOR_GAP + CARD_WIDTH > window.innerWidth - VIEWPORT_PADDING;
  const placeAbove = y + CURSOR_GAP + CARD_HEIGHT > window.innerHeight - VIEWPORT_PADDING;

  const cardX = placeLeft ? x - CARD_WIDTH - CURSOR_GAP : x + CURSOR_GAP;
  const cardY = placeAbove ? y - CARD_HEIGHT - CURSOR_GAP : y + CURSOR_GAP;

  return {
    x: Math.max(
      VIEWPORT_PADDING,
      Math.min(cardX, window.innerWidth - CARD_WIDTH - VIEWPORT_PADDING),
    ),
    y: Math.max(
      VIEWPORT_PADDING,
      Math.min(cardY, window.innerHeight - CARD_HEIGHT - VIEWPORT_PADDING),
    ),
  };
};

const CursorPolaroid = ({ items, hovered, cursor }) => {
  const item = hovered === null ? null : items[hovered];
  const label = itemLabel(item);
  const theme = item ? getTileTheme(label) : null;
  const position = item ? cardPosition(cursor) : cursor;
  const rotation = label ? (label.length % 5) - 2 : 0;

  return createPortal(
    <AnimatePresence>
      {item && (
        <motion.figure
          key="cursor-polaroid"
          aria-hidden="true"
          initial={{
            opacity: 0,
            scale: 0.96,
            rotate: rotation,
            x: position.x,
            y: position.y,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: rotation,
            x: position.x,
            y: position.y,
          }}
          exit={{ opacity: 0, scale: 0.94, rotate: rotation + 1 }}
          transition={{
            opacity: { duration: 0.14 },
            scale: { duration: 0.18 },
            rotate: { duration: 0.18 },
            x: { type: "spring", stiffness: 560, damping: 38, mass: 0.35 },
            y: { type: "spring", stiffness: 560, damping: 38, mass: 0.35 },
          }}
          className="pointer-events-none fixed left-0 top-0 z-50 hidden w-[216px] border border-black/10 bg-[#fffdf8] p-2.5 pb-3 shadow-[0_16px_40px_rgba(0,0,0,0.28)] sm:block"
        >
          {item.image ? (
            <img
              src={item.image}
              alt=""
              className="h-36 w-full bg-neutral-200 object-cover"
            />
          ) : (
            <div
              className="flex h-36 w-full items-center justify-center"
              style={{ background: theme.background }}
            >
              <span className="text-3xl font-semibold text-white/90">{theme.initials}</span>
            </div>
          )}
          <figcaption className="polaroid-caption mt-1.5 truncate px-1 text-center text-[#29251f]">
            {item.caption ?? label}
          </figcaption>
        </motion.figure>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default CursorPolaroid;
