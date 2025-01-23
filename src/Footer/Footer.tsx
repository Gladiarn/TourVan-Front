import "./footer.css";

import { SiGmail } from "react-icons/si";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";
import { FaTiktok } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

import { BsFillTelephoneFill } from "react-icons/bs";
import { FaMobileAlt } from "react-icons/fa";
const Footer = () => {
  return (
    <>
      <div className="footer-container">
        <div className="socials">
          <FaFacebookF className="socials-icon" />
          <SiGmail className="socials-icon" />
          <FaXTwitter className="socials-icon" />
          <IoLogoInstagram className="socials-icon" />
          <FaTiktok className="socials-icon" />
          <FaYoutube className="socials-icon" />
        </div>

        <div className="numbers">
          <h2>or contact us at</h2>

          <div className="contacts">
            <div className="telephone">
              <BsFillTelephoneFill />
              <p>XXX-XXX-XXX</p>
            </div>

            <div className="mobile">
              <FaMobileAlt />
              <p>09193128761</p>
            </div>
          </div>
        </div>

        <div className="copyrights">

          <div className="copyrights-head">
          <p>
            &copy; {new Date().getFullYear()} TourVan Travel. All Rights
            Reserved.
          </p>
          <p>Established 2024 | Tacloban City, Philippines</p>
          <p className="footer-links">
            <a href="/terms"><i> Terms of Service </i></a> 
            <a href="/privacy"><i> Privacy Policy </i></a> 
          </p>
          
          </div>
            <p>Crafted with 💕 by TourVan Team</p>
            <p>Inspired by Viator</p>
          
        </div>
      </div>
    </>
  );
};

export default Footer;
