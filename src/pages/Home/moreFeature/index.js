import React from "react";
import "./style.css";
import CryptoJS from "crypto-js";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { useNavigate } from "react-router";
const MoreFeatures = () => {
  const localData = localStorage.getItem("elmataryapp");
  const decryptedBytes = localData && CryptoJS.AES.decrypt(localData, "111");
  const userData =
    decryptedBytes && JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));

  const navigate = useNavigate();
  return (
    <>
      <div
        className="rowDiv goalSection MoreFeatures"
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        <div className="leftBox" style={{ width: "45%" }}>
          <div className="textBox">
            <p className="firstFont secondColor" style={{ color: "#ff005c", fontSize:"35px" }}>BECOME AN INSTRUCTOR</p>
            <h1 className="secondFont seconderyColor" style={{ fontSize:"34px" }}>
              Join Us and Share Your Knowledge!
            </h1>{" "}
            <img
              src="https://res.cloudinary.com/duovxefh6/image/upload/v1709455929/image-removebg-preview_3_c8ql8o.png"
              alt=""
              width={100}
              style={{ marginBottom: "15px" }}
            />
            <span className="thirdFont seconderyColor" style={{ fontSize:"24px" }}>
              {" "}
              We invite you to join our team as an instructor! Share your
              expertise, inspire learners, and make a meaningful impact in our
              community. Together, let’s shape the future of learning.
            </span>
          </div>
          <div className="actions">
            <button style={{ display: "none" }}>Get Started Now!</button>
            {/* <button
              className="svgWithText instrButton"
              style={{ margin: "20px 0" }}
            >
              <span>BECOME AN INSTRUCTOR</span>
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
            </button> */}
          </div>
        </div>
        <img
          src={
            require("../../../assets/Matary basic media_20250226_133433_0000.svg")
              ?.default
          }
          alt=""
          width={"300"}
          style={{ objectFit: "contain" }}
        />
      </div>
      {!userData && (
        <div className="sign-prompt-container d-flex justify-content-center align-items-center">
          <div className="p-4 text-center sign-prompt-card">
            <h2 className="mb-3 card-title secondFont" style={{ color: "#ff005c" }}>
              Welcome to Our Learning Platform
            </h2>
            <p className="mb-4 card-text firstFont seconderyColor">
              Join us to access a wide range of courses tailored to your needs.
            </p>
            <div className="gap-3 d-flex justify-content-center">
              <button
                onClick={() => navigate("/signup")}
                className="btn btn-primary btn-lg d-flex align-items-center"
              >
                <FaUserPlus className="me-2" />
                Register
              </button>
              <button
                onClick={() => navigate("/login")}
                className="btn btn-primary btn-lg d-flex align-items-center"
              >
                <FaSignInAlt className="me-2" />
                Login
              </button>
            </div>
          </div>
        </div>
      )}
      <section className="homeRow">
        {/* <div className="triangle1"></div>
        <div className="triangle2"></div> */}
        <div className="imgBox">
          <div className="img"></div>
          <img
            src={
              require("../../../assets/Matary basic media_20250226_133433_0000.svg")
                ?.default
            }
            alt="user"
          />
        </div>
        <h4 className="firstFont firstFontEffect"  style={{ letterSpacing:"1px" }}>
          Affordable Online Courses & Learning Opportunities For You
        </h4>
        <button
          className="thirdFont"
          onClick={() => (window.location.href = "/allcourses")}
        >
          <span>Explore All Courses</span>
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
      </section>
    </>
  );
};

export default MoreFeatures;
