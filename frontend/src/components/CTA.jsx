import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';


const CTA = () => {
  const navigate = useNavigate();

  const handleLostClick =() =>{
    navigate('/lost');
  }

  const handleFoundClick =() =>{
    navigate('/found');
  }

  return (
      <section className="py-20 bg-[#200D42]">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-white mb-6">
            Lost Something? We're Here to Help!
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Join our community and increase your chances of finding your lost items.
            It's quick, easy, and free to get started!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={handleLostClick} className="bg-[#a124e9] text-white px-8 py-3 rounded-lg hover:bg-[#8a1bc7] transition-all">
              Report Lost Item
            </button>
            <button onClick= {handleFoundClick} className="bg-transparent border-2 border-[#a124e9] text-white px-8 py-3 rounded-lg hover:bg-[#a124e9] transition-all">
              Report Found Item
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;