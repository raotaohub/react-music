/*
 * @Author: raotaohub
 * @Date: 2021-02-12 23:51:27
 * @LastEditTime: 2021-03-06 11:21:19
 * @LastEditors: raotaohub
 * @FilePath: \react-music\src\App.js
 * @Description: App壳
 */
import React, { Suspense } from 'react';
import { GlobalStyle } from './style';
import { IconStyle } from './assets/iconfont/iconfont';
import { Provider } from 'react-redux'; // Provider 让所有组件都可以得到state数据
import store from './store';
import routes from './routes';
import { HashRouter } from 'react-router-dom'; // 对路由配置进行集中式管理类似vue的
import { renderRoutes } from 'react-router-config';
import { Data } from './application/Singers/data';

function App() {
  return (
    <Suspense fallback={<h1> Loading... </h1>}>
      <Provider store={store}>
        <HashRouter>
          <GlobalStyle></GlobalStyle>
          <IconStyle></IconStyle>
          <Data>{renderRoutes(routes)}</Data>
        </HashRouter>
      </Provider>
    </Suspense>
  );
}

export default React.memo(App); //组件优化
// !: :
