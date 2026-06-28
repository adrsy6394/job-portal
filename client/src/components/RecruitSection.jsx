import React from 'react';
import { motion } from 'framer-motion';

const RecruitSection = () => {
  return (
    <section className="py-16 px-8 max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
        <motion.div 
          className="lg:col-span-6 space-y-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-primary leading-tight">
            WE HELP YOU TO RECRUIT AND FIND WORK
          </h2>
        </motion.div>
        
        <motion.div 
          className="lg:col-span-6 space-y-6 lg:pl-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-textSecondary leading-relaxed">
            Whether you are looking to take the next step in your career or seeking skilled professionals to drive your business forward, we provide customized solutions to meet your recruitment requirements.
          </p>
          <button className="btn-primary text-sm font-semibold uppercase tracking-wider">
            Explore Services
          </button>
        </motion.div>
      </div>

      {/* Grid of Two Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card 1 */}
        <motion.div 
          className="card-container bg-white p-10 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ y: -5 }}
        >
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center text-primary text-2xl mb-6">
              💼
            </div>
            <h3 className="text-2xl font-bold text-primary">Job Posting Services</h3>
            <p className="text-textSecondary leading-relaxed">
              Create and publish new job postings to attract talent from our massive network of skilled professionals. Manage listings easily.
            </p>
          </div>
          <span className="text-sm font-bold text-primary hover:text-accent mt-8 inline-block cursor-pointer">
            Post a Job &rarr;
          </span>
        </motion.div>

        {/* Card 2 */}
        <motion.div 
          className="card-container bg-white p-10 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ y: -5 }}
        >
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center text-primary text-2xl mb-6">
              👥
            </div>
            <h3 className="text-2xl font-bold text-primary">Candidate Management</h3>
            <p className="text-textSecondary leading-relaxed">
              Review applicant resumes, filter by education or skills, and organize shortlists smoothly with our recruiter tools.
            </p>
          </div>
          <span className="text-sm font-bold text-primary hover:text-accent mt-8 inline-block cursor-pointer">
            Manage Candidates &rarr;
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default RecruitSection;
