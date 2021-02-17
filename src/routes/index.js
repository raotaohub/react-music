/*
 * @Author: raotaohub
 * @Date: 2021-02-13 00:40:28
 * @LastEditTime: 2021-02-13 15:37:52
 * @LastEditors: raotaohub
 * @FilePath: \react-music\src\routes\index.js
 * @Description: Edit......
 */
import React from "react";
import { Redirect } from "react-router-dom";
import Home from "../application/Home";
import Rank from "../application/Rank";
import Recommend from "../application/Recommend";
import Singers from "../application/Singers";
import Search from "../application//Search";

export default [
  {
    path: "/",
    component: Home,
    routes: [
      {
        path: "/",
        exact: true,
        render: () => <Redirect to={"/recommend"} />,
      },
      {
        path: "/recommend",
        component: Recommend,
      },
      {
        path: "/singers",
        component: Singers,
      },
      {
        path: "/rank",
        component: Rank,
      },
      {
        path: "/search",
        component: Search,
      },
    ],
  },
];
