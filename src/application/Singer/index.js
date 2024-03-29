import React, {useState} from 'react';
import {CSSTransition} from "react-transition-group";

import {Container, ImgWrapper, BgLayer, CollectButton, SongListWrapper} from "./style";
import SongsList from "../SongList";
import Header from '../../baseUI/header'
import Scroll from "../../baseUI/scroll";

function Singer(props) {
  const [showStatus, setShowStatus] = useState(true)

  //mock
  const artist = {
    picUrl: "https://p2.music.126.net/W__FCWFiyq0JdPtuLJoZVQ==/109951163765026271.jpg",
    name: "薛之谦",
    hotSongs: [
      {
        name: "我好像在哪见过你",
        ar: [{name: "薛之谦"}],
        al: {
          name: "薛之谦专辑"
        }
      },
      {
        name: "我好像在哪见过你",
        ar: [{name: "薛之谦"}],
        al: {
          name: "薛之谦专辑"
        }
      },
      // 省略 20 条
    ]
  }

  return (
      <CSSTransition
          in={showStatus}
          timeout={300}
          classNames="fly"
          appear={true}
          unmountOnExit
          onExited={() => props.history.goBack ()}
      >
        <Container>
          <Header title={"头部"}></Header>
          <ImgWrapper bgUrl={artist.picUrl}>
            <div className="filter"></div>
          </ImgWrapper>
          <CollectButton>
            <i className="iconfont">&#xe62d;</i>
            <span className="text"> 收藏 </span>
          </CollectButton>
           <BgLayer></BgLayer>
          <SongListWrapper>
            <Scroll>
              <SongsList
                  songs={artist.hotSongs}
                  showCollect={false}
              ></SongsList>
            </Scroll>
          </SongListWrapper>
        </Container>
      </CSSTransition>
  );
}

// function mapStateToProps(state) {
//   return {};
// }
// const mapDispatchToProps = (dispatch) => {
//   return () => {
//
//   }
// }
export default React.memo(Singer)
