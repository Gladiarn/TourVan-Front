import './home.css';
import { CiSearch } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useState, useEffect } from 'react';
import { IoIosClose } from "react-icons/io";
import Van from '../Van/Van';

const Home = () => {

  const [vanPopup, setvanPopup] = useState(false);
  const [bookingData, setBookingData] = useState(null);

  const [bookPopup, setBookPopup] = useState(false);

  const BookingPopup = ()=>{
    setBookPopup(!bookPopup);
  }



  //disable dates past today
    const [today, setToday] = useState('');
  
    useEffect(() => {
      const todayDate = new Date();
      const year = todayDate.getFullYear();
      const month = (todayDate.getMonth() + 1).toString().padStart(2, '0');
      const day = todayDate.getDate().toString().padStart(2, '0');
      
      // Set the date in YYYY-MM-DD format
      setToday(`${year}-${month}-${day}`);
    }, []);


  //sending booking data
  const [dateValue, setdateValue] = useState('');


  async function toggleVan(e){

    setBookPopup(false);
    e.preventDefault();
    

    if (!placeValue || !dateValue || !passenger) {
      alert('All fields are required!');
      return;
    }

    if(Number(dateValue) <= 0){
      alert('Invalid amount of passengers');
      return;
    }

    const validDestination = destinationInformation.find(
      (destination) => typeof destination.name === "string" && destination.name.trim().toLowerCase() === placeValue.toLowerCase().trim()
    );

    if(!validDestination){
      alert("Please select a valid destination from the suggestions.");
      return;
    }

    console.log("Destination: "+ validDestination.name + " Latitude: " + validDestination.latitude);
    console.log("Destination: "+ validDestination.name + " Longitude: " + validDestination.longitude);

    const initialBookingData = {
      destination: placeValue,
      date: dateValue,
      passengers: passenger,
      latitude: validDestination.latitude,
      longitude: validDestination.longitude,
      price:validDestination.price,
      van: null,
      seats: [],
      status: 'active',
    };

    setBookingData(initialBookingData);
    console.log(bookingData);
    setvanPopup(!vanPopup);
  }






  //fetching the data names only
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [places, setPlaces] = useState([]);
  const [destinationInformation, setdestinationInformation] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  const [placeValue, setplaceValue] = useState('')

  const url = 'http://localhost:5000/api/tours/available';

  useEffect(()=>{
    async function FetchRecord(){
      try{
        const res = await (await fetch(url)).json();

        const name = res.map(record => record.name);
        setdestinationInformation(res);
        setPlaces(name);
      }
      catch(error){
        console.log(error);

      }

    }
    
    FetchRecord();
 
  }, []);

  const evaluateResults = (e)=>{
    const keyword = e.target.value.toLowerCase();
    setplaceValue(e.target.value);
    if(keyword.length){
      const keywordResults = places.filter((placeNames)=>{
        return placeNames.toLowerCase().includes(keyword);
      })
      setFilteredPlaces(keywordResults);
    }
    else{
      setFilteredPlaces([]);
    }
  }

  const dateChange = (e)  =>{
    setdateValue(e.target.value);
    console.log(dateValue);
  }

  const inputvalueFunction = (place) =>{
    setplaceValue(place);
    setSelectedDestination(place);
    setFilteredPlaces([]);
  }





  //the number of passenger function
  const [passenger, setPassenger] = useState(1);

  const passengerChange = (e) => {
    let value = e.target.value;

    if (!isNaN(value)){
      value = Math.max(0, Math.min(9, Number(value)));
      setPassenger(value);
    }
  }



  //for the carousel background image

  //storage of background image
  const carouselImage = [
    'https://images.unsplash.com/photo-1547122891-8aae3f2a03dc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1551496825-e8365e18e56a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
      }, 200); //sets the image in the span of .2s
    }, 10000); //changes image every 10s

    return () => clearInterval(interval);
  }, [carouselImage.length]);

  //for navigation of carouselImage
  const handlePrevClick = () => {
    setIsVisible(false); // Fade out
    setTimeout(() => {
      setCurrentImage((prevImage) => (prevImage - 1 + carouselImage.length) % carouselImage.length);
      setIsVisible(true); // Fade in
    }, 200);
  };

  // Function to handle next image
  const handleNextClick = () => {
    setIsVisible(false); // Fade out
    setTimeout(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % carouselImage.length);
      setIsVisible(true); // Fade in
    }, 200); 
  };



  return (
    <div className="home-container">
      {vanPopup && 
        <Van toggleVan={toggleVan} bookingData={bookingData}></Van>
      }

      <div
        className="background"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url(${carouselImage[currentImage]})`,
          opacity: isVisible ? 1 : 0.95,
          transition: 'opacity .1s ease-in-out'
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

        <div className='phone-booking' onClick={BookingPopup}>
          <CiSearch className='btn-icon'/>
          <p>Book with TourVan now</p>
        </div>

        {bookPopup && (
          <div className='popup-form'>
            <div className='book-date'>
              <p className='questions'>When?</p>
              <input type="date" className='when-phone' onChange={(e)=>{dateChange(e)}} min={today} />
            </div>
          
            <div className='book-input'>
              <p className='questions'>How many?</p>
              <input type="number" className='howmany-phone' placeholder='0' max={9} value={passenger || ''} onChange={passengerChange}/>
            </div>


            <div className='book-search'>
              <p className='questions'>Where?</p>
              <input type="text" className='where-phone' placeholder='Search for a Place' autoComplete='off' onChange={evaluateResults} value={placeValue}/>
            </div>

            <div className='phone-closer' onClick={BookingPopup}>
              <IoIosClose className='phone-icon'/>
            </div>

            <button className='popup-btn' onClick={(e)=>{toggleVan(e)}}>
            <CiSearch className='btn-icon'/>
          </button>
          
          {filteredPlaces.length > 0 &&
        
        <div className='result-box-phone'>
          <ul>
           {
            filteredPlaces.map((place,index)=>(

              <li key={index} onClick={()=>{inputvalueFunction(place)}} value={place}>{place}</li>
            ))
          
           }
          </ul>
        </div>
        }


            
          </div>
        )}

        <div className='booking-container'>
          <div className='book-search'>
            <p className='questions'>Where?</p>
            <input type="text" className='where' placeholder='Search for a Place' autoComplete='off' onChange={evaluateResults} value={placeValue}/>
          </div>
          <hr />
          <div className='book-date'>
            <p className='questions'>When?</p>
            <input type="date" className='when' onChange={(e)=>{dateChange(e)}} min={today} />
          </div>
          <hr />
          
          <div className='book-input'>
            <p className='questions'>How many?</p>
            <input type="number" className='howmany' placeholder='Passengers Count'min={0} max={9} value={passenger || ''} onChange={passengerChange}/>
          </div>

          {/* <RxCross2 className='clear-icon'/> */}
          <button className='book-btn' onClick={(e)=>{toggleVan(e)}}>
            <CiSearch className='btn-icon'/>
          </button>

        {filteredPlaces.length > 0 &&
        
        <div className='result-box'>
          <ul>
           {
            filteredPlaces.map((place,index)=>(

              <li key={index} onClick={()=>{inputvalueFunction(place)}} value={place}>{place}</li>
            ))
          
           }
          </ul>
        </div>
        
        }
          
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
