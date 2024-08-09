import './home.css';
import { CiSearch } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useState, useEffect } from 'react';

const Home = () => {

  //for the carousel background image

  //storage of background image
  const carouselImage = [
    'https://images.unsplash.com/photo-1547122891-8aae3f2a03dc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1681338144515-5a463252a0ec?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1722648404131-a69c35a706fa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  ];

  //states to monitor currentImage array and if visible or not
  const [currentImage, setCurrentImage] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false); // Fade out
      setTimeout(() => {
        setCurrentImage((prevImage) => (prevImage + 1) % carouselImage.length);
        setIsVisible(true); // Fade in
      }, 900); //sets the image in the span of 1s
    }, 10000); //changes image every 10s

    return () => clearInterval(interval);
  }, [carouselImage.length]);

  //for navigation of carouselImage
  const handlePrevClick = () => {
    setIsVisible(false); // Fade out
    setTimeout(() => {
      setCurrentImage((prevImage) => (prevImage - 1 + carouselImage.length) % carouselImage.length);
      setIsVisible(true); // Fade in
    }, 900);
  };

  // Function to handle next image
  const handleNextClick = () => {
    setIsVisible(false); // Fade out
    setTimeout(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % carouselImage.length);
      setIsVisible(true); // Fade in
    }, 900); 
  };













  return (
    <div className="home-container">
      <div
        className="background"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url(${carouselImage[currentImage]})`,
          opacity: isVisible ? 1 : 0.15,
          transition: 'opacity 1s ease-in-out'
        }}
      >
        <FaAngleLeft className='left-arrow' onClick={handlePrevClick}/>
        <FaAngleRight className='right-arrow' onClick={handleNextClick}/>
        
        <div className='home-title'>
          <p className='header'>
            Discover Tacloban with <b style={{ color: "#26474E", textShadow: '2px 2px 2px white' }}>T</b>our
            <b style={{ color: "#26474E", textShadow: '2px 2px 2px white' }}>V</b>an
          </p>
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
          {
            carouselImage.map((_,index)=>(

              <button key={index} className={`pagination-button ${index === currentImage ? 'active-button' : ''}`}>

              </button>

            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Home;
