import { SET_KEEPALIVE, REMOVE_KEEPALIVE } from './constants.js';

export const addCachePath = (record) => ({
  type: SET_KEEPALIVE,
  path: record
});

export const removeCachePath = (record) => ({
  type: REMOVE_KEEPALIVE,
  path: record
});