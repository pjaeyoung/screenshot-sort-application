import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';

import { IPhotosState, IPhotosInStorage } from '@/shared/types';
import { useAppSelector } from '@/redux/hooks';

const initialState = {
  folderId: null,
  ids: null,
  entities: null,
} as IPhotosState;

const loadPhotosInFolderCase: CaseReducer<IPhotosState, PayloadAction<IPhotosState>> = (
  state,
  action,
) => action.payload;

const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    loadPhotosInFolder: loadPhotosInFolderCase,
  },
});

export default photosSlice.reducer;

export const { loadPhotosInFolder } = photosSlice.actions;

export const usePhotosInFolder = () => {
  const photosSlice = useAppSelector(state => state.photos);
  const { ids, entities } = photosSlice;

  const getAllPhotosInFolder = () => (entities && ids?.map((id: number) => entities[id])) || null;
  const getPhotoById = (photoId: number) => (entities && entities[photoId]) || null;

  return {
    getAllPhotosInFolder,
    getPhotoById,
  };
};
