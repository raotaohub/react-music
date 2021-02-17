/*
 * @Author: raotaohub
 * @Date: 2021-02-13 17:36:51
 * @LastEditTime: 2021-02-15 16:43:16
 * @LastEditors: raotaohub
 * @FilePath: \react-music\src\baseUI\scroll\index.js
 * @Description: 采用 better-scroll 打造了移动端滑动基础组件
 * API 说明 https://better-scroll.github.io/docs/zh-CN/guide/base-scroll-options.html#startx
 */
import React, {
  forwardRef,
  useState,
  useEffect,
  useRef,
  useMemo,
  useImperativeHandle,
} from "react";
import PropTypes from "prop-types";
import BScroll from "better-scroll";
import styled from "styled-components";
import Loading from "../loading/index";
import LoadingV2 from "../loading-v2/index";
import { debounce } from "../../api/utils";

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const PullUpLoading = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 5px;
  width: 60px;
  height: 60px;
  margin: auto;
  z-index: 100;
`;

export const PullDownLoading = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0px;
  height: 30px;
  margin: auto;
  z-index: 100;
`;

const Scroll = forwardRef((props, ref) => {
  const [bScroll, setBScroll] = useState(); // scroll 实例对象

  const scrollContainerRef = useRef();

  const { direction, click, refresh, bounceTop, bounceBottom } = props;

  const { pullUp, pullDown, onScroll, pullUpLoading, pullDownLoading } = props;

  const PullUpdisplayStyle = pullUpLoading
    ? { display: "" }
    : { display: "none" };

  const PullDowndisplayStyle = pullDownLoading
    ? { display: "" }
    : { display: "none" };

  const pullUpDebounce = useMemo(() => {
    return debounce(pullUp, 365);
  }, [pullUp]);

  const pullDownDebounce = useMemo(() => {
    return debounce(pullDown, 365);
  }, [pullDown]);

  // 初始化
  useEffect(() => {
    const scroll = new BScroll(scrollContainerRef.current, {
      scrollX: direction === "horizental", // 开启横向滚动。
      scrollY: direction === "vertical", // 开启纵向滚动。
      probeType: 3, //BetterScroll 实时派发 scroll 事件，是需要设置 probeType 为 3。
      click: click,
      bounce: {
        top: bounceTop,
        bottom: bounceBottom,
      },
    });
    setBScroll(scroll);
    return () => {
      setBScroll(null);
    };
    //eslint-disable-next-line
  }, []);

  //每次重新渲染都要刷新实例，防止无法滑动:
  useEffect(() => {
    if (refresh && bScroll) {
      bScroll.refresh(); // 重新计算 BetterScroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常。
    }
  });

  // 给实例绑定 scroll 事件
  useEffect(() => {
    if (!bScroll || !onScroll) return;
    bScroll.on("scroll", (scroll) => {
      onScroll(scroll);
    });
    return () => {
      bScroll.off("scroll");
    };
  }, [onScroll, bScroll]);

  // 进行上拉到底的判断，调用上拉刷新的函数
  useEffect(() => {
    if (!bScroll || !pullUp) return;
    bScroll.on("scrollEnd", () => {
      // 判断是否滑动到了底部
      if (bScroll.y <= bScroll.maxScrollY + 100) {
        pullUpDebounce();
      }
    });
    return () => {
      bScroll.off("scrollEnd");
    };
  }, [pullUp, bScroll, pullUpDebounce]);

  // 进行下拉的判断，调用下拉刷新的函数
  useEffect(() => {
    if (!bScroll || !pullDown) return;
    bScroll.on("touchEnd", (pos) => {
      // 判断用户的下拉动作
      if (pos.y > 50) {
        pullDownDebounce();
      }
    });
    return () => {
      bScroll.off("touchEnd");
    };
  }, [pullDown, bScroll, pullDownDebounce]);

  // 一般和 forwardRef 一起使用，ref 已经在 forWardRef 中默认传入
  useImperativeHandle(ref, () => ({
    // 给外界暴露 refresh 方法
    refresh() {
      if (bScroll) {
        bScroll.refresh();
        bScroll.scrollTo(0, 0);
      }
    },
    // 给外界暴露 getBScroll 方法，提供 bs 实例
    getBScroll() {
      if (bScroll) {
        return bScroll;
      }
    },
  }));

  return (
    <ScrollContainer ref={scrollContainerRef}>
      {props.children}
      {/* 滑到底部加载动画 */}
      <PullUpLoading style={PullUpdisplayStyle}>
        <Loading></Loading>
      </PullUpLoading>
      {/* 顶部下拉刷新动画 */}
      <PullDownLoading style={PullDowndisplayStyle}>
        <LoadingV2></LoadingV2>
      </PullDownLoading>
    </ScrollContainer>
  );
});

// 设置默认属性值
Scroll.defaultProps = {
  direction: "vertical",
  click: true,
  refresh: true,
  onScroll: null,
  pullUpLoading: false,
  pullDownLoading: false,
  pullUp: null,
  pullDown: null,
  bounceTop: true,
  bounceBottom: true,
};

// 设置类型限制
Scroll.propTypes = {
  direction: PropTypes.oneOf(["vertical", "horizental"]),
  refresh: PropTypes.bool,
  onScroll: PropTypes.func,
  pullUp: PropTypes.func,
  pullDown: PropTypes.func,
  pullUpLoading: PropTypes.bool,
  pullDownLoading: PropTypes.bool,
  bounceTop: PropTypes.bool, // 是否支持向上吸顶
  bounceBottom: PropTypes.bool, // 是否支持向上吸顶
};

export default Scroll;
