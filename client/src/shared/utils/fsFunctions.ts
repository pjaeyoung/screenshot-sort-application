import { string } from 'prop-types';
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
    const res = await asyncFunction();
    onSuccess && onSuccess(res);
  } catch (error) {
    onFailure && onFailure();
    console.error(error);
  }
};

export const readFolderAsync = ({
  folderName,
  onSuccess,
  onFailure,
}: {
  folderName: string;
  onSuccess?: Function;
  onFailure?: Function;
}) => {
  handleAsync<RNFS.ReadDirItem[]>({
    onSuccess,
    onFailure,
    asyncFunction: () => RNFS.readDir(`${FILEPATH}/${folderName}`),
  });
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
  handleAsync<void>({
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
  handleAsync<void>({
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

export const createFileAsync = ({
  path,
  contents,
  encoding = 'base64',
  onSuccess,
  onFailure,
}: {
  path: string;
  contents: any;
  encoding?: string;
  onSuccess?: Function;
  onFailure?: Function;
}) => {
  handleAsync<void>({
    onSuccess,
    onFailure,
    asyncFunction: async () => {
      await RNFS.writeFile(`${FILEPATH}/${path}`, contents, encoding);
    },
  });
};

export const readFileAsync = ({
  filePath,
  encoding = 'base64',
  onSuccess,
  onFailure,
}: {
  filePath: string;
  encoding?: string;
  onSuccess?: Function;
  onFailure?: Function;
}) => {
  handleAsync<string>({
    onSuccess,
    onFailure,
    asyncFunction: () => RNFS.readFile(`${FILEPATH}/${filePath}`, encoding),
  });
};

export const readFile = ({
  filePath,
  encoding = 'base64',
}: {
  filePath: string;
  encoding?: string;
}) => {
  return RNFS.readFile(`${FILEPATH}/${filePath}`, encoding);
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
  handleAsync<void>({
    onSuccess,
    onFailure,
    asyncFunction: () => RNFS.unlink(`${FILEPATH}/${filePath}`),
  });
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
  handleAsync<void>({
    onSuccess,
    onFailure,
    asyncFunction: () =>
      RNFS.copyFile(originPath, `${FILEPATH}/${destFolderName}/${extractFileNameFrom(originPath)}`),
  });
};
