import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import storage from '@react-native-async-storage/async-storage';
import * as FS from '@/shared/utils/fsFunctions';

import 'react-native-get-random-values';
import { v1 as uuidv1 } from 'uuid';
import {
  RootState,
  IUserFolderState,
  IStoredFolder,
  IError,
  IFolder,
  eLOADING,
  AppDispatch,
} from '../types';

const initialState: IUserFolderState = {
  entries: [],
  loading: eLOADING.idle,
  error: null,
};

const addUserFolderInStorage = createAsyncThunk<
  IStoredFolder[],
  IStoredFolder,
  {
    state: RootState;
    rejectValue: IError;
  }
>('folders/addUserFolderInStorage', async (folder, thunkAPI) => {
  try {
    const prevUserFolders = thunkAPI.getState().folders.entries;
    const newUserFolders = [...prevUserFolders, folder];
    await storage.setItem('userFolders', JSON.stringify(newUserFolders));
    return newUserFolders;
  } catch {
    await FS.deleteFolder(folder.name);
    return thunkAPI.rejectWithValue({ errorMessage: 'AsyncStorage에 폴더 추가가 실패했습니다' });
  }
});

export const createUserFolder = createAsyncThunk<
  void,
  IFolder,
  {
    dispatch: AppDispatch;
    rejectValue: IError;
  }
>('folders/createUserFolder', async (folder, thunkAPI) => {
  try {
    await FS.createFolder(folder.name);
    thunkAPI.dispatch(addUserFolderInStorage({ ...folder, id: uuidv1() }));
  } catch {
    return thunkAPI.rejectWithValue({ errorMessage: '내장메모리에 폴더 생성이 실패했습니다' });
  }
});

const folderSlice = createSlice({
  name: 'folders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserFolder.pending, (state) => {
        state.loading = eLOADING.pending;
        state.error = null;
      })
      .addCase(createUserFolder.rejected, (state, action) => {
        state.loading = eLOADING.failed;
        state.error = action.payload?.errorMessage || '폴더 생성 실패';
      })
      .addCase(addUserFolderInStorage.fulfilled, (state, action) => {
        state.loading = eLOADING.idle;
        state.entries = action.payload;
      })
      .addCase(addUserFolderInStorage.rejected, (state, action) => {
        state.loading = eLOADING.failed;
        state.error = action.payload?.errorMessage || '폴더 생성 실패';
      });
  },
});

export default folderSlice.reducer;
