import React from 'react';
import './banner.css';
const Banner = ({ title, description }) => {
  return (
    <div className="course_banner">
      <div className="banner2">
        <div className="left">
          {/* <h5>Welcome To You My Doctor</h5> */}
          <h4>In {title}</h4>
          <p style={{ color: "white" }}>{description}</p>
          <h6>I Hope You Get A Good information</h6>
        </div>
        <div className="right">
          <img src={require("../../../assets/books.png")} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
