"use client";

import { motion } from "framer-motion";
import cn from "@/utils/cn";

export default function FadeUp({
  children,
  delay = 0,
  distance = 40,
  duration = 0.6,
  className,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
