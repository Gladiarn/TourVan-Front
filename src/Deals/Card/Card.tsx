import "./card.css";
import { CiShoppingTag,CiEdit,CiTrash } from "react-icons/ci";
import { IoMdCheckmark } from "react-icons/io";
import { GoPeople } from "react-icons/go";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import {Pagination, Navigation } from 'swiper/modules';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ setData, data, checked, deleteChecked }) => {

  const [cardClicked, setCardClicked] = useState(null);

  const navigate = useNavigate();

  const swiperConfig = {
    slidesPerView: 5,
    spaceBetween: 30,
    breakpoints: {
      200: {
        slidesPerView: 1,

      },
      768: {
        slidesPerView: 2, 

      },
      1024: {
        slidesPerView: 3,

      },
      1280: {
        slidesPerView: 4, 

      },
      1440: {
        slidesPerView: 5,

      },
    },
  };

  const handleCardDelete = async (id) =>{
    try {
      const res = await fetch(`http://localhost:5000/api/tours/available/${id}`, {
        method: "DELETE", 
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (res.ok) {
        alert('Record deleted successfully');
        
        setData((prevData) => prevData.filter(record => record._id !== id));
      } else {
        const result = await res.json();
        alert(result.error || 'Failed to delete record');
      }
    } catch (error) {
      console.error("Error deleting record: ", error);
    }
  }


  const handleCardClick = (record) =>{
   setCardClicked(record);
  }

  const handleCardEdit = (record,e) =>{
    e.stopPropagation();
    navigate('/formtour', { state: {tour:record}});
  }

  return (
    <>
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
      {data.map((record) => (

        
        <SwiperSlide className="card-container" key={record._id} onClick={()=>{handleCardClick(record)}}>
            {deleteChecked && cardClicked?._id === record._id && (
              
              <div className='emergency-container'>
                <h3>{record.name}</h3>
                <p>Are you sure you want to delete this tour? This action is irreversible. Once deleted, the tour will be permanently removed from the database.</p>
                <div className='button-choices'>
                  <div className='choice-btn'  onClick={()=>{handleCardDelete(record._id)}}>
                    <IoMdCheckmark className='yes'/>
                  </div>
                  
                </div>
              </div>

            )}

            {checked && cardClicked?._id === record._id && (
              
              <div className='emergency-container'>
                <h3>{record.name}</h3>
                <p>Once you choose to edit this tour, you will be redirected to a separate page where you can modify the entire record. All changes made will be saved permanently.</p>
                <div className='button-choices'>
                  <div className='choice-btn'  onClick={(e)=>{handleCardEdit(record,e)}}>
                    <IoMdCheckmark className='yes'/>
                  </div>
                  
                </div>
              </div>

            )}
                    

          <div className="card-image">
              {deleteChecked ? (
                <CiTrash className="sale-icon" />
              ) : checked ? (
                <CiEdit className="sale-icon" />
              ) : (
                <CiShoppingTag className="sale-icon" />
              )}
            
            <img src={record.pictureUrl} alt="" />
          </div>

          <div className="card-body">
            <div className="card-name">
              <h3>{record.name}</h3>
            </div>

            <div className="card-description">
              <p>{record.description}</p>
            </div>

            <div className="card-visit">
              <GoPeople />
              Visits:
              <p>{record.bookingCount}</p>
            </div>

            <div className="card-price">
              <h3 className="discounted">
                From:
                <p>₱ {record.price}</p>
              </h3>

              <h3 className="original">₱ {record.originalPrice}</h3>
            </div>
          </div>
        </SwiperSlide>
        
      ))}
      
      </Swiper>

    </>
  );
};

export default Card;
