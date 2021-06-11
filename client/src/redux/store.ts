import { configureStore, createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

interface IStoredFolder {
  id: string;
  name: string;
  borderColor: string;
}

const folderSlice = createSlice<IStoredFolder[], SliceCaseReducers<IStoredFolder[]>, 'folders'>({
  name: 'folders',
  initialState: [],
  reducers: {
    increment: (state: IStoredFolder[], action: PayloadAction<IStoredFolder>) => [
      ...state,
      action.payload,
    ],
    decrement: (state: IStoredFolder[], action: PayloadAction<{ id: string }>) =>
      state.filter(prevFolder => prevFolder.id !== action.payload.id),
  },
});

export const { increment, decrement } = folderSlice.actions;

const store = configureStore({
  reducer: folderSlice.reducer,
});

// TODO: 비동기 추가 - asyncStorage 에 저장/삭제
export const useUserFolders = () => {
  const dispatch = useDispatch();
  const addUserFolder = (payload: IStoredFolder) => {
    dispatch(increment(payload));
  };
  const removeUserFolder = (id: string) => {
    dispatch(decrement({ id }));
  };

  const userFolders = useSelector((state: IStoredFolder[]) => state);

  return { userFolders, addUserFolder, removeUserFolder };
};

export default store;
