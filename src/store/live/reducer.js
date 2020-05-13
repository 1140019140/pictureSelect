import { fromJS, remove } from 'immutable';
import { SET_KEEPALIVE, REMOVE_KEEPALIVE } from './constants.js';

const initState = fromJS({
  keepAliveList: []
});
export default (state = initState, action) => {
  // console.log('action: ', action);
  switch (action.type) {
  case SET_KEEPALIVE:
    let newStack = [...new Set(state.get('keepAliveList').concat(action.path))];
    return state.set('keepAliveList', newStack);
  case REMOVE_KEEPALIVE:
    let pathStack = state.get('keepAliveList');
    pathStack = remove(pathStack, pathStack.indexOf(action.path));
    return state.set('keepAliveList', pathStack);
  default: {
    return state;
  }
  }

};