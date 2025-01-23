import React, { useState } from 'react'

import { IoCheckmarkDone } from "react-icons/io5";
import { TbCurrentLocation } from "react-icons/tb";
import './dashboardnavbar.css'

const Dashboardnavbar = ({currentTab, handleTab}) => {

  const handleClick = (e, tab)=>{
    e.preventDefault();
    handleTab(tab)
  }



  return (
    <div className='dashboardnavbar-container'>
        <ul className='nav-ul'>
            <li className={`list ${currentTab === 'current' ? 'active' : ''}`} onClick={(e)=>{handleClick(e, 'current')}}>
              <a href="#" className='list-anchor'>
                <TbCurrentLocation className='dashboardIcons'/>
                <p className='nav-text'>Current Bookings</p>
              </a>
            </li>

            <li  className={`list ${currentTab === 'past' ? 'active' : ''}`} onClick={(e)=>{handleClick(e, 'past')}}>
              <a href="#" className='list-anchor'>
                <IoCheckmarkDone className='dashboardIcons'/>
                <p className='nav-text' >Past Bookings</p>
              </a>
                
            </li>
        </ul>
    </div>
  )
}

export default Dashboardnavbar