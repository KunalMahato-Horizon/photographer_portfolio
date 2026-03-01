import React, { useState, useRef } from "react";
import Masonry from "react-masonry-css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { motion, useInView } from "framer-motion";

// Local images
import img1 from "../assets/images/img1.JPG";
import img2 from "../assets/images/img2.JPG";

// Extra images
const extraImages = [
  "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
  "https://images.unsplash.com/photo-1535930749574-1399327ce78f",
  "https://images.unsplash.com/photo-1487412912498-0447578fcca8",
  "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2",
  "https://images.unsplash.com/photo-1610878180933-2b97a2ed85ba",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  "https://images.unsplash.com/photo-1496386460450-3edb8c1a329c",
  "https://images.unsplash.com/photo-1549887534-4b4b4eaac9e1",
  "https://images.unsplash.com/photo-1499084732479-de2c02d45fc4",
  "https://images.unsplash.com/photo-1527515637462-d7c5b8b4b48b",
];

const categories = {
  All: [img1, img2, ...extraImages],
  Nature: [
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    "https://images.unsplash.com/photo-1496386460450-3edb8c1a329c",
    "https://images.unsplash.com/photo-1610878180933-2b97a2ed85ba",
    "https://images.unsplash.com/photo-1549887534-4b4b4eaac9e1",
  ],
  Portraits: [
    "https://images.unsplash.com/photo-1499084732479-de2c02d45fc4",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
  ],
};

// 🔸 ImageCard with in-view animation
const ImageCard = ({ src, index, onClick }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });

  return (
    <motion.div
      ref={ref}
      className="relative rounded-lg cursor-pointer mb-4 overflow-hidden group"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.03 }}
      onClick={onClick}
    >
      <img
        src={typeof src === "string" ? `${src}?auto=format&fit=crop&w=800&q=80` : src}
        alt={`Gallery ${index}`}
        loading="lazy"
        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300 ease-out"
      />
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10l4.553-4.553a1.414 1.414 0 10-2-2L13 8m6 6l-1.293 1.293a1 1 0 01-1.414 0L15 14m-6-4l-4.553 4.553a1.414 1.414 0 102 2L11 16m-6-6l1.293-1.293a1 1 0 011.414 0L9 10"
          />
        </svg>
      </div>
    </motion.div>
  );
};

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const images = categories[selectedCategory];

  const breakpointColumns = {
    default: 3,
    1024: 2,
    640: 1,
  };

  return (
    <section
      id="gallery"
      className="min-h-screen w-full py-16 px-4"
      style={{
        backgroundColor: "#e0e0e0",
        backgroundImage: `
          radial-gradient(circle at 50% 20%, rgba(255,255,255,0.25) 0%, transparent 70%),
          url("https://www.transparenttextures.com/patterns/paper-fibers.png")
        `,
        backgroundRepeat: "repeat",
        backgroundSize: "auto, 300px 300px",
      }}
    >
      {/* Header + Filter */}
      <motion.div
        className="max-w-5xl mx-auto mb-14 px-2"
        initial="hidden"
        whileInView="visible"
        transition={{ staggerChildren: 0.1 }}
        viewport={{ once: true }}
        variants={{ hidden: {}, visible: {} }}
      >
        <motion.div
          className="text-left mb-6"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-black inline-block relative">
            Gallery
            <span className="block w-16 h-1 bg-black mt-2" />
          </h2>
          <p className="mt-3 text-lg text-gray-700">
            A collection of moments, moods, and memories.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
            hidden: {},
          }}
        >
          {Object.keys(categories).map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full font-medium transition ${
                selectedCategory === cat
                  ? "bg-black text-white"
                  : "bg-gray-300 text-black hover:bg-gray-400"
              }`}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>

      {/* Masonry Grid */}
      <Masonry
        breakpointCols={breakpointColumns}
        className="flex gap-4"
        columnClassName="masonry-column"
      >
        {images.map((src, index) => (
          <ImageCard
            key={index}
            src={src}
            index={index}
            onClick={() => {
              setLightboxIndex(index);
              setIsOpen(true);
            }}
          />
        ))}
      </Masonry>

      {/* Lightbox */}
      {isOpen && (
        <Lightbox
          mainSrc={images[lightboxIndex]}
          nextSrc={images[(lightboxIndex + 1) % images.length]}
          prevSrc={images[(lightboxIndex + images.length - 1) % images.length]}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setLightboxIndex((lightboxIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setLightboxIndex((lightboxIndex + 1) % images.length)
          }
        />
      )}
    </section>
  );
};

export default Gallery;
