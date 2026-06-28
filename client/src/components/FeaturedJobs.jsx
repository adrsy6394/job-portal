import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FeaturedJobs = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Technical', 'Marketing', 'Product Dev', 'Human Resource'];

  const jobs = [
    {
      title: 'Senior Software Engineer',
      company: 'Google',
      type: 'Full-time',
      category: 'Technical',
      location: 'Mountain View, CA',
    },
    {
      title: 'Digital Marketing Lead',
      company: 'Meta',
      type: 'Remote',
      category: 'Marketing',
      location: 'Menlo Park, CA',
    },
    {
      title: 'Senior Product Manager',
      company: 'Amazon',
      type: 'Full-time',
      category: 'Product Dev',
      location: 'Seattle, WA',
    },
    {
      title: 'HR Specialist',
      company: 'Microsoft',
      type: 'Hybrid',
      category: 'Human Resource',
      location: 'Redmond, WA',
    },
    {
      title: 'Backend Developer (Node.js)',
      company: 'Netflix',
      type: 'Full-time',
      category: 'Technical',
      location: 'Los Gatos, CA',
    },
    {
      title: 'Growth Marketing Manager',
      company: 'Apple',
      type: 'Full-time',
      category: 'Marketing',
      location: 'Cupertino, CA',
    },
  ];

  const filteredJobs = activeCategory === 'All' 
    ? jobs 
    : jobs.filter(job => job.category === activeCategory);

  return (
    <section className="py-16 px-8 max-w-7xl mx-auto w-full">
      <div className="text-center mb-12">
        <span className="text-accent font-semibold tracking-widest uppercase text-sm mb-2 block">
          Job Board
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-primary">
          FEATURED JOBS
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Sidebar: Job Categories */}
        <div className="lg:col-span-3 space-y-3">
          <h3 className="text-lg font-bold text-primary mb-4 uppercase tracking-wider">
            Filter Categories
          </h3>
          <div className="flex flex-wrap lg:flex-col gap-2">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 text-left w-full lg:max-w-xs ${
                  activeCategory === cat
                    ? 'bg-accent text-primary shadow-md'
                    : 'bg-white hover:bg-gray-50 text-textSecondary border border-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Right Content: Featured Job Cards */}
        <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredJobs.map((job, index) => (
            <motion.div
              key={index}
              layout
              className="bg-primary text-white p-6 rounded-2xl flex flex-col justify-between hover:shadow-xl transition-shadow border border-primary-dark"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-semibold px-3 py-1 bg-accent/20 text-accent rounded-full border border-accent/30">
                    {job.type}
                  </span>
                  <span className="text-xs text-white/60">{job.location}</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white leading-snug">{job.title}</h4>
                  <p className="text-sm text-white/80 mt-1">{job.company}</p>
                </div>
              </div>

              <div className="mt-8 flex justify-between items-center pt-4 border-t border-white/10">
                <span className="text-xs font-medium text-white/60 uppercase tracking-widest">
                  {job.category}
                </span>
                <button className="px-4 py-2 bg-accent text-primary font-bold rounded-lg text-xs hover:bg-accent/90 transition-colors">
                  Apply Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;
