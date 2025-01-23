import React, { useEffect, useState } from 'react';
import './VanCard.css';

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from 'swiper/modules';
import { IoMdCheckmark } from "react-icons/io";

import { HiOutlineStatusOnline } from "react-icons/hi";
import { PiVan, PiSeat } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';

const VanCard = ({ vans, handleVanClick, targetDate, checked, deleteChecked, selectedVan, setVans }) => {
  const navigate = useNavigate();

  const handleCardEdit = (van,e) =>{
    e.stopPropagation();
    navigate('/formvan', { state: {van:van}});
  }

  const handleDelete = async (vanId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/van/delete/${vanId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        alert('Van deleted successfully!');
        setVans(prevVans => prevVans.filter(van => van._id !== vanId));
      } else {
        alert('Error deleting van.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error deleting van.');
    }
  };



  const [reservedSeats, setReservedSeats] = useState({});

  const swiperConfig = {
    slidesPerView: 5,
    spaceBetween: 30,
    breakpoints: {
      200: {
        slidesPerView: 1,
      },
      300: {
        slidesPerView: 2,
      },
      500: {
        slidesPerView: 3,
      },
      800: {
        slidesPerView: 4,
      },
      1440: {
        slidesPerView: 5,
      },
    },
  };

  const calculateReservedSeats = (reservations, targetDate) => {
    if (!reservations || reservations.length === 0) return 0;

    const targetDateMidnight = new Date(targetDate);
    targetDateMidnight.setHours(0, 0, 0, 0);

    const reservationForDate = reservations.find(res => {
      const reservationDate = new Date(res.date);
      reservationDate.setHours(0, 0, 0, 0);
      return reservationDate.getTime() === targetDateMidnight.getTime();
    });

    if (!reservationForDate) return 0;
    
    return reservationForDate.seats.filter(seat => seat.isReserved).length;
  };

  useEffect(() => {
    const reservedSeatsObj = {};

    vans.forEach(van => {
      const reservedCount = calculateReservedSeats(van.reservations, targetDate);
      reservedSeatsObj[van._id] = reservedCount; // Store count for each van by its ID
    });

    setReservedSeats(reservedSeatsObj); 
  }, [vans, targetDate]);

  return (
    <div>
      <Swiper
        effect="coverflow"
        grabCursor={true}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2,
        }}
        {...swiperConfig}
        className="swiper"
        
      >
        {vans.map((van) => (
          <SwiperSlide
            className="vancard-container"
            key={van._id}
            onClick={() => { handleVanClick(van); }}
          >
            {deleteChecked && selectedVan?._id === van._id && (
                
                <div className='emergency-container'>
                  <div className='button-choices'>
                    <div className='choice-btn' onClick={()=>{handleDelete(van._id)}}>
                      <IoMdCheckmark className='yes'/>
                    </div>
                    
                  </div>
                </div>
  
              )}

            {checked && selectedVan?._id === van._id && (
                
                <div className='emergency-container'>
                  <div className='button-choices'>
                    <div className='choice-btn'  onClick={(e)=>{handleCardEdit(van,e)}}>
                      <IoMdCheckmark className='yes'/>
                    </div>
                    
                  </div>
                </div>
  
              )}

            <div className='vancard-header'>
              <div className='header-holder'>
                <PiVan className='vancard-icons' />
                <p>{van.name}</p>
              </div>

              <div className='seat-holder'>
                <PiSeat className='vancard-icons' />
                <p>
                  {reservedSeats[van._id] || 0} / {van.totalSeats}
                </p>
              </div>
            </div>

            <div className='vancard-body'>
              <HiOutlineStatusOnline className='vancard-icons' />
              <p>{reservedSeats[van._id] === van.totalSeats ?
                  'Unavailable'
                  :
                  'Available'  
                  }
            </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default VanCard;
