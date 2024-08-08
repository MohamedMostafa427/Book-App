"use client"
import React, { useState } from 'react'
import { Card } from './Card'

export const AddTap = () => {
    const [opentab, setopentab] = useState(false)
    const [guests, setGuests] = useState([]);
    const [ticketId, setTicketId] = useState(1);
    const [guestCount, setGuestCount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    function calculatePrice(age) {
        if (age <= 2) return 0;
        if (age > 2 && age < 18) return 100;
        if (age >= 18 && age < 60) return 500;
        return 300;
    }

    function addGuests() {
        const newGuestDetails = [...Array(guestCount).keys()].map(i => ({ name: '', age: 0 }));
        const totalCost = newGuestDetails.reduce((sum, guest) => sum + calculatePrice(guest.age), 0);

        setGuests([...guests, { id: ticketId, totalGuests: guestCount, guestDetails: newGuestDetails, totalCost }]);
        setTicketId(ticketId + 1);
        setTotalPrice(0);
        setGuestCount(0);
        setopentab(false);
    }

    function handleGuestDetailsChange(index, type, value) {
        const updatedGuests = [...guests];
        const guestDetails = updatedGuests[updatedGuests.length - 1].guestDetails;
        guestDetails[index] = { ...guestDetails[index], [type]: value };
        updatedGuests[updatedGuests.length - 1].guestDetails = guestDetails;

        const total = guestDetails.reduce((sum, guest) => sum + calculatePrice(guest.age), 0);
        setTotalPrice(total);
        updatedGuests[updatedGuests.length - 1].totalCost = total;
        setGuests(updatedGuests);
    }

    return (
        <div className='px-5 relative'>
            <button 
                onClick={() => setopentab(!opentab)} 
                className='uppercase absolute right-5 bg-teal-500 text-white p-3 rounded-xl shadow-lg hover:bg-teal-600 transition-colors duration-200'
            >
                New Booking
            </button>
            {opentab && (
                <div className='relative rounded-2xl mx-auto w-full bg-white p-10 shadow-xl border border-teal-300'>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        addGuests();
                    }}>
                        <div className='mb-4'>
                            <label className='block text-gray-700 font-semibold mb-2'>Number of Guests</label>
                            <input 
                                className='text-gray-700 rounded px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500' 
                                type='number' 
                                value={guestCount} 
                                onChange={(e) => setGuestCount(parseInt(e.target.value) || 0)} 
                                min={1} 
                            />
                        </div>
                        {[...Array(guestCount).keys()].map((i) => (
                            <div key={i} className='mb-4'>
                                <div className='mb-2'>
                                    <label className='block text-gray-700 font-semibold'>Name</label>
                                    <input 
                                        className='text-gray-700 rounded px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500' 
                                        type='text' 
                                        onChange={(e) => handleGuestDetailsChange(i, 'name', e.target.value)} 
                                    />
                                </div>
                                <div>
                                    <label className='block text-gray-700 font-semibold'>Age</label>
                                    <input 
                                        className='text-gray-700 rounded px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500' 
                                        type='number' 
                                        onChange={(e) => handleGuestDetailsChange(i, 'age', parseInt(e.target.value) || 0)} 
                                    />
                                </div>
                            </div>
                        ))}
                        <div className='text-gray-700 font-semibold mb-4'>Total Price: INR {totalPrice}</div>
                        <button className="px-4 py-2 bg-teal-500 text-white rounded shadow-lg hover:bg-teal-600 transition-colors duration-200" type='submit'>
                            Add Guests
                        </button>
                    </form>
                </div>
            )}
            {guests.map((guestInfo, index) => (
                <Card 
                    key={index} 
                    ticketId={guestInfo.id} 
                    totalGuests={guestInfo.totalGuests} 
                    guestDetails={guestInfo.guestDetails} 
                    totalCost={guestInfo.totalCost}
                />
            ))}
        </div>
    )
}
