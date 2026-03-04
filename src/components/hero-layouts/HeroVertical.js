import React, { useState, useRef } from "react";
import { Link } from "react-scroll";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

// Higher quality photography-focused images
const heroImages = [
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32", // Fashion
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30", // Wedding
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d", // Portrait
  "https://images.unsplash.com/photo-1554048612-b6a482bc67e5", // Landscape
  "https://images.unsplash.com/photo-1554080353-a576cf803bda", // Nature
];

const HeroVertical = () => {
  const { scrollY } = useScroll();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-20%" });
  
  // Create parallax values for each panel - FIXED: Move useTransform calls to top level
  const parallax1 = useTransform(scrollY, [0, 500], [0, 15]);
  const parallax2 = useTransform(scrollY, [0, 500], [0, 30]);
  const parallax3 = useTransform(scrollY, [0, 500], [0, 45]);
  const parallax4 = useTransform(scrollY, [0, 500], [0, 60]);
  const parallax5 = useTransform(scrollY, [0, 500], [0, 75]);
  
  const parallaxValues = [parallax1, parallax2, parallax3, parallax4, parallax5];

  // State for tracking which panel is hovered
  const [hoveredPanel, setHoveredPanel] = useState(null);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800"
    >
      {/* Background pattern for texture */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("https://www.transparenttextures.com/patterns/diagmonds.png")`,
          backgroundSize: "200px",
        }}
      />

      {/* Animated floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Tilted Panels Container */}
      <div className="relative w-full max-w-6xl h-4/5 flex justify-center items-center perspective-1000">
        {heroImages.map((src, index) => (
          <motion.div
            key={index}
            className="relative w-1/5 h-full mx-1 origin-center transform transition-all duration-700 overflow-hidden group"
            style={{ 
              rotateY: index % 2 === 0 ? "-5deg" : "5deg",
            }}
            initial={{ opacity: 0, y: 100, rotateY: index % 2 === 0 ? -15 : 15 }}
            animate={isInView ? { 
              opacity: 1, 
              y: 0, 
              rotateY: index % 2 === 0 ? "-5deg" : "5deg",
            } : {}}
            transition={{ 
              delay: index * 0.2, 
              duration: 1.2, 
              ease: "easeOut",
              rotateY: { duration: 1.5 }
            }}
            whileHover={{ 
              scale: 1.05, 
              zIndex: 20,
              rotateY: 0,
              transition: { duration: 0.5 }
            }}
            onHoverStart={() => setHoveredPanel(index)}
            onHoverEnd={() => setHoveredPanel(null)}
          >
            {/* Image with parallax effect */}
            <motion.div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${src}?auto=format&fit=crop&w=1200&q=80)`,
                y: parallaxValues[index],
                filter: hoveredPanel === index ? "brightness(1.1)" : "brightness(0.7)",
              }}
              transition={{ duration: 0.7 }}
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 opacity-70 group-hover:opacity-40 transition-opacity duration-500" />
            
            {/* Shine effect on hover */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform rotate-45 group-hover:translate-x-full transition-transform duration-1000" />
            </div>

            {/* Panel label that appears on hover */}
            <motion.div 
              className="absolute bottom-6 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              initial={{ y: 20 }}
              whileHover={{ y: 0 }}
            >
              <span className="text-sm font-medium bg-black/60 px-2 py-1 rounded">
                {["Fashion", "Wedding", "Portrait", "Landscape", "Nature"][index]}
              </span>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Hero Content */}
      <motion.div
        className="absolute left-12 top-1/2 -translate-y-1/2 z-10 text-left px-6 max-w-xl text-white"
        initial={{ opacity: 0, x: -40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1.2, delay: 0.8 }}
      >
        {/* Glow Spotlight */}
        <div className="absolute -inset-8 rounded-2xl bg-gradient-to-r from-amber-400/10 via-transparent to-transparent blur-2xl z-0" />

        <div className="relative z-10">
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold uppercase tracking-widest drop-shadow-[0_6px_30px_rgba(0,0,0,0.7)]"
            style={{ fontFamily: "Oswald, sans-serif" }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-white to-amber-400 block">
              Horizon
            </span>
            <span className="text-white block mt-2">Studio</span>
          </motion.h1>

          <motion.p
            className="mt-4 text-lg md:text-xl font-light text-gray-100 max-w-md leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.2 }}
          >
            Photography | Stories | Impact — woven into frames of light and
            emotion.
          </motion.p>

          {/* CTA */}
          <motion.div
            className="mt-8 flex gap-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.4 }}
          >
            <Link
              to="about"
              smooth={true}
              duration={800}
              className="inline-block bg-gradient-to-r from-amber-400 to-yellow-500 text-black px-8 py-3 rounded-full font-semibold shadow-lg hover:scale-105 hover:shadow-amber-500/40 transition-all duration-300 transform cursor-pointer"
            >
              About Me
            </Link>
            <Link
              to="gallery"
              smooth={true}
              duration={800}
              className="inline-block border-2 border-amber-400 text-amber-300 px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-amber-400/10 transition-all duration-300 cursor-pointer"
            >
              View Work
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 text-amber-300 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 2 }}
      >
        <span className="text-sm mb-2 font-light">Scroll to explore</span>
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

export default HeroVertical;