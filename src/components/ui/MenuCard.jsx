// src/components/ui/MenuCard.jsx
import React from 'react';
import { motion } from 'framer-motion';

const MenuCard = ({ name, price, image, description }) => {
  return (
    <motion.div
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative overflow-hidden aspect-square bg-light-gray">
        <motion.img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-4 md:p-5">
        <div className="flex justify-between items-start gap-2 mb-1">
          <h3 className="font-display font-bold text-lg text-charcoal">{name}</h3>
          <span className="font-bold text-gold-500 text-lg whitespace-nowrap">
            ₦{price.toLocaleString()}
          </span>
        </div>
        {description && (
          <p className="text-dark-gray/80 text-sm">{description}</p>
        )}
      </div>
    </motion.div>
  );
};

export default MenuCard;