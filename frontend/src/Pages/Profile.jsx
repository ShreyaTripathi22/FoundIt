import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import { motion } from 'framer-motion';
import { FaUser,FaMapMarkerAlt, FaCalendarAlt, FaSearch, FaCheckCircle, FaCamera, FaEdit, FaSignOutAlt } from 'react-icons/fa';

export default function Profile() {
  const [user, setUser] = useState({
        id: "user123",
        name: "Shreya",
        email: "shreyatripathi22@gmail.com",
        profileImage: "/api/placeholder/150/150",
        dateJoined: "2024-09-15"
      });
      
      // Mock lost items reported by user
      const [lostItems, setLostItems] = useState([
        {
          id: "lost1",
          name: "Black Leather Wallet",
          description: "Genuine leather bifold wallet with embossed initials 'JD'",
          location: "Central Park, near the main fountain",
          dateLost: "2025-04-15",
          status: "pending", // pending, claimed, resolved
          image: "/api/placeholder/100/100"
        },
        {
          id: "lost2",
          name: "iPhone 15 Pro",
          description: "Space gray iPhone with a blue case and cracked screen protector",
          location: "Coffee Shop on 5th Avenue",
          dateLost: "2025-04-10",
          status: "claimed",
          image: "/api/placeholder/100/100"
        }
      ]);
      
      // Mock found items reported by user
      const [foundItems, setFoundItems] = useState([
        {
          id: "found1",
          name: "Gold Necklace",
          description: "Small gold pendant necklace with a heart shape",
          location: "City Library, 2nd floor reading area",
          dateFound: "2025-04-18",
          status: "pending", // pending, returned, unclaimed
          image: "/api/placeholder/100/100"
        },
        {
          id: "found2",
          name: "Car Keys",
          description: "Toyota car keys with a black remote and 2 additional keys",
          location: "Downtown Bus Terminal, waiting area",
          dateFound: "2025-04-12",
          status: "returned",
          image: "/api/placeholder/100/100"
        },
        {
          id: "found3",
          name: "Prescription Glasses",
          description: "Black-framed reading glasses in a brown case",
          location: "Green Park jogging path",
          dateFound: "2025-04-08",
          status: "unclaimed",
          image: "/api/placeholder/100/100"
        }
      ]);
    
      const getStatusBadgeColor = (status) => {
        switch (status) {
          case 'pending':
            return 'bg-yellow-500';
          case 'claimed':
          case 'returned':
            return 'bg-green-500';
          case 'unclaimed':
            return 'bg-blue-500';
          case 'resolved':
            return 'bg-purple-500';
          default:
            return 'bg-gray-500';
        }
      };
    
      const handleLogout = () => {
        sessionStorage.removeItem("User");
        navigate("/login"); // redirect to login or home
      };
    
      // State for tab switching
      const [activeTab, setActiveTab] = useState('lost');
      const navigate = useNavigate();
    
    

  return (
    <div className="min-h-screen bg-[linear-gradient(to_bottom,#000,#200D42_34%,#4F21A1_65%,#A46EDB_82%)]">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Profile Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 mb-8 shadow-xl border border-white/10"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="relative group">
              <img 
                src="https://i.pinimg.com/736x/2c/47/d5/2c47d5dd5b532f83bb55c4cd6f5bd1ef.jpg"
                alt={user.name} 
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-[#a124e9] shadow-lg"
              />
              <button className="absolute bottom-0 right-0 bg-[#a124e9] p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <FaCamera className="text-white" />
              </button>
            </div>
            
            <div className="flex-grow text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                <h1 className="text-3xl font-bold text-white">{user.name}</h1>
                <button className="text-[#a124e9] hover:text-[#8a1bc7] transition-colors">
                  <FaEdit size={20} />
                </button>
              </div>
              
              <p className="text-gray-300 mb-6">{user.email}</p>
              
              <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                <div className="flex items-center text-white/80">
                  <FaCalendarAlt className="mr-2 text-[#a124e9]" />
                  <span>Member since {new Date(user.dateJoined).toLocaleDateString('en-US', {
                    year: 'numeric', 
                    month: 'long'
                  })}</span>
                </div>
                
                <div className="flex items-center text-white/80">
                  <FaSearch className="mr-2 text-red-400" />
                  <span>{lostItems.length} Lost Items</span>
                </div>
                
                <div className="flex items-center text-white/80">
                  <FaCheckCircle className="mr-2 text-green-400" />
                  <span>{foundItems.length} Found Items</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Tab Navigation */}
        <div className="flex mb-8">
          <button 
            className={`flex-1 py-4 text-center font-medium rounded-l-xl transition ${
              activeTab === 'lost' 
                ? 'bg-[#a124e9] text-white' 
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
            onClick={() => setActiveTab('lost')}
          >
            <div className="flex items-center justify-center">
              <FaSearch className="mr-2" />
              Lost Items
              <span className="ml-2 bg-white/10 text-white text-xs px-2 py-1 rounded-full">
                {lostItems.length}
              </span>
            </div>
          </button>
          
          <button 
            className={`flex-1 py-4 text-center font-medium rounded-r-xl transition ${
              activeTab === 'found' 
                ? 'bg-[#a124e9] text-white' 
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
            onClick={() => setActiveTab('found')}
          >
            <div className="flex items-center justify-center">
              <FaCheckCircle className="mr-2" />
              Found Items
              <span className="ml-2 bg-white/10 text-white text-xs px-2 py-1 rounded-full">
                {foundItems.length}
              </span>
            </div>
          </button>
        </div>
        
        {/* Items Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/5 backdrop-blur-lg rounded-2xl shadow-xl border border-white/10 overflow-hidden"
        >
          <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white flex items-center">
              {activeTab === 'lost' ? (
                <>
                  <FaSearch className="mr-2 text-red-400" />
                  My Lost Items
                </>
              ) : (
                <>
                  <FaCheckCircle className="mr-2 text-green-400" />
                  My Found Items
                </>
              )}
            </h2>
            <button 
              className={`px-4 py-2 rounded-lg transition duration-300 text-sm ${
                activeTab === 'lost' 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              Report New {activeTab === 'lost' ? 'Lost' : 'Found'} Item
            </button>
          </div>
          
          {(activeTab === 'lost' ? lostItems : foundItems).length > 0 ? (
            <div className="divide-y divide-white/10">
              {(activeTab === 'lost' ? lostItems : foundItems).map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 flex flex-col md:flex-row items-center md:items-start gap-6 hover:bg-white/5 transition duration-200"
                >
                  <div className="flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-24 h-24 rounded-xl object-cover shadow-lg"
                    />
                  </div>
                  
                  <div className="flex-grow text-center md:text-left">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                      <h3 className="text-xl font-semibold text-white">{item.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        getStatusBadgeColor(item.status)
                      } inline-block mt-2 md:mt-0`}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 mb-4">{item.description}</p>
                    
                    <div className="flex flex-col md:flex-row gap-4 text-sm text-gray-300">
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="mr-2 text-[#a124e9]" />
                        <span>{item.location}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <FaCalendarAlt className="mr-2 text-[#a124e9]" />
                        <span>{activeTab === 'lost' ? 'Lost' : 'Found'} on {new Date(item[activeTab === 'lost' ? 'dateLost' : 'dateFound']).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-shrink-0 mt-4 md:mt-0 flex gap-2">
                    <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition duration-300 text-sm">
                      View Details
                    </button>
                    <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition duration-300 text-sm">
                      Edit
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                {activeTab === 'lost' ? (
                  <FaSearch className="h-16 w-16 mx-auto text-gray-600" />
                ) : (
                  <FaCheckCircle className="h-16 w-16 mx-auto text-gray-600" />
                )}
              </div>
              <p className="text-xl text-gray-300 mb-4">No {activeTab} items reported yet</p>
              <button 
                className={`px-4 py-2 rounded-lg transition duration-300 ${
                  activeTab === 'lost' 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                Report a {activeTab === 'lost' ? 'Lost' : 'Found'} Item
              </button>
            </div>
          )}
        </motion.div>

        {/* Logout Button */}
        <div className="mt-8 flex justify-end">
          <button 
            onClick={handleLogout} 
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition duration-300"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}




















// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Navbar from '../components/Navbar.jsx';

// //const navigate = useNavigate();


// export default function Profile() {
//   // Mock user data - in a real app, you would fetch this from your database
//   const [user, setUser] = useState({
//     id: "user123",
//     name: "Alex Johnson",
//     email: "alex.johnson@example.com",
//     profileImage: "/api/placeholder/150/150",
//     dateJoined: "2024-09-15"
//   });
  
//   // Mock lost items reported by user
//   const [lostItems, setLostItems] = useState([
//     {
//       id: "lost1",
//       name: "Black Leather Wallet",
//       description: "Genuine leather bifold wallet with embossed initials 'JD'",
//       location: "Central Park, near the main fountain",
//       dateLost: "2025-04-15",
//       status: "pending", // pending, claimed, resolved
//       image: "/api/placeholder/100/100"
//     },
//     {
//       id: "lost2",
//       name: "iPhone 15 Pro",
//       description: "Space gray iPhone with a blue case and cracked screen protector",
//       location: "Coffee Shop on 5th Avenue",
//       dateLost: "2025-04-10",
//       status: "claimed",
//       image: "/api/placeholder/100/100"
//     }
//   ]);
  
//   // Mock found items reported by user
//   const [foundItems, setFoundItems] = useState([
//     {
//       id: "found1",
//       name: "Gold Necklace",
//       description: "Small gold pendant necklace with a heart shape",
//       location: "City Library, 2nd floor reading area",
//       dateFound: "2025-04-18",
//       status: "pending", // pending, returned, unclaimed
//       image: "/api/placeholder/100/100"
//     },
//     {
//       id: "found2",
//       name: "Car Keys",
//       description: "Toyota car keys with a black remote and 2 additional keys",
//       location: "Downtown Bus Terminal, waiting area",
//       dateFound: "2025-04-12",
//       status: "returned",
//       image: "/api/placeholder/100/100"
//     },
//     {
//       id: "found3",
//       name: "Prescription Glasses",
//       description: "Black-framed reading glasses in a brown case",
//       location: "Green Park jogging path",
//       dateFound: "2025-04-08",
//       status: "unclaimed",
//       image: "/api/placeholder/100/100"
//     }
//   ]);

//   const getStatusBadgeColor = (status) => {
//     switch (status) {
//       case 'pending':
//         return 'bg-yellow-500';
//       case 'claimed':
//       case 'returned':
//         return 'bg-green-500';
//       case 'unclaimed':
//         return 'bg-blue-500';
//       case 'resolved':
//         return 'bg-purple-500';
//       default:
//         return 'bg-gray-500';
//     }
//   };

//   const handleLogout = () => {
//     sessionStorage.removeItem("User");
//     navigate("/login"); // redirect to login or home
//   };

//   // State for tab switching
//   const [activeTab, setActiveTab] = useState('lost');
//   const navigate = useNavigate();




//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-6">
//         <Navbar />
//       <div className="max-w-6xl mt-20 mx-auto">
//         {/* Profile Header */}
//         <div className="bg-gray-800 rounded-xl p-6 mb-8 shadow-lg">
//           <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
//             <div className="flex-shrink-0">
//               <img 
//                 src="https://static.vecteezy.com/system/resources/thumbnails/005/346/410/small_2x/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo.jpg"
//                 alt={user.name} 
//                 className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-purple-600"
//               />
//             </div>
            
//             <div className="flex-grow text-center md:text-left">
//               <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
//               <p className="text-gray-400 mb-4">{user.email}</p>
              
//               <div className="flex flex-wrap gap-4 justify-center md:justify-start">
//                 <div className="flex items-center text-sm">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                   </svg>
//                   <span>Member since {new Date(user.dateJoined).toLocaleDateString('en-US', {
//                     year: 'numeric', 
//                     month: 'long'
//                   })}</span>
//                 </div>
                
//                 <div className="flex items-center text-sm">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   <span>{lostItems.length} Lost Items</span>
//                 </div>
                
//                 <div className="flex items-center text-sm">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   <span>{foundItems.length} Found Items</span>
//                 </div>
//               </div>
//             </div>
            
//             <div className="flex-shrink-0 mt-4 md:mt-0">
//               <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition duration-300">
//                 Edit Profile
//               </button>
//             </div>
//           </div>
//         </div>
        
//         {/* Tab Navigation */}
//         <div className="flex mb-6">
//           <button 
//             className={`flex-1 py-3 text-center font-medium rounded-tl-lg rounded-bl-lg transition ${activeTab === 'lost' ? 'bg-gray-800 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-750'}`}
//             onClick={() => setActiveTab('lost')}
//           >
//             <div className="flex items-center justify-center">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//               Lost Items
//               <span className="ml-2 bg-gray-700 text-white text-xs px-2 py-1 rounded-full">{lostItems.length}</span>
//             </div>
//           </button>
          
//           <button 
//             className={`flex-1 py-3 text-center font-medium rounded-tr-lg rounded-br-lg transition ${activeTab === 'found' ? 'bg-gray-800 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-750'}`}
//             onClick={() => setActiveTab('found')}
//           >
//             <div className="flex items-center justify-center">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//               </svg>
//               Found Items
//               <span className="ml-2 bg-gray-700 text-white text-xs px-2 py-1 rounded-full">{foundItems.length}</span>
//             </div>
//           </button>
//         </div>
        
//         {/* Lost Items Section */}
//         {activeTab === 'lost' && (
//           <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
//             <div className="p-6 border-b border-gray-700 flex justify-between items-center">
//               <h2 className="text-2xl font-bold flex items-center">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//                 My Lost Items
//               </h2>
//               <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition duration-300 text-sm">
//                 Report New Lost Item
//               </button>
//             </div>
            
//             {lostItems.length > 0 ? (
//               <div className="divide-y divide-gray-700">
//                 {lostItems.map((item) => (
//                   <div key={item.id} className="p-6 flex flex-col md:flex-row items-center md:items-start gap-4 hover:bg-gray-750 transition duration-200">
//                     <div className="flex-shrink-0">
//                       <img 
//                         src={item.image} 
//                         alt={item.name}
//                         className="w-20 h-20 rounded-lg object-cover"
//                       />
//                     </div>
                    
//                     <div className="flex-grow text-center md:text-left">
//                       <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
//                         <h3 className="text-xl font-semibold">{item.name}</h3>
//                         <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(item.status)} inline-block mt-2 md:mt-0`}>
//                           {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
//                         </span>
//                       </div>
                      
//                       <p className="text-gray-400 mb-2">{item.description}</p>
                      
//                       <div className="flex flex-col md:flex-row gap-4 text-sm">
//                         <div className="flex items-center">
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                           </svg>
//                           <span>{item.location}</span>
//                         </div>
                        
//                         <div className="flex items-center">
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                           </svg>
//                           <span>Lost on {new Date(item.dateLost).toLocaleDateString()}</span>
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className="flex-shrink-0 mt-4 md:mt-0 flex">
//                       <button className="mr-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition duration-300 text-sm">
//                         View Details
//                       </button>
//                       <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition duration-300 text-sm">
//                         Edit
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="p-12 text-center text-gray-400">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//                 <p className="text-xl">No lost items reported yet</p>
//                 <button className="mt-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition duration-300">
//                   Report a Lost Item
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
        
//         {/* Found Items Section */}
//         {activeTab === 'found' && (
//           <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
//             <div className="p-6 border-b border-gray-700 flex justify-between items-center">
//               <h2 className="text-2xl font-bold flex items-center">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//                 My Found Items
//               </h2>
//               <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition duration-300 text-sm">
//                 Report New Found Item
//               </button>
//             </div>
            
//             {foundItems.length > 0 ? (
//               <div className="divide-y divide-gray-700">
//                 {foundItems.map((item) => (
//                   <div key={item.id} className="p-6 flex flex-col md:flex-row items-center md:items-start gap-4 hover:bg-gray-750 transition duration-200">
//                     <div className="flex-shrink-0">
//                       <img 
//                         src={item.image} 
//                         alt={item.name}
//                         className="w-20 h-20 rounded-lg object-cover"
//                       />
//                     </div>
                    
//                     <div className="flex-grow text-center md:text-left">
//                       <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
//                         <h3 className="text-xl font-semibold">{item.name}</h3>
//                         <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(item.status)} inline-block mt-2 md:mt-0`}>
//                           {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
//                         </span>
//                       </div>
                      
//                       <p className="text-gray-400 mb-2">{item.description}</p>
                      
//                       <div className="flex flex-col md:flex-row gap-4 text-sm">
//                         <div className="flex items-center">
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                           </svg>
//                           <span>{item.location}</span>
//                         </div>
                        
//                         <div className="flex items-center">
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                           </svg>
//                           <span>Found on {new Date(item.dateFound).toLocaleDateString()}</span>
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className="flex-shrink-0 mt-4 md:mt-0 flex">
//                       <button className="mr-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition duration-300 text-sm">
//                         View Details
//                       </button>
//                       <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition duration-300 text-sm">
//                         Edit
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="p-12 text-center text-gray-400">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//                 <p className="text-xl">No found items reported yet</p>
//                 <button className="mt-4 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition duration-300">
//                   Report a Found Item
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//       <button  onClick={handleLogout} className="mt-9 bg-red-600 hover:bg-green-700 px-4 py-2 rounded-lg transition duration-300">
//                   Logout
//         </button>
//     </div>
//   );
// }