import {combineReducers} from '@reduxjs/toolkit';
import user from './user';
import chat from './chat';
import order from './order';
import product from './product';

const appReducer = combineReducers({
  user,
  chat,
  order,
  product,
});

export default appReducer;
