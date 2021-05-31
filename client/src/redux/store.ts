import { configureStore, createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';
import { FolderType } from '@/shared/types';
import { useDispatch, useSelector } from 'react-redux';

const folderSlice = createSlice<FolderType[], SliceCaseReducers<FolderType[]>, 'folders'>({
  name: 'folders',
  initialState: [],
  reducers: {
    increment: (state: FolderType[], action: PayloadAction<FolderType>) => [
      ...state,
      action.payload,
    ],
    decrement: (state: FolderType[], action: PayloadAction<{ id: string }>) =>
      state.filter(prevFolder => prevFolder.id !== action.payload.id),
  },
});

export const { increment, decrement } = folderSlice.actions;

const store = configureStore({
  reducer: folderSlice.reducer,
});

export const useUserFolders = () => {
  const dispatch = useDispatch();
  const addUserFolder = (payload: FolderType) => {
    dispatch(increment(payload));
  };
  const removeUserFolder = (id: string) => {
    dispatch(decrement({ id }));
  };

  const userFolders = useSelector((state: FolderType[]) => state);

  return { userFolders, addUserFolder, removeUserFolder };
};

export default store;
