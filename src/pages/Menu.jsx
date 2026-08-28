// src/pages/Menu.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Utensils } from 'lucide-react';
import { menuData } from '../data/menuData';
import Button from '../components/ui/Button';
import RevealOnScroll from '../components/ui/RevealOnScroll';
import SectionHeading from '../components/ui/SectionHeading';
import MenuCard from '../components/ui/MenuCard';
import MenuListItem from '../components/ui/MenuListItem';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState(
    menuData[0]?.category || ''
  );
  const [headerHeight, setHeaderHeight] = useState(80);

  const categoryRefs = useRef({});
  const isClickScrolling = useRef(false);
  const scrollTimeout = useRef(null);
  const filterRef = useRef(null);

  // Create refs for every category
  menuData.forEach((category) => {
    if (!categoryRefs.current[category.category]) {
      categoryRefs.current[category.category] = React.createRef();
    }
  });

  // ==========================================
  // MEASURE HEADER HEIGHT
  // ==========================================
  useEffect(() => {
    const updateHeaderHeight = () => {
      const header = document.querySelector('header');
      if (header) {
        setHeaderHeight(header.getBoundingClientRect().height);
      }
    };
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, []);

  // ==========================================
  // SCROLL SPY (scroll-position based)
  // ==========================================
  useEffect(() => {
    const getOffset = () => {
      const header = document.querySelector('header');
      const headerHeight = header ? header.getBoundingClientRect().height : 80;
      const filterHeight = filterRef.current ? filterRef.current.getBoundingClientRect().height : 72;
      // The "active line" sits just below the sticky header + filter bar.
      return headerHeight + filterHeight + 5;
    };

    const sections = menuData
      .map((cat) => categoryRefs.current[cat.category]?.current)
      .filter(Boolean);

    if (!sections.length) return;

    let ticking = false;

    const updateActiveSection = () => {
      ticking = false;
      if (isClickScrolling.current) return;

      const offset = getOffset();

      // If scrolled to (or very near) the bottom, force the last category
      // active — its content may be shorter than the viewport, so its top
      // never actually crosses the offset line.
      const scrolledToBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;

      if (scrolledToBottom) {
        const last = menuData[menuData.length - 1]?.category;
        if (last) setActiveCategory(last);
        return;
      }

      // Walk sections top-to-bottom, keep the last one whose top has
      // crossed the offset line — that's the "currently active" section.
      let current = sections[0].dataset.category;
      for (const section of sections) {
        const top = section.getBoundingClientRect().top;
        if (top - offset <= 0) {
          current = section.dataset.category;
        } else {
          break;
        }
      }
      setActiveCategory(current);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateActiveSection);
      }
    };

    updateActiveSection(); // correct state on mount
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // ==========================================
  // CLICK CATEGORY
  // ==========================================
  const scrollToCategory = (category) => {
    const ref = categoryRefs.current[category];
    if (!ref?.current) return;

    setActiveCategory(category);
    isClickScrolling.current = true;
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

    const header = document.querySelector('header');
    const headerHeight = header ? header.getBoundingClientRect().height : 80;
    const filterHeight = filterRef.current ? filterRef.current.getBoundingClientRect().height : 72;
    const extra = 20;

    const top = ref.current.getBoundingClientRect().top + window.scrollY;
    const target = top - headerHeight - filterHeight - extra;

    window.scrollTo({
      top: Math.max(0, target),
      behavior: 'smooth',
    });

    scrollTimeout.current = setTimeout(() => {
      isClickScrolling.current = false;
      setActiveCategory(category);
    }, 900);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="relative"
    >
      {/* ===== HERO / HEADER ===== */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-charcoal text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
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
              Explore our curated selection of bold flavors, from perfectly
              spiced shawarma to loaded fries and premium burgers. Every dish
              is made to crave.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* ===== STICKY FILTER BAR ===== */}
      <div
        ref={filterRef}
        className="sticky z-40 bg-white/95 backdrop-blur-md border-b border-light-gray shadow-sm"
        style={{
          top: `${headerHeight}px`,
          // ensure no parent overflow breaks sticky
        }}
      >
        <div className="container-custom">
          <nav
            className="flex items-center overflow-x-auto py-4 gap-2 md:gap-4 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {menuData.map((category) => (
              <button
                key={category.category}
                onClick={() => scrollToCategory(category.category)}
                className={`px-4 py-2 text-sm md:text-base font-semibold whitespace-nowrap rounded-full transition-all duration-300 flex-shrink-0 ${
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
              data-category={category.category}
              className="mb-20 last:mb-0 scroll-mt-40"
            >
              <RevealOnScroll>
                <SectionHeading
                  title={category.category}
                  alignment="left"
                  className="mb-8"
                />
              </RevealOnScroll>

              {/* GRID – desktop */}
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

              {/* LIST – mobile */}
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

      {/* ===== ORDER CTA ===== */}
      <section className="bg-gold-500 py-16 md:py-20">
        <div className="container-custom text-center">
          <RevealOnScroll>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-charcoal mb-4">
              Ready to <span className="text-white">Order?</span>
            </h2>
            <p className="text-charcoal/80 text-lg max-w-2xl mx-auto mb-8">
              Skip the queue. Order directly via WhatsApp and enjoy your
              favorite meals in no time.
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