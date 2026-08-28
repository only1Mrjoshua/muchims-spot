// src/components/ui/SectionHeading.jsx
import React from 'react';

const SectionHeading = ({ title, subtitle, alignment = 'center', className = '' }) => {
  const alignClasses = {
    center: 'text-center',
    left: 'text-left',
    right: 'text-right',
  };

  return (
    <div className={`mb-12 md:mb-16 ${alignClasses[alignment]} ${className}`}>
      {subtitle && (
        <span className="inline-block text-gold-500 font-semibold text-sm uppercase tracking-widest mb-2">
          {subtitle}
        </span>
      )}
      <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-charcoal">
        {title}
      </h2>
    </div>
  );
};

export default SectionHeading;