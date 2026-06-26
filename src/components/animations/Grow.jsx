import { motion } from "framer-motion";

export default function Grow({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ scale: 0.85 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}
