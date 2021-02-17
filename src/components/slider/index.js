/*
 * @Author: raotaohub
 * @Date: 2021-02-13 15:53:49
 * @LastEditTime: 2021-02-14 14:36:17
 * @LastEditors: raotaohub
 * @FilePath: \react-music\src\components\slider\index.js
 * @Description: 滑动组件
 */
import React, { useEffect, useState } from "react";
import { SliderContainer } from "./style";
import "swiper/dist/css/swiper.css";
import Swiper from "swiper";

function Slider(props) {
  const [sliderSwiper, setSliderSwiper] = useState(null);
  const { bannerList } = props;

  useEffect(() => {
    if (bannerList.length && !sliderSwiper) {
      let newSliderSwiper = new Swiper(".slider-container", {
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        pagination: { el: ".swiper-pagination" },
      });
      setSliderSwiper(newSliderSwiper);
    }
  }, [bannerList.length, setSliderSwiper, sliderSwiper]);

  return (
    <SliderContainer>
      <div className="slider-container">
        <div className="swiper-wrapper">
          {bannerList.map((slider, index) => {
            return (
              <div className="swiper-slide" key={index}>
                <div className="slider-nav">
                  <img
                    src={slider.imageUrl}
                    width="100%"
                    height="100%"
                    alt="推荐"
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="swiper-pagination"></div>
      </div>
      <div className="before"></div>
    </SliderContainer>
  );
}

export default React.memo(Slider);
