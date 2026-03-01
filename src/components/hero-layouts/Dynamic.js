import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

// Higher quality, photography-focused images from Unsplash
const heroImages = [
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30", // Wedding
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d", // Portrait
  "https://images.unsplash.com/photo-1554048612-b6a482bc67e5", // Landscape
  "https://images.unsplash.com/photo-1554080353-a576cf803bda", // Nature
  "https://images.unsplash.com/photo-1507591064344-4c6ce005b128", // Urban
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32", // Fashion
];

const Dynamic = () => {
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 300], [0, 50]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Preload images for smoother experience
  useEffect(() => {
    const loadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = `${src}?auto=format&fit=crop&w=1200&q=80`;
        img.onload = resolve;
        img.onerror = reject;
      });
    };

    Promise.all(heroImages.map(src => loadImage(src)))
      .then(() => setIsLoading(false))
      .catch(err => console.error("Failed to load images", err));
  }, []);

  // Rotate through images in the hero background
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      {/* Animated background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${heroImages[currentImageIndex]}?auto=format&fit=crop&w=1200&q=80)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          />
        </AnimatePresence>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30" />
      </div>

      {/* Grid overlay for visual interest */}
      <div className="absolute inset-0 z-0 grid grid-cols-3 grid-rows-3 gap-1 opacity-30">
        {Array.from({ length: 9 }).map((_, i) => (
          <motion.div
            key={i}
            className="bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.05 }}
            transition={{ delay: i * 0.1, duration: 1 }}
          />
        ))}
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black">
          <motion.div
            className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
      )}

      {/* Content Overlay */}
      <motion.div
        className="absolute inset-0 z-10 flex items-center justify-center px-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        viewport={{ once: true }}
      >
        <motion.div
          style={{ y: yText }}
          className="relative max-w-4xl w-full text-center"
        >
          {/* Glow panel with improved styling */}
          <motion.div
            className="absolute inset-0 mx-auto w-full h-full rounded-xl bg-white/5 backdrop-blur-md pointer-events-none"
            style={{
              maskImage:
                'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
              boxShadow: "0 0 120px rgba(255,255,255,0.1)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          />

          <div className="relative z-10 p-6 md:p-10">
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
            >
              Capture the
              <motion.span 
                className="block bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 1 }}
              >
                Moment
              </motion.span>
            </motion.h1>

            <motion.div
              className="relative mt-6 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent rounded-md blur-sm" />
              <p className="relative text-lg md:text-xl font-light text-amber-100/90 z-10 leading-relaxed">
                Through my lens, I transform fleeting moments into timeless visual stories. 
                Specializing in portrait, wedding, and landscape photography.
              </p>
            </motion.div>

            <motion.div
              className="mt-8 flex justify-center gap-4 flex-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <Link
                to="gallery"
                smooth={true}
                duration={800}
                offset={-70}
                className="cursor-pointer group relative overflow-hidden bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span className="relative z-10">View Portfolio</span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-300 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
              <Link
                to="contact"
                smooth={true}
                duration={800}
                offset={-70}
                className="cursor-pointer group relative overflow-hidden border-2 border-white text-white px-8 py-4 rounded-full font-medium hover:bg-white hover:text-black transition-all duration-300"
              >
                <span className="relative z-10">Book a Session</span>
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
        animate={{ opacity: 1 }}
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

export default Dynamic;