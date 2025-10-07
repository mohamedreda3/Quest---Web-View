import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";
import { locationIcon } from "./svg";

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container">
        <center
          className="firstFont firstFontEffect"
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: "23px",
            padding: "5px 10px",
            width: "fit-content",
            margin: "auto",
            borderBottom: "2.2px solid var(--main-color)",
            letterSpacing: "3px"
          }}
        >
          This Site is Owned by Dr. El Matary LLC
        </center>
        <div className="footer-content pt-5 pb-5">
          <div className="row">
            <div className="col-xl-4 col-lg-4 mb-50">
              <div className="footer-widget">
                <div className="footer-text">
                  <img
                    className="footerImage"
                    width={190}
                    src={"https://res.cloudinary.com/duovxefh6/image/upload/v1739712843/Dr_matary_main_logo_ywd5h0.svg"}
                    alt=""
                  />
                  <p className="thirdFont">
                    Stay updated with the latest insights, updates, and
                    exclusive content delivered straight to your inbox. Sign up
                    now and never miss out!
                  </p>
                </div>
                {/* <p style={{ color: "white", display: "flex", gap: "8px" }}>
                  {locationIcon}{" "}
                  <span>2201 MENAUL BLVD NE, STE A, ALBUQUERQUE, NM 87107</span>
                </p> */}
                {/* <p style={{ color: "white" }}>01008906010</p> */}
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
              <div className="footer-widget">
                <div className="footer-widget-heading">
                  {/* <h3>Useful Links</h3> */}
                </div>
                <ul className="thirdFont">
                  {/* <li>
                    <Link to={"/"}>Resources</Link>
                  </li> */}

                  <li>
                    <Link to="/About">About</Link>
                  </li>

                  {/* <li>
                    <Link to="/allcourses">FAQ</Link>
                  </li> */}
                  <li>
                    <Link to="/allcourses">Courses</Link>
                  </li>
                  <li>
                    <Link to="/techsup">Help center</Link>
                  </li>
                </ul>
                <ul>
                  {/* <li>
                    <Link to="/allcourses">Surgery</Link>
                  </li>

                  <li>
                    <Link to="/allcourses">Anatomy</Link>
                  </li>

                  <li>
                    <Link to="/allcourses">Operative</Link>
                  </li> */}
                </ul>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 mb-50">
              <div className="footer-widget">
                <div className="footer-widget-heading firstFont">
                  <h3
                    className="firstFont firstFontEffect"
                    style={{ letterSpacing: "3px", marginBottom:"18px" }}
                  >
                    Join Our Newsletter
                  </h3>
                </div>
                <div className="thirdFont footer-text mb-25">
                  <p>
                    <p>
                      {" "}
                      Get the latest updates, insights, and exclusive content
                      delivered straight to your inbox. Join now and never miss
                      out!
                    </p>
                    <p>We Only Send Interesting And Relevant Emails.</p>
                  </p>
                  {/* <form class="center" >
                    <button type="button">Subscribe</button>
                    <input placeholder="Enter Your Email Adress"></input>
                  </form> */}
                </div>
                <div className="subscribe-form">
                  <form action="#">
                    <button>
                      <img src={require("../../assets/paper.jpeg")} alt="" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright-area">
        <div className="container">
          <center className="text-center text-lg-left">
            <div className="copyright-text thirdFont thirdColor">
              <p>&copy; 2024 Dr Elmatary LLC. All Rights Reserved</p>
            </div>
          </center>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
