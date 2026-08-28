// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, MapPin, Phone, Star } from 'lucide-react';
import { featuredItems } from '../data/menuData';
import Button from '../components/ui/Button';
import RevealOnScroll from '../components/ui/RevealOnScroll';
import SectionHeading from '../components/ui/SectionHeading';
import MenuCard from '../components/ui/MenuCard';
import Testimonials from '../components/Testimonials';
import TypewriterText from '../components/ui/TypewriterText';

const Home = () => {
  // Hero text stagger animation
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-charcoal">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/70 to-charcoal/40" />

        {/* Animated Content */}
        <div className="container-custom relative z-10 py-24 md:py-32">
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >

<motion.h1
  variants={child}
  className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-tight"
>
  <div>
    <TypewriterText
      text="Big Flavor."
      speed={90}
      startDelay={0}
      cursorHideDelay={500}
    />
  </div>
  <div>
    <TypewriterText
      text="Bigger"
      speed={90}
      startDelay={500} // after first line finishes (~660ms) + short pause
      cursorHideDelay={500}
      className="text-gold-500 text-shadow-gold"
    />
  </div>
  <div>
    <TypewriterText
      text="Cravings."
      speed={90}
      startDelay={1000} // after second line finishes (~360ms) + pause
      cursorHideDelay={500}
      className="text-gold-500 text-shadow-gold"
    />
  </div>
</motion.h1>

            <motion.p
              variants={child}
              className="mt-6 text-white/80 text-lg md:text-xl max-w-xl leading-relaxed"
            >
              Sink your teeth into bold shawarma, loaded fries, and premium burgers. 
              Made fresh, served fast, and crafted to satisfy your biggest cravings.
            </motion.p>

            <motion.div
              variants={child}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Button
                as="a"
                href="https://wa.me/2348066029768?text=Hi%2C%20I%27d%20like%20to%20place%20an%20order%20from%20Muchim%27s%20Spot"
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
              >
                Order Online
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                as={Link}
                to="/menu"
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-charcoal"
              >
                View Menu
              </Button>
            </motion.div>

            {/* Floating indicators */}
            <motion.div
              variants={child}
              className="mt-16 flex flex-wrap items-center gap-6 text-white/60 text-sm"
            >
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold-500" /> Fresh Daily
              </span>
              <span className="flex items-center gap-2">
                <Star className="w-4 h-4 text-gold-500 fill-gold-500" /> 5-Star Rated
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold-500" /> Port Harcourt, Nigeria
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section id="about" className="section-padding bg-off-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <RevealOnScroll direction="left">
              <div className="relative px-2 sm:px-0 overflow-hidden sm:overflow-visible">
                <div className="absolute inset-0 bg-gold-500/10 rounded-3xl transform rotate-3 scale-105" />
                <img
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Muchim's Spot interior and food"
                  className="relative rounded-3xl shadow-2xl object-cover w-full h-[400px] md:h-[500px]"
                  loading="lazy"
                />
                <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-gold-500 text-white font-display font-bold text-2xl p-6 rounded-2xl shadow-xl">
                  5★
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="right">
              <div>
                <span className="inline-block text-gold-500 font-semibold text-sm uppercase tracking-widest mb-2">
                  Our Story
                </span>
                <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-charcoal leading-tight mb-6">
                  Where Bold Flavors Meet <span className="text-gold-500">Street Energy</span>
                </h2>
                <p className="text-dark-gray/80 text-lg leading-relaxed mb-6">
                  At Muchim's Spot, we're rewriting the fast-food rulebook. We take the vibrant, energetic soul of Nigerian street food and elevate it with premium ingredients and big, unapologetic flavors.
                </p>
                <p className="text-dark-gray/80 text-lg leading-relaxed">
                  Every shawarma is perfectly spiced, every fry is loaded to perfection, and every burger is a masterpiece. This isn't just a meal, it's a craving waiting to happen.
                </p>
                <div className="mt-8">
                  <Button as={Link} to="/menu" variant="outline">
                    Explore Our Menu
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ===== FEATURED MENU ===== */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading 
            title="Featured Favorites" 
            subtitle="Must-Try Dishes"
            alignment="center"
          />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.08 },
              },
            }}
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 auto-rows-fr"
          >
            {featuredItems.map((item) => (
              <motion.div
                key={item.name}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="h-full"  // make the wrapper fill the grid cell
              >
                <MenuCard {...item} size="xs" className="h-full" />
              </motion.div>
            ))}
          </motion.div>
          <div className="text-center mt-12">
            <Button as={Link} to="/menu" size="lg">
              View Full Menu
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* ===== GALLERY ===== */}
      <section className="section-padding bg-off-white">
        <div className="container-custom">
          <SectionHeading 
            title="A Taste of Our World" 
            subtitle="Gallery"
            alignment="center"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
              'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
              'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
              'https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
              'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
              'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
              'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
              'https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            ].map((url, index) => (
              <RevealOnScroll key={index} delay={index * 0.05} direction="up">
                <div className="relative overflow-hidden rounded-xl shadow-md group aspect-square">
                  <img
                    src={url}
                    alt={`Muchim's Spot gallery ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gold-500/0 group-hover:bg-gold-500/20 transition-colors duration-300" />
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <Testimonials />

      {/* ===== LOCATION & HOURS ===== */}
      <section id="contact" className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <RevealOnScroll direction="left">
              <div>
                <SectionHeading 
                  title="Visit Us" 
                  subtitle="Location & Hours"
                  alignment="left"
                  className="mb-6"
                />
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-gold-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-display font-bold text-lg">Address</h4>
                      <p className="text-dark-gray/80">
                        Top ten plaza,opposite Elite school<br />Road 6 Woji Estate,Port Harcourt 
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Clock className="w-6 h-6 text-gold-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-display font-bold text-lg">Opening Hours</h4>
                      <ul className="text-dark-gray/80 space-y-1">
                        <li>Mon - Thu: 11:00 AM - 10:00 PM</li>
                        <li>Fri - Sat: 11:00 AM - 11:00 PM</li>
                        <li>Sunday: 12:00 PM - 8:00 PM</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Phone className="w-6 h-6 text-gold-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-display font-bold text-lg">Call Us</h4>
                      <a href="tel:+2348066029768" className="text-dark-gray/80 hover:text-gold-500 transition-colors">
                        +234 806 602 9768
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="right">
              <div className="rounded-xl overflow-hidden shadow-xl h-[300px] lg:h-[400px]">
                <iframe
                  src="https://maps.google.com/maps?q=Top+ten+plaza,+Woji+Estate,+Port+Harcourt&z=15&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Muchim's Spot Location"
                  className="w-full h-full"
                />
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ===== ORDER CTA BAND ===== */}
      <section className="bg-gold-500 py-16 md:py-20">
        <div className="container-custom text-center">
          <RevealOnScroll>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-charcoal mb-4">
              Craving Something <span className="text-white">Good?</span>
            </h2>
            <p className="text-charcoal/80 text-lg max-w-2xl mx-auto mb-8">
              Order now and experience the boldest flavors in Lagos. Fresh, fast, and made just for you.
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

export default Home;