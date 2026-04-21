"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/cn";

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

type Common = {
  children?: React.ReactNode;
  className?: string;
  amount?: number;
  id?: string;
};

export function AnimatedSection({
  children,
  className,
  amount = 0.2,
  as = "div",
  id,
}: Common & { as?: "div" | "section" }) {
  const Tag = as === "section" ? motion.section : motion.div;
  return (
    <Tag
      id={id}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      className={cn(className)}
    >
      {children}
    </Tag>
  );
}

export function AnimatedItem({
  children,
  className,
}: Common) {
  return (
    <motion.div variants={item} className={cn(className)}>
      {children}
    </motion.div>
  );
}
