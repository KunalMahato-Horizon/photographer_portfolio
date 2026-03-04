import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Instagram, Twitter } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    // You can add your form submission logic here
    alert("Message sent! (Demo mode)");
  };

  return (
    <section
      id="contact"
      className="relative w-full min-h-screen bg-black py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0"
          animate={{
            background: `radial-gradient(circle at 30% 50%, rgba(251,191,36,0.03), transparent 50%)`,
          }}
        />
        
        {/* Floating geometric elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-96 h-96 border border-white/5"
              style={{
                top: `${20 + i * 30}%`,
                left: `${10 + i * 20}%`,
                rotate: i * 45,
              }}
              animate={{
                rotate: [i * 45, i * 45 + 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 20 + i * 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>

        {/* Noise texture */}
        <div className="absolute inset-0 opacity-20 mix-blend-overlay">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJmIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc0IiBudW1PY3RhdmVzPSIzIiAvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNmKSIgb3BhY2l0eT0iMC4xIiAvPjwvc3ZnPg==')] bg-repeat" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              className="w-12 h-px bg-amber-400"
              animate={{ width: 48 }}
            />
            <span className="text-amber-400 text-sm tracking-[0.3em] uppercase">
              Let's Connect
            </span>
            <motion.div
              className="w-12 h-px bg-amber-400"
              animate={{ width: 48 }}
            />
          </div>
          <h2 className="text-5xl lg:text-7xl font-light text-white">
            <span className="block">Start Your</span>
            <span className="block font-serif italic text-6xl lg:text-8xl text-amber-400">
              Story
            </span>
          </h2>
        </motion.div>

        {/* Contact Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-light text-white mb-4">
                Let's Create Something{" "}
                <span className="text-amber-400 font-serif italic">Beautiful</span>
              </h3>
              <p className="text-white/60 leading-relaxed">
                Whether you're planning a wedding, need portraits, or have a creative project in mind, 
                I'd love to hear about it. Reach out and let's start a conversation.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-4">
              <motion.a
                href="mailto:hello@horizon.com"
                className="flex items-center gap-4 group p-4 border border-white/10 hover:border-amber-400/30 transition-all duration-300"
                whileHover={{ x: 10 }}
              >
                <div className="w-12 h-12 bg-white/5 flex items-center justify-center group-hover:bg-amber-400/10 transition-colors">
                  <Mail className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <div className="text-white/40 text-xs tracking-wider">EMAIL</div>
                  <div className="text-white group-hover:text-amber-400 transition-colors">
                    hello@horizon.com
                  </div>
                </div>
              </motion.a>

              <motion.a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group p-4 border border-white/10 hover:border-amber-400/30 transition-all duration-300"
                whileHover={{ x: 10 }}
              >
                <div className="w-12 h-12 bg-white/5 flex items-center justify-center group-hover:bg-amber-400/10 transition-colors">
                  <Phone className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <div className="text-white/40 text-xs tracking-wider">WHATSAPP</div>
                  <div className="text-white group-hover:text-amber-400 transition-colors">
                    +91 99999 99999
                  </div>
                </div>
              </motion.a>

              <motion.div
                className="flex items-center gap-4 group p-4 border border-white/10"
              >
                <div className="w-12 h-12 bg-white/5 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <div className="text-white/40 text-xs tracking-wider">STUDIO</div>
                  <div className="text-white">
                    Mumbai, India
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Social Links */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-amber-400" />
                <span className="text-white/40 text-sm tracking-widest">FOLLOW</span>
              </div>
              <div className="flex gap-3">
                <motion.a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 border border-white/10 flex items-center justify-center hover:border-amber-400/30 hover:bg-amber-400/5 transition-all duration-300"
                  whileHover={{ y: -5 }}
                >
                  <Instagram className="w-5 h-5 text-white/60 hover:text-amber-400 transition-colors" />
                </motion.a>
                <motion.a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 border border-white/10 flex items-center justify-center hover:border-amber-400/30 hover:bg-amber-400/5 transition-all duration-300"
                  whileHover={{ y: -5 }}
                >
                  <Twitter className="w-5 h-5 text-white/60 hover:text-amber-400 transition-colors" />
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative p-8 border border-white/10 bg-white/5 backdrop-blur-sm">
              {/* Form Header */}
              <div className="mb-6">
                <h4 className="text-2xl font-light text-white mb-2">
                  Send a Message
                </h4>
                <div className="w-12 h-px bg-amber-400" />
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-white/10 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-amber-400/30 transition-colors"
                    required
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-white/10 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-amber-400/30 transition-colors"
                    required
                  />
                </div>

                <div>
                  <textarea
                    name="message"
                    placeholder="Tell me about your project..."
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-white/10 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-amber-400/30 transition-colors resize-none"
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  className="w-full group relative px-8 py-4 overflow-hidden cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-amber-400"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10 text-black font-medium flex items-center justify-center gap-2">
                    Send Message
                    <Send className="w-4 h-4" />
                  </span>
                </motion.button>
              </form>

              {/* Corner accents */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-amber-400/30" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-amber-400/30" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-amber-400/30" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-amber-400/30" />
            </div>
          </motion.div>
        </div>

        {/* Map/Studio Image */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 relative h-64 overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=85"
            alt="Studio"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
          
          {/* Overlay text */}
          <div className="absolute inset-0 flex items-center justify-between px-8">
            <div>
              <div className="text-white/40 text-sm tracking-widest mb-2">VISIT THE STUDIO</div>
              <div className="text-white text-xl font-light">By appointment only</div>
            </div>
            <div className="text-right">
              <div className="text-white/40 text-sm tracking-widest mb-2">HOURS</div>
              <div className="text-white text-xl font-light">Mon - Fri, 10am - 6pm</div>
            </div>
          </div>

          {/* Frame */}
          <div className="absolute inset-0 border border-white/10 pointer-events-none" />
        </motion.div>

        {/* Footer/Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 text-center text-white/20 text-sm tracking-wider"
        >
          © 2024 HORIZON STUDIO. ALL RIGHTS RESERVED.
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;