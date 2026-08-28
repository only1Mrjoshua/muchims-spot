import React from 'react';
import { motion } from 'framer-motion';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  as: Component = 'button',
  className = '',
  ...props
}) => {
  const baseStyles = `inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-500/50`;

  const variants = {
    primary: `bg-gold-500 text-white hover:bg-gold-600 shadow-lg hover:shadow-xl hover:scale-105`,
    outline: `border-2 border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-white hover:scale-105`,
    ghost: `text-gold-500 hover:bg-gold-50 hover:scale-105`,
    charcoal: `bg-charcoal text-white hover:bg-gold-600 hover:scale-105 shadow-lg`,
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${
    fullWidth ? 'w-full' : ''
  } ${className}`;

  // ✅ Use motion.create() – supports all component types
  const MotionComponent = motion.create(Component);

  return (
    <MotionComponent
      className={classes}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </MotionComponent>
  );
};

export default Button;