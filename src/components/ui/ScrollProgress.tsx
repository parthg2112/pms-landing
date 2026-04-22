"use client";

import { useEffect, useRef, useState } from "react";

export function ScrollProgress() {
  const fillRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tickingRef = useRef(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      tickingRef.current = false;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      const track = trackRef.current;
      const fill = fillRef.current;
      const dot = dotRef.current;
      const label = labelRef.current;
      if (fill) fill.style.transform = `scaleY(${p})`;
      if (dot && track) {
        const h = track.getBoundingClientRect().height;
        dot.style.transform = `translate(-50%, ${p * h - 4}px)`;
      }
      if (label) label.textContent = `${Math.round(p * 100).toString().padStart(2, "0")}`;
      setVisible(window.scrollY > 40);
    };

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 transition-opacity duration-500 md:flex ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        ref={trackRef}
        className="relative h-[55vh] w-[2px] overflow-hidden rounded-full bg-white/10"
      >
        <div
          ref={fillRef}
          className="absolute inset-0 origin-top rounded-full"
          style={{
            transform: "scaleY(0)",
            background:
              "linear-gradient(180deg, rgba(244,215,107,0.9), #D4AF37)",
            boxShadow: "0 0 10px rgba(212,175,55,0.5)",
            willChange: "transform",
          }}
        />
        <div
          ref={dotRef}
          className="absolute left-1/2 top-0 h-2 w-2 rounded-full bg-[#D4AF37]"
          style={{
            transform: "translate(-50%, -4px)",
            boxShadow: "0 0 12px rgba(212,175,55,0.8)",
            willChange: "transform",
          }}
        />
      </div>
      <span
        ref={labelRef}
        className="font-mono text-[9px] tracking-[0.25em] text-white/40 tabular-nums"
      >
        00
      </span>
    </div>
  );
}
