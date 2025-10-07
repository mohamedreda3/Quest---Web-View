import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router";
import "./courses.css";
import { coursesTypesData } from "./data";
import CryptoJS from "crypto-js";
import Skeleton from "react-loading-skeleton";
import { getCourses } from "../../AllCourses/functions/getAll";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useDispatch } from "react-redux";
import ContentLoader from "react-content-loader";

const Courses = () => {
  const localData = localStorage.getItem("elmataryapp");
  const decryptedBytes = localData && CryptoJS.AES.decrypt(localData, "111");
  const userData =
    decryptedBytes && JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));

  const navigate = useNavigate();
  const [coursesData, setCoursesData] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [pageLoading, setPageLoading] = useState(true);
  const [originalCourses, setOriginalCourses] = useState([]);
  const dispatch = useDispatch();
  const getCoursesType = useCallback(() => {
    setSelectedType(coursesTypesData[0].id);
  }, []);

  const filterCourses = useCallback(() => {
    if (selectedType === 0) {
      setCoursesData(originalCourses);
    } else {
      setCoursesData(
        originalCourses.filter((item) => item.type_id === selectedType)
      );
    }
  }, [selectedType, originalCourses]);

  useEffect(() => {
    if (userData) {
      getCourses(
        userData,
        setPageLoading,
        setCoursesData,
        setOriginalCourses,
        dispatch
      );
      getCoursesType();
    }
  }, []);

  useEffect(() => {
    if (selectedType !== "") {
      filterCourses();
    }
  }, [selectedType, filterCourses]);
  const CustomPrevArrow = () => (
    <div className="swiper-button-prev">
      {/* Your custom previous arrow */}
      {/* For example, you can use an SVG or an image */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-arrow-left"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M5 12l14 0" />
        <path d="M5 12l6 6" />
        <path d="M5 12l6 -6" />
      </svg>
    </div>
  );

  const CustomNextArrow = () => (
    <div className="swiper-button-next">
      {/* Your custom next arrow */}
      {/* For example, you can use an SVG or an image */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-arrow-right"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M5 12l14 0" />
        <path d="M13 18l6 -6" />
        <path d="M13 6l6 6" />
      </svg>
    </div>
  );

  return (
    <div className="courses_component" style={{ marginBottom: "40px" }}>
      {userData && (
        <>
          {coursesData.length > 0 && (
            <div className="columnDiv" style={{ marginBottom: "40px" }}>
              <h5>+100 UNIQUE COURSES</h5>
              <h4>YOU MAY ALSO LIKE MORE COURSES</h4>
              <img
                src="https://res.cloudinary.com/duovxefh6/image/upload/v1709455929/image-removebg-preview_3_c8ql8o.png"
                alt=""
                width={100}
              />
              <p className="firstFontEffect">
                Take The Next Step Towards Your Personal And Professional Goals
                With Dr Elmatary Establishment
              </p>
            </div>
          )}

          <div className="courses">
            {pageLoading ? (
              <div style={{ width: "100%" }}>
                <ContentLoader
                  viewBox="0 0 980 320"
                  speed={1}
                  // backgroundColor={'green'}
                >
                  {/* Card shapes */}
                  <rect
                    x="10"
                    y="10"
                    rx="20"
                    ry="20"
                    width="260"
                    height="300"
                  />
                  <rect
                    x="350"
                    y="10"
                    rx="20"
                    ry="20"
                    width="260"
                    height="300"
                  />
                  <rect
                    x="690"
                    y="10"
                    rx="20"
                    ry="20"
                    width="260"
                    height="300"
                  />
                  <rect
                    x="690"
                    y="10"
                    rx="20"
                    ry="20"
                    width="260"
                    height="300"
                  />
                </ContentLoader>
              </div>
            ) : (
              <>
                <Swiper
                  spaceBetween={10}
                  navigation={{
                    prevEl: '.swiper-button-prev',
                    nextEl: '.swiper-button-next',
                  }}
                  modules={[Navigation, Pagination, Autoplay]}
                  // direction="ltr"
                  // loop={true}
                  breakpoints={{
                    320: {
                      slidesPerView: 1,
                      spaceBetween: 10,
                    },
                    480: {
                      slidesPerView: 1,
                      spaceBetween: 20,
                    },
                    768: {
                      slidesPerView: 2,
                      spaceBetween: 30,
                    },
                    1024: {
                      slidesPerView: 3,
                      spaceBetween: 50,
                    },
                  }}
                >
                  {coursesData?.map((item, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <div
                          className="card"
                          onClick={() => {
                            navigate(
                              item?.units[0]?.videos[0]?.own
                                ? "/MyCourses"
                                : "/coursedetails?course_id=" + item?.course_id,
                              { state: { course: item } }
                            );
                          }}
                        >
                          <div className="main">
                            <div className="imageCourse">
                              <img
                                className="tokenImage"
                                src={item?.course_photo_url}
                                alt=""
                              />
                              <h4 className="category">
                                {item?.category_label}
                              </h4>
                            </div>
                            <div className="courseDetails">
                              <span className="iconWithText">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="1em"
                                  height="1em"
                                  viewBox="0 0 256 256"
                                >
                                  <g fill="currentColor">
                                    <path
                                      d="M226.59 71.53a16 16 0 0 0-9.63-11C183.48 47.65 128 48 128 48s-55.48-.35-89 12.58a16 16 0 0 0-9.63 11C27.07 80.54 24 98.09 24 128s3.07 47.46 5.41 56.47A16 16 0 0 0 39 195.42C72.52 208.35 128 208 128 208s55.48.35 89-12.58a16 16 0 0 0 9.63-10.95c2.34-9 5.41-26.56 5.41-56.47s-3.11-47.46-5.45-56.47M112 160V96l48 32Z"
                                      opacity="0.2"
                                    />
                                    <path d="m164.44 121.34l-48-32A8 8 0 0 0 104 96v64a8 8 0 0 0 12.44 6.66l48-32a8 8 0 0 0 0-13.32M120 145.05V111l25.58 17Zm114.33-75.53a24 24 0 0 0-14.49-16.4C185.56 39.88 131 40 128 40s-57.56-.12-91.84 13.12a24 24 0 0 0-14.49 16.4C19.08 79.5 16 97.74 16 128s3.08 48.5 5.67 58.48a24 24 0 0 0 14.49 16.41C69 215.56 120.4 216 127.34 216h1.32c6.94 0 58.37-.44 91.18-13.11a24 24 0 0 0 14.49-16.41c2.59-10 5.67-28.22 5.67-58.48s-3.08-48.5-5.67-58.48m-15.49 113a8 8 0 0 1-4.77 5.49c-31.65 12.22-85.48 12-86.12 12s-54.37.18-86-12a8 8 0 0 1-4.77-5.49C34.8 173.39 32 156.57 32 128s2.8-45.39 5.16-54.47A8 8 0 0 1 41.93 68c31.65-12.18 85.47-12 86.12-12s54.37-.18 86 12a8 8 0 0 1 4.77 5.49C221.2 82.61 224 99.43 224 128s-2.8 45.39-5.16 54.47Z" />
                                  </g>
                                </svg>
                                <span>{item?.units?.length} Lessons</span>
                              </span>
                              <h2  style={{ color: "#ff005c" }}> {item?.course_name}</h2>
                              <p className="description">
                                {item?.course_content?.length > 50
                                  ? `${item?.course_content?.substring(
                                      0,
                                      50
                                    )}...`
                                  : item?.course_content}
                              </p>
                              <span>Dr.Mohammed Elmatary</span>
                              <div className="flex spacebetween justify-space-between">
                                <div class="ratings">
                                  {Array(item?.rate ? parseInt(item?.rate) : 0)
                                    .fill(0)
                                    .map((item) => {
                                      return (
                                        <img
                                          src="https://raw.githubusercontent.com/mustafadalga/ratings-card/461b28d30e6d5b4475e0f78d2f65700674808565/assets/img/star2.svg"
                                          alt=""
                                        />
                                      );
                                    })}
                                  {Array(
                                    5 - (item?.rate ? parseInt(item?.rate) : 0)
                                  )
                                    .fill(0)
                                    .map((item) => {
                                      return (
                                        <img
                                          src="https://res.cloudinary.com/duovxefh6/image/upload/v1710597956/purepng.com-grey-starstargeometricallydecagonconcavestardomclipartblackgrey-1421526502793oblca_ca8lyn.png"
                                          alt=""
                                        />
                                      );
                                    })}
                                  {/* ({item?.rate}) */}
                                </div>
                                <div className="price">
                                  ${item?.course_price}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </>
            )}
            <CustomNextArrow />
            <CustomPrevArrow />
          </div>
        </>
      )}
      {!userData && (
        <div style={{ textAlign: "center" }}>
          {/* <img
            style={{ width: "500px", maxWidth: "90%" }}
            src={require("../../../assets/sig.jpg")}
            alt=""
          /> */}
          <h4 className="text-center">Please Sign First</h4>
          <p>To See All Courses</p>
          <button
            onClick={() => {
              navigate("/signup");
            }}
            className="mt-2 btn btn-primary"
          >
            Register
          </button>
        </div>
      )}
    </div>
  );
};

export default Courses;
