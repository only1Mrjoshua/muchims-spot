// src/components/ui/RevealOnScroll.jsx
import React from 'react';
import { motion } from 'framer-motion';

const RevealOnScroll = ({ children, delay = 0, direction = 'up', once = true, amount = 0.2, className = '' }) => {
  const directions = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default RevealOnScroll;