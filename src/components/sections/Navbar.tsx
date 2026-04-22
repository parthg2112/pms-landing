"use client";

import { motion } from "framer-motion";
import { ArrowRightIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { ChakraMark } from "@/components/ui/ChakraMark";
import { SpotlightNavbar, type NavItem } from "@/components/ui/spotlight-navbar";

const nav: NavItem[] = [
  { label: "Platform", href: "#platform" },
  { label: "Drills", href: "#scenarios" },
  { label: "Modules", href: "#features" },
  { label: "Security", href: "#security" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // scroll-spy: drive the underline to whichever nav-target section
  // currently overlaps the viewport's upper band.
  useEffect(() => {
    const ids = nav.map((item) => item.href.replace("#", ""));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = ids.indexOf((entry.target as HTMLElement).id);
            if (idx !== -1) setActiveIndex(idx);
          }
        }
      },
      { rootMargin: "-30% 0px -65% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (item: NavItem) => {
    const el = document.querySelector(item.href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-5 z-50 flex items-center justify-between px-6 md:px-10"
    >
      {/* left — wordmark */}
      <a href="#hero" className="group flex items-center gap-2">
        <ChakraMark size={22} className="transition-transform duration-700 group-hover:rotate-90" />
        <span className="font-display text-lg tracking-tight text-white">Saarthi</span>
        <span className="font-hindi ml-1 text-sm text-white/50">सारथी</span>
      </a>

      {/* center — spotlight nav pill */}
      <div className={`hidden md:block transition-transform duration-500 ${scrolled ? "scale-[0.98]" : ""}`}>
        <SpotlightNavbar
          items={nav}
          activeIndex={activeIndex}
          onItemClick={handleNavClick}
          className="pt-0"
        />
      </div>

      {/* right — sign-in */}
      <div className="flex items-center gap-2">
        <a
          href="https://police.risetechnosoft.com/login"
          target="_blank"
          rel="noopener noreferrer"
          className="beam-ring glass-navy-premium hidden items-center gap-2 rounded-full px-5 py-2.5 font-display text-sm font-medium text-white transition-colors hover:text-[#D4AF37] md:inline-flex"
        >
          Officer Sign-in
          <ArrowRightIcon className="h-3.5 w-3.5 stroke-[2.5]" />
        </a>
        <button
          aria-label="Menu"
          onClick={() => setOpen((o) => !o)}
          className="glass-navy flex h-10 w-10 items-center justify-center rounded-full text-white md:hidden"
        >
          {open ? <XMarkIcon className="h-4 w-4 stroke-[2.5]" /> : <Bars3Icon className="h-4 w-4 stroke-[2.5]" />}
        </button>
      </div>

      {/* mobile drawer */}
      {open && (
        <div className="glass-navy-strong absolute right-6 top-[52px] w-64 rounded-2xl p-3 md:hidden">
          {nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-4 py-2.5 font-display text-sm text-white/80 transition-colors hover:bg-white/5 hover:text-white"
            >
              {item.label}
            </a>
          ))}
          <a
            href="https://police.risetechnosoft.com/login"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-2 flex items-center justify-between rounded-full bg-[#D4AF37] px-4 py-2.5 font-display text-sm font-medium text-[#0A0E1A]"
          >
            Officer Sign-in
            <ArrowRightIcon className="h-3.5 w-3.5 stroke-[2.5]" />
          </a>
        </div>
      )}
    </motion.header>
  );
}
