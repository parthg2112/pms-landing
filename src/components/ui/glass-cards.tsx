"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface GlassCardItem {
  id: number | string;
  eyebrow: string;
  title: string;
  description: string;
  tag?: string;
}

interface CardProps {
  item: GlassCardItem;
  index: number;
  total: number;
}

const CardFrame: React.FC<CardProps> = ({ item, index, total }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const container = containerRef.current;
    if (!card || !container) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // target scale shrinks deeper cards so the stack reads like a tarot fan
    const targetScale = 1 - (total - index - 1) * 0.05;
    gsap.set(card, { scale: 1, transformOrigin: "center top" });

    if (reduce) return;

    const st = ScrollTrigger.create({
      trigger: container,
      start: "top center",
      end: "bottom center",
      scrub: 1,
      onUpdate: (self) => {
        const scale = gsap.utils.interpolate(1, targetScale, self.progress);
        gsap.set(card, {
          scale: Math.max(scale, targetScale),
          transformOrigin: "center top",
        });
      },
    });

    return () => {
      st.kill();
    };
  }, [index, total]);

  return (
    <div
      ref={containerRef}
      className="relative flex h-screen items-center justify-center"
      style={{ position: "sticky", top: 0 }}
    >
      <div
        ref={cardRef}
        className="relative w-[min(92%,880px)]"
        style={{
          top: `calc(-6vh + ${index * 22}px)`,
          transformOrigin: "top",
        }}
      >
        {/* gold hairline border — matches .glass-navy family */}
        <div
          className="pointer-events-none absolute -inset-px rounded-[32px]"
          style={{
            padding: "1px",
            background:
              "linear-gradient(135deg, rgba(212,175,55,0.55), rgba(212,175,55,0.08) 40%, rgba(212,175,55,0) 65%, rgba(212,175,55,0.35))",
            WebkitMask:
              "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
          aria-hidden="true"
        />

        <div
          className="relative overflow-hidden rounded-[30px] p-10 md:p-14"
          style={{
            background:
              "linear-gradient(145deg, rgba(20,31,51,0.78), rgba(10,14,26,0.92))",
            backdropFilter: "blur(22px) saturate(160%)",
            boxShadow:
              "0 24px 80px rgba(0,0,0,0.45), 0 2px 12px rgba(0,0,0,0.25), inset 0 1px 0 rgba(212,175,55,0.12)",
            minHeight: "340px",
          }}
        >
          {/* top hairline shine */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-10 right-10 top-2 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent)",
            }}
          />

          {/* card index */}
          <div className="absolute right-8 top-8 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </div>

          <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#D4AF37]">
            {item.eyebrow}
          </p>
          <h3 className="mt-3 max-w-[88%] font-display text-3xl font-medium leading-[1.05] tracking-tight text-white md:text-4xl">
            {item.title}
          </h3>
          <p className="mt-5 max-w-[68ch] font-body text-sm font-light leading-relaxed text-white/65 md:text-base">
            {item.description}
          </p>

          {item.tag && (
            <div className="mt-8 inline-flex">
              <span className="glass-navy rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-white/70">
                {item.tag}
              </span>
            </div>
          )}

          {/* corner gold reticle */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-6 right-6 h-4 w-4"
            style={{
              borderRight: "1px solid rgba(212,175,55,0.6)",
              borderBottom: "1px solid rgba(212,175,55,0.6)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export const StackedGlassCards: React.FC<{
  items: GlassCardItem[];
  onActiveChange?: (index: number) => void;
}> = ({ items, onActiveChange }) => {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || !onActiveChange) return;

    let last = -1;
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const idx = Math.min(
          items.length - 1,
          Math.floor(self.progress * items.length)
        );
        if (idx !== last) {
          last = idx;
          onActiveChange(idx);
        }
      },
    });
    return () => {
      st.kill();
    };
  }, [items.length, onActiveChange]);

  return (
    <section ref={wrapRef} className="w-full">
      {items.map((item, i) => (
        <CardFrame key={item.id} item={item} index={i} total={items.length} />
      ))}
    </section>
  );
};
