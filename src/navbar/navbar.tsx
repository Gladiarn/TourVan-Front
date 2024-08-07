import { useState } from "react";
import "./navbar.css";
import { RiMenu4Line } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";
import { FaShuttleVan } from "react-icons/fa";
import { IoInformationCircleOutline } from "react-icons/io5";
import { RiContactsBook3Line } from "react-icons/ri";
import { LuCircleDollarSign } from "react-icons/lu";
import { CiBookmark } from "react-icons/ci";

const Navbar = () => {
  const [isClosed, setisClosed] = useState<boolean>(true);

  const toggleSidebar = () => {
    setisClosed(!isClosed);
    console.log(isClosed);
  };

  return (
    <>
      <div className="navbar-container">
          <RiMenu4Line className="menu-icon" onClick={toggleSidebar}/>
          <div className="Title">
            <FaShuttleVan className="title-icon" />
            <p>
              <b style={{ color: "#26474E" }}>T</b>our
              <b style={{ color: "#26474E" }}>V</b>an
            </p>
        </div>

        <div className="login-container">
          <a href="" className="login">
            Log in
          </a>
          <a href="" className="register">
            Register
          </a>
        </div>
      </div>
        <div className="menu-container">

            <div className="menu">
                
                <a href=""> <LuCircleDollarSign className="icons"/> Deals</a>
                <a href=""> <RiContactsBook3Line className="icons"/> Support</a>
                <a href=""> <IoInformationCircleOutline className="icons"/> About Us</a>
                <a href=""> <CiBookmark className="icons"/> My Bookings</a>
            </div>
        </div>
      

      {!isClosed && (
        <div className="sidebar">
          <div className="side-title">
            <RxCross1 className="sidebar-icon" onClick={toggleSidebar} />
          </div>

          <div className="side-menu">
            <a href="">Deals</a>
            <a href="">Support</a>
            <a href="">About Us</a>
            <a href="">Dashboard</a>
            <a href="">Bookings</a>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
