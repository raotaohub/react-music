/*
 * @Author: raotaohub
 * @Date: 2021-03-05 18:00:55
 * @LastEditTime: 2021-03-06 13:08:56
 * @LastEditors: raotaohub
 * @FilePath: \react-music\src\application\Singers\data.js
 * @Description: hooks 实现简单 redux
 */
import React, { createContext, useReducer } from 'react';
import { fromJS } from 'immutable';

export const CategoryDataContext = createContext({});

/**
 * 常量 用于定义action的类型
 */
export const CHANGE_CATEGORY = 'singers/CHANGE_CATEGORY';
export const CHANGE_ALPHA = 'singer/CHANGE_ALPHA';

/**
 * reducer 纯函数
 */
const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_CATEGORY:
      return state.set('category', action.data);
    case CHANGE_ALPHA:
      return state.set('alpha', action.data);
    default:
      return state;
  }
};

/**
 * @useReducer 返回当前的 state 以及与其配套的 dispatch 方法
 * 适用场景：state逻辑复杂且包含多个子值，或是下一个state依赖之前的state等情况
 */
export const Data = props => {
  const [data, dispatch] = useReducer(
    reducer,
    fromJS({
      category: '',
      alpha: '',
    })
  );
  return (
    <CategoryDataContext.Provider value={{ data, dispatch }}>
      {props.children}
    </CategoryDataContext.Provider>
  );
};
