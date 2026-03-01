import React, { useState, useRef } from "react";
import { Link } from "react-scroll";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

// Higher quality photography-focused images
const heroImages = [
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30", // Wedding
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d", // Portrait
  "https://images.unsplash.com/photo-1554048612-b6a482bc67e5", // Landscape
  "https://images.unsplash.com/photo-1554080353-a576cf803bda", // Nature
  "https://images.unsplash.com/photo-1507591064344-4c6ce005b128", // Urban
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32", // Fashion
];

const HeroGrid = () => {
  const { scrollY } = useScroll();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-20%" });
  const yText = useTransform(scrollY, [0, 300], [0, 50]);
  
  const [hoveredImage, setHoveredImage] = useState(null);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800"
    >
      {/* Grid Layout */}
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-1 p-1">
        {heroImages.map((src, index) => (
          <motion.div
            key={index}
            className="relative overflow-hidden group"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            onHoverStart={() => setHoveredImage(index)}
            onHoverEnd={() => setHoveredImage(null)}
          >
            <motion.div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${src}?auto=format&fit=crop&w=1200&q=80)`,
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.7 }}
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-70 group-hover:opacity-30 transition-opacity duration-500" />
            
            {/* Shine Effect on Hover */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform rotate-45 group-hover:translate-x-full transition-transform duration-1000" />
            </div>
            
            {/* Image Label */}
            <motion.div 
              className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              initial={{ y: 20 }}
              whileHover={{ y: 0 }}
            >
              <span className="text-sm font-medium bg-black/70 px-3 py-1 rounded-full">
                {["Wedding", "Portrait", "Landscape", "Nature", "Urban", "Fashion"][index]}
              </span>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Animated Background Pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("https://www.transparenttextures.com/patterns/diagmonds.png")`,
          backgroundSize: "200px",
        }}
      />

      {/* Content Overlay */}
      <motion.div
        className="absolute inset-0 z-10 flex items-center justify-center px-4"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      >
        <motion.div
          style={{ y: yText }}
          className="relative max-w-4xl w-full text-center"
        >
          {/* Glow panel */}
          <motion.div
            className="absolute inset-0 mx-auto w-full h-full rounded-xl bg-white/10 backdrop-blur-md pointer-events-none"
            style={{
              maskImage:
                'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
              boxShadow: "0 0 120px rgba(255,255,255,0.1)",
            }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 1 }}
          />

          <div className="relative z-10 p-6 md:p-10">
            <motion.h1
              className="text-5xl md:text-7xl font-extrabold tracking-wide text-white mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 1 }}
            >
              Let the Light
              <motion.span 
                className="block bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.6, duration: 1 }}
              >
                Tell the Story
              </motion.span>
            </motion.h1>

            <motion.div
              className="relative mt-6 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent rounded-md blur-sm" />
              <p className="relative text-lg md:text-xl font-light text-amber-100 z-10 leading-relaxed">
                Every frame, a memory — every color, a feeling captured forever. 
                Specializing in portrait, wedding, and landscape photography.
              </p>
            </motion.div>

            <motion.div
              className="mt-8 flex justify-center gap-4 flex-wrap"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <Link
                to="gallery"
                smooth={true}
                duration={800}
                offset={-70}
                className="cursor-pointer group relative overflow-hidden bg-white text-black px-8 py-3 rounded-full font-semibold shadow-lg hover:scale-105 hover:shadow-amber-500/40 transition-all duration-300"
              >
                <span className="relative z-10">View Portfolio</span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-300 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
              <Link
                to="about"
                smooth={true}
                duration={800}
                offset={-70}
                className="cursor-pointer group relative overflow-hidden border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition-all duration-300"
              >
                <span className="relative z-10">About Me</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 text-white flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1.5 }}
      >
        <span className="text-sm mb-2">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroGrid;