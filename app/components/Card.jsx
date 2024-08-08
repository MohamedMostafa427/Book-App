import React, { useState } from 'react'

export const Card = ({ ticketId, totalGuests, guestDetails, totalCost }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-white p-5 m-3 rounded-xl shadow-lg border border-teal-300 hover:shadow-2xl transition-shadow duration-300">
      <h2 className="text-xl font-bold text-gray-800">Ticket ID: {ticketId}</h2>
      <p className="text-gray-600">Total Guests: {totalGuests}</p>
      <p className="text-gray-600 font-semibold">Total Cost: INR {totalCost}</p>
      <button 
        onClick={() => setShowDetails(!showDetails)} 
        className="bg-teal-500 text-white p-2 rounded mt-3 hover:bg-teal-600 transition-colors duration-200"
      >
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>
      {showDetails && (
        <div className="mt-4">
          {guestDetails.map((guest, index) => (
            <div key={index} className="mt-2 p-2 rounded bg-gray-100">
              <p className="text-gray-700"><span className="font-semibold">Name:</span> {guest.name}</p>
              <p className="text-gray-700"><span className="font-semibold">Age:</span> {guest.age}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
