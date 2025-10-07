import React from "react";
import "./style.css";
const Goal = () => {
  return (
    <div
      className="rowDiv goalSection"
      style={{ display: "flex", justifyContent: "space-around", width: "100%" }}
    >
      <img
        src={require("../../../assets/Clinical_20250217_123137_0000.png")}
        alt=""
        width={"45%"}
        style={{ objectFit: "contain" }}
      />
      <div className="leftBox" style={{ width: "45%" }}>
        <div className="textBox">
          <p className="secondFont " style={{ color: "#ff005c" }}>What's Our Main Goal?</p>
          <h4 className="firstFont mainColor">
            {" "}
            Take the Next Step Towards Your Personal and Professional Goals with
            the Dr. El Matary Establishment.
          </h4>
          <p className="thirdFont seconderyColor">
            Take the next step toward acheving your personal and professional
            aspirations with us. In a world that demands growth and
            adaptability. Our establishment is your trusted Partner on the
            journey to success.
          </p>
        </div>

        <div className="iconsTextBox columnDiv">
          <div className="iconWithText">
            <img
              src={require("../../../assets/Learn from experts.svg")?.default}
              width={150}
              alt=""
            />
            <div className="text">
              <h3 className="secondFont" style={{ color: "#ff005c" }}>
                Learn From Experts
              </h3>
              <p className="firstFont">
                A team of specialized doctors dedicated to helping you
                understand your curriculum and achieve your goals.
              </p>
            </div>
          </div>
          <div className="iconWithText">
            <img
              src={require("../../../assets/Video tutorials.svg")?.default}
              width={150}
              alt=""
            />
            <div className="text">
              <h3 className="secondFont" style={{ color: "#ff005c" }}>
                Video Tutorial
              </h3>
              <p className="firstFont">
                Comprehensive explanations of curriculum topics by professors
                who are experts in their fields.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Goal;
