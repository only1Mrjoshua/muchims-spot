// src/components/CategoryShowcase.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sandwich, 
  Beef, 
  Salad, 
  Utensils, 
  Coffee, 
  IceCream 
} from 'lucide-react';
import SectionHeading from './ui/SectionHeading';

const categories = [
  { name: 'Shawarma', icon: Sandwich, color: 'from-orange-500 to-red-500' },
  { name: 'Loaded Fries', icon: Utensils, color: 'from-yellow-500 to-orange-500' },
  { name: 'Salads', icon: Salad, color: 'from-green-500 to-emerald-500' },
  { name: 'Burgers', icon: Beef, color: 'from-amber-700 to-amber-900' },
  { name: 'Drinks', icon: Coffee, color: 'from-blue-500 to-cyan-500' },
  { name: 'Desserts', icon: IceCream, color: 'from-pink-500 to-rose-500' },
];

const CategoryShowcase = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <SectionHeading 
          title="Explore Our Menu" 
          subtitle="Categories"
          alignment="center"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              whileHover={{ y: -8, scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Link
                to="/menu"
                className="block group"
              >
                <div className="relative rounded-2xl overflow-hidden aspect-square bg-light-gray shadow-sm hover:shadow-xl transition-shadow duration-300">
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-90 group-hover:opacity-100 transition-opacity duration-300`} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                    <category.icon className="w-10 h-10 md:w-12 md:h-12 mb-2 drop-shadow-lg" />
                    <span className="font-display font-bold text-sm md:text-base text-center leading-tight">
                      {category.name}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;