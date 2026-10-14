import { useEffect, useRef } from "react";

// An ASCII robot head, ray-marched from a few signed-distance shapes and drawn
// glyph by glyph onto a canvas. It turns to look at the cursor, glances with
// its eyes, blinks, and its antenna springs about when it moves or is clicked.
const COLS = 60;
const ROWS = 35;
const RAMP = ".,-~:;=!*#";
const VIEW = { x: 0, y: 0.16, half: 1.18 };
const LIGHT = normalize([-0.45, 0.65, -0.62]);
const MAX_STEPS = 40;
const HIT = 0.004;
const FAR = 6;
const EYE_X = 0.3;
const EYE_Y = 0.02;
const FACE_Z = -0.64;
const SOCKET_RADIUS = 0.2;
const SOCKET_DEPTH = 0.06;
const PUPIL_RADIUS = 0.12;
const IDLE_MS = 3500;

function normalize([x, y, z]) {
  const length = Math.hypot(x, y, z);
  return [x / length, y / length, z / length];
}

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const roundBox = (x, y, z, bx, by, bz, r) => {
  const qx = Math.abs(x) - bx;
  const qy = Math.abs(y) - by;
  const qz = Math.abs(z) - bz;
  const outside = Math.hypot(Math.max(qx, 0), Math.max(qy, 0), Math.max(qz, 0));
  return outside + Math.min(Math.max(qx, qy, qz), 0) - r;
};

// Capped cylinder: radial distance in (u, v), axial distance along w.
const cylinder = (u, v, w, radius, halfLength) => {
  const dr = Math.hypot(u, v) - radius;
  const dw = Math.abs(w) - halfLength;
  return Math.min(Math.max(dr, dw), 0) + Math.hypot(Math.max(dr, 0), Math.max(dw, 0));
};

const capsuleY = (x, y, z, height, radius) => {
  const t = clamp(y, 0, height);
  return Math.hypot(x, y - t, z) - radius;
};

const createScene = () => {
  const state = { lid: 1, glanceX: 0, glanceY: 0, swayX: 0, swayZ: 0 };

  const antenna = (x, y, z) => {
    // Rotate around the antenna's base so it can sway independently.
    let ax = x;
    let ay = y - 0.5;
    let az = z;
    const cz = Math.cos(state.swayZ);
    const sz = Math.sin(state.swayZ);
    [ax, ay] = [ax * cz + ay * sz, -ax * sz + ay * cz];
    const cx = Math.cos(state.swayX);
    const sx = Math.sin(state.swayX);
    [ay, az] = [ay * cx - az * sx, ay * sx + az * cx];
    const stalk = capsuleY(ax, ay, az, 0.3, 0.055);
    const ball = Math.hypot(ax, ay - 0.38, az) - 0.1;
    return { stalk, ball };
  };

  // Pupils are painted onto the flat socket floor rather than modelled, so
  // they stay clean ellipses from every angle; blinking squashes them flat.
  const onPupil = (x, y, side) => {
    const px = x - side * EYE_X - state.glanceX;
    const py = (y - EYE_Y - state.glanceY) / Math.max(state.lid, 0.08);
    return Math.hypot(px, py) < PUPIL_RADIUS;
  };

  const distance = (x, y, z) => {
    let d = roundBox(x, y + 0.1, z, 0.62, 0.48, 0.5, 0.14);
    for (const side of [-1, 1]) {
      // Ears are short cylinders along x; sockets and mouth are carved out.
      d = Math.min(d, cylinder(y + 0.1, z, x - side * 0.78, 0.17, 0.08));
      d = Math.max(d, -cylinder(x - side * EYE_X, y - EYE_Y, z - FACE_Z, SOCKET_RADIUS, SOCKET_DEPTH));
    }
    d = Math.max(d, -roundBox(x, y + 0.33, z - FACE_Z, 0.22, 0.035, 0.06, 0.02));
    const { stalk, ball } = antenna(x, y, z);
    return Math.min(d, stalk, ball);
  };

  const material = (x, y, z) => {
    for (const side of [-1, 1]) {
      const radial = Math.hypot(x - side * EYE_X, y - EYE_Y);
      if (radial < SOCKET_RADIUS + 0.005 && z > FACE_Z + 0.005) {
        const onFloor = z > FACE_Z + SOCKET_DEPTH - 0.01;
        return onFloor && onPupil(x, y, side) ? "pupil" : "socket";
      }
      // The socket's lip: blank only if it is wall, not the flat face around it.
      if (radial < SOCKET_RADIUS + 0.02 && z > FACE_Z - 0.003) return "rim";
    }
    if (Math.abs(x) < 0.25 && Math.abs(y + 0.33) < 0.06 && z > FACE_Z + 0.005) return "socket";
    if (Math.abs(x) < 0.26 && Math.abs(y + 0.33) < 0.075 && z > FACE_Z - 0.003) return "rim";
    if (antenna(x, y, z).ball < HIT * 4) return "ball";
    return "shell";
  };

  return { state, distance, material };
};

const renderFrame = (scene, yaw, pitch) => {
  const output = new Array(COLS * ROWS).fill(" ");
  // World -> head-local rotation: inverse of yaw (y axis) then pitch (x axis).
  const cy = Math.cos(yaw);
  const sy = Math.sin(yaw);
  const cp = Math.cos(pitch);
  const sp = Math.sin(pitch);
  const toLocal = (x, y, z) => {
    const x1 = x * cy - z * sy;
    const z1 = x * sy + z * cy;
    return [x1, y * cp + z1 * sp, -y * sp + z1 * cp];
  };
  const [dx, dy, dz] = toLocal(0, 0, 1);
  const light = toLocal(...LIGHT);

  for (let row = 0; row < ROWS; row += 1) {
    for (let col = 0; col < COLS; col += 1) {
      const wx = VIEW.x + ((col + 0.5) / COLS - 0.5) * 2 * VIEW.half;
      const wy = VIEW.y - ((row + 0.5) / ROWS - 0.5) * 2 * VIEW.half;
      let [ox, oy, oz] = toLocal(wx, wy, -3);
      let t = 0;
      let hit = false;

      for (let step = 0; step < MAX_STEPS && t < FAR; step += 1) {
        const d = scene.distance(ox + dx * t, oy + dy * t, oz + dz * t);
        if (d < HIT) {
          hit = true;
          break;
        }
        t += d;
      }
      if (!hit) continue;

      const px = ox + dx * t;
      const py = oy + dy * t;
      const pz = oz + dz * t;
      const kind = scene.material(px, py, pz);
      const index = col + row * COLS;

      if (kind === "pupil") {
        output[index] = "@";
        continue;
      }
      if (kind === "socket") continue;

      const e = 0.002;
      const nx = scene.distance(px + e, py, pz) - scene.distance(px - e, py, pz);
      const ny = scene.distance(px, py + e, pz) - scene.distance(px, py - e, pz);
      const nz = scene.distance(px, py, pz + e) - scene.distance(px, py, pz - e);
      const length = Math.hypot(nx, ny, nz) || 1;
      if (kind === "rim" && Math.abs(nz / length) < 0.7) continue;
      const diffuse = Math.max(0, (nx * light[0] + ny * light[1] + nz * light[2]) / length);
      const shade = kind === "ball" ? 1 : 0.18 + diffuse * 0.82;
      output[index] = RAMP[Math.min(RAMP.length - 1, Math.floor(shade * RAMP.length))];
    }
  }

  return output;
};

const RobotHead = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const scene = createScene();
    const head = { yaw: -0.35, pitch: 0.12, targetYaw: -0.35, targetPitch: 0.12 };
    const spring = { x: 0, z: 0, vx: 0, vz: 0 };
    let ink = "";
    let size = 0;
    let frameId = null;
    let visible = true;
    let lastPointer = -Infinity;
    let blinkStart = -Infinity;
    let nextBlink = performance.now() + 1800;
    let lastDrawn = "";

    const readInk = () => {
      ink = getComputedStyle(canvas).color;
    };

    const fitCanvas = () => {
      size = canvas.clientWidth;
      const scale = window.devicePixelRatio || 1;
      canvas.width = Math.round(size * scale);
      canvas.height = Math.round(size * scale);
      ctx.setTransform(scale, 0, 0, scale, 0, 0);
    };

    const draw = () => {
      const cells = renderFrame(scene, head.yaw, head.pitch);
      const cellW = size / COLS;
      const cellH = size / ROWS;
      ctx.clearRect(0, 0, size, size);
      ctx.fillStyle = ink;
      ctx.font = `${cellH * 1.1}px ui-monospace, "SF Mono", Menlo, monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (let index = 0; index < cells.length; index += 1) {
        if (cells[index] === " ") continue;
        const col = index % COLS;
        const row = (index - col) / COLS;
        ctx.fillText(cells[index], (col + 0.5) * cellW, (row + 0.5) * cellH);
      }
    };

    const redraw = () => {
      lastDrawn = "";
      draw();
    };

    readInk();
    fitCanvas();
    draw();

    const themeObserver = new MutationObserver(() => {
      readInk();
      redraw();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    const resizeObserver = new ResizeObserver(() => {
      fitCanvas();
      redraw();
    });
    resizeObserver.observe(canvas);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => {
        themeObserver.disconnect();
        resizeObserver.disconnect();
      };
    }

    const tick = (now) => {
      frameId = null;

      // Wander gently when nobody is moving the cursor.
      if (now - lastPointer > IDLE_MS) {
        head.targetYaw = Math.sin(now / 2300) * 0.45;
        head.targetPitch = 0.08 + Math.sin(now / 3100) * 0.12;
      }

      const prevYaw = head.yaw;
      const prevPitch = head.pitch;
      head.yaw += (head.targetYaw - head.yaw) * 0.12;
      head.pitch += (head.targetPitch - head.pitch) * 0.12;

      // The antenna lags behind head movement on a damped spring.
      spring.vz += (-spring.z * 0.16 - (head.yaw - prevYaw) * 1.6) - spring.vz * 0.14;
      spring.vx += (-spring.x * 0.16 + (head.pitch - prevPitch) * 1.6) - spring.vx * 0.14;
      spring.z += spring.vz;
      spring.x += spring.vx;
      scene.state.swayZ = clamp(spring.z, -0.7, 0.7);
      scene.state.swayX = clamp(spring.x, -0.7, 0.7);

      // Eyes lead the head a little towards where it is about to look.
      scene.state.glanceX = clamp(-((head.targetYaw - head.yaw) * 0.25 + head.targetYaw * 0.05), -0.06, 0.06);
      scene.state.glanceY = clamp((head.targetPitch - head.pitch) * 0.2 + head.targetPitch * 0.05, -0.05, 0.05);

      if (now >= nextBlink) {
        blinkStart = now;
        const doubleBlink = Math.random() < 0.2;
        nextBlink = now + (doubleBlink ? 260 : 2400 + Math.random() * 3600);
      }
      const blinkT = (now - blinkStart) / 150;
      scene.state.lid = blinkT >= 0 && blinkT < 1 ? 1 - Math.sin(blinkT * Math.PI) : 1;

      const key = [head.yaw, head.pitch, spring.x, spring.z, scene.state.lid, scene.state.glanceX]
        .map((value) => value.toFixed(3))
        .join();
      if (key !== lastDrawn) {
        lastDrawn = key;
        draw();
      }

      if (visible) frameId = requestAnimationFrame(tick);
    };

    const onPointerMove = (event) => {
      const bounds = canvas.getBoundingClientRect();
      const dx = event.clientX - (bounds.left + bounds.width / 2);
      const dy = event.clientY - (bounds.top + bounds.height / 2);
      // Positive yaw turns the face to screen-left, positive pitch tilts it up.
      head.targetYaw = -clamp(dx / 420, -1, 1) * 0.75;
      head.targetPitch = -clamp(dy / 380, -1, 1) * 0.42;
      lastPointer = performance.now();
    };

    const onClick = () => {
      spring.vz += 0.35;
      blinkStart = performance.now();
      nextBlink = blinkStart + 280;
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && frameId === null) frameId = requestAnimationFrame(tick);
    });
    observer.observe(canvas);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    canvas.addEventListener("click", onClick);

    return () => {
      if (frameId !== null) cancelAnimationFrame(frameId);
      observer.disconnect();
      themeObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("click", onClick);
    };
  }, []);

  return <canvas ref={canvasRef} className="robot" aria-hidden="true" />;
};

export default RobotHead;
