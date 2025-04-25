import React from 'react';
import { useRef } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Workings from '../components/Workings';
import Stats from '../components/Stats';
import RecentItems from '../components/RecentItems';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';
import Footer from '../components/Footer'
import WhyChooseUs from '../components/WhyChooseUs';
// Add other homepage sections here, like Cards, Testimonials, etc.

const Home = () => {

  const howItWorksRef = useRef(null);

  const handleExploreClick = () => {
    howItWorksRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Hero onExploreClick={handleExploreClick}/>
      
      <Stats />
      <WhyChooseUs />
      <Workings ref={howItWorksRef} />
      <RecentItems />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};

export default Home;
