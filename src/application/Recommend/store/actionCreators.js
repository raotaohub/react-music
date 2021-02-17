/*
 * @Author: raotaohub
 * @Date: 2021-02-13 21:14:06
 * @LastEditTime: 2021-02-14 16:03:21
 * @LastEditors: raotaohub
 * @FilePath: \react-music\src\application\Recommend\store\actionCreators.js
 * @Description: recommend 的 action
 */

import * as actionTypes from "./constants";
import { fromJS } from "immutable";
import {
  getBannerRequest,
  getRecommendListRequest,
} from "../../../api/request";

export const changeBannerList = (data) => ({
  type: actionTypes.CHANGE_BANNER,
  data: fromJS(data),
});

export const changeRecommendList = (data) => ({
  type: actionTypes.CHANGE_RECOMMEND_LIST,
  data: fromJS(data),
});

export const changeEnterLoading = (data) => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  data,
});

export const getBannerList = () => {
  return (dispatch) => {
    getBannerRequest()
      .then((res) => {
        dispatch(changeBannerList(res.banners));
        setTimeout(() => {
          dispatch(changeEnterLoading(false));
        }, 888);
      })
      .catch((err) => {
        console.log(err, "轮播图数据传输出现错误❌");
      });
  };
};

export const getRecommendList = () => {
  return (dispatch) => {
    getRecommendListRequest()
      .then((res) => {
        dispatch(changeRecommendList(res.result));
      })
      .catch((err) => {
        console.log(err, "推荐歌单数据传输出现错误❌");
      });
  };
};
