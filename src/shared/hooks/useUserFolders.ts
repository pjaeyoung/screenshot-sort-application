import { createUserFolder } from '../store';
import { IFolder } from '../types';
import { useAppDispatch, useAppSelector } from './redux';

const useUserFolders = () => {
  const { entries, loading, error } = useAppSelector((state) => state.folders);
  const dispatch = useAppDispatch();

  const addUserFolder = (folder: IFolder) => {
    return dispatch(createUserFolder(folder));
  };

  return { userFolders: entries, loading, error, addUserFolder };
};

export default useUserFolders;
