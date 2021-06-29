import { configureStore } from '@reduxjs/toolkit';

import folderReducer from './folderSlice';
import photosReducer from './photosSlice';

const store = configureStore({
  reducer: {
    folders: folderReducer,
    photos: photosReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export * from './folderSlice';
