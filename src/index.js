/*
 * @Author: raotaohub
 * @Date: 2021-02-12 23:51:27
 * @LastEditTime: 2021-02-14 14:26:45
 * @LastEditors: raotaohub
 * @FilePath: \react-music\src\index.js
 * @Description: 入口文件
 */
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.register();
