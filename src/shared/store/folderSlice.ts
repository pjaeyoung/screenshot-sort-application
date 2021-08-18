import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';

import * as FS from '@/shared/utils/fsFunctions';

import 'react-native-get-random-values';
import { v1 as uuidv1 } from 'uuid';
import { IUserFolderState, IStoredFolder, IError, IFolder, eLOADING, AppDispatch } from '../types';

const initialState: IUserFolderState = {
  entries: [],
  loading: eLOADING.idle,
  error: null,
};

export const createUserFolder = createAsyncThunk<
  IStoredFolder,
  IFolder,
  {
    dispatch: AppDispatch;
    rejectValue: IError;
  }
>('folders/createUserFolder', async (folder, thunkAPI) => {
  try {
    await FS.createFolder(folder.name);
    return { ...folder, id: uuidv1() };
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
      .addCase(createUserFolder.fulfilled, (state, action) => {
        state.loading = eLOADING.idle;
        state.entries.push(action.payload);
      })
      .addCase(PURGE, (state) => {
        state.entries = [];
      });
  },
});

export default folderSlice.reducer;
