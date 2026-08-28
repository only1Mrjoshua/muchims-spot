import React from 'react';
import { motion } from 'framer-motion';

const MenuListItem = ({ name, price, image, description }) => {
  return (
    <motion.div
      className="flex items-center gap-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-3"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      {/* Image */}
      <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden bg-light-gray">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-display font-bold text-base text-charcoal truncate">
            {name}
          </h3>
          <span className="font-bold text-gold-500 text-sm whitespace-nowrap">
            ₦{price.toLocaleString()}
          </span>
        </div>
        {description && (
          <p className="text-dark-gray/80 text-xs mt-0.5 line-clamp-2">
            {description}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default MenuListItem;