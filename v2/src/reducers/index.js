import { combineReducers } from 'redux';
import { routerStateReducer as router } from 'redux-router';
import { reducer as form } from 'redux-form';
import { authReducer as auth } from './auth_reducer';
import { botReducer as bot } from './bot_reducer';
import { plantReducer as plant } from './plant_reducer'
import { oldRouteReducer as route } from './old_reducers';
import { oldGlobalReducer as global } from './old_reducers';

export default combineReducers({
  router,
  form,
  auth,
  bot,
  plant,
  route,
  global
});