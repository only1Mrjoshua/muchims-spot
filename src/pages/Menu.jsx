// src/pages/Menu.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Utensils } from 'lucide-react';
import { menuData } from '../data/menuData';
import Button from '../components/ui/Button';
import RevealOnScroll from '../components/ui/RevealOnScroll';
import SectionHeading from '../components/ui/SectionHeading';
import MenuCard from '../components/ui/MenuCard';
import MenuListItem from '../components/ui/MenuListItem';  // 👈 import the list item

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState(menuData[0]?.category || '');
  const categoryRefs = useRef({});

  // Generate refs for each category
  useEffect(() => {
    categoryRefs.current = menuData.reduce((acc, category) => {
      acc[category.category] = React.createRef();
      return acc;
    }, {});
  }, []);

  // Scroll spy logic
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120; // Offset for sticky header

      let currentCategory = menuData[0]?.category || '';
      for (const category of menuData) {
        const ref = categoryRefs.current[category.category];
        if (ref && ref.current) {
          const element = ref.current;
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            currentCategory = category.category;
            break;
          }
        }
      }
      setActiveCategory(currentCategory);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuData]);

  const scrollToCategory = (category) => {
    const ref = categoryRefs.current[category];
    if (ref && ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop - 80, // Adjust for header height
        behavior: 'smooth',
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* ===== MENU HEADER ===== */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-charcoal text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/90 via-charcoal/70 to-charcoal/50" />
        <div className="container-custom relative z-10 text-center">
          <RevealOnScroll>
            <Utensils className="w-12 h-12 text-gold-500 mx-auto mb-4" />
            <h1 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white mb-4">
              Our <span className="text-gold-500">Menu</span>
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Explore our curated selection of bold flavors — from perfectly spiced shawarma 
              to loaded fries and premium burgers. Every dish is made to crave.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* ===== STICKY CATEGORY NAV ===== */}
      <div className="sticky top-16 md:top-20 z-30 bg-white/90 backdrop-blur-md border-b border-light-gray shadow-sm">
        <div className="container-custom">
          <nav className="flex items-center overflow-x-auto py-4 gap-2 md:gap-4 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {menuData.map((category) => (
              <button
                key={category.category}
                onClick={() => scrollToCategory(category.category)}
                className={`px-4 py-2 text-sm md:text-base font-semibold whitespace-nowrap rounded-full transition-all duration-300 ${
                  activeCategory === category.category
                    ? 'bg-gold-500 text-white shadow-lg'
                    : 'text-dark-gray/70 hover:text-gold-500 hover:bg-gold-50'
                }`}
              >
                {category.category}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* ===== MENU SECTIONS ===== */}
      <section className="section-padding bg-off-white">
        <div className="container-custom">
          {menuData.map((category) => (
            <div
              key={category.category}
              ref={categoryRefs.current[category.category]}
              className="mb-20 last:mb-0 scroll-mt-32"
            >
              <RevealOnScroll>
                <SectionHeading
                  title={category.category}
                  alignment="left"
                  className="mb-8"
                />
              </RevealOnScroll>

              {/* === GRID VIEW (hidden on mobile) === */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.05 }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.06 },
                  },
                }}
                className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
              >
                {category.items.map((item) => (
                  <motion.div
                    key={item.name}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <MenuCard {...item} size="sm" />
                  </motion.div>
                ))}
              </motion.div>

              {/* === LIST VIEW (visible only on mobile) === */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.05 }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.05 },
                  },
                }}
                className="sm:hidden flex flex-col gap-3"
              >
                {category.items.map((item) => (
                  <motion.div
                    key={item.name}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                  >
                    <MenuListItem {...item} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== ORDER CTA BAND ===== */}
      <section className="bg-gold-500 py-16 md:py-20">
        <div className="container-custom text-center">
          <RevealOnScroll>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-charcoal mb-4">
              Ready to <span className="text-white">Order?</span>
            </h2>
            <p className="text-charcoal/80 text-lg max-w-2xl mx-auto mb-8">
              Skip the queue. Order directly via WhatsApp and enjoy your favorite meals in no time.
            </p>
            <Button
              as="a"
              href="https://wa.me/2348066029768?text=Hi%2C%20I%27d%20like%20to%20place%20an%20order%20from%20Muchim%27s%20Spot"
              target="_blank"
              rel="noopener noreferrer"
              variant="charcoal"
              size="lg"
            >
              Order Online Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </RevealOnScroll>
        </div>
      </section>
    </motion.div>
  );
};

export default Menu;