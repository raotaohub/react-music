/*
 * @Author: raotaohub
 * @Date: 2021-02-14 22:28:37
 * @LastEditTime: 2021-02-15 21:39:29
 * @LastEditors: raotaohub
 * @FilePath: \react-music\src\application\Singers\store\actionCreators.js
 * @Description: Edit......
 */
import {
  getHotSingerListRequest,
  getSingerListRequest,
} from "../../../api/request";

import {
  CHANGE_SINGER_LIST,
  CHANGE_PAGE_COUNT,
  CHANGE_ENTER_LOADING,
  CHANGE_PULLUP_LOADING,
  CHANGE_PULLDOWN_LOADING,
  CHANGE_CATOGORY,
  CHANGE_ALPHA,
} from "./constant";
import { fromJS } from "immutable";
import { getItem, setItem } from "../../../api/storage";

export const changeCategory = (data) => ({
  type: CHANGE_CATOGORY,
  data,
});

export const changeAlpha = (data) => ({
  type: CHANGE_ALPHA,
  data,
});

// 歌手列表
export const changeSingerList = (data) => ({
  type: CHANGE_SINGER_LIST,
  data: fromJS(data),
});

// 页数
export const changePageCount = (data) => ({
  type: CHANGE_PAGE_COUNT,
  data,
});

// 进场动画
export const changeEnterLoading = (data) => ({
  type: CHANGE_ENTER_LOADING,
  data,
});

// 顶部下拉
export const changePullUpLoading = (data) => ({
  type: CHANGE_PULLUP_LOADING,
  data,
});

// 底部上拉
export const changePullDownLoading = (data) => ({
  type: CHANGE_PULLDOWN_LOADING,
  data,
});

// 首次获取热门歌手
export const getHotSingerList = () => {
  return (dispatch) => {
    getHotSingerListRequest(0)
      .then((res) => {
        const data = res.artists;
        dispatch(changeSingerList(data));
        dispatch(changeEnterLoading(false));
        dispatch(changePullDownLoading(false));
      })
      .catch((err) => {
        console.log(err, "获取热门歌手数据失败❌");
      });
  };
};

// 上拉刷新加载更多热门歌手
export const reMoreHotSingerList = () => {
  // https://cn.redux.js.org/docs/advanced/AsyncActions.html
  // 注意这个函数也接收了 getState() 方法
  // 它让你选择接下来 dispatch 什么。
  // 不要使用 catch，因为会捕获
  // 在 dispatch 和渲染中出现的任何错误，
  return (dispatch, getState) => {
    const pageCount = getState().getIn(["singers", "pageCount"]);
    const singerList = getState().getIn(["singers", "singerList"]).toJS();
    getHotSingerListRequest(pageCount).then(
      (res) => {
        const data = [...singerList, ...res.artists];
        dispatch(changeSingerList(data));
        dispatch(changeEnterLoading(false));
        dispatch(changePullDownLoading(false));
      },
      (err) => {
        console.log(err, "获取热门歌手数据失败❌");
      }
    );
  };
};

// 首次获取对应类别歌手
export const getSingerList = (category, alpha) => {
  return (dispatch, getState) => {
    const localData = getItem(category + alpha);
    if (localData) {
      dispatch(changeSingerList(localData));
    } else {
      getSingerListRequest(category, alpha, 0).then(
        (res) => {
          const data = res.artists;
          setItem(category + alpha, data);
          dispatch(changeSingerList(data));
        },
        (err) => {
          console.log(err, "获取歌手数据失败❌");
        }
      );
    }
    dispatch(changeEnterLoading(false));
    dispatch(changePullDownLoading(false));
  };
};

// 加载更多歌手
export const reMoreSingerList = (category, alpha) => {
  return (dispatch, getState) => {
    const pageCount = getState().getIn(["singers", "pageCount"]);
    const singerList = getState().getIn(["singers", "singerList"]).toJS();
    getSingerListRequest(category, alpha, pageCount).then(
      (res) => {
        const data = [...singerList, ...res.artists];
        dispatch(changeSingerList(data));
        dispatch(changePullUpLoading(false));
      },
      (err) => {
        console.log(err, "获取歌手数据失败❌");
      }
    );
  };
};
