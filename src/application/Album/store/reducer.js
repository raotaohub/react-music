/*
 * @Author: raotaohub
 * @Date: 2021-03-07 17:37:00
 * @LastEditTime: 2021-03-07 17:41:29
 * @LastEditors: raotaohub
 * @FilePath: \react-music\src\application\Album\store\reducer.js
 * @Description: Edit......
 */
import * as actionTypes from './constant';
import { fromJS } from 'immutable';

const initialState = fromJS({
  currentAlbum: {},
  enterLoading: false,
});

export default (state = initialState, { type, data }) => {
  switch (type) {
    case actionTypes.CHANGE_CURRENT_ALBUM:
      return state.set('currentAlbum', data);
    case actionTypes.CHANGE_ENTER_LOADING:
      return state.set('enterLoading', data);
    default:
      return state;
  }
};
