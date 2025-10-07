import React from 'react';
import About from "./About/About";
import Learn from "./Learn/Learn";
import Modules from "./Modules/Modules";
import Recommendation from "./Recommendation/Recommendation";
import Skills from "./Skills/Skills";
import "./style.css";
const EnrollNow = () => {
  return (
    <div className="flex px-20 py-10 gap-10 main-page">
      {/* <img
        src={require("./images/doctors.jpg")}
        alt="Doctors"
        className="rounded-full w-[200px] h-[200px]"
      /> */}
      <div className="bg-[#f1f0f0] p-8 home">
        <About />
        <Learn />
        <Skills />
        <Modules />
        <Recommendation />
      </div>
    </div>
  );
};

export default EnrollNow;
