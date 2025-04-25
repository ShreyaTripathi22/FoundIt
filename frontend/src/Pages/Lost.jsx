import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCamera, FaMapMarkerAlt, FaCalendarAlt, FaSearch, FaExclamationCircle } from 'react-icons/fa';

const Lost = () => {
  const [formData, setFormData] = useState({
    itemName: '',
    description: '',
    date: '',
    location: '',
    email: '', 
    image: null
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    handleImageFile(file);
  };

  const handleImageFile = (file) => {
    if (file) {
      setFormData({
        ...formData,
        image: file
      });
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = new FormData();
    data.append("itemName", formData.itemName);
    data.append("description", formData.description);
    data.append("date", formData.date);
    data.append("location", formData.location);
    data.append("email", formData.email);
    if (formData.image) {
      data.append("image", formData.image);
    }
  
    try {
      const response = await fetch("http://localhost:3000/lost", {
        method: "POST",
        body: data,
      });
  
      if (!response.ok) {
        throw new Error("Failed to submit lost item report");
      }
  
      const result = await response.json();
      console.log("Lost item submitted successfully:", result);
  
      // Reset form
      setFormData({
        itemName: '',
        description: '',
        date: '',
        location: '',
        image: null,
      });
      setImagePreview(null);
      alert("Lost item reported successfully!");
    } catch (error) {
      console.error("Error submitting lost item:", error);
      alert("Error submitting lost item");
    }
  };

  return (
    <div className="h-screen bg-[linear-gradient(to_bottom,#000,#200D42_34%,#4F21A1_65%,#A46EDB_82%)] flex flex-col">
      
      
      <div className="flex flex-col  md:flex-row flex-grow h-full">
        {/* Left: Image Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-1/2 h-[300px] md:h-full relative"
        >
          <img
            src="https://images.unsplash.com/photo-1735660244714-8ef436246ea7?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Lost and Found"
            className="w-full h-full object-cover"
          />
          
        </motion.div>
  
        {/* Right: Form Section */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8"
        >
          <div className="backdrop-blur-md  p-6 w-full mt-9 max-w-md">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              Report Lost Item
            </h2>
  
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className=" text-white text-sm font-medium mb-2 flex items-center">
                  <FaSearch className="mr-2" />
                  Item Name*
                </label>
                <input
                  type="text"
                  name="itemName"
                  value={formData.itemName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a124e9] text-white placeholder-gray-400"
                  placeholder="What did you lose?"
                  required
                />
              </div>
              
              <div>
                <label className="block text-white text-sm font-medium mb-2 flex items-center">
                  <FaExclamationCircle className="mr-2" />
                  Description*
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full h-20 px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a124e9] text-white placeholder-gray-400"
                  placeholder="Provide detailed description of the item..."
                  required
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2 flex items-center">
                    <FaCalendarAlt className="mr-2" />
                    Date Lost*
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a124e9] text-white"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2 flex items-center">
                    <FaMapMarkerAlt className="mr-2" />
                    Location*
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a124e9] text-white placeholder-gray-400"
                    placeholder="Where did you last see it?"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-white text-sm font-medium mb-2 flex items-center">
                  📧 Email Address*
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a124e9] text-white placeholder-gray-400"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div>
                <label className="block text-white text-sm font-medium mb-2 flex items-center">
                  <FaCamera className="mr-2" />
                  Image (Optional)
                </label>
                <div 
                  className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${
                    isDragging ? 'border-[#a124e9]' : 'border-white/10'
                  } border-dashed rounded-lg hover:border-[#a124e9] transition-colors duration-300`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="space-y-1 text-center">
                    {imagePreview ? (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="mx-auto h-32 w-auto rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview(null);
                            setFormData({ ...formData, image: null });
                          }}
                          className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <>
                        <FaCamera className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-400">
                          <label className="relative cursor-pointer rounded-md font-medium text-[#a124e9] hover:text-[#8a1bc7] focus-within:outline-none">
                            <span>Upload a file</span>
                            <input
                              type="file"
                              name="image"
                              onChange={handleImageChange}
                              className="sr-only"
                              accept="image/*"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-400">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-[#a124e9] to-[#8a1bc7] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
              >
                Submit Report
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Lost;