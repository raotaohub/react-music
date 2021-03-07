/*
 * @Author: raotaohub
 * @Date: 2021-03-07 17:43:07
 * @LastEditTime: 2021-03-07 18:04:57
 * @LastEditors: raotaohub
 * @FilePath: \react-music\src\application\Album\store\actionCreators.js
 * @Description: Edit......
 */
import { CHANGE_CURRENT_ALBUM, CHANGE_ENTER_LOADING } from './constant';
import { getAlbumDetailRequest } from '../../../api/request';
import { fromJS } from 'immutable';

export const changeCurrentAlbum = data => ({
  type: CHANGE_CURRENT_ALBUM,
  data: fromJS(data),
});

export const changeEnterLoading = data => ({
  type: CHANGE_ENTER_LOADING,
  data,
});

export const getAlbumList = id => {
  return dispatch => {
    getAlbumDetailRequest(id)
      .then(res => {
        let data = res.playlist;
        dispatch(changeCurrentAlbum(data));
        dispatch(changeEnterLoading(false));
      })
      .catch(() => {
        console.log(
          '\react-musicsrcapplicationAlbumstoreactionCreators.js 获取数据失败！'
        );
      });
  };
};
