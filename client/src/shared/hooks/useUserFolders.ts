import * as React from 'react';
import storage from '@/shared/utils/handleAsyncStorage';
import { FolderType } from '@/shared/types';
import { defaultBorderColors } from '@/shared/constants';

const foldersExample = [
  {
    id: 'folder-1',
    component: 'text',
    name: '중요',
    borderColor: defaultBorderColors[0],
    borderDashed: false,
  },
  {
    id: 'folder-2',
    component: 'text',
    name: '웃긴 거',
    borderColor: defaultBorderColors[1],
    borderDashed: false,
  },
  {
    id: 'folder-3',
    component: 'text',
    name: 'wish list',
    borderColor: defaultBorderColors[2],
    borderDashed: false,
  },
  {
    id: 'folder-4',
    component: 'text',
    name: '💖',
    borderColor: defaultBorderColors[3],
    borderDashed: false,
  },
  {
    id: 'folder-5',
    component: 'text',
    name: '✏️ 글',
    borderColor: defaultBorderColors[4],
    borderDashed: false,
  },
  {
    id: 'folder-6',
    component: 'text',
    name: '잡학',
    borderColor: defaultBorderColors[5],
    borderDashed: false,
  },
];

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
