"use client";

import { motion } from "framer-motion";
import { ArrowRight, List, X } from "@phosphor-icons/react/dist/ssr";
import { useState, useEffect } from "react";
import { ChakraMark } from "@/components/ui/ChakraMark";

const nav = [
  { label: "Platform", href: "#platform" },
  { label: "Scenarios", href: "#scenarios" },
  { label: "For Departments", href: "#features" },
  { label: "Security", href: "#security" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

      {/* center — nav pill */}
      <nav
        className={`glass-navy hidden rounded-full px-2 py-2 transition-all duration-500 md:flex md:items-center md:gap-1 ${
          scrolled ? "scale-[0.98]" : ""
        }`}
      >
        {nav.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="rounded-full px-4 py-1.5 font-display text-sm font-medium text-white/80 transition-colors hover:text-white"
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* right — sign-in */}
      <div className="flex items-center gap-2">
        <a
          href="#contact"
          className="beam-ring glass-navy hidden items-center gap-2 rounded-full px-5 py-2.5 font-display text-sm font-medium text-white transition-colors hover:text-[#D4AF37] md:inline-flex"
        >
          Officer Sign-in
          <ArrowRight weight="bold" size={14} />
        </a>
        <button
          aria-label="Menu"
          onClick={() => setOpen((o) => !o)}
          className="glass-navy flex h-10 w-10 items-center justify-center rounded-full text-white md:hidden"
        >
          {open ? <X size={18} weight="bold" /> : <List size={18} weight="bold" />}
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
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 flex items-center justify-between rounded-full bg-[#D4AF37] px-4 py-2.5 font-display text-sm font-medium text-[#0A0E1A]"
          >
            Officer Sign-in
            <ArrowRight weight="bold" size={14} />
          </a>
        </div>
      )}
    </motion.header>
  );
}
