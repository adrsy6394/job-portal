import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-16 px-8 max-w-7xl mx-auto w-full">
      {/* Decorative Circles */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Tagline & Headings */}
        <motion.div 
          className="lg:col-span-4 space-y-6 z-10"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-xs font-bold text-primary tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            Recruitment Agency
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-primary leading-tight">
            GET THE BEST <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">JOB</span> OR <br />
            CANDIDATES.
          </h1>
          {/* Decorative Circle Graphic */}
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-dashed border-accent rounded-full animate-spin-slow"></div>
            <div className="absolute inset-2 bg-primary rounded-full"></div>
          </div>
        </motion.div>

        {/* Center: Image & Stats */}
        <motion.div 
          className="lg:col-span-4 flex justify-center relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Main Portrait Circle */}
          <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-full border-4 border-primary p-2 overflow-visible bg-background/50">
            <img 
              src="/candidate_portrait.png" 
              alt="Top Candidate" 
              className="w-full h-full object-cover rounded-full bg-accent/20"
            />

            {/* Floating Stats */}
            <motion.div 
              className="absolute -top-4 -left-4 bg-white shadow-lg rounded-2xl p-3 border border-gray-100 flex flex-col items-center"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-lg font-bold text-primary">10+</span>
              <span className="text-[10px] text-textSecondary uppercase font-semibold">Yrs Exp</span>
            </motion.div>

            <motion.div 
              className="absolute top-1/2 -right-8 bg-primary text-white shadow-lg rounded-2xl p-3 flex flex-col items-center"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-lg font-bold text-accent">15k+</span>
              <span className="text-[10px] text-white/80 uppercase font-semibold">Placed</span>
            </motion.div>

            <motion.div 
              className="absolute -bottom-4 left-6 bg-white shadow-lg rounded-2xl p-3 border border-gray-100 flex flex-col items-center"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-lg font-bold text-primary">50+</span>
              <span className="text-[10px] text-textSecondary uppercase font-semibold">Cities</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side: Description */}
        <motion.div 
          className="lg:col-span-4 space-y-6 lg:pl-6 text-left"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-primary">Welcome to JobPortal</h3>
          <p className="text-textSecondary leading-relaxed">
            We bridge the gap between top-tier talent and leading companies worldwide. Our recruitment portal delivers state-of-the-art matchmaking, ensuring the perfect fit for seekers and employers alike.
          </p>
          <div className="flex gap-4">
            <button className="btn-primary text-sm font-semibold uppercase tracking-wider">Get Started</button>
            <button className="btn-secondary text-sm font-semibold uppercase tracking-wider">Learn More</button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
