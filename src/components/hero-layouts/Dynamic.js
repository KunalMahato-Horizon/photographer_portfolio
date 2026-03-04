import React, { useState, useEffect, useRef, useMemo, } from "react";
import { Link } from "react-scroll";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

// Curated artistic photography collection
const galleryCollection = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
    title: "Eternal Vows",
    mood: "romantic",
    palette: ["#FFE5B4", "#C0A080", "#8B4513"],
    category: "Wedding",
    description: "Where every frame tells a story, and every moment becomes eternity."
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    title: "Soul Gaze",
    mood: "intimate", 
    palette: ["#2C3E50", "#E74C3C", "#ECF0F1"],
    category: "Portrait",
    description: "Capturing the raw emotions that make your soul visible to the world."
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5",
    title: "Whispers of Nature",
    mood: "serene",
    palette: ["#2E8B57", "#87CEEB", "#F5F5DC"],
    category: "Landscape",
    description: "Finding poetry in the whispers of wind and the dance of light."
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
    title: "Urban Poetry",
    mood: "edgy",
    palette: ["#36454F", "#808080", "#FFD700"],
    category: "Fashion",
    description: "Urban narratives frozen in time, waiting to be discovered."
  }
];

const ArtisticHero = () => {
  const [activeImage, setActiveImage] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isExploring, setIsExploring] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  const containerRef = useRef(null);
  const rafRef = useRef(null);
  const lastMouseMoveRef = useRef(Date.now());

  // Check device capabilities
  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Check for low-performance device (simple heuristic)
      const isLowEnd = !window.matchMedia('(min-resolution: 2dppx)').matches && 
                      navigator.hardwareConcurrency <= 4;
      setIsLowPerformance(mobile || isLowEnd);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Throttled mouse move handler for better performance
  useEffect(() => {
    if (isMobile || isLowPerformance) return; // Disable parallax on mobile/low-end devices

    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastMouseMoveRef.current < 16) { // ~60fps throttle
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
          const { clientX, clientY } = e;
          const { innerWidth, innerHeight } = window;
          setMousePosition({
            x: (clientX - innerWidth / 2) * 0.02,
            y: (clientY - innerHeight / 2) * 0.02
          });
        });
      }
      lastMouseMoveRef.current = now;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile, isLowPerformance]);

  // Auto-advance gallery with pause on interaction
  useEffect(() => {
    if (!isExploring) {
      const timer = setInterval(() => {
        setActiveImage((prev) => (prev + 1) % galleryCollection.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isExploring]);

  // Memoize current image data
  const currentImage = useMemo(() => galleryCollection[activeImage], [activeImage]);

  // Simplified mouse position for mobile
  const safeMousePosition = isMobile || isLowPerformance ? { x: 0, y: 0 } : mousePosition;

  // Reduce effects on mobile/low-end devices
  const shouldReduceEffects = isMobile || isLowPerformance;

  return (
    <motion.section
      ref={containerRef}
      style={{ opacity }}
      className="relative w-full h-screen bg-black overflow-hidden"
    >
      {/* Dynamic Background with optimized performance */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage}
            className="absolute inset-0"
            initial={{ scale: shouldReduceEffects ? 1 : 1.2, opacity: 0 }}
            animate={{ 
              scale: 1,
              opacity: 1,
              ...(!shouldReduceEffects && { x: safeMousePosition.x, y: safeMousePosition.y })
            }}
            exit={{ scale: shouldReduceEffects ? 1 : 1.2, opacity: 0 }}
            transition={{ duration: shouldReduceEffects ? 1 : 1.8 }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${currentImage.url}?auto=format&fit=crop&w=${shouldReduceEffects ? '1000' : '2000'}&q=85)`,
                filter: shouldReduceEffects ? 'blur(4px)' : 'blur(8px)',
                transform: 'scale(1.1)'
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Simplified overlays for mobile */}
        {!shouldReduceEffects && <div className="absolute inset-0 backdrop-blur-[2px]" />}
        
        {/* Artistic Overlay - optimized */}
        <motion.div
          className="absolute inset-0"
          animate={!shouldReduceEffects ? {
            background: `radial-gradient(circle at ${50 + safeMousePosition.x}% ${50 + safeMousePosition.y}%, transparent 0%, rgba(0,0,0,0.5) 100%)`
          } : {
            background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.5) 100%)'
          }}
          transition={{ duration: 0 }}
        />
        
        {/* Dynamic Gradient - simplified for mobile */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: `linear-gradient(135deg, ${currentImage.palette[0]}${shouldReduceEffects ? '20' : '30'}, ${currentImage.palette[1]}${shouldReduceEffects ? '20' : '30'}, ${currentImage.palette[2]}${shouldReduceEffects ? '20' : '30'})`
          }}
          transition={{ duration: shouldReduceEffects ? 0.5 : 1 }}
        />
      </div>

      {/* Floating Geometric Elements - disabled on mobile/low-end */}
      {!shouldReduceEffects && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(2)].map((_, i) => ( // Reduced from 3 to 2 elements
            <motion.div
              key={i}
              className="absolute w-48 h-48 border border-white/10 backdrop-blur-sm"
              style={{
                top: `${20 + i * 40}%`,
                left: `${10 + i * 30}%`,
                rotate: i * 45,
                x: safeMousePosition.x * (i + 1) * 0.5, // Reduced movement
                y: safeMousePosition.y * (i + 1) * 0.5
              }}
              animate={{
                rotate: [i * 45, i * 45 + 360],
              }}
              transition={{
                duration: 30 + i * 10, // Slower rotation
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-4">
        <div className="max-w-7xl w-full mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-white"
            >
              <motion.div
                animate={!shouldReduceEffects ? { y: safeMousePosition.y * 0.5 } : {}}
                className="space-y-6"
              >
                {/* Photographer's name - subtle addition */}
                <div className="text-white/40 text-sm tracking-wider mb-2">
                  Sarah Mitchell Photography
                </div>

                <div className="flex items-center gap-3">
                  <motion.div
                    className="w-12 h-px bg-amber-400"
                    animate={{ width: isExploring ? 24 : 48 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="text-amber-400 text-sm tracking-[0.3em] uppercase">
                    {currentImage.category}
                  </span>
                </div>

                <motion.h1
                  key={activeImage}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-5xl lg:text-7xl font-light leading-tight"
                >
                  <span className="block">{currentImage.title}</span>
                  <span className="block font-serif italic text-3xl lg:text-4xl text-white/60 mt-2">
                    {currentImage.mood}
                  </span>
                </motion.h1>

                <motion.p
                  key={`desc-${activeImage}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-white/70 text-lg max-w-md leading-relaxed"
                >
                  {currentImage.description}
                </motion.p>

                {/* Simplified Stats */}
                <div className="flex gap-8 pt-6">
                  {[
                    { label: "Years", value: "10+" },
                    { label: "Stories", value: "500+" }
                  ].map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      className="text-left"
                    >
                      <div className="text-2xl font-bold text-amber-400">{stat.value}</div>
                      <div className="text-xs text-white/50 uppercase tracking-wider">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex gap-4 pt-8">
                  <Link
                    to="gallery"
                    smooth={true}
                    duration={800}
                    className="group relative px-8 py-4 overflow-hidden cursor-pointer"
                  >
                    <motion.div
                      className="absolute inset-0 bg-amber-400"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative z-10 text-black font-medium flex items-center gap-2">
                      View Gallery
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </span>
                  </Link>
                  
                  <Link
                    to="about"
                    smooth={true}
                    duration={800}
                    className="px-8 py-4 border border-white/30 text-white rounded-none hover:bg-white/10 transition-colors backdrop-blur-sm cursor-pointer"
                  >
                    About Sarah
                  </Link>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Interactive Gallery Preview */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="relative hidden lg:block"
              onHoverStart={() => setIsExploring(true)}
              onHoverEnd={() => setIsExploring(false)}
            >
              <motion.div
                animate={!shouldReduceEffects ? { y: safeMousePosition.y } : {}}
                className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-2xl"
              >
                {/* Main Preview Image */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImage}
                    className="absolute inset-0"
                    initial={{ scale: shouldReduceEffects ? 1 : 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: shouldReduceEffects ? 1 : 0.8, opacity: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <img
                      src={`${currentImage.url}?auto=format&fit=crop&w=800&q=85`}
                      alt={currentImage.title}
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Overlay with title */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"
                  animate={{ opacity: isExploring ? 0.9 : 0.6 }}
                >
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <motion.h3
                      key={`title-${activeImage}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-2xl font-serif text-white"
                    >
                      {currentImage.title}
                    </motion.h3>
                    <motion.div
                      className="w-12 h-px bg-amber-400 mt-2"
                      animate={{ width: isExploring ? 48 : 24 }}
                    />
                  </div>
                </motion.div>

                {/* Navigation Thumbnails */}
                <div className="absolute -right-24 top-1/2 transform -translate-y-1/2 space-y-3">
                  {galleryCollection.map((item, index) => (
                    <motion.button
                      key={item.id}
                      onClick={() => setActiveImage(index)}
                      className="block w-16 h-16 overflow-hidden border-2 transition-all duration-300 rounded-md shadow-lg"
                      animate={{
                        borderColor: index === activeImage ? "#FBBF24" : "rgba(255,255,255,0.2)",
                        scale: index === activeImage ? 1.1 : 1
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <img
                        src={`${item.url}?auto=format&fit=crop&w=100&q=80`}
                        alt=""
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <motion.div
        className="absolute bottom-8 left-0 right-0 z-10"
        animate={!shouldReduceEffects ? { y: safeMousePosition.y * -0.2 } : {}}
      >
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-white/50">
          <div className="flex gap-6">
            {["Wedding", "Portrait", "Landscape", "Fashion"].map((cat, i) => (
              <motion.button
                key={cat}
                className={`text-xs tracking-widest uppercase transition-colors ${
                  i === activeImage ? "text-amber-400" : "hover:text-white/80"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveImage(i)}
              >
                {cat}
              </motion.button>
            ))}
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-sm">0{activeImage + 1}</span>
            <div className="w-12 h-px bg-white/30" />
            <span className="text-sm">0{galleryCollection.length}</span>
          </div>
        </div>
      </motion.div>

      {/* Ambient Noise Effect - simplified */}
      {!shouldReduceEffects && (
        <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-5">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJmIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc0IiBudW1PY3RhdmVzPSIzIiAvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNmKSIgb3BhY2l0eT0iMC4xIiAvPjwvc3ZnPg==')] bg-repeat" />
        </div>
      )}
    </motion.section>
  );
};

export default ArtisticHero;