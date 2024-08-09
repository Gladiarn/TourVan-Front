import "./about.css";
import { useState } from "react";
import { SlPeople } from "react-icons/sl";
import { CiStar } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { HiOutlinePhone } from "react-icons/hi2";

const About = () => {
  // State to track the current active benefit
  const [activeBenefit, setActiveBenefit] = useState(0);

  const handlePaginationClick = (index) => {
    setActiveBenefit(index);
  };

  return (
    <div className="about-container">
      <h2>Why Choose TourVan?</h2>
      <div className="why-book">
        <div
          className="benefit"
          style={{ zIndex: activeBenefit === 0 ? 1 : 'auto' }}
        >
          <div className="why-icon">
            <SlPeople className="icon" />
          </div>
          <h3>Expert Local Guides</h3>
          <p>
            Our local guides have deep knowledge of Tacloban’s history and
            culture. They are passionate about sharing hidden gems and
            ensuring an authentic experience.
          </p>
        </div>
        <div
          className="benefit"
          style={{ zIndex: activeBenefit === 1 ? 1 : 'auto' }}
        >
          <div className="why-icon">
            <CiStar className="icon" />
          </div>
          <h3>Tailored Experiences</h3>
          <p>
            We offer tours tailored to your preferences, covering historical
            sites, nature, and local food, ensuring a personalized adventure.
          </p>
        </div>
        <div
          className="benefit"
          style={{ zIndex: activeBenefit === 2 ? 1 : 'auto' }}
        >
          <div className="why-icon">
            <IoLocationOutline className="icon" />
          </div>
          <h3>GPS Tracker for Safety</h3>
          <p>
            Our state-of-the-art GPS tracking system ensures you can monitor
            your location throughout the tour, providing safety and peace of
            mind.
          </p>
        </div>
        <div
          className="benefit"
          style={{ zIndex: activeBenefit === 3 ? 1 : 'auto' }}
        >
          <div className="why-icon">
            <HiOutlinePhone className="icon" />
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
        {[0, 1, 2, 3].map(index => (
          <button
            key={index}
            style={{
              backgroundColor: index === activeBenefit ? 'black' : 'rgb(192, 192, 192)'
            }}
            onClick={() => handlePaginationClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default About;
