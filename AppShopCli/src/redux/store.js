import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import reducer from './reducers';

export default configureStore({
  reducer,
  middleware: getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  }),
});
