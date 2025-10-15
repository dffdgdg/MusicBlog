// src/components/GlobalParallaxBackground.tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function GlobalParallaxBackground() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);

  return (
    <>
      <motion.div
        style={{ y: y1 }}
        className="fixed top-[-10rem] left-[-10rem] h-[40rem] w-[40rem] bg-orange-500/10 blur-[150px] rounded-full -z-10"
      />
      <motion.div
        style={{ y: y2 }}
        className="fixed bottom-[-10rem] right-[-10rem] h-[30rem] w-[30rem] bg-cyan-900/10 blur-[120px] rounded-full -z-10"
      />
    </>
  );
}
