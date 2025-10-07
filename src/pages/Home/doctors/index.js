import React from "react";
import { AiOutlineShareAlt } from "react-icons/ai";
import "./style.css";
const Doctors = () => {
  return (
    <section>
      <h3 className="secondary-heading firstFont " style={{ color: "#ff005c", fontSize:"30px" }}>
        OUR INSTRUCTORS
      </h3>
      <h1 className="primary-heading secondFont seconderyColor">
        From Dr Elmatary Establishment
      </h1>
      {/* <img
        src={require("./images/image-removebg-preview_3_c8ql8o.png")}
        className="img"
      /> */}
      <p className="paragraph firstFont seconderyColor">
        Good instructors possess expertise in their subject, communicate
        effectively, and inspire students through their passion and
        adaptability, fostering an engaging and supportive learning environment
        that encourages growth and success.
      </p>
      {/* <div className="images">
        <div className="image-box">
          <img
            src={require("./images/doctor-1-removebg-preview.png")}
            alt="Doctor 1"
          />
          <div className="text-box">
            <div>
              <h3>Dr Ahmed Ali</h3>
              <p>Prof. General Surgery</p>
            </div>
          </div>
          <div className="iconBox">
            <AiOutlineShareAlt className="icon" />
          </div>
        </div>

        <div className="image-box">
          <img
            src={require("./images/doctor-2-removebg-preview.png")}
            alt="Doctor 2"
          />
          <div className="text-box">
            <div>
              <h3>Dr Ahmed Ali</h3>
              <p>Prof. General Surgery</p>
            </div>
          </div>
          <div className="iconBox">
            <AiOutlineShareAlt className="icon" />
          </div>
        </div>

        <div className="image-box">
          <img
            src={require("./images/doctor-3-removebg-preview.png")}
            alt="Doctor 3"
          />
          <div className="text-box">
            <div>
              <h3>Dr Ahmed Ali</h3>
              <p>Prof. General Surgery</p>
            </div>
          </div>
          <div className="iconBox">
            <AiOutlineShareAlt className="icon" />
          </div>
        </div>

        <div className="image-box">
          <img
            src={require("./images/doctor-4-removebg-preview.png")}
            alt="Doctor 4"
          />
          <div className="text-box">
            <div>
              <h3>Dr Ahmed Ali</h3>
              <p>Prof. General Surgery</p>
            </div>
          </div>
          <div className="iconBox">
            <AiOutlineShareAlt className="icon" />
          </div>
        </div>
      </div> */}
    </section>
  );
};

export default Doctors;
