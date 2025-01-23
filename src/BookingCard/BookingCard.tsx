import React, { useEffect, useState } from 'react';
import { IoIosClose } from "react-icons/io";
import { CiLocationOn, CiCalendarDate, CiUser, CiMap } from "react-icons/ci";
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import LeafletRouting from '../LeafletRouting/LeafletRouting';
import { MdEmergencyShare } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { IoMdCheckmark } from "react-icons/io";
import { AiOutlineFileDone } from "react-icons/ai";
import L from 'leaflet';
import './BookingCard.css';
import 'leaflet/dist/leaflet.css';
import { div } from 'framer-motion/client';

const BookingCard = ({ tab }) => {
  const [activeBookings, setActiveBookings] = useState([]);
  const [error, setError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [accuracy, setAccuracy] = useState(null);

  const [arrived, setArrived] = useState(false);
  const handleArrived = () =>{
    setArrived(!arrived);
  }

  const arrivedStatus = async () =>{
    try {
      if(!selectedBooking){
        return
      }
        const res = await fetch('http://localhost:5000/api/arrived/update-booking-status',{
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({bookingId: selectedBooking._id}),
        credentials: 'include',
      })

      const result = await res.json();
      if(res.ok){
        alert('Booking status updated succesfully!');
        window.location.reload()
      }
      else{
        alert(result.error || 'Failed to update booking status');

      }
    } catch (error) {
      console.error("Error updating booking status: ", error);
    }
  }


  const [emergency, setEmergency] = useState(false);


  const sendHelp = async ()=>{
    try {
      const res = await fetch('http://localhost:5000/api/emergency/help', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(userLocation),
      })
    } catch (error) {
      console.error('Error sending emergency: ', error)
    }
  }


  const handleEmergency = ()=>{
    setEmergency(!emergency);
  }

  useEffect(() => {
    async function fetchBooking() {
      const url = "http://localhost:5000/api/bookings/current";
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
          setActiveBookings(data.bookings);
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

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser!');
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const newLocation ={
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setUserLocation(newLocation);
        setAccuracy(position.coords.accuracy);
        console.log("the current user location was updated: ", newLocation);
      },
      (err) =>
        setError(
          'Unable to get your current Location. Please enable Location Services.'
        ),
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  const openModal = (booking) => {
    setSelectedBooking(booking);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedBooking(null);
    setModalVisible(false);
  };

  return (
    <>
      {tab === 'current' && activeBookings.length > 0 ? (
        activeBookings.map((booking) => (
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
              onClick={() => {
                openModal(booking);
              }}
            >
              <CiMap className="mapbtn-icon" />
            </div>
          </div>
        ))
      ) : (
        <div></div>
      )}

      {/* Modal */}
      {modalVisible && selectedBooking && (
        <div className="modal-container">
          <div className="modal-content">
            {/* same style as emergency */}
            <div className='arrived-btn' onClick={()=>{handleArrived()}}>
              <div>
                <AiOutlineFileDone className='emergency-icon'/>
              </div>
              <p>Arrived</p>
            </div>

            <div className='emergency-btn' onClick={()=>{handleEmergency()}}>
              <div>
                <MdEmergencyShare className='emergency-icon'/>
              </div>
              <p>Emergency</p>
            </div>

            {arrived && (
              
              <div className='emergency-container'>
                <h3>Have You Arrived at Your Destination?</h3>
                <p>Please confirm if you've reached your destination. Once confirmed, this booking will be marked as completed.</p>
                <div className='button-choices'>
                  <div className='choice-btn'  onClick={()=>{arrivedStatus()}}>
                    <IoMdCheckmark className='yes'/>
                  </div>
                  <div className='choice-btn' onClick={()=>{handleArrived()}}>
                  <AiOutlineClose className='no'/>
                  </div>
                </div>
              </div>

            )}

            {emergency && (
              
              <div className='emergency-container'>
                <h3>Emergency</h3>
                <p>Are you sure you want to send an emergency alert? This action will notify us via email that you are in danger.</p>
                <div className='button-choices'>
                  <div className='choice-btn'  onClick={()=>{sendHelp()}}>
                    <IoMdCheckmark className='yes'/>
                  </div>
                  <div className='choice-btn' onClick={()=>{handleEmergency()}}>
                  <AiOutlineClose className='no'/>
                  </div>
                </div>
              </div>

            )}





            <div className="close-modal" onClick={closeModal}>
              <IoIosClose />
            </div>
            <MapContainer
              key={selectedBooking._id}
              center={[selectedBooking.latitude, selectedBooking.longitude]}
              zoom={13}
              style={{ height: '500px', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                // attribution='&copy; OpenStreetMap contributors'
              />
              <LeafletRouting start={userLocation} end={selectedBooking} />

              {/* Destination Marker */}
              <Marker position={[selectedBooking.latitude, selectedBooking.longitude]} >
                <Popup>Destination</Popup>
              </Marker>

              {/* User Location */}
              {userLocation && (
                <>
                  <Marker position={[userLocation.latitude, userLocation.longitude]} >
                    <Popup>Your Location</Popup>
                  </Marker>
                  <Circle
                    center={[userLocation.latitude, userLocation.longitude]}
                    radius={accuracy}
                    pathOptions={{ color: 'blue', fillOpacity: 0.05 }}
                  />
                </>
              )}
            </MapContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default BookingCard;
