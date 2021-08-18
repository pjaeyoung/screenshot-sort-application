import { useAppDispatch, useAppSelector } from './redux';
import { createUserFolder, persistor } from '../store';
import { IFolder } from '../types';

const useUserFolders = () => {
  const { entries, loading, error } = useAppSelector((state) => state.folders);
  const dispatch = useAppDispatch();

  const addUserFolder = (folder: IFolder) => {
    return dispatch(createUserFolder(folder));
  };

  const clearAllUserFolders = () => {
    return persistor.purge();
  };

  return { userFolders: entries, loading, error, addUserFolder, clearAllUserFolders };
};

export default useUserFolders;
