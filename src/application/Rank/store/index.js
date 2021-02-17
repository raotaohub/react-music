/*
 * @Author: raotaohub
 * @Date: 2021-02-15 20:10:42
 * @LastEditTime: 2021-02-15 21:42:35
 * @LastEditors: raotaohub
 * @FilePath: \react-music\src\application\Rank\store\index.js
 * @Description: Edit......
 */
import { fromJS } from "immutable";
import { getRankTopListRequest } from "../../../api/request";
import { setItem, getItem } from "../../../api/storage";
// constants
export const CHANGE_RANK_LIST = "home/rank/CHANGE_RANK_LIST";
export const CHANGE_LOADING = "home/rank/CHANGE_LOADING";

// actionCreators
const changeRankList = (data) => ({
  type: CHANGE_RANK_LIST,
  data: fromJS(data),
});

const changeLoading = (data) => ({
  type: CHANGE_LOADING,
  data,
});

export const getRankList = () => {
  return (dispatch) => {
    let local = getItem("rankTopList");

    if (local.length) {
      dispatch(changeRankList(local));
    } else {
      getRankTopListRequest().then(
        (res) => {
          const data = res.list;
          dispatch(changeRankList(data));
          setItem("rankTopList", data);
          console.log(data);
        },
        (err) => {
          console.log("获取排行榜数据失败");
        }
      );
    }
    dispatch(changeLoading(false));
  };
};

// reducer
const initialState = fromJS({
  rankList: [],
  loading: true,
});

const reducer = (state = initialState, { type, data }) => {
  switch (type) {
    case CHANGE_RANK_LIST:
      return state.set("rankList", data);
    case CHANGE_LOADING:
      return state.set("loading", data);
    default:
      return state;
  }
};

export { reducer };
