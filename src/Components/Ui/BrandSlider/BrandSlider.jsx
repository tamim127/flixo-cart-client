"use client";

import React from "react";
import "swiper/css";

import amazon from "../../../../public/brands/amazon.png";
import amazon_vector from "../../../../public/brands/amazon_vector.png";
import casio from "../../../../public/brands/casio.png";
import moonstar from "../../../../public/brands/moonstar.png";
import randstad from "../../../../public/brands/randstad.png";
import star from "../../../../public/brands/star.png";
import start_people from "../../../../public/brands/start_people.png";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

const brandLogos = [
  amazon,
  amazon_vector,
  casio,
  moonstar,
  randstad,
  star,
  start_people,
];

const Brands = () => {
  return (
    <Swiper
      loop={true}
      slidesPerView={4}
      centeredSlides={true}
      spaceBetween={30}
      grabCursor={true}
      modules={[Autoplay]}
      autoplay={{
        delay: 1000,
        disableOnInteraction: false,
      }}
    >
      {brandLogos.map((logo, index) => (
        <SwiperSlide key={index}>
          <Image src={logo} alt="" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Brands;
