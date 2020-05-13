import { fromJS } from 'immutable';
import { SET_USERINFO } from './constants.js';
import * as auth from 'utils/auth';

export const initialState = fromJS({
  token: auth.getToken() || '',
  shopId: auth.getShopId() || ''
 
});

export default (state = initialState, action) => {
  switch (action.type) {
  case SET_USERINFO: {
    auth.setToken(action.user.token);
    auth.setUid(action.user.uid);
    return state
      .set('token', action.user.token)
      .set('shopId', action.user.shopId);
  }
  default: {
    return state;
  }
  }
};