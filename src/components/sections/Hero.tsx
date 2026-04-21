"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Play } from "@phosphor-icons/react/dist/ssr";
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

  // backdrop radial glow (intensifies as spokes light)
  const glowT = Math.min(1, frame / IGNITE_UNTIL);
  const bloomT = Math.max(0, (frame - IGNITE_UNTIL) / (FRAME_COUNT - 1 - IGNITE_UNTIL));
  const glowStrength = 0.18 + glowT * 0.22 + bloomT * 0.25;

  const grad = ctx.createRadialGradient(cx, cy, size * 0.1, cx, cy, size * 0.52);
  grad.addColorStop(0, `rgba(212,175,55,${glowStrength * 0.9})`);
  grad.addColorStop(0.4, `rgba(212,175,55,${glowStrength * 0.35})`);
  grad.addColorStop(1, "rgba(212,175,55,0)");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(cx, cy, size * 0.52, 0, Math.PI * 2);
  ctx.fill();

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

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLCanvasElement[]>([]);
  const tickingRef = useRef(false);
  const currentFrameRef = useRef(0);
  const [loaded, setLoaded] = useState(false);
  const [loadPct, setLoadPct] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

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

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;

      requestAnimationFrame(() => {
        tickingRef.current = false;
        const section = sectionRef.current;
        if (!section) return;

        const rect = section.getBoundingClientRect();
        const scrollable = section.offsetHeight - window.innerHeight;
        const raw = -rect.top / scrollable;
        const p = Math.max(0, Math.min(1, raw));

        setScrollProgress(p);

        const idx = Math.min(FRAME_COUNT - 1, Math.floor(p * FRAME_COUNT));
        if (idx !== currentFrameRef.current) drawFrame(idx);
      });
    };

    const onResize = () => drawFrame(currentFrameRef.current);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [loaded]);

  // bottom stat pills come in at progress > 0.7
  const showStats = scrollProgress > 0.62;
  const fadeTop = Math.max(0, 1 - Math.max(0, (scrollProgress - 0.45) / 0.25));

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: "400vh" }}
      id="hero"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-[#0A0E1A]">
        <div
          className="absolute inset-0 bg-grid-pattern opacity-[0.35]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(circle at 50% 55%, rgba(212,175,55,0.18), transparent 60%)",
          }}
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
          className="relative h-[min(90vh,900px)] w-[min(90vh,900px)]"
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

        {/* top overlay — headline + CTA */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-center px-6 pt-[min(18vh,160px)]"
          style={{ opacity: fadeTop }}
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

            <BlurText
              as="h1"
              text="सारथी"
              className="font-hindi text-6xl md:text-8xl lg:text-[8.5rem] font-medium tracking-tight leading-[0.9] text-[#D4AF37]"
              delay={0.1}
              perWord={0.08}
            />
            <BlurText
              as="h2"
              text="Training that guides."
              className="mt-2 font-display text-4xl md:text-6xl lg:text-7xl font-medium tracking-[-0.02em] leading-[0.9] text-white"
              delay={0.5}
              perWord={0.12}
            />

            <motion.p
              initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 1.0, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto mt-8 max-w-xl font-body text-sm font-light text-white/60 md:text-base lg:text-lg"
            >
              The modern training platform for India&apos;s uniformed services.
              Live sessions, scenario simulators, and compliance analytics — in
              one command center.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 1.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative mt-9 flex flex-wrap items-center justify-center gap-3"
            >
              {/* scrim — darkens chakra center so CTAs stay legible */}
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-28 w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(10,14,26,0.92) 0%, rgba(10,14,26,0.7) 45%, transparent 75%)",
                  filter: "blur(8px)",
                }}
              />
              <Button variant="primary">
                Request a Demo
                <ArrowUpRight weight="bold" size={16} />
              </Button>
              <Button variant="ghost">
                <Play weight="fill" size={14} />
                Watch the 90-second film
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="mt-8 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40"
            >
              Built in India · Hindi + English · On-prem ready
            </motion.p>
          </div>
        </div>

        {/* bottom stats that appear as chakra completes */}
        <div
          className={`pointer-events-none absolute inset-x-0 bottom-[min(12vh,120px)] z-20 flex justify-center px-6 transition-all duration-700 ${
            showStats ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <div className="pointer-events-auto flex flex-wrap justify-center gap-3">
            {[
              "24 dharma spokes",
              "12 live scenarios",
              "6 languages soon",
              "100% on-prem option",
            ].map((s, i) => (
              <div
                key={s}
                className="glass-navy rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/70 transition-all"
                style={{ transitionDelay: showStats ? `${i * 80}ms` : "0ms" }}
              >
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
