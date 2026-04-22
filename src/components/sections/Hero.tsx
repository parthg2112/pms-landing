"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { PlayIcon } from "@heroicons/react/24/solid";
import { BlurText } from "@/components/ui/BlurText";
import { Button } from "@/components/ui/Button";

const FRAME_COUNT = 120;
const FRAME_SIZE = 720;
const SPOKES = 24;
const IGNITE_UNTIL = 90;

const NAVY_SPOKE = "#2a3a5a";
const GOLD = "#d4af37";
const GOLD_BRIGHT = "#e8c864";

function easeInOutSine(t: number) {
  return -(Math.cos(Math.PI * t) - 1) / 2;
}

function renderChakraFrame(ctx: CanvasRenderingContext2D, frame: number) {
  const size = FRAME_SIZE;
  const cx = size / 2;
  const cy = size / 2;
  const progress = frame / (FRAME_COUNT - 1);

  ctx.clearRect(0, 0, size, size);

  // backdrop halo now lives in a CSS layer (see <div ref={haloRef}>) so it can
  // extend past the canvas bounds without hard-clipping. only the tight rim
  // bloom below stays in-canvas.
  const bloomT = Math.max(0, (frame - IGNITE_UNTIL) / (FRAME_COUNT - 1 - IGNITE_UNTIL));

  // rotate whole wheel 180° across full animation
  const rotation = easeInOutSine(progress) * Math.PI;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(rotation);

  const outerR = size * 0.42;
  const innerR = size * 0.08;
  const rimStroke = size * 0.012;

  // outer rim
  ctx.strokeStyle = frame >= IGNITE_UNTIL - 4 ? GOLD : "rgba(212,175,55,0.4)";
  ctx.lineWidth = rimStroke;
  ctx.beginPath();
  ctx.arc(0, 0, outerR, 0, Math.PI * 2);
  ctx.stroke();

  // inner rim
  ctx.strokeStyle = frame >= IGNITE_UNTIL - 4 ? GOLD : "rgba(212,175,55,0.35)";
  ctx.lineWidth = rimStroke * 0.55;
  ctx.beginPath();
  ctx.arc(0, 0, outerR * 0.94, 0, Math.PI * 2);
  ctx.stroke();

  // spokes ignite sequentially from 12 o'clock clockwise over frames 0..IGNITE_UNTIL
  for (let i = 0; i < SPOKES; i++) {
    const spokeFrame = (i / SPOKES) * IGNITE_UNTIL;
    const localT = Math.max(0, Math.min(1, (frame - spokeFrame) / 2));
    const color = localT >= 1 ? GOLD : localT <= 0 ? NAVY_SPOKE : mix(NAVY_SPOKE, GOLD, localT);
    const width = size * (0.009 + localT * 0.003);

    ctx.save();
    ctx.rotate((i * Math.PI * 2) / SPOKES);

    // tapered spoke
    ctx.strokeStyle = color;
    ctx.lineCap = "round";
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(0, -innerR);
    ctx.lineTo(0, -outerR * 0.93);
    ctx.stroke();

    // decorative arc dot at tip (gives the "petal" feel)
    if (localT > 0.5) {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(0, -outerR * 0.96, size * 0.008 * (0.5 + localT), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  // inner hub
  ctx.fillStyle = "#0a0e1a";
  ctx.beginPath();
  ctx.arc(0, 0, innerR * 1.05, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = GOLD;
  ctx.lineWidth = rimStroke * 0.7;
  ctx.beginPath();
  ctx.arc(0, 0, innerR * 0.95, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = frame >= IGNITE_UNTIL - 8 ? GOLD_BRIGHT : GOLD;
  ctx.beginPath();
  ctx.arc(0, 0, innerR * 0.42, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();

  // rim bloom in the last 30 frames
  if (bloomT > 0) {
    const bloomGrad = ctx.createRadialGradient(cx, cy, outerR * 0.85, cx, cy, outerR * 1.25);
    bloomGrad.addColorStop(0, `rgba(232,200,100,0)`);
    bloomGrad.addColorStop(0.5, `rgba(232,200,100,${0.22 * bloomT})`);
    bloomGrad.addColorStop(1, "rgba(232,200,100,0)");
    ctx.fillStyle = bloomGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, outerR * 1.3, 0, Math.PI * 2);
    ctx.fill();
  }
}

function mix(from: string, to: string, t: number) {
  const f = hexToRgb(from);
  const e = hexToRgb(to);
  const r = Math.round(f.r + (e.r - f.r) * t);
  const g = Math.round(f.g + (e.g - f.g) * t);
  const b = Math.round(f.b + (e.b - f.b) * t);
  return `rgb(${r}, ${g}, ${b})`;
}

function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

// A headline/body half that stays intact as a word chunk but translates
// outward on scroll, driven by the parent's --split CSS variable (0→1).
// Max travel is capped so the half doesn't slide off-screen on small viewports.
function SplitHalf({
  side,
  delay,
  children,
}: {
  side: "left" | "right";
  delay: number;
  children: React.ReactNode;
}) {
  const sign = side === "left" ? -1 : 1;
  return (
    <span
      className="inline-block whitespace-nowrap"
      style={{
        transform: `translateX(calc(var(--split, 0) * ${sign} * min(46vw, 440px)))`,
        willChange: "transform",
      }}
    >
      <motion.span
        initial={{ opacity: 0, filter: "blur(10px)", y: 14 }}
        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        transition={{ delay, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<HTMLCanvasElement[]>([]);
  const currentFrameRef = useRef(0);
  const [loaded, setLoaded] = useState(false);
  const [loadPct, setLoadPct] = useState(0);

  // pre-render all 120 chakra frames to offscreen canvases
  useEffect(() => {
    const frames: HTMLCanvasElement[] = [];
    let cancelled = false;
    let i = 0;

    function step() {
      if (cancelled) return;
      const batch = 6;
      for (let b = 0; b < batch && i < FRAME_COUNT; b++, i++) {
        const c = document.createElement("canvas");
        c.width = FRAME_SIZE;
        c.height = FRAME_SIZE;
        const fctx = c.getContext("2d");
        if (fctx) renderChakraFrame(fctx, i);
        frames.push(c);
      }
      setLoadPct(Math.round((i / FRAME_COUNT) * 100));
      if (i < FRAME_COUNT) {
        requestAnimationFrame(step);
      } else {
        framesRef.current = frames;
        setLoaded(true);
        drawFrame(0);
      }
    }
    requestAnimationFrame(step);

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function drawFrame(idx: number) {
    const canvas = canvasRef.current;
    const frames = framesRef.current;
    if (!canvas || frames.length === 0) return;

    const frame = frames[Math.min(idx, frames.length - 1)];
    if (!frame) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cw = canvas.clientWidth;
    const ch = canvas.clientHeight;
    if (canvas.width !== cw * dpr || canvas.height !== ch * dpr) {
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
    }

    const iw = frame.width;
    const ih = frame.height;
    const scale = Math.min((cw * dpr) / iw, (ch * dpr) / ih) * 0.95;
    const w = iw * scale;
    const h = ih * scale;
    const x = (cw * dpr - w) / 2;
    const y = (ch * dpr - h) / 2;

    ctx.clearRect(0, 0, cw * dpr, ch * dpr);
    ctx.drawImage(frame, x, y, w, h);
    currentFrameRef.current = idx;
  }

  useEffect(() => {
    if (!loaded) return;
    const section = sectionRef.current;
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      drawFrame(FRAME_COUNT - 1);
      haloRef.current?.style.setProperty("--halo", "0.7");
      splitRef.current?.style.setProperty("--split", "1");
      return;
    }

    haloRef.current?.style.setProperty("--halo", "0.25");
    splitRef.current?.style.setProperty("--split", "0");

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const p = self.progress;
        const idx = Math.min(FRAME_COUNT - 1, Math.floor(p * FRAME_COUNT));
        if (idx !== currentFrameRef.current) drawFrame(idx);
        // halo intensity tracks progress: 0.25 → 1.0
        if (haloRef.current) {
          haloRef.current.style.setProperty("--halo", (0.25 + p * 0.75).toFixed(3));
        }
        // headline halves translate outward as scroll advances
        if (splitRef.current) {
          splitRef.current.style.setProperty("--split", p.toFixed(3));
        }
      },
    });

    const onResize = () => drawFrame(currentFrameRef.current);
    window.addEventListener("resize", onResize);

    return () => {
      st.kill();
      window.removeEventListener("resize", onResize);
    };
  }, [loaded]);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: "400vh" }}
      id="hero"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-grid-pattern opacity-[0.35]"
          aria-hidden="true"
        />

        {/* unbounded chakra halo — CSS layer, extends past the canvas rect so
            the gold bloom falls off smoothly without clipping. --halo is
            driven from scroll progress in the ScrollTrigger onUpdate. */}
        <div
          ref={haloRef}
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: "min(140vh, 1400px)",
            height: "min(140vh, 1400px)",
            background:
              "radial-gradient(circle at center, rgba(212,175,55,calc(0.45 * var(--halo, 0.3))) 0%, rgba(212,175,55,calc(0.20 * var(--halo, 0.3))) 28%, rgba(212,175,55,calc(0.06 * var(--halo, 0.3))) 55%, rgba(212,175,55,0) 72%)",
            filter: "blur(32px)",
            willChange: "background",
          }}
          aria-hidden="true"
        />

        {/* reticle corners — film/command-center chrome */}
        <div className="reticle reticle-tl" aria-hidden="true" />
        <div className="reticle reticle-tr" aria-hidden="true" />
        <div className="reticle reticle-bl" aria-hidden="true" />
        <div className="reticle reticle-br" aria-hidden="true" />

        {/* bottom chrome — navbar owns the top edge */}
        <div className="pointer-events-none absolute bottom-[30px] left-14 z-20 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
          <span className="animate-pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
          <span>Sec 01 / 09 · Saarthi OS v1.2</span>
        </div>
        <div className="pointer-events-none absolute bottom-[30px] right-14 z-20 font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
          सत्यमेव जयते · LAT 19.076° · LON 72.877°
        </div>

        {/* chakra canvas */}
        <canvas
          ref={canvasRef}
          className="relative h-[min(66vh,680px)] w-[min(66vh,680px)]"
          aria-hidden="true"
        />

        {/* loading bar */}
        {!loaded && (
          <div className="absolute bottom-24 left-1/2 z-30 -translate-x-1/2 text-center">
            <div className="glass-navy mx-auto h-1 w-64 overflow-hidden rounded-full">
              <div
                className="h-full bg-[#D4AF37] transition-[width] duration-150"
                style={{ width: `${loadPct}%` }}
              />
            </div>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">
              Aligning dharma • {loadPct}%
            </p>
          </div>
        )}

        {/* top overlay — each line is split at a natural word/cluster
            boundary; halves translate outward as --split (driven by scroll)
            grows from 0 → 1. Words themselves stay intact. */}
        <div
          ref={splitRef}
          className="pointer-events-none absolute inset-x-0 top-0 z-20 px-6 pt-[min(18vh,160px)]"
          style={{ ["--split" as string]: "0" }}
        >
          <div className="pointer-events-auto mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6 inline-flex"
            >
              <div className="glass-navy rounded-full px-4 py-1.5 text-xs font-mono uppercase tracking-[0.2em]">
                <span className="text-[#D4AF37]">New</span>
                <span className="mx-2 text-white/30">•</span>
                <span className="text-white/70">Now piloting with Mumbai Police</span>
              </div>
            </motion.div>

            <h1 className="flex justify-center font-hindi text-6xl md:text-8xl lg:text-[8.5rem] font-medium tracking-tight leading-[0.9] text-[#D4AF37]">
              <SplitHalf side="left" delay={0.1}>सार</SplitHalf>
              <SplitHalf side="right" delay={0.22}>थी</SplitHalf>
            </h1>

            <h2 className="mt-2 flex justify-center font-display text-4xl md:text-6xl lg:text-7xl font-medium tracking-[-0.02em] leading-[0.9] text-white">
              <SplitHalf side="left" delay={0.5}>Operations</SplitHalf>
              <SplitHalf side="right" delay={0.66}>&nbsp;that guide.</SplitHalf>
            </h2>

            <p className="mx-auto mt-6 flex max-w-md justify-center font-body text-sm font-light text-white/60 md:text-base">
              <SplitHalf side="left" delay={1.0}>Duty, learning, and compliance</SplitHalf>
              <SplitHalf side="right" delay={1.12}>&nbsp;— in one command deck.</SplitHalf>
            </p>
          </div>
        </div>

        {/* bottom CTA zone — sits cleanly below the chakra and stays visible
            through the whole hero scroll; no fade. */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-[min(16vh,160px)] z-20 flex flex-col items-center gap-5 px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 1.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto flex flex-wrap items-center justify-center gap-3"
          >
            <Button variant="primary">
              Request a Demo
              <ArrowUpRightIcon className="h-4 w-4 stroke-[2.5]" />
            </Button>
            <Button variant="ghost">
              <PlayIcon className="h-3.5 w-3.5" />
              Watch the 90-second film
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40"
          >
            Built in India · Hindi + English · On-prem
          </motion.p>
        </div>

      </div>
    </section>
  );
}
