import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";

const Contact = () => {
  return (
    <section
      id="contact"
      className="relative py-20 px-4 bg-gradient-to-b from-white to-gray-100 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-pink-200 rounded-full opacity-20 blur-3xl pointer-events-none" />

      {/* Contact Card */}
      <motion.div
        className="max-w-2xl mx-auto backdrop-blur-md bg-white/60 border border-gray-300 rounded-2xl shadow-2xl p-8 text-center relative z-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Get In Touch
        </h2>
        <p className="text-gray-700 mb-8">
          Like what you see? Let’s create something beautiful together.
          Whether it's a collaboration or a project — I’d love to hear from you.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="mailto:horizon@example.com"
            className="flex items-center justify-center gap-2 bg-black text-white py-3 px-6 rounded-full hover:bg-gray-800 transition"
          >
            <Mail size={18} />
            Email Me
          </a>
          <a
            href="https://wa.me/919999999999" // Replace with your number
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 border border-black text-black py-3 px-6 rounded-full hover:bg-gray-200 transition"
          >
            <Phone size={18} />
            WhatsApp
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
