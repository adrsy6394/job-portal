import React from 'react';
import { motion } from 'framer-motion';

const CategorySection = () => {
  const categories = [
    { name: 'Legal', icon: '⚖️' },
    { name: 'Marketing', icon: '📈' },
    { name: 'Sales', icon: '💰' },
    { name: 'Human Resource', icon: '🤝' },
    { name: 'Tech & IT', icon: '💻', highlight: true }, // Highlighted center
    { name: 'Logistics', icon: '🚚' },
    { name: 'Administration', icon: '📋' },
    { name: 'Product Dev', icon: '🚀' },
    { name: 'Technical', icon: '🔧' },
  ];

  return (
    <section className="py-16 px-8 max-w-7xl mx-auto w-full text-center">
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-accent font-semibold tracking-widest uppercase text-sm mb-2 block">
          Browse Categories
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-primary">
          POPULAR CATEGORIES
        </h2>
      </motion.div>

      {/* Symmetrical Grid for Circular Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-9 gap-6 justify-center items-center">
        {categories.map((cat, index) => (
          <motion.div
            key={index}
            className={`w-28 h-28 rounded-full flex flex-col items-center justify-center border transition-all duration-300 mx-auto ${
              cat.highlight
                ? 'bg-primary text-white border-primary shadow-lg shadow-primary/25 scale-110'
                : 'bg-white/50 text-primary border-primary/20 hover:border-accent hover:bg-white hover:shadow-md'
            }`}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: cat.highlight ? 1.1 : 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.5 }}
            whileHover={{ scale: cat.highlight ? 1.15 : 1.05 }}
          >
            <span className="text-2xl mb-1">{cat.icon}</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-center px-2">
              {cat.name}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
