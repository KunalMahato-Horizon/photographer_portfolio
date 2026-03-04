import React, { useState, useRef, useEffect, useMemo } from "react";
import Masonry from "react-masonry-css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { motion, useInView, AnimatePresence } from "framer-motion";

// Same image collections
const imageCollections = {
  portraits: {
    name: "Portraits",
    mood: "intimate",
    description: "The soul revealed through light and shadow",
    images: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
      "https://images.unsplash.com/photo-1516726817505-f5ed825624d8",
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9",
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6",
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df",
    ]
  },
  nature: {
    name: "Nature",
    mood: "serene",
    description: "Where earth whispers its oldest stories",
    images: [
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d",
      "https://images.unsplash.com/photo-1439853949127-fa647821eba0",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
      "https://images.unsplash.com/photo-1511497584788-876760111969",
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e",
      "https://images.unsplash.com/photo-1542224566-6e85f2e6772f",
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
    ]
  },
  urban: {
    name: "Urban",
    mood: "edgy",
    description: "Concrete jungles and electric dreams",
    images: [
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000",
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b",
      "https://images.unsplash.com/photo-1514907283155-1c3f48b69cbe",
      "https://images.unsplash.com/photo-1519501025264-65ba15a82390",
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df",
      "https://images.unsplash.com/photo-1449034446853-66c86144b0ad",
      "https://images.unsplash.com/photo-1514565131-fce0801e5785",
      "https://images.unsplash.com/photo-1486325212027-8081e485255e",
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b",
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b",
    ]
  },
  wedding: {
    name: "Wedding",
    mood: "romantic",
    description: "Eternal moments woven in gold",
    images: [
      "https://images.unsplash.com/photo-1519741497674-611481863552",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc",
      "https://images.unsplash.com/photo-1519741497674-611481863552",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6",
    ]
  }
};

// Combine all images for "All" category
const allImages = Object.values(imageCollections).flatMap(cat => cat.images);

// Breakpoints for masonry grid
const breakpointColumns = {
  default: 3,
  1536: 3,
  1280: 3,
  1024: 2,
  768: 2,
  640: 1,
};

// Loading skeleton
const LoadingSkeleton = () => (
  <div className="absolute inset-0 bg-gray-800/50 animate-pulse rounded-sm" />
);

// Image Card Component - Clean, minimal, photography-focused
const ImageCard = ({ src, index, onClick }) => {
  const ref = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "100px 0px"
  });

  const aspectRatio = useMemo(() => {
    const ratios = [0.75, 1, 1.25, 1.5];
    return ratios[index % ratios.length];
  }, [index]);

  return (
    <motion.div
      ref={ref}
      className="relative cursor-pointer mb-6 overflow-hidden group"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.6,
        delay: Math.min(index * 0.03, 0.5),
        ease: "easeOut"
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      style={{ aspectRatio }}
    >
      {!isLoaded && <LoadingSkeleton />}

      {/* Image - the star of the show */}
      <img
        src={`${src}?auto=format&fit=crop&w=800&q=85`}
        alt=""
        loading="lazy"
        className={`w-full h-full object-cover transition-all duration-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setIsLoaded(true)}
        style={{
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)'
        }}
      />

      {/* Minimal overlay - only on hover */}
      <motion.div 
        className="absolute inset-0 bg-black/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Clean index indicator - subtle */}
      <div className="absolute top-4 right-4 w-8 h-8 rounded-full border border-white/20 bg-black/20 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-white/80 text-xs">{(index + 1).toString().padStart(2, '0')}</span>
      </div>
    </motion.div>
  );
};

// Category Filter Component - Clean and minimal
const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <motion.div 
      className="flex flex-wrap justify-center gap-2 md:gap-4 mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <button
        onClick={() => onCategoryChange("all")}
        className={`px-4 py-2 text-sm tracking-wider uppercase transition-all duration-300 ${
          activeCategory === "all" 
            ? "text-amber-400 border-b border-amber-400" 
            : "text-white/40 hover:text-white/60"
        }`}
      >
        All
      </button>

      {Object.entries(categories).map(([key, category]) => (
        <button
          key={key}
          onClick={() => onCategoryChange(key)}
          className={`px-4 py-2 text-sm tracking-wider uppercase transition-all duration-300 ${
            activeCategory === key 
              ? "text-amber-400 border-b border-amber-400" 
              : "text-white/40 hover:text-white/60"
          }`}
        >
          {category.name}
        </button>
      ))}
    </motion.div>
  );
};

// Main Gallery Component - Clean, photography-first
const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(9); // Start with 9 images

  const IMAGES_PER_CLICK = 6;

  // Get current images
  const currentImages = useMemo(() => {
    if (selectedCategory === "all") {
      return allImages;
    }
    return imageCollections[selectedCategory]?.images || [];
  }, [selectedCategory]);

  // Get visible images based on visibleCount
  const visibleImages = useMemo(() => {
    return currentImages.slice(0, visibleCount);
  }, [currentImages, visibleCount]);

  // Check button states
  const showMoreEnabled = visibleCount < currentImages.length;
  const showLessEnabled = visibleCount > 9;

  // Reset visible count when category changes
  useEffect(() => {
    setVisibleCount(9);
  }, [selectedCategory]);

  const handleShowMore = () => {
    setVisibleCount(prev => Math.min(prev + IMAGES_PER_CLICK, currentImages.length));
  };

  const handleShowLess = () => {
    setVisibleCount(prev => Math.max(prev - IMAGES_PER_CLICK, 9));
  };

  return (
    <section
      id="gallery"
      className="relative min-h-screen w-full py-24 px-4 sm:px-6 lg:px-8 bg-black"
    >
      {/* Pure black background - let the images speak */}
      <div className="absolute inset-0 bg-black" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header - Minimal */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-px bg-amber-400/60" />
              <span className="text-amber-400/60 text-sm tracking-[0.3em] uppercase">
                Portfolio
              </span>
              <div className="w-12 h-px bg-amber-400/60" />
            </div>

            <h2 className="text-4xl lg:text-6xl font-light text-white">
              <span className="block">Featured Work</span>
            </h2>

            <p className="text-white/40 text-base max-w-2xl mx-auto font-light">
              {selectedCategory === "all" 
                ? "A curated selection of moments captured through the lens"
                : imageCollections[selectedCategory]?.description}
            </p>

            {/* Image count - subtle */}
            <div className="text-white/20 text-sm mt-4">
              {visibleImages.length} of {currentImages.length} photographs
            </div>
          </div>
        </motion.div>

        {/* Category Filter */}
        <CategoryFilter
          categories={imageCollections}
          activeCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Gallery Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {visibleImages.length > 0 ? (
              <>
                <Masonry
                  breakpointCols={breakpointColumns}
                  className="flex -ml-6 w-auto"
                  columnClassName="pl-6 bg-clip-padding"
                >
                  {visibleImages.map((src, index) => (
                    <ImageCard
                      key={`${selectedCategory}-${index}`}
                      src={src}
                      index={index}
                      onClick={() => {
                        setLightboxIndex(index);
                        setIsOpen(true);
                      }}
                    />
                  ))}
                </Masonry>

                {/* Show More/Less Buttons - Clean */}
                {(showMoreEnabled || showLessEnabled) && (
                  <motion.div
                    className="flex justify-center items-center gap-4 mt-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {showLessEnabled && (
                      <button
                        onClick={handleShowLess}
                        className="px-8 py-3 text-white/40 hover:text-white/60 text-sm tracking-wider uppercase transition-colors border border-white/10 hover:border-white/20"
                      >
                        ← Less
                      </button>
                    )}
                    
                    {showMoreEnabled && (
                      <button
                        onClick={handleShowMore}
                        className="px-8 py-3 bg-amber-400/10 text-amber-400 hover:bg-amber-400/20 text-sm tracking-wider uppercase transition-colors border border-amber-400/30"
                      >
                        More →
                      </button>
                    )}
                  </motion.div>
                )}
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-32"
              >
                <p className="text-white/20 text-xl font-light">
                  No images in this collection
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightbox - Fixed to use correct props for yet-another-react-lightbox */}
      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        slides={visibleImages.map(src => ({ 
          src: `${src}?auto=format&fit=crop&w=1600&q=90`,
          alt: "Gallery image"
        }))}
        index={lightboxIndex}
        styles={{
          container: { backgroundColor: "rgba(0, 0, 0, 0.95)" },
          navigation: { color: "#FBBF24" }
        }}
      />
    </section>
  );
};

export default Gallery;