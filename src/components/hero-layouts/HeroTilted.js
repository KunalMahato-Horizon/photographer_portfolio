import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-scroll";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

// Higher quality photography-focused images with better curation
const heroImages = [
  {
    url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=85",
    category: "Fashion",
    color: "#fbbf24",
    description: "Editorial & Runway"
  },
  {
    url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=85",
    category: "Wedding",
    color: "#f87171",
    description: "Moments that last forever"
  },
  {
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=85",
    category: "Portrait",
    color: "#60a5fa",
    description: "Personality in focus"
  },
  {
    url: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&w=1200&q=85",
    category: "Landscape",
    color: "#34d399",
    description: "Nature's majesty"
  },
  {
    url: "https://images.unsplash.com/photo-1554080353-a576cf803bda?auto=format&fit=crop&w=1200&q=85",
    category: "Nature",
    color: "#a78bfa",
    description: "Wild beauty"
  },
];

const HeroTilted = () => {
  const { scrollY } = useScroll();
  const containerRef = useRef(null);
  const [hoveredPanel, setHoveredPanel] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});

  // Check for mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Track image loading for performance
  const handleImageLoad = (index) => {
    setLoadedImages(prev => ({ ...prev, [index]: true }));
  };

  // Parallax values with smoother range
  const parallaxValues = [
    useTransform(scrollY, [0, 800], [0, 25]),
    useTransform(scrollY, [0, 800], [0, 40]),
    useTransform(scrollY, [0, 800], [0, 55]),
    useTransform(scrollY, [0, 800], [0, 70]),
    useTransform(scrollY, [0, 800], [0, 85]),
  ];

  // Main container animation
  const isInView = useInView(containerRef, { 
    once: true, 
    amount: 0.3,
    margin: "-100px"
  });

  // Title animation variants for cleaner code
  const titleVariants = {
    hidden: { opacity: 0, y: 30, rotateZ: -5 },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateZ: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
      style={{
        background: "radial-gradient(circle at 30% 50%, #1a1a2e, #0a0a0f)"
      }}
    >
      {/* Animated noise texture overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay">
        <div className="absolute inset-0 bg-repeat opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Dynamic floating particles with improved animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-amber-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 8,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Main content container */}
      <div className="relative w-full max-w-7xl h-full flex items-center justify-center px-4 md:px-8">
        {/* Tilted Panels Grid */}
        <div className="relative w-full h-4/5 flex flex-col md:flex-row items-center gap-2 md:gap-3">
          {heroImages.map((image, index) => (
            <motion.div
              key={index}
              className={`
                relative w-full md:w-1/5 h-24 md:h-full
                cursor-pointer group
                ${index === 2 ? 'md:scale-110 z-10' : ''}
              `}
              initial={{ 
                opacity: 0,
                y: 100,
                rotateY: index % 2 === 0 ? -20 : 20,
                rotateZ: index % 2 === 0 ? -5 : 5,
              }}
              animate={isInView ? { 
                opacity: 1, 
                y: 0,
                rotateY: index % 2 === 0 ? -8 : 8,
                rotateZ: index % 2 === 0 ? -2 : 2,
              } : {}}
              transition={{ 
                delay: index * 0.15,
                duration: 1.2,
                ease: [0.25, 0.1, 0.25, 1] // Custom cubic-bezier for smoother motion
              }}
              whileHover={!isMobile ? { 
                scale: 1.08,
                zIndex: 30,
                rotateY: 0,
                rotateZ: 0,
                transition: { duration: 0.4, ease: "easeOut" }
              } : {}}
              onHoverStart={() => setHoveredPanel(index)}
              onHoverEnd={() => setHoveredPanel(null)}
            >
              {/* Image container with perspective */}
              <div className="relative w-full h-full overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl"
                style={{
                  transform: `perspective(1000px) rotateY(${index % 2 === 0 ? '-8deg' : '8deg'}) rotateZ(${index % 2 === 0 ? '-2deg' : '2deg'})`,
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Image with parallax */}
                <motion.div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000"
                  style={{
                    backgroundImage: `url(${image.url})`,
                    y: parallaxValues[index],
                    scale: hoveredPanel === index ? 1.1 : 1,
                  }}
                >
                  {/* Loading placeholder */}
                  {!loadedImages[index] && (
                    <div className="absolute inset-0 bg-gray-800 animate-pulse" />
                  )}
                  <img 
                    src={image.url}
                    alt={image.category}
                    className="hidden"
                    onLoad={() => handleImageLoad(index)}
                  />
                </motion.div>

                {/* Gradient overlays with dynamic colors */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500" />
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 mix-blend-overlay"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${image.color}, transparent 70%)`
                  }}
                />

                {/* Shine effect on hover */}
                <div className="absolute inset-0 overflow-hidden">
                  <motion.div
                    className="absolute -inset-full bg-gradient-to-r from-transparent via-white/15 to-transparent rotate-45"
                    animate={hoveredPanel === index ? { x: '200%' } : { x: '-200%' }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  />
                </div>

                {/* Panel info overlay */}
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white"
                  initial={{ y: 20, opacity: 0 }}
                  animate={hoveredPanel === index || isMobile ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <span className="block text-sm md:text-lg font-bold tracking-wider">
                    {image.category}
                  </span>
                  <span className="block text-xs md:text-sm text-gray-300 opacity-80 mt-1 hidden md:block">
                    {image.description}
                  </span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Hero Text Content - Positioned for both mobile and desktop */}
        <motion.div
          className="absolute left-4 md:left-12 bottom-8 md:bottom-auto md:top-1/2 md:-translate-y-1/2 max-w-xl z-20"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {/* Glow effect behind text */}
          <div className="absolute -inset-8 bg-gradient-to-r from-amber-500/20 via-transparent to-transparent blur-3xl rounded-full" />

          <div className="relative">
            <motion.h1
              className="text-5xl sm:text-6xl md:text-8xl font-black uppercase tracking-tight leading-none"
              style={{ fontFamily: "'Oswald', sans-serif" }}
              variants={titleVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">
                Horizon
              </span>
              <span className="block text-white mt-1 md:mt-2">
                Studio
              </span>
            </motion.h1>

            <motion.p
              className="mt-3 md:mt-6 text-base md:text-xl text-gray-200 max-w-md font-light leading-relaxed tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              Capturing life's most beautiful moments through 
              <span className="text-amber-300 font-medium"> creative storytelling</span>
            </motion.p>

            {/* CTA Buttons with improved design */}
            <motion.div
              className="mt-6 md:mt-10 flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <Link
                to="gallery"
                smooth={true}
                duration={800}
                offset={-50}
                className="group relative inline-flex items-center justify-center px-8 py-3 md:px-10 md:py-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-semibold rounded-full overflow-hidden shadow-2xl hover:shadow-amber-500/30 transition-all duration-300 cursor-pointer"
              >
                <span className="relative z-10">View Portfolio</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500"
                  initial={{ x: '100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
              
              <Link
                to="about"
                smooth={true}
                duration={800}
                offset={-50}
                className="group relative inline-flex items-center justify-center px-8 py-3 md:px-10 md:py-4 border-2 border-amber-400/50 text-white font-semibold rounded-full overflow-hidden hover:border-amber-400 transition-all duration-300 cursor-pointer"
              >
                <span className="relative z-10">About Me</span>
                <motion.div
                  className="absolute inset-0 bg-amber-400/10"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 2 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 text-amber-300/80 hover:text-amber-300 transition-colors cursor-pointer"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs uppercase tracking-widest font-light">Discover</span>
          <div className="w-5 h-9 border-2 border-current rounded-full flex justify-center p-1">
            <motion.div
              className="w-1 h-2 bg-current rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroTilted;