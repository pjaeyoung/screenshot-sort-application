import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { useAppSelector, useAppDispatch } from './hooks';
import storage from '@/shared/utils/handleAsyncStorage';
import * as FS from '@/shared/utils/fsFunctions';
export interface IStoredFolder {
  id: string;
  folderName: string;
  borderColor: string;
}

export enum LOADING {
  IDLE = 'idle',
  PENDING = 'pending',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
}

interface IUserFolderState {
  entries: IStoredFolder[];
  loading: LOADING;
}

// FIXME: try - catch문으로 감싸서 loading 처리

const increment = createAsyncThunk('increment', async (newUserFolder: IStoredFolder, thunkAPI) => {
  const { entries, loading } = thunkAPI.getState().folders as IUserFolderState;
  const newEntries = [...entries, newUserFolder];

  await FS.createFolderAsync({
    folderName: newUserFolder.folderName,
  });

  await storage.setUserFolders(entries);
  return { entries: newEntries, loading };
});

const decrement = createAsyncThunk('decrement', async (removedId: string, thunkAPI) => {
  const { entries, loading } = thunkAPI.getState().folders as IUserFolderState;
  const removedUserFolder = entries.find(({ id }) => id === removedId);
  if (removedUserFolder === undefined) throw new Error('NOT FOUND');
  await FS.deleteFolderAsync({
    folderName: removedUserFolder.folderName,
  });

  const newEntries = entries.filter(({ id }) => id !== removedId);
  await storage.setUserFolders(newEntries);
  return { entries: newEntries, loading };
});

const update = createAsyncThunk('update', async (updatedUserFolder: IStoredFolder, thunkAPI) => {
  const { entries, loading } = thunkAPI.getState().folders as IUserFolderState;
  const updatedIndex = entries.findIndex(({ id }) => id === updatedUserFolder.id);
  if (updatedIndex === -1) throw new Error('NOT FOUND');

  const oldFolderName = entries[updatedIndex].folderName;
  await FS.renameFolderAsync({ oldFolderName, newFolderName: updatedUserFolder.folderName });
  const newEntries = [
    ...entries.slice(0, updatedIndex),
    updatedUserFolder,
    ...entries.slice(updatedIndex + 1),
  ];
  await storage.setUserFolders(newEntries);
  return { entries: newEntries, loading };
});

const initialState: IUserFolderState = {
  entries: [],
  loading: LOADING.IDLE,
};

const folderSlice = createSlice({
  name: 'folders',
  initialState,
  reducers: {},
  extraReducers: {
    [`${increment.pending}`]: state => {
      state.loading = LOADING.PENDING;
      return state;
    },
    [`${increment.rejected}`]: state => {
      state.loading = LOADING.FAILED;
      return state;
    },
    [`${increment.fulfilled}`]: (state, action: PayloadAction<IUserFolderState>) => {
      action.payload.loading = LOADING.SUCCEEDED;
      return action.payload;
    },
    [`${decrement.pending}`]: state => {
      state.loading = LOADING.PENDING;
      return state;
    },
    [`${decrement.rejected}`]: state => {
      state.loading = LOADING.FAILED;
      return state;
    },
    [`${decrement.fulfilled}`]: (state, action: PayloadAction<IUserFolderState>) => {
      action.payload.loading = LOADING.SUCCEEDED;
      return action.payload;
    },
    [`${update.pending}`]: state => {
      state.loading = LOADING.PENDING;
      return state;
    },
    [`${update.rejected}`]: state => {
      state.loading = LOADING.FAILED;
      return state;
    },
    [`${update.fulfilled}`]: (state, action: PayloadAction<IUserFolderState>) => {
      action.payload.loading = LOADING.SUCCEEDED;
      return action.payload;
    },
  },
});

export default folderSlice.reducer;

export const useUserFolders = () => {
  const dispatch = useAppDispatch();
  const { entries: userFolders, loading } = useAppSelector(state => state.folders);
  const addUserFolder = (payload: IStoredFolder) => {
    dispatch(increment(payload));
  };
  const removeUserFolder = (removedId: string) => {
    dispatch(decrement(removedId));
  };

  const editUserFolder = (payload: IStoredFolder) => {
    dispatch(update(payload));
  };

  const getUserAllFolders = () => userFolders;
  const getUserFolderById = (id: string) => userFolders.find(folder => folder.id === id);

  return {
    loading,
    userFolders,
    getUserAllFolders,
    getUserFolderById,
    addUserFolder,
    removeUserFolder,
    editUserFolder,
  };
};
