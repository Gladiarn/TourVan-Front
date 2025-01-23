import { useEffect, useState } from "react";
import "./navbar.css";
import { RiMenu4Line } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";
import { FaShuttleVan } from "react-icons/fa";
import { IoInformationCircleOutline } from "react-icons/io5";
import { RiContactsBook3Line } from "react-icons/ri";
import { LuCircleDollarSign } from "react-icons/lu";
import { CiBookmark, CiHome } from "react-icons/ci";
import { FaUser } from "react-icons/fa";

import { Link,  useLocation } from 'react-router-dom';

import UserModal from "../UserModal/UserModal";

import Cookies from 'js-cookie';

const Navbar = ({HomeRef, AboutRef, DealsRef, FooterRef}) => {

  const [username, setUsername] = useState('Guest');

  const [isClosed, setisClosed] = useState<boolean>(true);

  const toggleSidebar = () => {
    setisClosed(!isClosed);
  };


  const [modalOpen, setmodalOpen] = useState<boolean>(false);

  const toggleUser = () => {
    setmodalOpen(!modalOpen);
  }


//sets the variable username into the Cookie session's name
  useEffect(()=>{
    const name = Cookies.get('name');
    if(name){
      console.log(username);
      setUsername(name);
    }
  },[])
  

  function ScrollSmoothly(ref,e){

    e.preventDefault();
    
    //get offset of the reference
    const offset = ref.current.offsetTop;

    //get element height
    const elementHeight = ref.current.offsetHeight;
    
    //get current viewheight
    const viewHeight = window.innerHeight;

    let Target;
    //calculate sum of viewheight and elementheight then subtract it into the offstep to center
    Target = offset - (viewHeight/2) + (elementHeight/2);

    //scroll into the target smoothly
    window.scrollTo({
    top: Target,
    behavior: "smooth",  
    })

  }

  const location = useLocation();



  return (
    <div className="nav-container">
      <div className="navbar-container">
          <RiMenu4Line className="menu-icon" onClick={toggleSidebar}/>
          <div className="Title">
            <FaShuttleVan className="title-icon" />
            <p>
              <b style={{ color: "#26474E" }}>T</b>our
              <b style={{ color: "#26474E" }}>V</b>an
            </p>
          </div>

        <div className="user-container">
          <button className="user" onClick={toggleUser}>
            <FaUser className="user-icon"/>
            <p>{username ?? 'Guest'}</p>
          </button>

          {modalOpen && <UserModal />}
        </div>
      </div>
        <div className="menu-container">

            <div className="menu">
                {location.pathname === '/' ? (
                  <>
                    <a href="/" onClick={(e)=>{ScrollSmoothly(DealsRef, e)}}> <LuCircleDollarSign className="icons"/> Deals</a>
                    <a href="/" onClick={(e)=>{ScrollSmoothly(FooterRef, e)}}> <RiContactsBook3Line className="icons"/> Support</a>
                    <a href="/" onClick={(e)=>{ScrollSmoothly(AboutRef, e)}}> <IoInformationCircleOutline className="icons"/> About Us</a>
    
                    <Link to="/dashboard"> <CiBookmark className="icons"/> My Bookings</Link>
                  </>
                ) :
                (
                  <>
                  <Link to="/"> <CiHome className="icons"/>Home</Link>
                  <Link to="/dashboard"> <CiBookmark className="icons"/> My Bookings</Link>
                </>
                )}
                
            </div>
        </div>
      

      {!isClosed && (
        <div className="sidebar">
          <div className="side-title">
            <RxCross1 className="sidebar-icon" onClick={toggleSidebar} />
          </div>

          <div className="side-menu">
          {location.pathname === '/' ? (
                  <>
                    <a href="/" onClick={(e)=>{ScrollSmoothly(DealsRef, e)}}> <LuCircleDollarSign className="icons"/> Deals</a>
                    <a href="/" onClick={(e)=>{ScrollSmoothly(FooterRef, e)}}> <RiContactsBook3Line className="icons"/> Support</a>
                    <a href="/" onClick={(e)=>{ScrollSmoothly(AboutRef, e)}}> <IoInformationCircleOutline className="icons"/> About Us</a>
    
                    <Link to="/dashboard"> <CiBookmark className="icons"/> My Bookings</Link>
                  </>
                ) :
                (
                  <>
                  <Link to="/"> <CiHome className="icons"/>Home</Link>
                  <Link to="/dashboard"> <CiBookmark className="icons"/> My Bookings</Link>
                </>
                )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
