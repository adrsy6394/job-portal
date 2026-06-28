import React from 'react';
import { motion } from 'framer-motion';

const BrandLogos = () => {
  const brands = ['Google', 'Microsoft', 'Amazon', 'Meta', 'Netflix', 'Apple'];

  return (
    <section className="py-8 bg-white/40 border-y border-gray-200/50 backdrop-blur-sm w-full">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
          {brands.map((brand, index) => (
            <motion.div
              key={index}
              className="text-xl font-bold text-primary/40 tracking-widest uppercase hover:text-primary/80 transition-colors cursor-default"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.1 }}
            >
              {brand}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandLogos;
