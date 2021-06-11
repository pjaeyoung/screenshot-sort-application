import * as RNFS from 'react-native-fs';

const FILEPATH = `${RNFS.ExternalStorageDirectoryPath}/SCCAP`;

const handleAsync = async <T>({
  onSuccess,
  onFailure,
  asyncFunction,
}: {
  onSuccess?: Function;
  onFailure?: Function;
  asyncFunction: () => Promise<T>;
}) => {
  try {
    await asyncFunction();
    onSuccess && onSuccess();
  } catch (error) {
    onFailure && onFailure();
    console.error(error);
  }
};

export const createFolderAsync = ({
  onSuccess,
  onFailure,
  folderName,
}: {
  folderName: string;
  onSuccess?: Function;
  onFailure?: Function;
}) => {
  handleAsync<void>({
    onSuccess,
    onFailure,
    asyncFunction: () => RNFS.mkdir(`${FILEPATH}/${folderName}`),
  });
};

export const deleteFolderAsync = ({
  folderName,
  onSuccess,
  onFailure,
}: {
  folderName: string;
  onSuccess?: Function;
  onFailure?: Function;
}) => {
  handleAsync({
    onSuccess,
    onFailure,
    asyncFunction: () => RNFS.unlink(`${FILEPATH}/${folderName}`),
  });
};

export const renameFolderAsync = ({
  oldFolderName,
  newFolderName,
  onSuccess,
  onFailure,
}: {
  oldFolderName: string;
  newFolderName: string;
  onSuccess?: Function;
  onFailure?: Function;
}) => {
  handleAsync({
    onSuccess,
    onFailure,
    asyncFunction: async () => {
      const existingNewName = await RNFS.exists(`${FILEPATH}/${newFolderName}`);
      if (!existingNewName) {
        await RNFS.mkdir(`${FILEPATH}/${newFolderName}`);
      }
      const contents = await RNFS.readDir(`${FILEPATH}/${oldFolderName}`);
      await Promise.all(
        contents.map(({ path, name }) =>
          RNFS.moveFile(path, `${FILEPATH}/${newFolderName}/${name}`),
        ),
      );
      await RNFS.unlink(`${FILEPATH}/${oldFolderName}`);
    },
  });
};

export const deleteFileAsync = ({
  filePath,
  onSuccess,
  onFailure,
}: {
  filePath: string;
  onSuccess?: Function;
  onFailure?: Function;
}) => {
  handleAsync({ onSuccess, onFailure, asyncFunction: () => RNFS.unlink(filePath) });
};

const extractFileNameFrom = (path: string) => {
  return path.split('/').slice(-1);
};

export const copyFileAsync = ({
  originPath,
  destFolderName,
  onSuccess,
  onFailure,
}: {
  originPath: string;
  destFolderName: string;
  onSuccess?: Function;
  onFailure?: Function;
}) => {
  handleAsync({
    onSuccess,
    onFailure,
    asyncFunction: () =>
      RNFS.copyFile(originPath, `${FILEPATH}/${destFolderName}/${extractFileNameFrom(originPath)}`),
  });
};
