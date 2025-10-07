import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "./style.css";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
function Banners() {
  return (
    <div>
      <Swiper
        spaceBetween={10}
        loop={true}
        navigation={{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        }}
        
        modules={[Navigation, Pagination, Autoplay, Pagination,]}
        // direction="ltr"
        pagination={{ clickable: true }}
        // loop={true}
        autoplay={4000}
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
            slidesPerView: 1,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 1,
            spaceBetween: 50,
          },
        }}
        className="banner_home rowDiv"
      >
        <SwiperSlide>
          <img
            src={require("../../../assets/istockphoto-1136642347-2048x2048.jpg")}
          />
        </SwiperSlide>
        
        <SwiperSlide>
          <img
            src={require("../../../assets/istockphoto-516793328-612x612.jpg")}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Banners;
