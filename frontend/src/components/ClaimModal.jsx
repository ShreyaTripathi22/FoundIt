import { useState } from 'react';
import { X } from 'lucide-react';

export default function ClaimModal({ item, onClose }) {
  const [claimerEmail, setClaimerEmail] = useState("");
  const [claimerName, setClaimerName] = useState("");
  const [messageSent, setMessageSent] = useState(false);

  const handleClaim = async () => {
    console.log("Item:", item); 
    try {
      const response = await fetch("http://localhost:3000/api/email/send-claim-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          finderEmail: item.Email,
          itemName: item.Name,
          claimerName,
          claimerEmail
        })
      });

      if (response.ok) {
        setMessageSent(true);
      } else {
        alert("Failed to send email.");
      }
    } catch (err) {
      console.error("Error sending claim email:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="bg-zinc-900 text-white rounded-xl w-full max-w-4xl shadow-lg relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-red-400">
          <X size={24} />
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="md:w-1/2 bg-zinc-800">
            <img
              src={`http://localhost:3000/uploads/${item.Image}`}
              alt={item.Name}
              className="object-cover w-full h-full rounded-l-xl"
            />
          </div>

          {/* Content Section */}
          <div className="md:w-1/2 p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold mb-2">{item.Name}</h2>
              <p className="text-sm text-gray-300 mb-4">{item.Description}</p>
              <p className="text-sm text-gray-400 mb-2"><strong>Location:</strong> {item.Location}</p>
              <p className="text-sm text-gray-400 mb-6"><strong>Date:</strong> {new Date(item.Date).toLocaleDateString()}</p>

              {!messageSent ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={claimerName}
                    onChange={(e) => setClaimerName(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-zinc-800 border border-zinc-600 text-white"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={claimerEmail}
                    onChange={(e) => setClaimerEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-zinc-800 border border-zinc-600 text-white"
                  />
                  <button
                    onClick={handleClaim}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                  >
                    Send Claim Request
                  </button>
                </div>
              ) : (
                <p className="text-green-400 mt-4">
                  An email is sent to <strong>{item.Email}</strong>. If you don’t get a response, try mailing again on <strong>{item.Email}</strong>.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
