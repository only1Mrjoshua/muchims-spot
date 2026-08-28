import React from 'react';
import { motion } from 'framer-motion';

const MenuCard = ({ name, price, image, description, size = 'md' }) => {
  const sizeClasses = {
    sm: {
      wrapper: 'rounded-lg shadow-sm hover:shadow-md',
      image: 'aspect-[4/3]',
      padding: 'p-3',
      title: 'text-base',
      price: 'text-base',
      desc: 'text-xs',
    },
    md: {
      wrapper: 'rounded-xl shadow-sm hover:shadow-xl',
      image: 'aspect-square',
      padding: 'p-4 md:p-5',
      title: 'text-lg',
      price: 'text-lg',
      desc: 'text-sm',
    },
  };

  const classes = sizeClasses[size] || sizeClasses.md;

  return (
    <motion.div
      className={`group bg-white overflow-hidden transition-all duration-300 hover:-translate-y-2 ${classes.wrapper}`}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`relative overflow-hidden ${classes.image} bg-light-gray`}>
        <motion.img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className={classes.padding}>
        <div className="flex justify-between items-start gap-2 mb-1">
          <h3 className={`font-display font-bold ${classes.title} text-charcoal`}>{name}</h3>
          <span className={`font-bold text-gold-500 ${classes.price} whitespace-nowrap`}>
            ₦{price.toLocaleString()}
          </span>
        </div>
        {description && (
          <p className={`text-dark-gray/80 ${classes.desc}`}>{description}</p>
        )}
      </div>
    </motion.div>
  );
};

export default MenuCard;