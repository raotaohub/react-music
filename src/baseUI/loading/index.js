/*
 * @Author: raotaohub
 * @Date: 2021-02-14 15:09:20
 * @LastEditTime: 2021-02-15 15:02:36
 * @LastEditors: raotaohub
 * @FilePath: \react-music\src\baseUI\loading\index.js
 * @Description: Edit......
 */
import React from "react";
import styled, { keyframes } from "styled-components";
import style from "../../assets/global-style";

const loading = keyframes`
  0%,100%{
    transform:scale(0.0)
  }
  50%{
    transform:scale(1.0)
  }
`;

const LoadingWrapper = styled.div`
  > div {
    position: fixed;
    z-index: 1000;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 60px;
    height: 60px;
    opacity: 0.3;
    border-radius: 50%;
    background-color: ${style["theme-color"]};
    animation: ${loading} 1.8s infinite ease-in;
  }
  > div:nth-child(2) {
    animation-delay: 0.8s;
  }
`;

function Loading(props) {
  const { show } = props;
  return (
    <LoadingWrapper style={show ? { display: "" } : { display: "none" }}>
      <div></div>
      <div></div>
    </LoadingWrapper>
  );
}

export default React.memo(Loading);
