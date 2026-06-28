import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FeedbackSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      text: "The portal changed our recruitment workflow entirely. We sourced a senior engineer in less than a week, and the interface is exceptionally polished.",
      name: "Aarav Mehta",
      title: "CTO, Mumbai Tech Inc.",
      avatar: "👨‍💻",
    },
    {
      text: "I was looking for remote marketing roles and applied directly through JobPortal. Within 3 days I got my first interview scheduled.",
      name: "Anjali Sharma",
      title: "Senior Marketer",
      avatar: "👩‍💼",
    },
    {
      text: "Managing thousands of job applications was a nightmare before. Now, it's just a clean, card-based overview that works instantly.",
      name: "Rohan Patel",
      title: "HR Director, Zenith India",
      avatar: "👨‍💼",
    },
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 px-8 max-w-4xl mx-auto w-full text-center">
      <div className="mb-10">
        <span className="text-accent font-semibold tracking-widest uppercase text-sm mb-2 block">
          Testimonials
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-primary">
          CUSTOMER FEEDBACK
        </h2>
      </div>

      <div className="relative card-container bg-white/60 backdrop-blur-sm p-10 md:p-14 shadow-sm border border-gray-100 rounded-3xl min-h-[300px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <p className="text-lg md:text-xl italic text-textPrimary leading-relaxed">
              "{testimonials[activeIndex].text}"
            </p>
            <div className="flex items-center justify-center gap-3 mt-6">
              <span className="text-3xl">{testimonials[activeIndex].avatar}</span>
              <div className="text-left">
                <h4 className="font-bold text-primary">{testimonials[activeIndex].name}</h4>
                <p className="text-xs text-textSecondary">{testimonials[activeIndex].title}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Toggles */}
        <div className="flex justify-center gap-4 mt-10">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
          >
            &larr;
          </button>
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
          >
            &rarr;
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;
