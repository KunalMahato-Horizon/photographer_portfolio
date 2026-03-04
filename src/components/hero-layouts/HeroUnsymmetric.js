import React, { useState, useRef } from "react";
import { Link } from "react-scroll";
import { motion, useInView } from "framer-motion";

// Higher quality photography-focused images
const heroImages = [
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30", // Wedding
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d", // Portrait
  "https://images.unsplash.com/photo-1554048612-b6a482bc67e5", // Landscape
  "https://images.unsplash.com/photo-1554080353-a576cf803bda", // Nature
  "https://images.unsplash.com/photo-1507591064344-4c6ce005b128", // Urban
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32", // Fashion
];

const HeroUnsymmetric = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-20%" });
  const [ setHoveredImage] = useState(null);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-screen grid grid-cols-6 grid-rows-3 gap-1 overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800 p-1"
    >
      {/* Grid image blocks with animations */}
      <motion.div
        className="col-span-3 row-span-3 bg-cover bg-center relative overflow-hidden group"
        style={{ backgroundImage: `url(${heroImages[0]}?auto=format&fit=crop&w=1200&q=80)` }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8 }}
        onHoverStart={() => setHoveredImage(0)}
        onHoverEnd={() => setHoveredImage(null)}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-70 group-hover:opacity-30 transition-opacity duration-500" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform rotate-45 group-hover:translate-x-full transition-transform duration-1000" />
        </div>
      </motion.div>

      <motion.div
        className="col-span-2 row-span-1 bg-cover bg-center relative overflow-hidden group"
        style={{ backgroundImage: `url(${heroImages[1]}?auto=format&fit=crop&w=1200&q=80)` }}
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.1, duration: 0.8 }}
        onHoverStart={() => setHoveredImage(1)}
        onHoverEnd={() => setHoveredImage(null)}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-70 group-hover:opacity-30 transition-opacity duration-500" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform rotate-45 group-hover:translate-x-full transition-transform duration-1000" />
        </div>
      </motion.div>

      <motion.div
        className="col-span-1 row-span-2 bg-cover bg-center relative overflow-hidden group"
        style={{ backgroundImage: `url(${heroImages[2]}?auto=format&fit=crop&w=1200&q=80)` }}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.8 }}
        onHoverStart={() => setHoveredImage(2)}
        onHoverEnd={() => setHoveredImage(null)}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-70 group-hover:opacity-30 transition-opacity duration-500" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform rotate-45 group-hover:translate-x-full transition-transform duration-1000" />
        </div>
      </motion.div>

      <motion.div
        className="col-span-2 row-span-2 bg-cover bg-center relative overflow-hidden group"
        style={{ backgroundImage: `url(${heroImages[3]}?auto=format&fit=crop&w=1200&q=80)` }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.8 }}
        onHoverStart={() => setHoveredImage(3)}
        onHoverEnd={() => setHoveredImage(null)}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-70 group-hover:opacity-30 transition-opacity duration-500" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform rotate-45 group-hover:translate-x-full transition-transform duration-1000" />
        </div>
      </motion.div>

      <motion.div
        className="col-span-2 row-span-1 bg-cover bg-center relative overflow-hidden group"
        style={{ backgroundImage: `url(${heroImages[4]}?auto=format&fit=crop&w=1200&q=80)` }}
        initial={{ opacity: 0, x: 20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.4, duration: 0.8 }}
        onHoverStart={() => setHoveredImage(4)}
        onHoverEnd={() => setHoveredImage(null)}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-70 group-hover:opacity-30 transition-opacity duration-500" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform rotate-45 group-hover:translate-x-full transition-transform duration-1000" />
        </div>
      </motion.div>

      <motion.div
        className="col-span-2 row-span-1 bg-cover bg-center relative overflow-hidden group"
        style={{ backgroundImage: `url(${heroImages[5]}?auto=format&fit=crop&w=1200&q=80)` }}
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5, duration: 0.8 }}
        onHoverStart={() => setHoveredImage(5)}
        onHoverEnd={() => setHoveredImage(null)}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-70 group-hover:opacity-30 transition-opacity duration-500" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform rotate-45 group-hover:translate-x-full transition-transform duration-1000" />
        </div>
      </motion.div>

      {/* Animated Background Pattern */}
      <div 
        className="absolute inset-0 opacity-20 z-0"
        style={{
          backgroundImage: `url("https://www.transparenttextures.com/patterns/diagmonds.png")`,
          backgroundSize: "200px",
        }}
      />

      {/* Hero content */}
      <motion.div
        className="absolute inset-0 z-10 flex items-center justify-start px-8 md:px-16"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.7 }}
      >
        <div className="max-w-xl text-white text-left relative">
          {/* Accent bar */}
          <motion.div
            className="w-20 h-1 bg-amber-400 mb-6"
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
          />

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] drop-shadow-2xl"
            style={{ fontFamily: "'Anton', sans-serif" }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.9 }}
          >
            Bold
            <motion.span 
              className="block bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1.1 }}
            >
              Frames.
            </motion.span>
            Raw
            <motion.span 
              className="block bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1.3 }}
            >
              Moments.
            </motion.span>
          </motion.h1>

          <motion.p
            className="mt-6 text-lg md:text-xl text-gray-300 font-medium tracking-wide max-w-md"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.5 }}
          >
            This is where motion meets memory — a punch of presence in every shot.
          </motion.p>

          <motion.div
            className="mt-8 flex gap-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.7 }}
          >
            <Link
              to="about"
              smooth={true}
              duration={800}
              offset={-70}
              className="inline-block bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-amber-500/30 hover:scale-105"
            >
              About Me
            </Link>
            <Link
              to="gallery"
              smooth={true}
              duration={800}
              offset={-70}
              className="inline-block border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
            >
              View Work
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 right-8 z-10 text-white flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 2 }}
      >
        <span className="text-sm mb-2 font-light rotate-90">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="rotate-90">
            <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroUnsymmetric;