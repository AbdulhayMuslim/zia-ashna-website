"use client";

import { motion } from "framer-motion";
import cn from "@/utils/cn";

export default function Grow({
  children,
  delay = 0,
  scale = 0.8,
  duration = 0.5,
  className,
}) {
  return (
    <motion.div
      initial={{ scale }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
