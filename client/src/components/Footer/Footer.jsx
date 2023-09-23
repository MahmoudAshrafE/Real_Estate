import React from "react";
import "./Footer.css";
import { Link, NavLink } from "react-router-dom";
import { PATHS } from "../../pages/Router/paths";
const Footer = () => {
  return (
    <div className="f-wrapper">
      <div className="paddings innerWidth flexCenter f-container">
        {/* left side */}
        <div className="flexColStart f-left">
          <img src="./logo2.png" alt="" width={120} />
          <span className="secondaryText">
            Our vision is to make all people <br />
            the best place to live for them.
          </span>
        </div>

        <div className="flexColStart f-right">
          <span className="primaryText">Information</span>
          <span className="secondaryText">145 New York, FL 5467, USA</span>
          <div className="flexCenter f-menu">
            <Link to={PATHS.HOME}>Home</Link>
            <Link to={PATHS.PROPERTIES.ROOT}>Properties</Link>
            <Link to={PATHS.CONTACT}>Contact</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
