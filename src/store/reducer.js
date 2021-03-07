/*
 * @Author: raotaohub
 * @Date: 2021-02-13 15:03:44
 * @LastEditTime: 2021-03-07 17:50:42
 * @LastEditors: raotaohub
 * @FilePath: \react-music\src\store\reducer.js
 * @Description: Edit......
 */
import { combineReducers } from 'redux-immutable';
import { reducer as recommendReducer } from '../application/Recommend/store/index';
import { reducer as singersReducer } from '../application/Singers/store/index';
import { reducer as rankReducer } from '../application/Rank/store/index';
import { reducer as albumReducer } from '../application/Album/store/index';

export default combineReducers({
  recommend: recommendReducer,
  singers: singersReducer,
  rank: rankReducer,
  album: albumReducer,
});
