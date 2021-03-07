/*
 * @Author: raotaohub
 * @Date: 2021-02-13 21:08:06
 * @LastEditTime: 2021-03-07 17:29:35
 * @LastEditors: raotaohub
 * @FilePath: \react-music\src\api\request.js
 * @Description: 封装请求方法
 */

import { axiosInstance } from './config';

export const getBannerRequest = () => {
  return axiosInstance.get('/banner');
};

export const getRecommendListRequest = () => {
  return axiosInstance.get('/personalized');
};

// https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e7%83%ad%e9%97%a8%e6%ad%8c%e6%89%8b
export const getHotSingerListRequest = count => {
  return axiosInstance.get(`/top/artists?offset=${count}`);
};

// https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e6%ad%8c%e6%89%8b%e5%88%86%e7%b1%bb%e5%88%97%e8%a1%a8
export const getSingerListRequest = (category, alpha, count) => {
  if (category <= 3) {
    return axiosInstance.get(
      `/artist/list?type=${category}&initial=${alpha.toLowerCase()}&offset${count}`
    );
  } else {
    return axiosInstance.get(
      `/artist/list?type=1&area=${category}&initial=${alpha.toLowerCase()}&offset${count}`
    );
  }
};

export const getRankTopListRequest = () => {
  return axiosInstance.get('/toplist/detail');
};

// 请求推荐页专辑歌单
export const getAlbumDetailRequest = id => {
  return axiosInstance.get(`/playlist/detail?id=${id}`);
};
