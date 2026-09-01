import { useEffect, useRef } from "react";

const SAMPLE_STEP = 1;
const RETURN_EASE = 0.14;
const SHOCKWAVE_MS = 700;

const DitheredPortrait = ({ src, alt }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d");
    const image = new Image();
    let frameId = null;
    let disposed = false;
    let points = null;
    let width = 0;
    let height = 0;
    let mouseX = -9999;
    let mouseY = -9999;
    let mouseActive = false;
    let shockwaves = [];

    const inkColor = () =>
      getComputedStyle(document.documentElement).getPropertyValue("--ink").trim();

    const paint = (targetCtx, targetTheme, color) => {
      if (!points) return;
      targetCtx.clearRect(0, 0, width, height);
      targetCtx.fillStyle = color;

      for (let index = 0; index < points.count; index += 1) {
        const size = points.size[index];
        const luminance = points.luminance[index];
        const darkness = 1 - luminance;
        const tone =
          targetTheme === "dark"
            ? 0.12 + Math.pow(darkness, 0.8) * 0.72
            : Math.pow(darkness, 0.65) * 1.32;
        targetCtx.globalAlpha = Math.min(1, points.alpha[index] * tone);
        targetCtx.fillRect(
          points.baseX[index] + points.offsetX[index] - size / 2,
          points.baseY[index] + points.offsetY[index] - size / 2,
          size,
          size,
        );
      }
      targetCtx.globalAlpha = 1;
    };

    const render = () => {
      const theme = document.documentElement.classList.contains("light") ? "light" : "dark";
      paint(ctx, theme, inkColor());
      canvas.dataset.ready = "";
    };

    canvas.createThemeFrame = (theme, color) => {
      if (!points) return canvas;
      const frame = document.createElement("canvas");
      frame.width = canvas.width;
      frame.height = canvas.height;
      const frameCtx = frame.getContext("2d");
      const deviceScale = canvas.width / width;
      frameCtx.setTransform(deviceScale, 0, 0, deviceScale, 0, 0);
      paint(frameCtx, theme, color);
      return frame;
    };

    const animate = (now) => {
      frameId = null;
      if (!points) return;

      const radius = Math.max(28, width * 0.23);
      const radiusSquared = radius * radius;
      const pushStrength = width * 0.1;
      const waveSpeed = width * 1.35;
      const waveWidth = Math.max(10, width * 0.09);
      let needsAnotherFrame = mouseActive;

      shockwaves = shockwaves.filter((wave) => now - wave.startedAt < SHOCKWAVE_MS);
      if (shockwaves.length) needsAnotherFrame = true;

      for (let index = 0; index < points.count; index += 1) {
        const baseX = points.baseX[index];
        const baseY = points.baseY[index];
        let targetX = 0;
        let targetY = 0;

        if (mouseActive) {
          const deltaX = baseX + points.offsetX[index] - mouseX;
          const deltaY = baseY + points.offsetY[index] - mouseY;
          const distanceSquared = deltaX * deltaX + deltaY * deltaY;

          if (distanceSquared > 0.1 && distanceSquared < radiusSquared) {
            const distance = Math.sqrt(distanceSquared);
            const force = ((1 - distance / radius) ** 3) * pushStrength;
            targetX += (deltaX / distance) * force;
            targetY += (deltaY / distance) * force;
          }
        }

        for (const wave of shockwaves) {
          const elapsed = now - wave.startedAt;
          const waveRadius = (elapsed / 1000) * waveSpeed;
          const deltaX = baseX - wave.x;
          const deltaY = baseY - wave.y;
          const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
          const distanceFromWave = Math.abs(distance - waveRadius);

          if (distance > 0.1 && distanceFromWave < waveWidth) {
            const fade = 1 - elapsed / SHOCKWAVE_MS;
            const force =
              (1 - distanceFromWave / waveWidth) * fade * width * 0.075;
            targetX += (deltaX / distance) * force;
            targetY += (deltaY / distance) * force;
          }
        }

        points.offsetX[index] += (targetX - points.offsetX[index]) * RETURN_EASE;
        points.offsetY[index] += (targetY - points.offsetY[index]) * RETURN_EASE;

        if (
          Math.abs(points.offsetX[index]) > 0.01 ||
          Math.abs(points.offsetY[index]) > 0.01
        ) {
          needsAnotherFrame = true;
        } else {
          points.offsetX[index] = 0;
          points.offsetY[index] = 0;
        }
      }

      render();
      if (needsAnotherFrame && !disposed) frameId = requestAnimationFrame(animate);
    };

    const requestRender = () => {
      if (frameId === null && !disposed) frameId = requestAnimationFrame(animate);
    };

    const buildPoints = () => {
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(1, Math.round(bounds.width));
      height = Math.max(1, Math.round(bounds.height));
      const deviceScale = window.devicePixelRatio || 1;

      canvas.width = Math.round(width * deviceScale);
      canvas.height = Math.round(height * deviceScale);
      ctx.setTransform(deviceScale, 0, 0, deviceScale, 0, 0);

      const sampler = document.createElement("canvas");
      sampler.width = width;
      sampler.height = height;
      const sampleCtx = sampler.getContext("2d", { willReadFrequently: true });
      const scale = Math.min(width / image.naturalWidth, height / image.naturalHeight) * 0.96;
      const drawWidth = image.naturalWidth * scale;
      const drawHeight = image.naturalHeight * scale;
      sampleCtx.drawImage(
        image,
        (width - drawWidth) / 2,
        (height - drawHeight) / 2,
        drawWidth,
        drawHeight,
      );

      const pixels = sampleCtx.getImageData(0, 0, width, height).data;
      const sampled = [];

      for (let y = 0; y < height; y += SAMPLE_STEP) {
        for (let x = 0; x < width; x += SAMPLE_STEP) {
          const pixelIndex = (y * width + x) * 4;
          const alpha = pixels[pixelIndex + 3] / 255;
          if (alpha < 0.08) continue;

          const luminance =
            (pixels[pixelIndex] * 0.2126 +
              pixels[pixelIndex + 1] * 0.7152 +
              pixels[pixelIndex + 2] * 0.0722) /
            255;

          sampled.push({
            x: x + ((((x * 73 + y * 151) % 101) / 100) - 0.5) * 0.58,
            y: y + ((((x * 199 + y * 47) % 103) / 102) - 0.5) * 0.58,
            alpha,
            luminance,
          });
        }
      }

      const count = sampled.length;
      points = {
        count,
        baseX: new Float32Array(count),
        baseY: new Float32Array(count),
        offsetX: new Float32Array(count),
        offsetY: new Float32Array(count),
        alpha: new Float32Array(count),
        luminance: new Float32Array(count),
        size: new Float32Array(count),
      };

      sampled.forEach((point, index) => {
        points.baseX[index] = point.x;
        points.baseY[index] = point.y;
        points.alpha[index] = point.alpha;
        points.luminance[index] = point.luminance;
        // Slightly larger particles avoid Safari's lighter compositing of
        // very small fractional-pixel rectangles on Retina displays.
        points.size[index] = Math.max(0.64, width / 288);
      });

      render();
    };

    const pointerPosition = (event) => {
      const bounds = canvas.getBoundingClientRect();
      return { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
    };

    const handlePointerMove = (event) => {
      if (event.pointerType !== "mouse") return;
      const position = pointerPosition(event);
      mouseX = position.x;
      mouseY = position.y;
      mouseActive = true;
      requestRender();
    };

    const handlePointerLeave = () => {
      mouseActive = false;
      requestRender();
    };

    const handlePointerUp = (event) => {
      const position = pointerPosition(event);
      shockwaves.push({ ...position, startedAt: performance.now() });
      requestRender();
    };

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const resizeObserver = new ResizeObserver(() => {
      if (image.complete && image.naturalWidth) buildPoints();
    });
    const themeObserver = new MutationObserver(() => render());

    image.onload = buildPoints;
    image.src = src;
    resizeObserver.observe(canvas);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    if (!reduceMotion) {
      canvas.addEventListener("pointermove", handlePointerMove);
      canvas.addEventListener("pointerleave", handlePointerLeave);
      canvas.addEventListener("pointerup", handlePointerUp);
    }

    return () => {
      disposed = true;
      delete canvas.createThemeFrame;
      if (frameId !== null) cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
      canvas.removeEventListener("pointerup", handlePointerUp);
    };
  }, [src]);

  return (
    <div className="dithered-portrait" role="img" aria-label={alt}>
      <canvas ref={canvasRef} aria-hidden="true" />
    </div>
  );
};

export default DitheredPortrait;
