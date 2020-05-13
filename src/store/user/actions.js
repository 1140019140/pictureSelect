import { SET_USERINFO } from './constants.js';

export const setUserInfo = (user) => ({
  type: SET_USERINFO,
  user: user
});

export const INCREMENT = () => ({
  type: INCREMENT
});

