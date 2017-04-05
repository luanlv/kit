import { combineReducers } from 'redux';
import user from './user';
import runtime from './runtime';
import { loadingBarReducer } from 'react-redux-loading-bar'
export default combineReducers({
  user,
  runtime,
  loadingBar: loadingBarReducer,
});
