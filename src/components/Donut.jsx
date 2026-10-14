import { useEffect, useRef } from "react";

// The classic donut.c torus as ASCII, drawn glyph by glyph onto a canvas so
// the grid stays square at any size. Spins on its own, spins faster under the
// cursor, and can be dragged and flung.
const COLS = 37;
const ROWS = 22;
const RAMP = ".,-~:;=!*#$@";
const R1 = 1;
const R2 = 2;
const K2 = 5;
const K1 = (ROWS * K2 * 3) / (8 * (R1 + R2));
const CELL_ASPECT = COLS / ROWS; // cell height / width in a square box
const BASE_SPIN = { a: 0.012, b: 0.006 };
const HOVER_BOOST = 2.6;
const DRAG_SCALE = 0.012;
const SETTLE = 0.06;

const renderFrame = (A, B) => {
  const output = new Array(COLS * ROWS).fill(" ");
  const zBuffer = new Float32Array(COLS * ROWS);
  const cosA = Math.cos(A);
  const sinA = Math.sin(A);
  const cosB = Math.cos(B);
  const sinB = Math.sin(B);

  for (let theta = 0; theta < 6.28; theta += 0.09) {
    const cosT = Math.cos(theta);
    const sinT = Math.sin(theta);
    const circleX = R2 + R1 * cosT;
    const circleY = R1 * sinT;

    for (let phi = 0; phi < 6.28; phi += 0.03) {
      const cosP = Math.cos(phi);
      const sinP = Math.sin(phi);
      const x = circleX * (cosB * cosP + sinA * sinB * sinP) - circleY * cosA * sinB;
      const y = circleX * (sinB * cosP - sinA * cosB * sinP) + circleY * cosA * cosB;
      const ooz = 1 / (K2 + cosA * circleX * sinP + circleY * sinA);
      const xp = Math.floor(COLS / 2 + K1 * CELL_ASPECT * ooz * x);
      const yp = Math.floor(ROWS / 2 - K1 * ooz * y);
      if (xp < 0 || xp >= COLS || yp < 0 || yp >= ROWS) continue;

      const luminance =
        cosP * cosT * sinB - cosA * cosT * sinP - sinA * sinT + cosB * (cosA * sinT - cosT * sinA * sinP);
      const index = xp + yp * COLS;
      if (luminance > 0 && ooz > zBuffer[index]) {
        zBuffer[index] = ooz;
        output[index] = RAMP[Math.min(RAMP.length - 1, Math.floor(luminance * 8))];
      }
    }
  }

  return output;
};

const Donut = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let ink = "";
    let size = 0;

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

    const draw = (A, B) => {
      const cells = renderFrame(A, B);
      const cellW = size / COLS;
      const cellH = size / ROWS;
      ctx.clearRect(0, 0, size, size);
      ctx.fillStyle = ink;
      ctx.font = `${cellH}px ui-monospace, "SF Mono", Menlo, monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (let index = 0; index < cells.length; index += 1) {
        if (cells[index] === " ") continue;
        const col = index % COLS;
        const row = (index - col) / COLS;
        ctx.fillText(cells[index], (col + 0.5) * cellW, (row + 0.5) * cellH);
      }
    };

    let A = 0.9;
    let B = 0.4;
    const velocity = { ...BASE_SPIN };
    let hovering = false;
    let drag = null;
    let frameId = null;
    let visible = true;

    readInk();
    fitCanvas();
    draw(A, B);

    const themeObserver = new MutationObserver(() => {
      readInk();
      draw(A, B);
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    const resizeObserver = new ResizeObserver(() => {
      fitCanvas();
      draw(A, B);
    });
    resizeObserver.observe(canvas);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => {
        themeObserver.disconnect();
        resizeObserver.disconnect();
      };
    }

    const tick = () => {
      frameId = null;
      if (!drag) {
        const boost = hovering ? HOVER_BOOST : 1;
        velocity.a += (BASE_SPIN.a * boost - velocity.a) * SETTLE;
        velocity.b += (BASE_SPIN.b * boost - velocity.b) * SETTLE;
      }
      A += velocity.a;
      B += velocity.b;
      draw(A, B);
      if (visible) frameId = requestAnimationFrame(tick);
    };

    const onEnter = () => {
      hovering = true;
    };
    const onLeave = () => {
      hovering = false;
    };
    const onDown = (event) => {
      drag = { x: event.clientX, y: event.clientY };
      canvas.setPointerCapture(event.pointerId);
    };
    const onMove = (event) => {
      if (!drag) return;
      // Dragging sets the spin directly; letting go keeps that momentum.
      velocity.a = (event.clientY - drag.y) * DRAG_SCALE;
      velocity.b = (event.clientX - drag.x) * DRAG_SCALE;
      drag = { x: event.clientX, y: event.clientY };
    };
    const onUp = () => {
      drag = null;
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && frameId === null) frameId = requestAnimationFrame(tick);
    });
    observer.observe(canvas);

    canvas.addEventListener("pointerenter", onEnter);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);

    return () => {
      if (frameId !== null) cancelAnimationFrame(frameId);
      observer.disconnect();
      themeObserver.disconnect();
      resizeObserver.disconnect();
      canvas.removeEventListener("pointerenter", onEnter);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return <canvas ref={canvasRef} className="donut" aria-hidden="true" />;
};

export default Donut;
