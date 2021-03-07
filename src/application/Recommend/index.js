/*
 * @Author: raotaohub
 * @Date: 2021-02-13 00:42:05
 * @LastEditTime: 2021-03-07 14:39:18
 * @LastEditors: raotaohub
 * @FilePath: \react-music\src\application\Recommend\index.js
 * @Description: 容器组件和UI组件合并，连接Redux
 */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from './store/actionCreators';
import { forceCheck } from 'react-lazyload';
import { renderRoutes } from 'react-router-config';

import Loading from '../../baseUI/loading/index';
import Slider from '../../components/slider';
import RecommendList from '../../components/list';
import Scroll from '../../baseUI/scroll';
import { Content } from './style';

function Recommend(props) {
  const { bannerList, recommendList, enterLoading } = props;

  const { getBannerDataDispatch, getRecommendListDataDispatch } = props;

  useEffect(() => {
    !bannerList.size && getBannerDataDispatch();
  }, [bannerList.size, getBannerDataDispatch]);

  useEffect(() => {
    !recommendList.size && getRecommendListDataDispatch();
  }, [getRecommendListDataDispatch, recommendList.size]);

  const bannerListJS = bannerList ? bannerList.toJS() : [];

  const recommendListJS = recommendList ? recommendList.toJS() : [];

  return (
    <Content>
      <Scroll className="list" onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerListJS}></Slider>
          <RecommendList recommendList={recommendListJS}></RecommendList>
        </div>
      </Scroll>
      {/* 加载中开关由数据是否返回控制 */}
      {/* {enterLoading ? <Loading /> : null} */}
      <Loading show={enterLoading}></Loading>
      {renderRoutes(props.route.routes)}
    </Content>
  );
}

// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = state => ({
  bannerList: state.getIn(['recommend', 'bannerList']),
  recommendList: state.getIn(['recommend', 'recommendList']),
  enterLoading: state.getIn(['recommend', 'enterLoading']),
});

// 映射 dispatch 到 props 上
/* TODO：可以利用同名简写优化 */
const mapDispatchToProps = dispatch => {
  return {
    getBannerDataDispatch() {
      dispatch(actionTypes.getBannerList());
    },
    getRecommendListDataDispatch() {
      dispatch(actionTypes.getRecommendList());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Recommend));
