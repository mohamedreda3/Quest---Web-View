// About.jsx
import React, { useEffect, useState } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./About.css";

const OUR_TEAMS = [
  {
    id: 1,
    name: "Dr.mohammed edris ",
    description:
      "Mbbch degree from kasralainy University , general surgery resident in azhar University ,mrcs A degree in May 2023, st. Of Master degree in general surgery azhar University ,teaching consultant in matary.llc for 3 years with undergraduate and postgraduate surgery courses",
    image:
      "https://res.cloudinary.com/dsqlywnj5/image/upload/v1736768773/Matary_basic_media_20241226_224110_0001_fxwzs6.png",
  },
  {
    id: 2,
    name: "Dr Ahmed A. Alemam ",
    description:
      "MBChB degree from Tanta University , GIT& Laproscopic surgery resident at Tanta university hospital , General Surgery resident at Tanta military hospital,MRCS A degree in May 2023 , Teaching consultant in matary.llc for 3 years with undergraduate and postgraduate surgery courses",
    image: require("../../assets/17_20250217_102142_0002.png"),
  },
  {
    id: 3,
    name: "Menna Kaddah ",
    description:
      "General and Laparscopic surgery resident at Ain Shams University Hospitals.Surgery Instructor and Author of Matary's MRCS part A textbook at matary.llc Since 2022 , MRCS part A First part of Masters degree in general and laparscopic surgery. MBBCh",
    image: require("../../assets/16_20250217_102142_0001.png"),
  },
  {
    id: 4,
    name: "Dr. Baraka ",
    description:
      "Graduated with Excellent with Honours in MBBCh from Ain Shams University.	Resident in Internal Medicine Gastroenterology and Hepatology at Ain Shams University. GMC-registered physician with expertise in UK medical standards.	Tutor for PLAB 1/UKMLA course, dedicated to mentoring and supporting future medical graduates.",
    image:
      require("../../assets/Session posters (1080 x 1080 px)_20250220_022933_0000 (1).svg")
        ?.default,
  },
];
/* SVG Icons as React Components */
const BookIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    fill="#fff"
    viewBox="0 0 24 24"
  >
    <path d="M19 2h-14c-1.1 0-2 .9-2 2v16l4-4h12c1.1 0 2-.9 2-2v-14c0-1.1-.9-2-2-2z" />
  </svg>
);

const GraduationCapIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    fill="#fff"
    viewBox="0 0 24 24"
  >
    <path d="M12 2l-10 6v12h20v-12l-10-6zm0 7.3c-1.38 0-2.5-1.12-2.5-2.5S10.62 4.3 12 4.3s2.5 1.12 2.5 2.5S13.38 9.3 12 9.3z" />
  </svg>
);

const TeacherIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    fill="#fff"
    viewBox="0 0 24 24"
  >
    <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
  </svg>
);

const LightbulbIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    fill="#fff"
    viewBox="0 0 24 24"
  >
    <path d="M9 21h6v-1h-6v1zm3-20c-4.97 0-9 4.03-9 9 0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
  </svg>
);

const UsersIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    fill="#fff"
    viewBox="0 0 24 24"
  >
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S10.62 5 9 5s-3 1.34-3 3 1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z" />
  </svg>
);

const BuildingIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    fill="#fff"
    viewBox="0 0 24 24"
  >
    <path d="M4 4h4v16h-4v-16zm6 6h4v10h-4v-10zm6-4h4v14h-4v-14z" />
  </svg>
);

const MapMarkerIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    fill="#fff"
    viewBox="0 0 24 24"
  >
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
  </svg>
);

const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    fill="#fff"
    viewBox="0 0 24 24"
  >
    <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.21.48 2.53.73 3.88.73a1 1 0 011 1V20a1 1 0 01-1 1C10.76 21 3 13.24 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.35.25 2.67.73 3.88a1 1 0 01-.21 1.11l-2.2 2.2z" />
  </svg>
);

/* Team Member Data */
const teamMembers = [
  {
    name: "Dr. Jane Smith",
    role: "Lead Educator",
    bio: "Dr. Smith specializes in cardiovascular medicine and brings over 15 years of teaching experience.",
    image: "/images/team1.jpg",
  },
  {
    name: "Dr. John Doe",
    role: "Course Developer",
    bio: "With a passion for medical education, Dr. Doe develops comprehensive course materials for our platform.",
    image: "/images/team2.jpg",
  },
  {
    name: "Dr. Emily Davis",
    role: "Academic Advisor",
    bio: "Dr. Davis provides personalized academic guidance to help students achieve their career aspirations.",
    image: "/images/team3.jpg",
  },
  // Add more team members as needed
];

const About = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  /* Carousel State */
  const [currentSlide, setCurrentSlide] = useState(0);

  const totalSlides = teamMembers.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  /* Automatic Slide */
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="about__hero">
        <div className="about__hero-content">
          <h1 className="about__hero-title firstFont firstFontEffect" style={{ color: "#ff005c" }}>
            Empowering Medical Professionals
          </h1>
          <p className="about__hero-subtitle thirdFont thirdColor">
            At Dr. El Matary's Online Training, we provide comprehensive
            resources to elevate your medical career.
          </p>
          <button
            className="about__hero-button thirdFont"
            style={{ background:"white", color:"var(--main-color)" }}
            onClick={() => (window.location.href = "/login")}
          >
            Join Us Today
          </button>
        </div>
      </section>

      {/* Main Container */}
      <div className="about__container">
        {/* Our Story Section */}
        <section className="about__story">
          <img
            src={
              require("../../assets/Matary basic media_20250226_133433_0000.svg")
                ?.default
            }
            alt="Our Story"
            className="about__story-image"
          />
          <div className="about__story-content">
            <h2 className="about__story-title firstFont " style={{ color: "#ff005c" }}>
              Our Story
            </h2>
            <p className="about__story-text thirdFont seconderyColor">
              Founded by Dr. El Matary, our platform was created to bridge the
              gap in medical education by offering flexible and engaging
              learning solutions. With a commitment to excellence, we have
              empowered countless students and professionals to achieve their
              academic and career goals through high-quality content and
              personalized support.
            </p>
          </div>
        </section>

        <section className="about_team">
          <h2 className="about__offer-title firstFont firstFont" style={{ color: "#ff005c" }}>Our Team</h2>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            spaceBetween={50}
            slidesPerView={3}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {OUR_TEAMS?.map((item) => (
              <SwiperSlide key={item?.id}>
                <div className="team-card">
                  <div className="team-card-header">
                    <img src={item?.image} alt="" />
                    <h6  className="firstFont  firstFontEffect" >{item?.name}</h6>
                  </div>
                  <p className="thirdFont">"{item?.description}"</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div>
        </section>

        {/* What We Offer Section */}
        <section className="about__offer">
          <h2 className="about__offer-title firstFont mainColor">
            What We Offer
          </h2>
          <div className="about__offer-grid">
            <div className="about__offer-card">
              <div className="about__offer-icon">
                <BookIcon />
              </div>
              <h3 className="font-bold text-white about__offer-name firstFont  firstFontEffect">
                Undergraduate Programs
              </h3>
              <p className="font-normal about__offer-description thirdColor thirdFont">
                Comprehensive courses designed to build a strong foundation in
                medical sciences.
              </p>
            </div>
            <div className="about__offer-card">
              <div className="about__offer-icon">
                <GraduationCapIcon />
              </div>
              <h3 className="font-bold text-white about__offer-name firstFont  firstFontEffect">
                MRCS Exam Preparation
              </h3>
              <p className="font-normal about__offer-description thirdColor thirdFont">
                Specialized training programs tailored to help you excel in MRCS
                examinations.
              </p>
            </div>
            <div className="about__offer-card">
              <div className="about__offer-icon">
                <TeacherIcon />
              </div>
              <h3 className="font-bold text-white about__offer-name firstFont  firstFontEffect">
                Live Lectures
              </h3>
              <p className="font-normal about__offer-description thirdColor thirdFont">
                Interactive live sessions led by industry experts to enhance
                your learning experience.
              </p>
            </div>
            <div className="about__offer-card">
              <div className="about__offer-icon">
                <LightbulbIcon />
              </div>
              <h3 className="font-bold text-white about__offer-name firstFont  firstFontEffect">
                Personalized Learning
              </h3>
              <p className="font-normal about__offer-description thirdColor thirdFont">
                Customized learning plans to cater to your unique educational
                needs and goals.
              </p>
            </div>
            <div className="about__offer-card">
              <div className="about__offer-icon">
                <UsersIcon />
              </div>
              <h3 className="font-bold text-white about__offer-name firstFont  firstFontEffect">
                Community Support
              </h3>
              <p className="font-normal about__offer-description thirdColor thirdFont">
                Join a vibrant community of learners and professionals to
                collaborate and grow together.
              </p>
            </div>
            <div className="about__offer-card">
              <div className="about__offer-icon">
                <BookIcon />
              </div>
              <h3 className="font-bold text-white about__offer-name firstFont  firstFontEffect">
                Extensive Question Banks
              </h3>
              <p className="font-normal about__offer-description thirdColor thirdFont">
                Access a vast repository of practice questions to test and
                enhance your knowledge.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information Section */}
        <section className="about__contact bgSecondaryColor">
          <h2 className="about__contact-title firstFont  firstFontEffect">Get in Touch</h2>
          <div className="about__contact-grid">
            <div className="about__contact-card firstFont">
              <div className="about__contact-icon">
                <BuildingIcon />
              </div>
              <div>
                <h3 className="about__contact-info-title">Company Name</h3>
                <p className="about__contact-info-detail">DR.Elmatary LLC</p>
              </div>
            </div>
            {/* <div className="about__contact-card firstFont">
              <div className="about__contact-icon">
                <MapMarkerIcon />
              </div>
              <div>
                <h3 className="about__contact-info-title">US Address</h3>
                <p className="about__contact-info-detail">
                  2201 MENAUL BLVD NE, STE A, ALBUQUERQUE, NM 87107
                </p>
              </div>
            </div> */}
            <div className="about__contact-card firstFont">
              <div className="about__contact-icon">
                <PhoneIcon />
              </div>
              <div>
                <h3 className="about__contact-info-title">US Phone Number</h3>
                <p className="about__contact-info-detail">+1 (872) 308-0246</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer
      <footer className="about__footer">
        <p className="about__footer-text">
          &copy; {new Date().getFullYear()} DR.Elmatary LLC. All rights
          reserved.
        </p>
      </footer> */}
    </div>
  );
};

export default About;
