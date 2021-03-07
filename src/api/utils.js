/*
 * @Author: raotaohub
 * @Date: 2021-02-13 16:54:19
 * @LastEditTime: 2021-03-07 18:01:34
 * @LastEditors: raotaohub
 * @FilePath: \react-music\src\api\utils.js
 * @Description: 工具类函数
 */
import { RankTypes } from './config';

export const getCount = count => {
  if (count < 0) return;
  if (count < 10000) {
    return count;
  } else if (Math.floor(count / 10000) < 10000) {
    return Math.floor(count / 1000) / 10 + '万';
  } else {
    return Math.floor(count / 10000000) / 10 + '亿';
  }
};

export const debounce = (fn, wait) => {
  let timer = null;
  return function (...args) {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
      clearTimeout(timer);
    }, wait);
  };
};

export const filterIndex = rankList => {
  for (let i = 0; i < rankList.length - 1; i++) {
    if (rankList[i].tracks.length && !rankList[i + 1].tracks.length) {
      return i + 1;
    }
  }
};

export const filterIdx = name => {
  for (var key in RankTypes) {
    if (RankTypes[key] === name) return key;
  }
  return null;
};

export const getName = list => {
  let str = '';
  list.map((item, index) => {
    str += index === 0 ? item.name : '/' + item.name;
    return item;
  });
  return str;
};

// 判断是否为空对象
export const isEmptyObject = obj => !obj || Object.keys(obj).length === 0;
