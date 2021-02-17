/*
 * @Author: raotaohub
 * @Date: 2021-02-13 00:42:05
 * @LastEditTime: 2021-02-14 17:10:02
 * @LastEditors: raotaohub
 * @FilePath: \react-music\src\application\Home\index.js
 * @Description: Edit......
 */

import React from "react";
import { renderRoutes } from "react-router-config";
import { Top, Tab, TabItem } from "./style";
import { NavLink } from "react-router-dom";

function Home(props) {
  const { route } = props;

  return (
    <>
      <Top>
        <span className="iconfont menu">&#xe65c;</span>
        <span className="title iconfont">&#xe885;zune</span>
        <span className="iconfont search">&#xe62b;</span>
      </Top>
      <Tab>
        <NavLink to="/recommend">
          <TabItem>
            <span>推荐</span>
          </TabItem>
        </NavLink>
        <NavLink to="/singers">
          <TabItem>
            <span>歌手</span>
          </TabItem>
        </NavLink>
        <NavLink to="/rank">
          <TabItem>
            <span>排行榜</span>
          </TabItem>
        </NavLink>
      </Tab>
      {renderRoutes(route.routes)}
    </>
  );
}

export default React.memo(Home);

/*
  ## renderRoutes(routes)会把routes作为props.route的属性传入到Home组件中； 
  ## renderRoutes 这个方法只渲染一层路由；
  ## 因此在下1层组件中再调用即可；
  
  console.log(routes);
  component: {$$typeof: Symbol(react.memo), compare: null, type: ƒ}
  path: "/"
  routes: (5) [{…}, {…}, {…}, {…}, {…}] 
*/
