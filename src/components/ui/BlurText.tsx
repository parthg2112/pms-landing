"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface Props {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  perWord?: number;
}

export function BlurText({
  text,
  className,
  as = "h2",
  delay = 0,
  perWord = 0.07,
}: Props) {
  const words = text.split(" ");
  const MotionTag = (
    {
      h1: motion.h1,
      h2: motion.h2,
      h3: motion.h3,
      p: motion.p,
      span: motion.span,
    } as const
  )[as];

  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: {
                duration: 0.8,
                delay: delay + i * perWord,
                ease: [0.16, 1, 0.3, 1],
              },
            },
          }}
        >
          {word}
          {i < words.length - 1 && " "}
        </motion.span>
      ))}
    </MotionTag>
  );
}
