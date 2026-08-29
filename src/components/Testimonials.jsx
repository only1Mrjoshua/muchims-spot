// src/components/Testimonials.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';

const testimonials = [
  {
    id: 1,
    name: "Aisha K.",
    text: "Muchim's Spot is my go-to for late-night cravings! The Mixed Loaded is absolutely divine. Best in Port Harcourt!",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: 2,
    name: "Tunde O.",
    text: "Best shawarma in Port Harcourt, hands down. The portion sizes are insane and the flavors are unmatched.",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=2"
  },
  {
    id: 3,
    name: "Zara M.",
    text: "I dream about their Loaded Fries. The perfect blend of crunch, cheese, and flavor. Absolutely craveable!",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=3"
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="section-padding bg-charcoal text-white">
      <div className="container-custom">
        <SectionHeading 
          title="What Our Customers Say" 
          subtitle="Testimonials"
          alignment="center"
          className="text-white"
        />
        
        <div className="max-w-3xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="flex justify-center mb-4">
                <img 
                  src={testimonials[currentIndex].image} 
                  alt={testimonials[currentIndex].name}
                  className="w-20 h-20 rounded-full border-2 border-gold-500"
                />
              </div>
              <div className="flex justify-center mb-4 text-gold-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-xl md:text-2xl font-medium text-white/90 leading-relaxed">
                "{testimonials[currentIndex].text}"
              </p>
              <p className="mt-6 font-display font-bold text-gold-500">
                — {testimonials[currentIndex].name}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 p-2 rounded-full bg-white/10 hover:bg-gold-500 transition-colors duration-300 text-white hover:text-charcoal"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 p-2 rounded-full bg-white/10 hover:bg-gold-500 transition-colors duration-300 text-white hover:text-charcoal"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-gold-500 w-8' : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;