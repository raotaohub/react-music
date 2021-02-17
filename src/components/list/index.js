/*
 * @Author: raotaohub
 * @Date: 2021-02-13 16:35:44
 * @LastEditTime: 2021-02-14 17:11:59
 * @LastEditors: raotaohub
 * @FilePath: \react-music\src\components\list\index.js
 * @Description: 推荐页列表
 */

import React from "react";
import LazyLoad from "react-lazyload";
import { ListWrapper, List, ListItem } from "./style";
import { getCount } from "../../api/utils";

function RecommendList(props) {
  const { recommendList } = props;

  return (
    <ListWrapper>
      <h1 className="title"> 推荐歌单 </h1>
      <List>
        {recommendList.map((item, index) => {
          return (
            <ListItem key={item.id + index}>
              <div className="img_wrapper">
                <div className="decorate"></div>
                <LazyLoad
                  placeholder={
                    <img
                      width="100%"
                      height="100%"
                      src={require("./zune.png")}
                      alt="music"
                    />
                  }
                >
                  <img
                    src={item.picUrl + "?param=300x300"}
                    width="100%"
                    height="100%"
                    alt="music"
                  />
                </LazyLoad>
                <div className="play_count">
                  <i className="iconfont play">&#xe885;</i>
                  <span className="count">{getCount(item.playCount)}</span>
                </div>
              </div>
              {/* 歌曲描述 */}
              <div className="desc">{item.name}</div>
            </ListItem>
          );
        })}
      </List>
    </ListWrapper>
  );
}

export default React.memo(RecommendList);
