import { createSlice, PayloadAction, SliceCaseReducers, CaseReducer } from '@reduxjs/toolkit';
import { useAppSelector, useAppDispatch } from './hooks';

//test

interface IStoredFolder {
  id: string | number;
  folderName: string;
  borderColor: string;
}

const loadAllFoldersCase: CaseReducer<IStoredFolder[], PayloadAction<IStoredFolder[]>> = (
  state,
  action,
) => action.payload;

const folderSlice = createSlice<IStoredFolder[], SliceCaseReducers<IStoredFolder[]>, 'folders'>({
  name: 'folders',
  initialState: [],
  reducers: {
    loadAllFolders: loadAllFoldersCase,
    increment: (state: IStoredFolder[], action: PayloadAction<IStoredFolder>) => [
      ...state,
      action.payload,
    ],
    decrement: (state: IStoredFolder[], action: PayloadAction<{ id: string }>) =>
      state.filter(prevFolder => prevFolder.id !== action.payload.id),
  },
});

export default folderSlice.reducer;

export const { loadAllFolders, increment, decrement } = folderSlice.actions;

// TODO: 비동기 추가 - asyncStorage 에 저장/삭제
export const useUserFolders = () => {
  const dispatch = useAppDispatch();

  const addUserFolder = (payload: IStoredFolder) => {
    dispatch(increment(payload));
  };
  const removeUserFolder = (id: string) => {
    dispatch(decrement({ id }));
  };

  const userFolders = useAppSelector(state => state.folders);

  const getUserAllFolders = () => userFolders;
  const getUserFolderById = (id: number) => userFolders.find(folder => folder.id == id);

  return {
    userFolders,
    getUserAllFolders,
    getUserFolderById,
    addUserFolder,
    removeUserFolder,
  };
};
