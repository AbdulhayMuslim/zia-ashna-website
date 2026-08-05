"use client";

import { motion } from "framer-motion";
import cn from "@/utils/cn";

export default function ZoomIn({
  children,
  delay = 0,
  scale = 0.6,
  duration = 0.6,
  className,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
