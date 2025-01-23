import React, { useEffect, useState } from 'react'

import { IoIosClose } from "react-icons/io";
import { CiLocationOn, CiCalendarDate, CiUser} from "react-icons/ci";
import { CiTrash } from "react-icons/ci";
import { AiOutlineClose } from "react-icons/ai";
import { IoMdCheckmark } from "react-icons/io";

import './PastCard.css'

const PastCard = ({tab}) => {
    const [inactiveBookings, setInactiveBookings] = useState([]);
    const [error, setError] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);



    const handleDelete = async () =>{
        try {
            if(selectedBooking){
                const bookingId = selectedBooking._id;
                if(!bookingId){
                    alert("Booking ID does not exist");
                    return
                }

                const url = `http://localhost:5000/api/bookings/delete/${bookingId}`;
                const res = await fetch(url,{
                    method: 'DELETE',
                    credentials: 'include',
                });

                if(!res.ok){
                    const data = await res.json();
                    alert(`Error: ${data.message} `);
                    return;
                }

                alert('Booking deleted successfully!');
                setInactiveBookings((prev) => prev.filter((booking) => booking._id !== bookingId));
                closeModal();
            }
        } catch (error) {
            console.log("Error deleting booking: ", error);
            alert('Failed to delete booking. Please try again later.');
        }
    }



    const closeModal = ()=>{
        setModalVisible(false);
    }

    const openModal = (booking) => {
        setSelectedBooking(booking);
        console.log(selectedBooking);
        setModalVisible(true);
      };
    

    useEffect(() => {
        async function fetchBooking() {
          const url = "http://localhost:5000/api/bookings/past";
          try {
            const res = await fetch(url, {
              method: 'GET',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
              },
            });
            const data = await res.json();
    
            if (res.ok && data?.bookings) {
              setInactiveBookings(data.bookings);
            } else {
              setError(data.message);
            }
          } catch (error) {
            setError('Failed to fetch active bookings');
            console.log(error);
          }
        }
        fetchBooking();

        
      }, []);


  return (
    <>
    {tab === 'past' && inactiveBookings.length > 0 ? (
        inactiveBookings.map((booking) => (
          <div className="row-container" key={booking._id}>
            <div className="bookingcard-container">
              <div className="upper-part">
                <CiLocationOn className="card-icons" />
                <p className="destination-p">{booking.destination}</p>
              </div>
              <div className="lower-part">
                <div className="date-container">
                  <CiCalendarDate className="card-icons" />
                  <p>{new Date(booking.date).toLocaleDateString()}</p>
                </div>
                <div className="passenger-container">
                  <CiUser className="card-icons" />
                  <p>{booking.passengers}</p>
                </div>
              </div>
            </div>

            <div
              className="button-container"
              onClick={()=>{openModal(booking)}}
            >

                <CiTrash className="mapbtn-icon"/>
            </div>
          </div>
        ))
      ) : (
        <div></div>
      )}

      {modalVisible && selectedBooking && (

        <div className='modal-container'>
            <div className='modal-content-past'>
                <div className='emergency-container'>
                    <h3>Are you sure?</h3>
                    <p>This action cannot be undone. Once deleted, the item will be permanently removed from your account. Please confirm to proceed.</p>
                    <div className='button-choices'>
                    <div className='choice-btn'  onClick={()=>{handleDelete()}}>
                        <IoMdCheckmark className='yes'/>
                    </div>
                    <div className='choice-btn' onClick={()=>{closeModal()}}>
                    <AiOutlineClose className='no'/>
                    </div>
                    </div>
                </div>
            </div>
        </div>

      )}
      </>
  )
}

export default PastCard