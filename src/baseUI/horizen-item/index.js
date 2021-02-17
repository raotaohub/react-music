/*
 * @Author: raotaohub
 * @Date: 2021-02-14 17:46:12
 * @LastEditTime: 2021-02-14 20:23:19
 * @LastEditors: raotaohub
 * @FilePath: \react-music\src\baseUI\horizen-item\index.js
 * @Description: 歌手筛选
 */
import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Scroll from "../scroll";
import styled from "styled-components";
import style from "../../assets/global-style";

const List = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  overflow: hidden;
  > span:first-of-type {
    display: block;
    flex: 0 0 auto;
    padding: 5px 0;
    margin-right: 5px;
    color: grey;
    font-size: ${style["font-size-m"]};
    vertical-align: middle;
  }
`;
const ListItem = styled.span`
  flex: 0 0 auto;
  font-size: ${style["font-size-m"]};
  padding: 5px 8px;
  border-radius: 10px;
  &.selected {
    color: ${style["theme-color"]};
    border: 1px solid ${style["theme-color"]};
    opacity: 0.8;
  }
`;

function Horizen(props) {
  const Category = useRef(null);
  const { list, oldVal, title, handleClick } = props;

  // 初始化内容宽度的逻辑
  useEffect(() => {
    let categoryDOM = Category.current;
    let talElems = categoryDOM.querySelectorAll("span");
    let totalWidth = 0;

    Array.from(talElems).forEach((ele) => {
      totalWidth += ele.offsetWidth;
    });

    categoryDOM.style.width = `${totalWidth}px`;
  }, []);

  return (
    <Scroll direction="horizental">
      <div ref={Category}>
        <List>
          <span>{title}</span>
          {list.map((item) => {
            return (
              <ListItem
                key={item.key}
                className={oldVal === item.key ? "selected" : ""}
                onClick={() => handleClick(item.key)}
              >
                {item.name}
              </ListItem>
            );
          })}
        </List>
      </div>
    </Scroll>
  );
}

Horizen.defaultProps = {
  list: [],
  title: "",
  oldVal: "",
  handleClick: null,
};

Horizen.propTypes = {
  list: PropTypes.array,
  title: PropTypes.string,
  oldVal: PropTypes.string,
  handleClick: PropTypes.func,
};

export default React.memo(Horizen);
