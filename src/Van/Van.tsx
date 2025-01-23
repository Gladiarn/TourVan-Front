import React, { useEffect, useState } from 'react';
import './Van.css';
import { IoIosClose } from "react-icons/io";
import Cookies from 'js-cookie';
import VanCard from './VanCard/VanCard';
import { a } from 'framer-motion/client';
import { Link } from 'react-router-dom';

const Van = ({ toggleVan, bookingData }) => {

  
  const [isAdmin, setIsAdmin] = useState(false);
  const [deleteChecked, setDeleteChecked] = useState(false);
  const [editChecked, setEditChecked] = useState(false); 
  const checkHandler = (type) => {
    if (type === 'edit') {
      setEditChecked(!editChecked);
      if (!editChecked) setDeleteChecked(false); 
    } else if (type === 'delete') {
      setDeleteChecked(!deleteChecked);
      if (!deleteChecked) setEditChecked(false); 
    }
  };

  useEffect(() => {
    const userType = Cookies.get('userType');
    if (userType === 'admin') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, []);






  const [vans, setVans] = useState([]);
  const [selectedVan, setSelectedVan] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [receipt, setReceipt] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  const getEmailFromCookies = () => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith('email=')) {
        
        return decodeURIComponent(cookie.substring('email='.length, cookie.length));
      }
    }
    return null;
  };
  

  const bookingFee = 50;
  const totalPrice = Number(bookingData.passengers) * Number(bookingData.price);

  const handleBooking = async () =>{
    
    if(!selectedVan || selectedSeats.length === 0){
        alert('Please select a van and seats before confirming.');
        return;
    }

    const finalBookingData = {
        ...bookingData,
        bookingFee: bookingFee,
        van: selectedVan._id,
        seats: selectedSeats.map(seatId => ({ seatId: String(seatId), isReserved: true })),
    }

    if(selectedSeats.length !== finalBookingData.passengers){
      alert('Amount of Passengers and Seat reserved must match.');
      return
    }
    
    try {
        const bookingEndpoint = 'http://localhost:5000/api/book/booking';

        const res = await fetch(bookingEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(finalBookingData),
        });

        if(!res.ok){
            throw new Error('Failed to book. Please try again.');
        }

        const result = await res.json();
        
        alert('Booking confirmed successfully!');
        setReceipt(true)
        // window.location.reload()
        
    } catch (error) {
        console.error(error);
        alert('Error booking, Please try again later.');
    }

  }

  // Fetch available vans
  useEffect(() => {
    async function fetchVans() {
      try {
        const res = await fetch('http://localhost:5000/api/van/available');
        if (!res.ok) throw new Error("Failed to fetch vans");
        const data = await res.json();
        setVans(data);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchVans();

    const email = getEmailFromCookies();
    setUserEmail(email);
  }, []);




  const handleVanClick = (van) => {
    const bookingDate = bookingData.date;
    const reservationsForDate = van.reservations.find(
      (res) => new Date(res.date).toISOString().split('T')[0] === bookingDate
    );

    const seats = reservationsForDate ? reservationsForDate.seats : [];


    setSelectedVan({ ...van, seats });
    setSelectedSeats([]); 
  };

  const handleSeatSelection = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatId));
    } else {
        //remaining selected seat + current
      setSelectedSeats([...selectedSeats, seatId]);
    }

  };


  const getSeatAvailability = (seatId) => {
    if (!selectedVan || !selectedVan.seats) return false;
    
    return selectedVan.seats.some(
      (seat) => seat.seatId === String(seatId) && seat.isReserved
    );
  };



  const handlePrint = () => {
    window.print();
  };

  return (
    <div className='van-container'>
      <div className='van-main'>
        <div className='van-closer' onClick={toggleVan}>
          <IoIosClose className='closer-icon' />
        </div>
        <div className='van-header'>

          {isAdmin && (
            <div className='deals-btn-container'>
              <div className='check'>
                <input
                  type="checkbox"
                  id='delete-van'
                  checked={deleteChecked}
                  onChange={() => checkHandler('delete')}
                />
                <label htmlFor="delete-van">Delete</label>
              </div>
              <Link to="/formvan" className='add-btn'>Add</Link>
              <div className='check'>
                <input
                  type="checkbox"
                  id='edit-van'
                  checked={editChecked}
                  onChange={() => checkHandler('edit')}
                />
                <label htmlFor="edit-van">Edit</label>
              </div>
            </div>
          )}

          {vans.length > 0 && <VanCard setVans={setVans} vans={vans} handleVanClick={handleVanClick} targetDate={bookingData.date} selectedVan={selectedVan} checked={editChecked} deleteChecked={deleteChecked}/>}
        </div>

        {receipt && (
          <div className="receipt-container" id='receipt'>
            <div className="receipt-header">
              <h3>Booking Receipt</h3>
              <p>Hello, here's a summary of your booking information.</p>
            </div>

            <div className="receipt-body">
              <div className="receipt-section">
                <h4>Booking Details</h4>
                <p><strong>Email:</strong> {userEmail}</p>
                <p><strong>Destination:</strong> {bookingData.destination}</p>
                <p><strong>Date:</strong> {new Date(bookingData.date).toLocaleDateString()}</p>
                <p><strong>Number of Passengers:</strong> {bookingData.passengers}</p>
                <p><strong>Seats Reserved #:</strong> {selectedSeats.join(", ") || "None"}</p>
                <p><strong>Van:</strong> {selectedVan?.name || "Not Selected"}</p>
              </div>

              <div className="pricing-section">
                <h4>Pricing</h4>
                <p><strong>Price Per Passenger:</strong> ${bookingData.price}</p>
                <p><strong>Booking Fee:</strong> ${bookingFee}</p>
                <p><strong>Total Price:</strong> <span className="total-price">${totalPrice + bookingFee}</span></p>
              </div>

              <div className="receipt-footer">
                <p>Thank you for booking with us! Please arrive 15 minutes before your scheduled departure.</p>
                <p>
                  Need to make changes? Contact us at <a href="mailto:tourvantacloban@gmail.com">tourvantacloban@gmail.com</a>.
                </p>

                <button onClick={handlePrint} className="print-btn">
                  Print Receipt
                </button>
              </div>
            </div>
          </div>
        )}



        {selectedVan && (
          <div className='van-body'>
            <div className='upper-booking-area'>
            <div className='headertext-holder'>
                <h3 className='seat-header'>{selectedVan.name}</h3>
                
            </div>
            <p className='front'>Front</p>

            <div className='seat-container'>
              {/* i need to remember */}
              {/* Array.from takes 2 argu, 1 howmany times to loop, 2 what to execute after looping */}
              {/* second argu takes up to 3 argu first is the element, second index, third,reference to the array*/}
              {Array.from({ length: selectedVan?.totalSeats || 0 }, (_, index) => {
                const seatId = String(index + 1); 
                const isReserved = getSeatAvailability(seatId);
                const isSelected = selectedSeats.includes(seatId);
                
                return (
                  <div
                    key={seatId}
                    className={`seat ${isReserved ? 'reserved' : isSelected ? 'selected' : 'available'}`}
                    onClick={() => !isReserved && handleSeatSelection(seatId)}
                  >
                    {seatId}
                  </div>
                );
              })}

              
            </div>
            <p className='back'>Back</p>

            </div>
 
            
            <div className='foottext-holder'>
                <button
                className='confirm-booking'
                onClick={() => {handleBooking()}}
                disabled={selectedSeats.length === 0}
                >
                Confirm Booking
                </button>
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default Van;
