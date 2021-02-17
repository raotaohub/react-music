/*
 * @Author: raotaohub
 * @Date: 2021-02-13 15:57:22
 * @LastEditTime: 2021-02-13 20:36:16
 * @LastEditors: raotaohub
 * @FilePath: \react-music\src\components\slider\style.js
 * @Description: Edit......
 */
import styled from "styled-components";
import style from "../../assets/global-style";

export const SliderContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  margin: auto;
  background: white;
  .before {
    position: absolute;
    top: -300px;
    height: 400px;
    width: 100%;
    background: ${style["theme-color"]};
  }
  .slider-container {
    position: relative;
    width: 98%;
    height: 160px;
    overflow: hidden;
    margin: auto;
    border-radius: 8px;
    .slider-nav {
      position: absolute;
      display: block;
      width: 100%;
      height: 100%;
    }
    .swiper-pagination-bullet-active {
      background: ${style["theme-color"]};
    }
  }
`;
