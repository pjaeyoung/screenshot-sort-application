import { configureStore } from '@reduxjs/toolkit';

import folderReducer from './folderSlice';

const store = configureStore({
  reducer: {
    folders: folderReducer,
  },
});

export default store;

export * from './folderSlice';
