import React from 'react';
import HeroSection from '../components/HeroSection';
import BrandLogos from '../components/BrandLogos';
import RecruitSection from '../components/RecruitSection';
import CategorySection from '../components/CategorySection';
import FeaturedJobs from '../components/FeaturedJobs';
import FeedbackSection from '../components/FeedbackSection';

const Home = () => {
  return (
    <div className="w-full space-y-12">
      <HeroSection />
      <BrandLogos />
      <RecruitSection />
      <CategorySection />
      <FeaturedJobs />
      <FeedbackSection />
    </div>
  );
};

export default Home;
