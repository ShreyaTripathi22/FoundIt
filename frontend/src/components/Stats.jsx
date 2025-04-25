import React from 'react';
import { motion } from 'framer-motion';

const Stats = () => {
  const stats = [
    { number: '1000+', text: 'Items Found' },
    { number: '500+', text: 'Active Users' },
    { number: '95%', text: 'Success Rate' },
    { number: '24/7', text: 'Support' },
  ];

  return (
    <section className="py-20 bg-black z-1">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <h3 className="text-4xl font-bold text-[#a124e9] mb-2">{stat.number}</h3>
              <p className="text-white text-lg">{stat.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
