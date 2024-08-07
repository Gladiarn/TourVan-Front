import './home.css'
import { CiSearch } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";

import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
const home = () => {
  return (
    <>
      <div className="home-container">
          <div className="background">

              <FaAngleLeft className='left-arrow'/>
              <FaAngleRight className='right-arrow'/>
              
              <div className='home-title'>
                  <p className='header'>Discover Tacloban with <b style={{ color: "#26474E" , textShadow: '2px 2px 2px white' }}>T</b>our<b style={{ color: "#26474E",  textShadow: '2px 2px 2px white'  }}>V</b>an</p>
                  <p className='body'>Create Cherished Memories and Adventures with Us</p>
              </div>

              <div className='phone-booking'>
                <CiSearch className='btn-icon'/>
                <p>Book with TourVan now</p>
              </div>

              <div className='booking-container'>
                  <div className='book-search'>
                      <p className='questions'>Where?</p>
                      <input type="text" className='where' placeholder='Search for a Place'/>
                  </div>
                <hr />
                  <div className='book-date'>
                  <p className='questions'>When?</p>
                    <input type="date" className='when'/>
                  </div>
                  <hr />
                  <div className='book-input'>
                    <p className='questions'>How many?</p>
                    <input type="number" className='howmany' placeholder='Passengers Count' min={1} max={8}/>
                      
                  </div>

                    <RxCross2 className='clear-icon'/>
                    <button className='book-btn'>
                    <CiSearch className='btn-icon'/>
                    </button>
              </div>

              <div className='pagination'>
                    <button></button>
                    <button></button>
                    <button></button>
              </div>
          </div>
      </div>
    </>
  )
}

export default home