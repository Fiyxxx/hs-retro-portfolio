const PALETTE = [
  ["#3478F6", "#9BD2F6"],
  ["#2F8FD9", "#5BADE8"],
  ["#1e4a30", "#5BAEEC"],
  ["#3D9CE5", "#86C6F4"],
  ["#0A84FF", "#5aadff"],
];

const hash = (str) => {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
};

export const getTileTheme = (title) => {
  const [from, to] = PALETTE[hash(title) % PALETTE.length];
  const initials = title
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

  return {
    background: `linear-gradient(135deg, ${from}, ${to})`,
    initials,
  };
};
