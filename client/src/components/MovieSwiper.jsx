import React from "react";

import "./movieSwiper.css";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Autoplay, EffectCoverflow } from "swiper/modules";

function MovieSwiper({ slides, slideChange }) {
  return (
    <Swiper
      effect={"coverflow"}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={"auto"}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      loop={true}
      speed={1000}
      modules={[Autoplay, EffectCoverflow]}
      className="movieSwiper"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <img
            src={`https://image.tmdb.org/t/p/original/${slide.poster_path}`}
            onClick={() => slideChange(slide.id)}
            alt="Preview Image"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default MovieSwiper;
