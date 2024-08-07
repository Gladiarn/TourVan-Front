import "./about.css";
import { SlPeople } from "react-icons/sl";
import { CiStar } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5"; // Importing a GPS icon
import { HiOutlinePhone } from "react-icons/hi2";

const About = () => {
  return (
    <>
      <div className="about-container">
        <h2>Why Choose TourVan?</h2>
        <div className="why-book">
          <div className="benefit">
            <div className="why-icon">
                <SlPeople className="icon"/>
            </div>
            <h3>Expert Local Guides</h3>
            <p>
              Our local guides have deep knowledge of Tacloban’s history and
              culture. They are passionate about sharing hidden gems and
              ensuring an authentic experience.
            </p>
          </div>
          <div className="benefit">
            <div className="why-icon">
                <CiStar className="icon"/>
            </div>
            <h3>Tailored Experiences</h3>
            <p>
              We offer tours tailored to your preferences, covering historical
              sites, nature, and local food, ensuring a personalized adventure.
            </p>
          </div>
          <div className="benefit">
            <div className="why-icon" >
                <IoLocationOutline className="icon"/>
            </div>
            <h3>GPS Tracker for Safety</h3>
            <p>
              Our state-of-the-art GPS tracking system ensures you can monitor your location throughout the tour, providing safety and peace of mind.
            </p>
          </div>
          <div className="benefit">
            <div className="why-icon">
                <HiOutlinePhone className="icon"/>
            </div>
            <h3>Exceptional Customer Support</h3>
            <p>
              Our 24/7 support team is ready to assist with any questions or
              concerns, ensuring a smooth and enjoyable experience from start to
              finish.
            </p>
          </div>
        </div>
        <div className="why-pagination">
            <button></button>
            <button></button>
            <button></button>
            <button></button>
        </div>
      </div>
    </>
  );
};

export default About;
