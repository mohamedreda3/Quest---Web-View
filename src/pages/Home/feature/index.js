import React from "react";
import "./style.css";
const Features = () => {
  return (
    <div
      className="rowDiv goalSection futureSection"
      style={{ display: "flex", justifyContent: "space-around", width: "100%" }}
    >
      <div className="leftBox" style={{ width: "45%" }}>
        <div className="textBox">
          <p className="secondFont " style={{ color: "#ff005c" }}>Why Choose Us?</p>
          {/* <p className="secondFont " style={{ color: "#ff005c" }}>Why Choose Us?</p> */}
          <h1 className="firstFont">
            Not Sure Why to Start with Dr. El Matary?
          </h1>{" "}
          <h4 className="thirdFont">
            {" "}
            Our unique value proposition includes quality, reliability,
            affordability, innovation, and exceptional student care services.
          </h4>
          <ul className="features thirdFont">
            <li>
              <img
                src={require("../../../assets/checkbox-checked-svgrepo-com.png")}
                alt=""
                width={20}
              />
              <span>Quality Content</span>
            </li>
            <li>
              <img
                src={require("../../../assets/checkbox-checked-svgrepo-com.png")}
                alt=""
                width={20}
              />
              <span>Practical Learning</span>
            </li>
            <li>
              <img
                src={require("../../../assets/checkbox-checked-svgrepo-com.png")}
                alt=""
                width={20}
              />
              <span>Personalized Support</span>
            </li>
            <li>
              <img
                src={require("../../../assets/checkbox-checked-svgrepo-com.png")}
                alt=""
                width={20}
              />
              <span>Continuous Improvement</span>
            </li>
            <li>
              <img
                src={require("../../../assets/checkbox-checked-svgrepo-com.png")}
                alt=""
                width={20}
              />
              <span>Value for Money</span>
            </li>
            <li>
              <img
                src={require("../../../assets/checkbox-checked-svgrepo-com.png")}
                alt=""
                width={20}
              />
              <span>Interactive Experience</span>
            </li>
          </ul>
        </div>
        <div className="actions" style={{ display:"flex", justifyContent: "flex-end" }}>
          <button style={{ display: "none" }}>Get Started Now!</button>
          <button
            className="svgWithText"
            onClick={() => (window.location.href = "/allcourses")}
          >
            <span>Explore All Courses </span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
      <img
        src={"https://brainspinemd.com/wp-content/uploads/2022/09/How-Long-Does-Brain-Surgery-Take.jpg"}
        alt=""
        width={"45%"}
        style={{ objectFit: "contain" }}
      />
    </div>
  );
};

export default Features;
