import React, { useEffect } from "react";
import Banner from "./Banner/Banner";
import "./home.css";
import Feature from "./Features/Feature";
import Banner2 from "./Banner/Banner2";
import Courses from "./Courses/Courses";
import Footer from "../../components/Footer/Footer";
import Goal from "./goal";
import Features from "./feature";
import StoryContainer from "./srories";
import MoreFeatures from "./moreFeature";
import Doctors from "./doctors";
const Home = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="home">
      <Banner2 />
      <Goal />
      {/* <Feature /> */}
      <Features />
      <Doctors />
      <StoryContainer />
      <Courses />
      <MoreFeatures />
    </div>
  );
};

export default Home;
