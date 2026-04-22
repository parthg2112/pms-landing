# Saarthi — Brand & Engineering Manifest

This file is the source of truth for anyone (human or agent) working in this repo. Re-read before making visual, motion, copy, or architectural changes.

## 1. Product

**Saarthi** (सारथी — "the charioteer") is an AI-powered training platform for **Mumbai Police (v1)** and, on the roadmap, the broader Indian uniformed services (state police, CAPF, traffic, coastal, home guards).

- **Audience:** commandants, training officers, DCPs/SPs, procurement committees.
- **Pitch:** *Training that guides.* Live sessions + scenario simulators + compliance analytics, in one command center.
- **Built by:** VisionRise Technosoft Pvt. Ltd., Mumbai.

## 2. Cultural & aesthetic constraints (non-negotiable)

- **Dignified, never flashy.** Procurement-audience safe. No marketing fluff, no emoji in UI, no "✨ introducing…".
- **Never saffron/orange.** Politically coded in India — avoid even as accent.
- **Ashoka Chakra is the only cultural motif.** No lotus, peacock, tiger, map silhouettes — these read regional or nationalist.
- **Bilingual from day one.** Every section badge pairs English + a short Devanagari sub-label. Hindi copy uses Noto Sans Devanagari.
- Chrome lines like `सत्यमेव जयते` are fine; full Hindi paragraphs are not (yet).

## 3. Palette

| Token | Hex | Use |
|---|---|---|
| Navy (bg) | `#0A0E1A` | page background, sticky hero |
| Surface | `#141F33` | opaque stacked cards (`.surface-navy`) |
| Elevated | `#1E3A5F` | tinted glass backgrounds |
| Gold (primary) | `#D4AF37` | single accent — CTAs, numerals, chakra, section numbers |
| Gold gradient | `#F4D76B → #D4AF37 → #A67A15` | `.text-gold-gradient` for big stats |
| Body copy | `rgba(255,255,255,0.6)` | default paragraph |
| Muted label | `rgba(255,255,255,0.4)` / `0.3` | meta, mono labels |

**Do not introduce new colors.** No blue highlights, no cyan, no red.

## 4. Typography

| Family | Variable | Role |
|---|---|---|
| Space Grotesk | `--font-display` | headlines, nav, buttons |
| Inter | `--font-body` | paragraphs |
| Noto Sans Devanagari | `--font-hindi` | Hindi text |
| Space Mono | `--font-mono` | numerals, meta labels, coords, section-num |

Rules:
- Display text at `6xl+` uses `tracking-tight`; optional `.tracking-display-xl` (`-0.03em`) for the largest cases.
- Body paragraphs use `font-light` (weight 300) and `leading-relaxed`.
- All numeric displays use `tabular-nums`.
- Large headings use `text-balance` for tidy two-line wraps.

## 5. Design tokens (pointers into `src/app/globals.css`)

- `.glass-navy` — translucent glass with masked gold border gradient.
- `.glass-navy-strong` — heavier blur variant for primary surfaces.
- `.surface-navy` — **opaque** navy gradient for stacked cards (prevents bleed-through).
- `.bg-grid-pattern` — dotted grid overlay.
- `.grain-overlay` — fixed SVG turbulence noise, `mix-blend-overlay`, z-100.
- `.reticle`, `.reticle-tl/tr/bl/br` — gold corner marks for command-center chrome.
- `.chakra-divider` — hairline with gold rhombus.
- `.section-num` — editorial section numbering (e.g. `01 / 09`).
- `.text-gold-gradient` — 3-stop metallic gold fill.
- `.card-hover` — cinematic lift + gold glow on hover.
- `.beam-ring` — animated conic-gradient border beam using `@property --beam-angle`.

The **chakra halo** is a CSS `radial-gradient` layer behind the canvas (`haloRef` in `Hero.tsx`), not an in-canvas `createRadialGradient`. Canvas buffer stays a tight 720px; halo extends past the canvas rect so the bloom never clips to a rectangle. Intensity rides the existing ScrollTrigger `onUpdate` via a `--halo` CSS variable.

## 6. Motion

- **Easing:** `--ease-cinema` = `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Stagger:** 80ms between sibling items.
- **Scroll engine:** **GSAP ScrollTrigger + Lenis**, bridged in `SmoothScrollProvider`. Lenis is driven from `gsap.ticker`; `lenis.on("scroll", ScrollTrigger.update)` keeps pin/scrub in sync.
- **In-view reveals:** Framer Motion via `AnimatedSection` / `AnimatedItem`.
- **Hero chakra:** 120 pre-rendered frames, scrubbed by a single `ScrollTrigger({ scrub: 1 })`. No hand-rolled RAF.
- **Stats:** scroll-triggered count-up via `gsap.to()` + `onUpdate` writing `textContent`.
- **ScenarioStack:** GSAP timeline (not `setInterval`) so hover can pause/resume cleanly.
- Always honor `prefers-reduced-motion: reduce`: disable smooth scroll, snap chakra to final frame, skip count-ups.

## 7. Stack

- Next.js 16.2.2 (App Router, RSC)
- React 19.2.4
- Tailwind v4 (`@import "tailwindcss"`, `@theme inline`)
- Framer Motion 12.38
- Lenis 1.3.21
- GSAP 3 (free tier: ScrollTrigger, ScrollToPlugin, MotionPath, CustomEase)
- `@gsap/react` for `useGSAP` + context cleanup
- Heroicons 24 (outline default, solid for filled states only)
- Lucide (GlassDock only — required by that component)
- Geist fonts (handled via `next/font/google`)

## 8. Icon convention

- **Heroicons 24/outline** everywhere by default.
- **Heroicons 24/solid** only for filled UI states: `PlayIcon`, `CheckCircleIcon`.
- `ChakraMark` (custom SVG) for any wheel marks.
- Sizing by Tailwind classes (`h-4 w-4`, `h-5 w-5`, etc.), not `size` props.
- `stroke-[2.5]` on small arrows for extra weight.
- Do **not** mix icon libraries; the only exception is GlassDock, which ships bound to Lucide.

## 9. File layout

```
src/
├── app/
│   ├── layout.tsx        — fonts, providers, gradient backdrop, grain overlay
│   ├── globals.css       — tokens + utility classes
│   └── page.tsx          — section composition
├── components/
│   ├── sections/         — Navbar, Hero, TrustBar, HowItWorks, ScenarioStack,
│   │                       Features, Stats, Bilingual, Testimonials, CTAFooter
│   ├── ui/               — primitives (Button, BlurText, SectionBadge, ChakraMark,
│   │                       AnimatedSection, SectionNum, Divider) + shadcn-installed
│   │                       (spotlight-navbar, glass-dock)
│   └── providers/        — SmoothScrollProvider (Lenis ↔ GSAP bridge)
└── lib/
    └── cn.ts             — clsx + tailwind-merge
```

- Reusable primitives live in `components/ui`. Section files compose them.
- Anything with `useState`/`useEffect`/Framer/GSAP needs `"use client"`.

## 10. Voice & copy

- Short, declarative, evidence-grade. Procurement committees read this.
- Use concrete numbers over adjectives ("2,400+ officers onboarded" > "many officers onboarded").
- Prefer active voice, imperative mood in CTAs ("Request a demo", "Download the brochure").
- No exclamation marks. No rhetorical questions in body copy (headlines/CTAs OK).
- No "seamless," "revolutionary," "AI-powered" as a badge — state the *use* instead.

## 11. Performance guardrails

- DPR-aware canvas sizing: `canvas.width = clientWidth * devicePixelRatio` (cap DPR at 2).
- Passive scroll listeners.
- Lenis lerp: `0.08` (Chrome), `0.12` (Safari).
- Preload *all* 120 chakra frames into offscreen canvases before revealing the hero canvas; show `Aligning dharma • NN%` loader.
- Lighthouse targets: **≥90 desktop, ≥70 mobile**.
- GSAP: transforms + opacity only (never `top`, `width`, `height`, `margin`). `gsap.ticker` for RAF — never hand-rolled loops alongside Lenis.

## 12. Agent directives

When operating on this repo:

1. **Re-read this file first** before making stylistic changes.
2. **Do not introduce new colors.** Navy + gold + tinted glass only.
3. **Do not swap fonts.** The four families above are locked.
4. **Do not globalize CSS transitions** (e.g. `* { transition: ... }`) — scope to `:where(button, a, input, select, textarea)` only.
5. **Scroll-linked work → GSAP ScrollTrigger.** Hand-rolled scroll handlers are forbidden. The Lenis bridge is already wired; reuse it.
6. **Pre-built components → shadcn skill**, not ad-hoc `npx`. Keep `components.json` in sync.
7. **Interaction nuance → `userinterface-wiki` + `emil-design-eng` skills** for judgment calls (hover, focus, press states).
8. **Bulk mechanical edits → `/batch` skill** once the scope is mapped.
9. Honor `prefers-reduced-motion` in every new animation. No exceptions.
10. The **only** opaque navy surface is the fixed `-z-10` backdrop div in `layout.tsx`. Every section (including Hero sticky inner) and `<body>` must stay transparent so the sitewide gradient reads uniformly across the page. The sitewide gradient is a **single** gold radial — `radial-gradient(circle 600px at 50% 50%, rgba(212,175,55,0.3), transparent)` over `#0A0E1A`. Do not re-add multiple layered stops; do not duplicate the gradient on individual sections. Per-section decorative overlays (chakra halo, footer horizon, scenario grid) are fine because they are compositional motifs, not background gradients.
