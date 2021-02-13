/*
 * @Author: raotaohub
 * @Date: 2021-02-12 23:51:27
 * @LastEditTime: 2021-02-13 15:32:30
 * @LastEditors: raotaohub
 * @FilePath: \react-music\src\App.js
 * @Description: App壳
 */
import React from "react";
import { GlobalStyle } from "./style";
import { IconStyle } from "./assets/iconfont/iconfont";
import { Provider } from "react-redux"; // Provider 让所有组件都可以得到state数据
import store from "./store";
import routes from "./routes";
import { HashRouter } from "react-router-dom"; // 对路由配置进行集中式管理类似vue的
import { renderRoutes } from "react-router-config";

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <GlobalStyle></GlobalStyle>
        <IconStyle></IconStyle>
        {renderRoutes(routes)}
      </HashRouter>
    </Provider>
  );
}

export default React.memo(App); //组件优化
