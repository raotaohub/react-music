/*
 * @Author: raotaohub
 * @Date: 2021-02-13 00:42:05
 * @LastEditTime: 2021-02-15 19:34:55
 * @LastEditors: raotaohub
 * @FilePath: \react-music\src\application\Singers\index.js
 * @Description: Edit......
 */
import React, { useState, useEffect } from "react";
import LazyLoad, { forceCheck } from "react-lazyload";
import { connect } from "react-redux";
import Horizen from "../../baseUI/horizen-item";
import Scroll from "../../baseUI/scroll";
import Loading from "../../baseUI/loading";
import { categoryTypes, alphaTypes } from "../../api/config";
import { NavContainer, ListContainer, List, ListItem } from "./style";
import {
  getSingerList,
  getHotSingerList,
  changeEnterLoading,
  changePageCount,
  reMoreSingerList,
  changePullUpLoading,
  changePullDownLoading,
  reMoreHotSingerList,
} from "./store/actionCreators";

function Singers(props) {
  let [category, setCategory] = useState("");
  let [alpha, setAlpha] = useState("");

  const {
    singerList,
    pageCount,
    enterLoading,
    pullUpLoading,
    pullDownLoading,
  } = props;

  const {
    getHotSingerDispatch,
    updateSingerDispatch,
    pullDownReDispatch,
    pullUpReDispatch,
  } = props;

  useEffect(() => {
    !singerList.size && getHotSingerDispatch();

    // eslint-disable-next-line
  }, []);

  const handleUpdateCategory = (val) => {
    setCategory(val);
    updateSingerDispatch(val, alpha);
  };

  const handleUpdateAlpha = (val) => {
    setAlpha(val);
    updateSingerDispatch(category, val);
  };

  const handlePullUp = () => {
    pullUpReDispatch(category, alpha, category === "", pageCount);
  };

  const handlePullDown = () => {
    pullDownReDispatch(category, alpha);
  };

  const renderSingerList = () => {
    const list = singerList ? singerList.toJS() : [];
    return (
      <List>
        {list.map((item, index) => {
          return (
            <ListItem key={item.accountId + "" + index}>
              <div className="img_wrapper">
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
                    src={`${item.picUrl}?param=300x300`}
                    width="100%"
                    height="100%"
                    alt="music"
                  />
                </LazyLoad>
              </div>
              <span className="name">{item.name}</span>
            </ListItem>
          );
        })}
      </List>
    );
  };

  return (
    <div>
      <NavContainer>
        <Horizen
          list={categoryTypes}
          title={"分类（默认热门）:"}
          oldVal={category}
          handleClick={(val) => handleUpdateCategory(val)}
        ></Horizen>
        <Horizen
          list={alphaTypes}
          title={"首字母："}
          oldVal={alpha}
          handleClick={(val) => handleUpdateAlpha(val)}
        ></Horizen>
      </NavContainer>
      <ListContainer>
        <Scroll
          pullUp={handlePullUp}
          pullDown={handlePullDown}
          pullUpLoading={pullUpLoading}
          pullDownLoading={pullDownLoading}
          onScroll={forceCheck}
        >
          {renderSingerList()}
        </Scroll>
        <Loading show={enterLoading}></Loading>
      </ListContainer>
      {<Loading />}
    </div>
  );
}

const mapStateToProps = (state) => ({
  singerList: state.getIn(["singers", "singerList"]),
  pageCount: state.getIn(["singers", "pageCount"]),
  enterLoading: state.getIn(["singers", "enterLoading"]),
  pullUpLoading: state.getIn(["singers", "pullUpLoading"]),
  pullDownLoading: state.getIn(["singers", "pullDownLoading"]),
});
const mapDispatchToProps = (dispatch) => {
  return {
    // 首次获取热门歌手
    getHotSingerDispatch() {
      dispatch(getHotSingerList());
    },
    // 按照类目更新歌手列表
    updateSingerDispatch(category, alpha) {
      console.log("@@点击筛选");
      dispatch(changePageCount(0));
      dispatch(changeEnterLoading(true));
      dispatch(getSingerList(category, alpha));
    },
    // 上拉到底加载更多
    pullUpReDispatch(category, alpha, hot, count) {
      dispatch(changePullUpLoading(true));
      dispatch(changePageCount(count + 1));
      if (hot) {
        dispatch(reMoreHotSingerList());
      } else {
        dispatch(reMoreSingerList(category, alpha));
      }
    },
    // 下拉刷新
    pullDownReDispatch(category, alpha) {
      dispatch(changePullDownLoading(true));
      dispatch(changePageCount(0));
      if (category === "" && alpha === "") {
        dispatch(getHotSingerList());
      } else {
        dispatch(changeEnterLoading(true));
        dispatch(getSingerList(category, alpha));
      }
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Singers));
