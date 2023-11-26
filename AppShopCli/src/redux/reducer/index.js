import {combineReducers} from '@reduxjs/toolkit';
import auth from './auth';

const appReducer = combineReducers({
  auth,
});

export default appReducer;
