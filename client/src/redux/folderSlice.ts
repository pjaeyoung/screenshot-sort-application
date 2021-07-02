import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { useAppSelector, useAppDispatch } from './hooks';
import storage from '@/shared/utils/handleAsyncStorage';
import * as FS from '@/shared/utils/fsFunctions';
export interface IStoredFolder {
  id: string;
  folderName: string;
  borderColor: string;
  filePath: string;
}

export enum LOADING {
  IDLE = 'idle',
  PENDING = 'pending',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
}

export interface IUserFolderState {
  entries: IStoredFolder[];
  loading: LOADING;
}

const increment = createAsyncThunk('increment', async (newUserFolder: IStoredFolder, thunkAPI) => {
  const { entries, loading } = thunkAPI.getState().folders as IUserFolderState;
  try {
    const newEntries = [...entries, newUserFolder];
    await FS.createFolder(newUserFolder.folderName);
    await storage.setUserFolders(newEntries);
    return { entries: newEntries, loading };
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue({ entries, loading: LOADING.FAILED });
  }
});

const decrement = createAsyncThunk('decrement', async (removedId: string, thunkAPI) => {
  const { entries, loading } = thunkAPI.getState().folders as IUserFolderState;
  try {
    const removedUserFolder = entries.find(({ id }) => id === removedId);
    if (removedUserFolder === undefined) throw new Error();
    await FS.deleteFolder(removedUserFolder.folderName);

    const newEntries = entries.filter(({ id }) => id !== removedId);
    await storage.setUserFolders(newEntries);
    return { entries: newEntries, loading };
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue({ entries, loading: LOADING.FAILED });
  }
});

const update = createAsyncThunk('update', async (updatedUserFolder: IStoredFolder, thunkAPI) => {
  const { entries, loading } = thunkAPI.getState().folders as IUserFolderState;
  try {
    const updatedIndex = entries.findIndex(({ id }) => id === updatedUserFolder.id);
    if (updatedIndex === -1) throw Error('아이디를 찾을 수 없습니다.');
    const oldFolderName = entries[updatedIndex].folderName;

    await FS.renameFolder({ oldFolderName, newFolderName: updatedUserFolder.folderName });
    const newEntries = [
      ...entries.slice(0, updatedIndex),
      updatedUserFolder,
      ...entries.slice(updatedIndex + 1),
    ];
    await storage.setUserFolders(newEntries);
    return { entries: newEntries, loading };
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue({ entries, loading: LOADING.FAILED });
  }
});

const initialState: IUserFolderState = {
  entries: [],
  loading: LOADING.IDLE,
};

const handlePending = (state: IUserFolderState) => {
  state.loading = LOADING.PENDING;
  return state;
};

const handleFailed = (state: IUserFolderState) => {
  state.loading = LOADING.FAILED;
  return state;
};

const handleSucceeded = (state: IUserFolderState, action: PayloadAction<IUserFolderState>) => {
  action.payload.loading = LOADING.SUCCEEDED;
  return action.payload;
};

const folderSlice = createSlice({
  name: 'folders',
  initialState,
  reducers: {
    setUserAllFolders: (state, action: PayloadAction<IStoredFolder[] | undefined | null>) => {
      state.entries = action.payload ?? [];
      return state;
    },
  },
  extraReducers: {
    [`${increment.pending}`]: handlePending,
    [`${increment.rejected}`]: handleFailed,
    [`${increment.fulfilled}`]: handleSucceeded,
    [`${decrement.pending}`]: handlePending,
    [`${decrement.rejected}`]: handleFailed,
    [`${decrement.fulfilled}`]: handleSucceeded,
    [`${update.pending}`]: handlePending,
    [`${update.rejected}`]: handleFailed,
    [`${update.fulfilled}`]: handleSucceeded,
  },
});

const { setUserAllFolders: _setUserAllFolders } = folderSlice.actions;

export default folderSlice.reducer;

export const useUserFolders = () => {
  const dispatch = useAppDispatch();
  const { entries: userFolders, loading } = useAppSelector(state => state.folders);
  const addUserFolder = (payload: IStoredFolder) => {
    return dispatch(increment(payload));
  };

  const setUserAllFolders = (payload: IStoredFolder[] | null | undefined) => {
    dispatch(_setUserAllFolders(payload));
  };

  const removeUserFolder = (removedId: string) => {
    return dispatch(decrement(removedId));
  };

  const editUserFolder = (payload: IStoredFolder) => {
    return dispatch(update(payload));
  };

  const getUserAllFolders = () => userFolders;
  const getUserFolderById = (id: string) => userFolders.find(folder => folder.id === id);

  return {
    loading,
    userFolders,
    getUserAllFolders,
    getUserFolderById,
    addUserFolder,
    setUserAllFolders,
    removeUserFolder,
    editUserFolder,
  };
};
