/*
 * @Author: raotaohub
 * @Date: 2021-02-13 16:35:44
 * @LastEditTime: 2021-03-07 14:38:05
 * @LastEditors: raotaohub
 * @FilePath: \react-music\src\components\list\index.js
 * @Description: 推荐页列表
 */

import React from 'react';
import LazyLoad from 'react-lazyload';
import { ListWrapper, List, ListItem } from './style';
import { getCount } from '../../api/utils';
import { withRouter } from 'react-router-dom';

function RecommendList(props) {
  const { recommendList, history } = props;
  /**
   * 注意，这里 List 组件作为 Recommend 的子组件，并不能从 props 拿到 history 变量，无法跳转路由。有两种解决方法：
   * 1. 将 Recommend 组件中 props 对象中的 history 属性传给 List 组件
   * 2. 将 List 组件用 withRouter 包裹
   */
  const enterDetail = id => {
    history.push(`/recommend/${id}`);
  };

  return (
    <ListWrapper>
      <h1 className="title"> 推荐歌单 </h1>
      <List>
        {recommendList.map((item, index) => {
          return (
            <ListItem
              key={item.id + index}
              onClick={() => enterDetail(item.id)}
            >
              <div className="img_wrapper">
                <div className="decorate"></div>
                <LazyLoad
                  placeholder={
                    <img
                      width="100%"
                      height="100%"
                      src={require('./zune.png')}
                      alt="music"
                    />
                  }
                >
                  <img
                    src={item.picUrl + '?param=300x300'}
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

/**
 * 注意，这里 List 组件作为 Recommend 的子组件，并不能从 props 拿到 history 变量，无法跳转路由。有两种解决方法：
 * 2. 将 List 组件用 withRouter 包裹
 */
export default React.memo(withRouter(RecommendList));
