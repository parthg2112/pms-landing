"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

const en = {
  courseTitle: "De-escalation Fundamentals",
  lead: "Module 2 of 4 · Intermediate",
  modules: [
    { name: "Reading the room", pct: 100, done: true },
    { name: "Active listening under pressure", pct: 72, done: false },
    { name: "Verbal judo — redirecting anger", pct: 0, done: false },
  ],
  cta: "Continue learning",
  streak: "3-day streak",
};

const hi = {
  courseTitle: "शांति बहाली मौलिक सिद्धांत",
  lead: "मॉड्यूल 2 / 4 · मध्यवर्ती",
  modules: [
    { name: "स्थिति को समझना", pct: 100, done: true },
    { name: "दबाव में सक्रिय श्रवण", pct: 72, done: false },
    { name: "क्रोध को मोड़ना", pct: 0, done: false },
  ],
  cta: "सीखना जारी रखें",
  streak: "3-दिन की लय",
};

type Lang = "en" | "hi";

function CoursePanel({ data, lang }: { data: typeof en; lang: Lang }) {
  const bodyFont = lang === "hi" ? "font-hindi" : "font-display";
  return (
    <div className="glass-navy card-hover rounded-2xl p-7">
      <div className="flex items-center justify-between">
        <div className="glass-navy-strong flex h-9 w-9 items-center justify-center rounded-full">
          <BookOpenIcon className="h-4 w-4 text-[#D4AF37]" />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
          {lang.toUpperCase()}
        </span>
      </div>

      <p className={`mt-5 font-mono text-[10px] uppercase tracking-[0.25em] text-[#D4AF37]`}>
        {data.lead}
      </p>
      <h4 className={`mt-2 ${bodyFont} text-xl font-medium leading-tight text-white`}>
        {data.courseTitle}
      </h4>

      <div className="mt-6 space-y-4">
        {data.modules.map((m, i) => (
          <div key={i}>
            <div className="flex items-center justify-between">
              <span className={`${bodyFont} text-sm ${m.done ? "text-white/90" : "text-white/70"} flex items-center gap-2`}>
                {m.done && <CheckCircleIcon className="h-[14px] w-[14px] text-[#D4AF37]" />}
                {m.name}
              </span>
              <span className="font-mono text-[10px] tracking-[0.2em] text-white/50">
                {m.pct}%
              </span>
            </div>
            <div className="mt-2 h-[3px] w-full overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full bg-[#D4AF37]"
                style={{ width: `${m.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-7 flex items-center justify-between">
        <button
          className={`glass-navy-strong rounded-full px-4 py-2 ${bodyFont} text-xs font-medium text-white`}
        >
          {data.cta}
        </button>
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
          {data.streak}
        </span>
      </div>
    </div>
  );
}

export function Bilingual() {
  const [lang, setLang] = useState<Lang>("en");

  return (
    <section id="bilingual" className="relative bg-transparent section-pad">
      <div className="section-num">
        <span className="text-[#D4AF37]">07</span>
        <span className="text-white/20"> / 09</span>
      </div>
      <div className="relative mx-auto max-w-6xl text-center">
        <div className="mb-5 flex justify-center">
          <SectionBadge hindi="द्विभाषी">Bilingual from day one</SectionBadge>
        </div>
        <h2 className="font-hindi text-4xl font-medium leading-[0.95] tracking-tight text-white md:text-5xl lg:text-6xl">
          हर रैंक के लिए। हर अधिकारी के लिए।
        </h2>
        <p className="mt-4 font-display text-xl font-light text-white/60 md:text-2xl">
          For every rank. For every officer.
        </p>

        <div className="mt-10 inline-flex">
          <div className="glass-navy inline-flex items-center rounded-full p-1">
            <button
              onClick={() => setLang("en")}
              className={`rounded-full px-5 py-1.5 font-display text-xs font-medium transition-colors ${
                lang === "en" ? "bg-[#D4AF37] text-[#0A0E1A]" : "text-white/60"
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLang("hi")}
              className={`rounded-full px-5 py-1.5 font-hindi text-xs font-medium transition-colors ${
                lang === "hi" ? "bg-[#D4AF37] text-[#0A0E1A]" : "text-white/60"
              }`}
            >
              हिंदी
            </button>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 text-left md:grid-cols-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={`left-${lang}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <CoursePanel data={lang === "en" ? en : hi} lang={lang} />
            </motion.div>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.div
              key={`right-${lang}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.08 }}
            >
              <CoursePanel data={lang === "en" ? hi : en} lang={lang === "en" ? "hi" : "en"} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
