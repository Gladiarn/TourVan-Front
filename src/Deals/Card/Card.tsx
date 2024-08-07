import "./card.css";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { GoPeople } from "react-icons/go";

import { Swiper, SwiperSlide } from "swiper/react";
import { CiShoppingTag } from "react-icons/ci";
import {Pagination, Navigation } from 'swiper/modules';

const Card = ({ data }) => {

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

        
        <SwiperSlide className="card-container" key={record.id}>
          <div className="card-image">
            <CiShoppingTag className="sale-icon" />
            <img src={record.Url} alt="" />
          </div>

          <div className="card-body">
            <div className="card-name">
              <h3>{record.Name}</h3>
            </div>

            <div className="card-description">
              <p>{record.Description}</p>
            </div>

            <div className="card-visit">
              <GoPeople />
              Visits:
              <p>{record.BookingCount}</p>
            </div>

            <div className="card-price">
              <h3 className="discounted">
                From:
                <h3>₱ {record.DiscountedPrice}</h3>
              </h3>

              <h3 className="original">₱ {record.OriginalPrice}</h3>
            </div>
          </div>
        </SwiperSlide>
        
      ))}
      </Swiper>
    </>
  );
};

export default Card;
