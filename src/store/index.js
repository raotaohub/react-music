/*
 * @Author: raotaohub
 * @Date: 2021-02-13 15:03:32
 * @LastEditTime: 2021-02-14 23:32:26
 * @LastEditors: raotaohub
 * @FilePath: \react-music\src\store\index.js
 * @Description: Edit......
 */
// https://cn.redux.js.org/docs/api/compose.html
// compose的返回值 (Function): 从右到左把接收到的函数合成后的最终函数。compose 做的只是让你在写深度嵌套的函数时，避免了代码的向右偏移

import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk"; // 异步中间件
import reducer from "./reducer"; // 合并后的reducer
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
