"use client";

import React, { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";
import { cn } from "@/lib/cn";

export interface NavItem {
    label: string;
    href: string;
}

export interface SpotlightNavbarProps {
    items?: NavItem[];
    className?: string;
    onItemClick?: (item: NavItem, index: number) => void;
    defaultActiveIndex?: number;
    /** Controlled active index. When provided, overrides internal state — use for
     *  scroll-spy driven highlighting. Pass -1 for "no active section". */
    activeIndex?: number;
}

export function SpotlightNavbar({
    items = [
        { label: "Home", href: "#home" },
        { label: "About", href: "#about" },
        { label: "Events", href: "#events" },
        { label: "Sponsors", href: "#sponsors" },
        { label: "Pricing", href: "#pricing" },
    ],
    className,
    onItemClick,
    defaultActiveIndex = 0,
    activeIndex: activeIndexProp,
}: SpotlightNavbarProps) {
    const navRef = useRef<HTMLDivElement>(null);
    const [internalActive, setInternalActive] = useState(defaultActiveIndex);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [hoverX, setHoverX] = useState<number | null>(null);

    const effectiveActive = activeIndexProp ?? internalActive;
    // Hover wins over scroll/click; -1 means "no target, fade underline out".
    const target = hoveredIndex !== null ? hoveredIndex : effectiveActive;
    const hasTarget = target >= 0;

    // Refs for the "light" positions so we can animate them imperatively
    const spotlightX = useRef(0);
    const ambienceX = useRef(0);

    // Spotlight (cursor-following top glow)
    useEffect(() => {
        if (!navRef.current) return;
        const nav = navRef.current;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = nav.getBoundingClientRect();
            const x = e.clientX - rect.left;
            setHoverX(x);
            spotlightX.current = x;
            nav.style.setProperty("--spotlight-x", `${x}px`);
        };

        const handleMouseLeave = () => {
            setHoverX(null);
            setHoveredIndex(null);
            if (effectiveActive < 0) return;
            const activeItem = nav.querySelector(`[data-index="${effectiveActive}"]`);
            if (activeItem) {
                const navRect = nav.getBoundingClientRect();
                const itemRect = activeItem.getBoundingClientRect();
                const targetX = itemRect.left - navRect.left + itemRect.width / 2;

                animate(spotlightX.current, targetX, {
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    onUpdate: (v) => {
                        spotlightX.current = v;
                        nav.style.setProperty("--spotlight-x", `${v}px`);
                    }
                });
            }
        };

        nav.addEventListener("mousemove", handleMouseMove);
        nav.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            nav.removeEventListener("mousemove", handleMouseMove);
            nav.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [effectiveActive]);

    // Ambience underline — tracks hovered item first, scroll/click active second
    useEffect(() => {
        if (!navRef.current) return;
        if (target < 0) return;
        const nav = navRef.current;
        const el = nav.querySelector(`[data-index="${target}"]`);
        if (!el) return;

        const navRect = nav.getBoundingClientRect();
        const itemRect = el.getBoundingClientRect();
        const targetX = itemRect.left - navRect.left + itemRect.width / 2;

        const controls = animate(ambienceX.current, targetX, {
            type: "spring",
            stiffness: 260,
            damping: 26,
            onUpdate: (v) => {
                ambienceX.current = v;
                nav.style.setProperty("--ambience-x", `${v}px`);
            },
        });
        return () => controls.stop();
    }, [target]);

    const handleItemClick = (item: NavItem, index: number) => {
        if (activeIndexProp === undefined) setInternalActive(index);
        onItemClick?.(item, index);
    };

    return (
        <div className={cn("relative flex justify-center", className)}>
            <nav
                ref={navRef}
                className={cn(
                    "spotlight-nav glass-navy-premium",
                    "relative h-11 rounded-full overflow-hidden"
                )}
            >
                {/* Content */}
                <ul className="relative flex items-center h-full px-2 gap-0 z-[10]">
                    {items.map((item, idx) => (
                        <li key={idx} className="relative h-full flex items-center justify-center">
                            <a
                                href={item.href}
                                data-index={idx}
                                onMouseEnter={() => setHoveredIndex(idx)}
                                onFocus={() => setHoveredIndex(idx)}
                                onBlur={() => setHoveredIndex((h) => (h === idx ? null : h))}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleItemClick(item, idx);
                                }}
                                className={cn(
                                    "px-4 py-1.5 font-display text-sm font-medium transition-colors duration-200 rounded-full",
                                    hoveredIndex === idx || (hoveredIndex === null && effectiveActive === idx)
                                        ? "text-[#D4AF37]"
                                        : "text-white/75"
                                )}
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* LIGHTING LAYERS 
           We use CSS variables --spotlight-x and --ambience-x updated by JS
        */}

                {/* 1. The Moving Spotlight (Follows Mouse) */}
                <div
                    className="pointer-events-none absolute bottom-0 left-0 w-full h-full z-[1] opacity-0 transition-opacity duration-300"
                    style={{
                        opacity: hoverX !== null ? 1 : 0,
                        background: `
              radial-gradient(
                120px circle at var(--spotlight-x) 100%, 
                var(--spotlight-color, rgba(0,0,0,0.1)) 0%, 
                transparent 50%
              )
            `
                    }}
                />

                {/* 2. The Active/Hover Ambience (underline — tracks hover, then scroll/click) */}
                <div
                    className="pointer-events-none absolute bottom-0 left-0 w-full h-[2px] z-[2] transition-opacity duration-200"
                    style={{
                        opacity: hasTarget ? 1 : 0,
                        background: `
                  radial-gradient(
                    60px circle at var(--ambience-x) 0%,
                    var(--ambience-color, rgba(0,0,0,1)) 0%,
                    transparent 100%
                  )
                `
                    }}
                />

            </nav>

            {/* STYLE BLOCK for Dynamic Colors 
        This allows us to switch the gradient colors cleanly using Tailwind classes 
        without messy inline conditionals.
      */}
            <style jsx>{`
        nav {
          --spotlight-color: rgba(212, 175, 55, 0.3);
          --ambience-color: rgba(212, 175, 55, 1);
        }
      `}</style>
        </div>
    );
}
