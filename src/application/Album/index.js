/*
 * @Author: raotaohub
 * @Date: 2021-03-06 17:47:23
 * @LastEditTime: 2021-03-07 19:57:39
 * @LastEditors: raotaohub
 * @FilePath: \react-music\src\application\Album\index.js
 * @Description: 切入歌曲详情页时的动画效果由 react-transition-group 库完成。
 * 路由一旦变化，对应的组件就会立刻被卸载，因此将路由跳转的逻辑放在动画执行完毕之后。
 */
// ---------------------- 引入库     ----------------------
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

// ---------------------- 引入全局样式对象     ----------------------
import style from '../../assets/global-style';

// ---------------------- 引入自定义工具 --------------------
import { getCount, getName, isEmptyObject } from '../../api/utils';

// ---------------------- 引入UI组件 ----------------------
import { Container, TopDesc, Menu, SongList, SongItem } from './style';
import Header from '../../baseUI/header/index';
import Scroll from '../../baseUI/scroll/index';
import Loading from '../../baseUI/loading/index';

// ---------------------- 引入action ----------------------
import { getAlbumList, changeEnterLoading } from './store/actionCreators';

export const HEADER_HEIGHT = 45;

function Album(props) {
  const { currentAlbum: currentAlbumImmutable, enterLoading } = props;
  const { getAlbumDataDispatch } = props;
  const [showStatus, setShowStatus] = useState(true);
  const [title, setTitle] = useState('歌单');
  const [isMarquee, setIsMarquee] = useState(false); // 是否跑马灯
  const id = props.match.params.id;
  const headerEl = useRef();

  let currentAlbum = currentAlbumImmutable.toJS();

  const handleBack = useCallback(() => {
    setShowStatus(false);
  }, []);

  const handleScroll = useCallback(
    pos => {
      let minScrollY = -HEADER_HEIGHT;
      let percent = Math.abs(pos.y / minScrollY);
      let headerDom = headerEl.current;
      //滑过顶部的高度开始变化
      if (pos.y < minScrollY) {
        headerDom.style.backgroundColor = style['theme-color'];
        headerDom.style.opacity = Math.min(1, (percent - 1) / 2);
        setTitle(currentAlbum.name);
        setIsMarquee(true);
      } else {
        headerDom.style.backgroundColor = '';
        headerDom.style.opacity = 1;
        setTitle('歌单');
        setIsMarquee(false);
      }
    },
    [currentAlbum]
  );

  useEffect(() => {
    getAlbumDataDispatch(id);
  }, [getAlbumDataDispatch, id]);

  /**
   * 检测CSSTransition 组件的类名变化
   */
  const container = useRef();
  useEffect(() => {
    console.log(
      '- 刚开始时的 class 为：',
      container.current.classList.toString()
    );
    const observer = new MutationObserver(function () {
      console.log(
        '然后 class 变更为：',
        container.current && container.current.classList.toString()
      );
    });
    observer.observe(container.current, {
      attributes: true,
    });
  }, []);

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={props.history.goBack}
    >
      <Container ref={container}>
        <Header
          title={title}
          handleClick={handleBack}
          ref={headerEl}
          isMarquee={isMarquee}
        ></Header>
        {!isEmptyObject(currentAlbum) ? (
          <Scroll bounceTop={false} onScroll={handleScroll}>
            <div>
              <TopDesc background={currentAlbum.coverImgUrl}>
                <div className="background">
                  <div className="filter"></div>
                </div>
                <div className="img_wrapper">
                  <div className="decorate"></div>
                  <img src={currentAlbum.coverImgUrl} alt="" />
                  <div className="play_count">
                    <i className="iconfont play">&#xe885;</i>
                    <span className="count">
                      {Math.floor(currentAlbum.subscribedCount / 1000) / 10} 万{' '}
                    </span>
                  </div>
                </div>
                <div className="desc_wrapper">
                  <div className="title">{currentAlbum.name}</div>
                  <div className="person">
                    <div className="avatar">
                      <img src={currentAlbum.creator.avatarUrl} alt="" />
                    </div>
                    <div className="name">{currentAlbum.creator.nickname}</div>
                  </div>
                </div>
              </TopDesc>
              <Menu>
                <div>
                  <i className="iconfont">&#xe6ad;</i>
                  评论
                </div>
                <div>
                  <i className="iconfont">&#xe86f;</i>
                  点赞
                </div>
                <div>
                  <i className="iconfont">&#xe62d;</i>
                  收藏
                </div>
                <div>
                  <i className="iconfont">&#xe606;</i>
                  更多
                </div>
              </Menu>
              <SongList>
                <div className="first_line">
                  <div className="play_all">
                    <i className="iconfont">&#xe6e3;</i>
                    <span>
                      {' '}
                      播放全部{' '}
                      <span className="sum">
                        (共 {currentAlbum.tracks.length} 首)
                      </span>
                    </span>
                  </div>
                  <div className="add_list">
                    <i className="iconfont">&#xe62d;</i>
                    <span>
                      {' '}
                      收藏 ({getCount(currentAlbum.subscribedCount)})
                    </span>
                  </div>
                </div>
                <SongItem>
                  {currentAlbum.tracks.map((item, index) => {
                    return (
                      <li key={index}>
                        <span className="index">{index + 1}</span>
                        <div className="info">
                          <span>{item.name}</span>
                          <span>
                            {getName(item.ar)} - {item.al.name}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </SongItem>
              </SongList>
            </div>
          </Scroll>
        ) : null}

        {enterLoading ? <Loading></Loading> : null}
      </Container>
    </CSSTransition>
  );
}

const mapStateToProps = state => ({
  currentAlbum: state.getIn(['album', 'currentAlbum']),
  enterLoading: state.getIn(['album', 'enterLoading']),
});

const mapDispatchToProps = dispatch => {
  return {
    getAlbumDataDispatch(id) {
      dispatch(changeEnterLoading(true));
      dispatch(getAlbumList(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Album));
