
import { motion } from 'framer-motion';
import { FaRobot, FaMapMarkerAlt, FaUsers, FaShieldAlt } from 'react-icons/fa';

const WhyChooseUs = () => {
  const features = [
    {
      icon: FaRobot,
      title: 'AI Matching',
      description: 'Intelligent item similarity & location matching',
      color: 'from-purple-600 to-blue-500'
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Location Aware',
      description: 'See reports and matches near you',
      color: 'from-pink-500 to-purple-600'
    },
    {
      icon: FaUsers,
      title: 'Crowdsourced Network',
      description: 'Real-time help from the community',
      color: 'from-blue-500 to-teal-400'
    },
    {
      icon: FaShieldAlt,
      title: 'Privacy First',
      description: 'Secure, anonymous contact system',
      color: 'from-teal-400 to-green-500'
    }
  ];

  return (
    <section className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-white mb-4"
          >
            Why FoundIt?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Choose the smart way to find and recover lost items with our cutting-edge features
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="bg-[#1f1f1f] rounded-xl p-6 h-full border border-gray-800 hover:border-[#a124e9] transition-all duration-300">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
                
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#a124e9]/0 to-[#a124e9]/0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;