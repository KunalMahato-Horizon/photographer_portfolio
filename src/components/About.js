import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section id="about" className="relative w-full min-h-screen bg-black py-32 px-4 sm:px-6 lg:px-8">
      {/* Pure black background - exactly like gallery */}
      <div className="absolute inset-0 bg-black" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header - Minimal */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-px bg-amber-400/60" />
            <span className="text-amber-400/60 text-sm tracking-[0.3em] uppercase">
              The Artist
            </span>
            <div className="w-12 h-px bg-amber-400/60" />
          </div>
          <h2 className="text-4xl lg:text-6xl font-light text-white">
            About Me
          </h2>
        </motion.div>

        {/* Main About Content - Clean two column layout */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32">
          {/* Left Column - Portrait */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=90"
                alt="Photographer"
                className="w-full h-full object-cover"
              />
              {/* Minimal border - just enough to define edge */}
              <div className="absolute inset-0 border border-white/10" />
            </div>
            
            {/* Simple badge - no floating animation */}
            <div className="absolute -bottom-3 -right-3 bg-amber-400 text-black px-6 py-3">
              <span className="text-sm font-medium tracking-wider">EST. 2021</span>
            </div>
          </motion.div>

          {/* Right Column - Bio */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl lg:text-4xl font-light text-white mb-4">
                I'm <span className="text-amber-400">Horizon</span>
              </h3>
              
              <p className="text-white/70 text-lg leading-relaxed">
                A visual storyteller based between the urban pulse and natural serenity. 
                I find beauty in the unscripted and magic in the mundane.
              </p>
            </div>
            
            <div className="space-y-4 text-white/50 leading-relaxed">
              <p>
                My journey began with a simple film camera and evolved into a pursuit of visual poetry. 
                Every frame, whether portrait, landscape, or documentary, carries the same intention: 
                let the moment speak for itself.
              </p>
              
              <p>
                I don't chase trends. I chase light, emotion, and authenticity.
              </p>
            </div>

            {/* Philosophy - Single line, elegant */}
            <div className="pt-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-px bg-amber-400/60" />
                <span className="text-amber-400/80 text-xs tracking-widest uppercase">Philosophy</span>
              </div>
              <p className="text-white/40 italic text-sm">
                "Photography is not about the camera, but the eyes behind it."
              </p>
            </div>

            {/* Single CTA */}
            <div className="pt-4">
              <a
                href="#contact"
                className="group relative inline-block px-8 py-4 overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-amber-400"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 text-black font-medium flex items-center gap-2">
                  Work With Me
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Stats - Clean, no emojis, no decorative borders */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-white/10 pt-16">
          {[
            { label: "Projects", value: "150+" },
            { label: "Clients", value: "50+" },
            { label: "Years", value: "4+" },
            { label: "Locations", value: "10+" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-left"
            >
              <div className="text-3xl lg:text-4xl font-light text-white mb-2">
                {item.value}
              </div>
              <div className="text-white/30 text-xs tracking-wider">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Expertise - Clean grid, no hover effects */}
        <div className="mt-32">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-light text-white">
              Areas of Focus
            </h3>
            <div className="w-12 h-px bg-amber-400/30 mx-auto mt-4" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Portrait",
                description: "Authentic, intimate portraiture that reveals character."
              },
              {
                title: "Wedding",
                description: "Cinematic storytelling of life's most meaningful moments."
              },
              {
                title: "Landscape",
                description: "Finding stillness and grandeur in the natural world."
              },
              {
                title: "Commercial",
                description: "Visual narratives that elevate brands and products."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-8 border border-white/10"
              >
                <h4 className="text-xl text-white mb-3">{item.title}</h4>
                <p className="text-white/30 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Testimonials - Static cards, no slider */}
        <div className="mt-32">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-light text-white">
              Client Words
            </h3>
            <div className="w-12 h-px bg-amber-400/30 mx-auto mt-4" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Aarav S.",
                quote: "Horizon captures emotion like no one else. Every photo has a soul.",
                role: "Wedding Client"
              },
              {
                name: "Meera K.",
                quote: "Our wedding pictures were magical. It felt like reliving the moment.",
                role: "Portrait Session"
              },
              {
                name: "Rishi T.",
                quote: "From shoot to delivery, everything was smooth and professional.",
                role: "Commercial"
              }
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-8 border border-white/10"
              >
                <p className="text-white/70 text-sm italic mb-6 leading-relaxed">
                  "{t.quote}"
                </p>
                <div>
                  <div className="text-white text-sm font-medium">{t.name}</div>
                  <div className="text-white/20 text-xs mt-1">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;