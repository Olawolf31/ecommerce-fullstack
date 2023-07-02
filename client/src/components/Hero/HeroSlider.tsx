import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Autoplay } from "swiper";
import "swiper/swiper-bundle.min.css";
import { heroData } from "./HeroData";

SwiperCore.use([Navigation, Autoplay]);

const HeroSlider = () => {
  return (
    <div>
      <Swiper
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        slidesPerView={1}
        navigation={false}
        loop={true}
        className="mySwiper"
      >
        {heroData.map((slider) => {
          return (
            <SwiperSlide
              key={slider.id}
              className={`${slider.className} color-overlay`}
              style={{
                backgroundImage: `url(${slider.url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundColor: "black",
              }}
            >
              <h2 className="text-center text-4xl font-bold bright-white sm:pt-8 sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
                {slider.title}
              </h2>

              <p className="text-center text-lg bright-white sm:text-base md:text-lg lg:text-xl">
                {slider.description}
              </p>

              <div className="flex justify-center mt-8 space-x-4">
                <button className="text-center text-white bg-gradient-to-r from-pink-700 to-gray-500 border-0 py-3 px-8 focus:outline-none hover:bg-yellow-600 rounded-full text-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                  <h3>OUR LATEST DEALS</h3>
                </button>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
