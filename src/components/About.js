import React from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    name: "Aarav S.",
    quote: "Horizon captures emotion like no one else. Every photo has a soul.",
  },
  {
    name: "Meera K.",
    quote: "Our wedding pictures were magical. It felt like reliving the moment.",
  },
  {
    name: "Rishi T.",
    quote: "From the shoot to delivery, everything was smooth and professional.",
  },
];

const btsImages = [
  "https://images.unsplash.com/photo-1518770660439-4636190af475",
  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
  "https://images.unsplash.com/photo-1541516160071-7c77635d09c2",
];

const About = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };

  return (
    <section id="about" className="bg-gray-100 py-20 px-4">
      {/* Intro */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-20">
        <motion.div
          className="w-48 h-48 md:w-60 md:h-60 rounded-full overflow-hidden shadow-xl border-4 border-white"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <img
            src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80"
            alt="Photographer"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div
          className="text-center md:text-left"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-3">
            About <span className="relative inline-block">
              Horizon
              <span className="absolute left-0 bottom-0 w-full h-1 bg-yellow-400 rounded-md" />
            </span>
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed max-w-xl">
            I’m <span className="font-medium">Horizon</span> — a visual storyteller passionate about moments that matter. From candid portraits to soulful landscapes, I create memories you’ll feel forever.
          </p>

          {/* CTAs */}
          <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
            <a
              href="#contact"
              className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-800 transition"
            >
              Let’s Connect
            </a>
            <a
              href="/Horizon-Portfolio.pdf"
              download
              className="text-black border border-black px-6 py-2 rounded-full font-medium hover:bg-black hover:text-white transition"
            >
              Download Portfolio
            </a>
          </div>
        </motion.div>
      </div>

      {/* Stats */}
      <div className="mt-16 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {[
          { label: "Shoots", value: "150+" },
          { label: "Clients", value: "50+" },
          { label: "Years Experience", value: "4+" },
          { label: "Cities Visited", value: "10+" },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="text-3xl font-bold text-gray-800">{item.value}</div>
            <div className="text-gray-600">{item.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Timeline */}
      <div className="mt-20 max-w-3xl mx-auto border-l-4 border-gray-300 pl-6 space-y-10">
        {[
          {
            year: "2021",
            text: "Started capturing raw street stories and expressions.",
          },
          {
            year: "2022",
            text: "Launched my first portfolio and began freelancing.",
          },
          {
            year: "2023",
            text: "Expanded to creative portraits and destination shoots.",
          },
          {
            year: "2024",
            text: "Founded Horizon Studio and started client collaborations.",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
            viewport={{ once: true }}
          >
            <div className="absolute -left-3 top-1.5 w-3 h-3 bg-black rounded-full" />
            <h4 className="text-lg font-semibold text-gray-800">{item.year}</h4>
            <p className="text-gray-600">{item.text}</p>
          </motion.div>
        ))}
      </div>

      {/* Testimonial Slider */}
      <div className="mt-24 max-w-2xl mx-auto">
        <h3 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          What Clients Say
        </h3>
        <Slider {...sliderSettings}>
          {testimonials.map((t, i) => (
            <div key={i} className="px-6">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <p className="text-gray-700 italic mb-3">“{t.quote}”</p>
                <div className="text-gray-900 font-semibold">— {t.name}</div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* BTS Photo Slider */}
      <div className="mt-24 max-w-4xl mx-auto">
        <h3 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Behind the Scenes
        </h3>
        <Slider {...sliderSettings}>
          {btsImages.map((src, i) => (
            <div key={i} className="px-3">
              <img
                src={`${src}?auto=format&fit=crop&w=1000&q=80`}
                alt="Behind the scenes"
                className="rounded-lg shadow-md object-cover w-full h-64 md:h-80"
              />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default About;
