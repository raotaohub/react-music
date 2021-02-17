/*
 * @Author: raotaohub
 * @Date: 2021-02-13 14:15:04
 * @LastEditTime: 2021-02-14 17:07:31
 * @LastEditors: raotaohub
 * @FilePath: \react-music\src\application\Home\style.js
 * @Description:
 */
import styled from "styled-components"; // 引入样式化组件插件
import style from "../../assets/global-style"; // 引入全局样式

// CSS 样式组件Top
export const Top = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 10px;
  background: ${style["theme-color"]};
  & > span {
    line-height: 40px;
    color: #f1f1f1;
    font-size: 20px;
    &.iconfont {
      font-size: 25px;
    }
  }
  & > img {
    line-height: 40px;
    color: #f1f1f1;
    font-size: 20px;
  }
`;

// CSS 样式组件Tab
export const Tab = styled.div`
  height: 44px;
  display: flex;
  justify-content: space-between;
  background: ${style["theme-color"]};
  a {
    flex: 1;
    padding: 2px 0;
    font-size: 14px;
    color: #e4e4e4;
    &.selected {
      span {
        padding: 3px 0;
        font-weight: 700;
        color: #f1f1f1;
        border-bottom: 2px solid #f1f1f1;
      }
    }
  }
`;

// CSS 样式组件TabItem
export const TabItem = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
