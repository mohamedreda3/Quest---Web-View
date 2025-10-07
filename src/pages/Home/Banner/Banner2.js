import React, { useEffect } from "react";
import { Slide } from "react-awesome-reveal";
import "./banner2.css";
import CryptoJS from "crypto-js";
import bcrypt from "bcryptjs";

import secureLocalStorage from "react-secure-storage";
import { useNavigate } from "react-router";
const salt = bcrypt.genSaltSync(10);
const Banner2 = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // secureLocalStorage.setItem("object", {
    //     message:  "This is testing of local storage",
    // });
    // secureLocalStorage.setItem("number", 12);
    // secureLocalStorage.setItem("string", "12");
    // secureLocalStorage.setItem("boolean", true);
    // let value = secureLocalStorage.getItem("boolean");
  }, []);
  const handleOpenCrypt = () => {
    const encryptedData = localStorage.getItem("elmataryapp");
    if (encryptedData) {
      const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, "111");
      const decryptedData = JSON.parse(
        decryptedBytes.toString(CryptoJS.enc.Utf8)
      );
    }
  };
  const localData = localStorage.getItem("elmataryapp");
  const decryptedBytes = localData && CryptoJS.AES.decrypt(localData, "111");
  const userData =
    decryptedBytes && JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));

  return (
    <section className="index-banner">
      <div className="banner2">
        {/*
        <button
        onClick={()=>{
          let pushedData=bcrypt.hashSync(JSON.stringify({first_name:'abdu',last_name:'ali',email:'aa032@gmail.com'}),"$2a$10$CwTycUXWue0Thq9StjUM0u");
          const encryptedData = CryptoJS.AES.encrypt(JSON.stringify({first_name:'abdu',last_name:'ali',email:'aa032@gmail.com'}), '111').toString();
          localStorage.setItem('elmataryapp', encryptedData);
          // localStorage.setItem("tryhash",pushedData);
          // localStorage.setItem('elmataryapp',JSON.stringify({first_name:'abdu',last_name:'ali',email:'aa032@gmail.com'}))
        }}
      >push to local</button>
      <button
        onClick={()=>{
          handleOpenCrypt()
        }}
      >open encrypt</button>
      */}
        {/* <a href="https://facebook.com">ew</a> */}
        <div className="bannerOverLay"></div>
        <Slide className="left" direction="left">
          <div>
            <h3
              style={{
                display: "flex",
                alignItems: "flex-start",
              }}
              className="bannerFont"
            >
              <img
                src={require("./Animation videos(Mrcs)_20250226_131818_0000.gif")}
                alt=""
                width={300}
              />
              <span className="thirdFont" style={{ fontSize: "29px" }}>
                {" "}
                Welcome To El Matary Establishment For Online Surgery Courses
              </span>
            </h3>
            <h4 className="firstFont firstFontEffect">
              <img
                src={
                  require("./Website essentials (500 x 783 px) (1920 x 350 px)_20250226_151552_0000.svg")
                    ?.default
                }
                width={"100%"}
                style={{ scale: "1.1" }}
              />
            </h4>
            {/* <h3>Welcome To Our Future Doctors</h3> */}
            <p className="secondFont thirdColor">
              Ready to make surgery easy? Let’s make your learning
              experience extraordinary!
            </p>
            <div className="actions">
              <button
                onClick={() => {
                  return (
                    (userData &&
                      userData?.student_id &&
                      navigate("/allcourses")) ||
                    navigate("/login")
                  );
                }}
              >
                Get Started Now!
              </button>
              <button
                onClick={() => {
                  window.open("https://dr-elmatary.com", "_blanck");
                }}
              >
                View A Demo
              </button>
            </div>
          </div>
        </Slide>
        <Slide className="right" direction="right">
          <div style={{ height: "100%" }}>
            <img
              src={
                require("../../../assets/Untitled design_20250222_115855_0000.svg")
                  .default
              }
              alt=""
            />
          </div>
        </Slide>
      </div>
    </section>
  );
};

export default Banner2;
