import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import login from '../store/user/reducer';
import live from '../store/live/reducer';

const rootReducer = (history) => combineReducers({
  login,
  router: connectRouter(history),
  live
});
export default rootReducer;