/*
 * @Author: raotaohub
 * @Date: 2021-02-13 21:14:16
 * @LastEditTime: 2021-02-15 21:43:01
 * @LastEditors: raotaohub
 * @FilePath: \react-music\src\application\Recommend\store\reducer.js
 * @Description: 存放 initialState 和 reducer 函数；项目中使用immutable来保存数据
 */
import * as actionTypes from "./constants";
import { fromJS } from "immutable"; // 这里用到 fromJS 把 JS 数据结构转化成 immutable 数据结构

const initialState = fromJS({
  bannerList: [],
  recommendList: [],
  enterLoading: true,
});

export default (state = initialState, { type, data }) => {
  switch (type) {
    case actionTypes.CHANGE_BANNER:
      return state.set("bannerList", data);
    case actionTypes.CHANGE_RECOMMEND_LIST:
      return state.set("recommendList", data);
    case actionTypes.CHANGE_ENTER_LOADING:
      return state.set("enterLoading", data);
    default:
      return state;
  }
};
