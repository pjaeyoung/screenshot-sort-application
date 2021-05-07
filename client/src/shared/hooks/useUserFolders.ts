import * as React from 'react';
import storage from '@/shared/utils/handleAsyncStorage';
import { FolderType } from '@/shared/types';

const useUserFolders = () => {
  const [folders, setFolders] = React.useState<FolderType[]>([]);

  React.useEffect(() => {
    (async () => {
      try {
        const res = await storage.getFolders();
        res && setFolders(res);
      } catch (err) {
        console.warn(err);
      }
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      try {
        await storage.storeFolders(folders);
      } catch (err) {
        console.warn(err);
      }
    })();
  }, [folders]);

  const addUserFolder = (newFolder: FolderType) => {
    setFolders(prev => [...prev, newFolder]);
  };

  const removeUserFolder = (id: string) => {
    setFolders(prev => prev.filter(folder => folder.id !== id));
  };

  return { userFolders: folders, addUserFolder, removeUserFolder };
};

export default useUserFolders;
