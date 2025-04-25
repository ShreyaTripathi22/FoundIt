import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const RecentItems = () => {
  const Navigate = useNavigate();

  const handleOnclick=()=>{
    Navigate('/FoundItems');
  }

  const items = [
    {
      type: 'Lost',
      title: 'iPhone 13 Pro',
      location: 'Central Park',
      date: '2024-03-15',
      image: 'https://images.squarespace-cdn.com/content/v1/5446f93de4b0a3452dfaf5b0/1632243919767-JKQZ2NMF2ZT2L5UC6PZJ/iPhone+13+Pro+%28Above+Avalon%29',
    },
    {
      type: 'Found',
      title: 'Car Keys',
      location: 'Shopping Mall',
      date: '2024-03-14',
      image: 'https://blogs.gomechanic.com/wp-content/uploads/2019/02/blogfeaturedimage_carkeys-01.jpg',
    },
    // Add more items as needed
  ];

  return (
    <section className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-white text-center mb-12">Recent Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-[#1f1f1f] rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="relative">
                <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                <span className={`absolute top-4 right-4 px-3 py-1 rounded-full ${
                  item.type === 'Lost' ? 'bg-red-500' : 'bg-green-500'
                } text-white text-sm`}>
                  {item.type}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 mb-1">{item.location}</p>
                <p className="text-gray-500 text-sm">{item.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <button onClick={handleOnclick} className="bg-[#a124e9] text-white px-8 py-3 rounded-lg hover:bg-[#8a1bc7] transition-all">
            View All Items
          </button>
        </div>
      </div>
    </section>
  );
};

export default RecentItems;