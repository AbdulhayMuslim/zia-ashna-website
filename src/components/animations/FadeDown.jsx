"use client";

import { motion } from "framer-motion";
import cn from "@/utils/cn";

export default function FadeDown({
  children,
  delay = 0,
  className,
  duration = 0.6,
  distance = 40,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
