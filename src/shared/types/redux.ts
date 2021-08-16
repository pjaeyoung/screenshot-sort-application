import store from '../store';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface IFolder {
  name: string;
  borderColor: string;
  filePath: string;
}

export interface IStoredFolder extends IFolder {
  id: string;
}

export enum eLOADING {
  idle = 'idle',
  pending = 'pending',
  failed = 'failed',
}

export interface IUserFolderState {
  entries: IStoredFolder[];
  loading: eLOADING;
  error: null | string;
}

export interface IError {
  errorMessage: string;
}
