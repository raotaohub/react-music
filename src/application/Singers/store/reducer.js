/*
 * @Author: raotaohub
 * @Date: 2021-02-14 22:28:48
 * @LastEditTime: 2021-02-14 23:43:48
 * @LastEditors: raotaohub
 * @FilePath: \react-music\src\application\Singers\store\reducer.js
 * @Description: Singers的reducer
 */
import { fromJS } from "immutable";
import {
  CHANGE_SINGER_LIST,
  CHANGE_PAGE_COUNT,
  CHANGE_ENTER_LOADING,
  CHANGE_PULLUP_LOADING,
  CHANGE_PULLDOWN_LOADING,
} from "./constant";

const initialState = fromJS({
  singerList: [],
  pageCount: 0,
  enterLoading: true,
  pullUpLoading: false,
  pullDownLoading: false,
});

export default (state = initialState, { type, data }) => {
  switch (type) {
    case CHANGE_SINGER_LIST:
      return state.set("singerList", data);
    case CHANGE_PAGE_COUNT:
      return state.set("pageCount", data);
    case CHANGE_ENTER_LOADING:
      return state.set("enterLoading", data);
    case CHANGE_PULLUP_LOADING:
      return state.set("pullUpLoading", data);
    case CHANGE_PULLDOWN_LOADING:
      return state.set("pullDownLoading", data);
    default:
      return state;
  }
};
