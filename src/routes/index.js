/*
 * @Author: raotaohub
 * @Date: 2021-02-13 00:40:28
 * @LastEditTime: 2021-03-07 20:29:16
 * @LastEditors: raotaohub
 * @FilePath: \react-music\src\routes\index.js
 * @Description: Edit......
 */
import React from 'react';
import { Redirect } from 'react-router-dom';
import Home from '../application/Home';
import Rank from '../application/Rank';
import Recommend from '../application/Recommend';
import Singers from '../application/Singers';
import Search from '../application//Search';
import Album from '../application/Album';
import Singer from '../application/Singer'

export default [
  {
    path: '/',
    component: Home,
    routes: [
      {
        path: '/',
        exact: true,
        render: () => <Redirect to={'/recommend'} />,
      },
      {
        path: '/recommend',
        component: Recommend,
        routes: [
          {
            path: '/recommend/:id',
            component: Album,
          },
        ],
      },
      {
        path: '/singers',
        component: Singers,
        routes: [
          {
            path: '/singers/:id',
            component: Singer,
          },
        ],
      },
      {
        path: '/rank',
        component: Rank,
        routes: [
          {
            path: '/rank/:id',
            component: Album,
          },
        ],
      },
      {
        path: '/search',
        component: Search,
      },
    ],
  },
];
