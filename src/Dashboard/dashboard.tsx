import React, { useState } from 'react'
import Navbar from '../navbar/navbar'
import Footer from '../Footer/Footer'
import BookingCard from '../BookingCard/BookingCard'
import './dashboard.css'
import DashboardNavbar from '../DashboardNavbar/dashboardnavbar';
import PastCard from '../PastCard/PastCard';

const Dashboard = () => {

    const [activeTab, setActiveTab] = useState('current');

    const handleTab = (currentTab)=>{
      setActiveTab(currentTab);
    }

  return ( 

    <>
        <Navbar/>
            <div className='dashboard-container'>
              <DashboardNavbar currentTab={activeTab} handleTab={handleTab}/>

              <div className='dashboard-body'>
                {activeTab === 'current' ?
                <div className='header-container'>
                  <h3 className='header-text'>Your Adventures Await – Keep Track of Your Current Bookings!</h3>
                  <p className='body-text'>Keep an eye on your bookings and get ready to explore!</p>
                </div>
                :
                <div className='header-container'>
                  <h3 className='header-text'>Memories in the Making – Your Past Adventures</h3>
                  <p className='body-text'>Look back on the places you’ve visited and the memories you’ve created!</p>
                </div>
              
              }
                <div className='main-container'>
                  {activeTab === 'current' ?
                    <BookingCard tab={activeTab}/>
                    :
                    <PastCard tab={activeTab}/>
                }
                               
                </div>
                
                {/* <p className='booking-quote'>Your adventure is just around the corner – keep track of your upcoming bookings and get ready to explore!</p> */}
              </div>
        
            </div>
        <Footer/>
    </>
  )
}

export default Dashboard