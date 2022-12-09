import { configureStore } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';
import configReducer from './slices/config';
import historyReducer from './slices/history';

const store = configureStore({
  reducer: {
    config: configReducer,
    history: historyReducer,
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), logger],
});

export default store;
