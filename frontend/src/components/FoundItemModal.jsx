import React, {useState} from 'react';
import ClaimModal from './ClaimModal';


export default function FoundItemModal({ item, onClose }) {

  const [showClaimModal, setShowClaimModal] = useState(false);

    return (
      <>
      <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
        <div className="bg-gray-800 text-white rounded-lg max-w-4xl w-full overflow-hidden shadow-lg">
          <div className="flex flex-col md:flex-row">
            {/* Image */}
            <div className="md:w-1/2">
              <img
                src={`http://localhost:3000/uploads/${item.Image}`}
                alt={item.Name}
                className="w-full h-full object-cover"
              />
            </div>
  
            {/* Details */}
            <div className="md:w-1/2 p-6 space-y-4">
              <h2 className="text-2xl font-bold">{item.Name}</h2>
              <p className="text-gray-300">{item.Description}</p>
              <p><span className="text-gray-400">Location:</span> {item.Location}</p>
              <p><span className="text-gray-400">Date:</span> {new Date(item.Date).toLocaleDateString()}</p>
  
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setShowClaimModal(true)}
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition"
                >
                  Claim
                </button>
                <button
                  onClick={onClose}
                  className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

    {showClaimModal && (
      <ClaimModal
        item={item}
        onClose={() => setShowClaimModal(false)}
      />
    )}
  </>  
    );
  }
  