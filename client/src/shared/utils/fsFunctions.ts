import * as RNFS from 'react-native-fs';

export const FILEPATH = `${RNFS.ExternalStorageDirectoryPath}/SCCAP`;

export const extractFileNameFrom = (path: string) => {
  return path.split('/').slice(-1)[0];
};

export const readFolder = (filePath: string) => RNFS.readDir(filePath);

export const createFolder = (folderName: string) => RNFS.mkdir(`${FILEPATH}/${folderName}`);

export const deleteFolder = (folderName: string) => RNFS.unlink(`${FILEPATH}/${folderName}`);

export const renameFolder = async ({
  oldFolderName,
  newFolderName,
}: {
  oldFolderName: string;
  newFolderName: string;
}) => {
  const existingNewName = await RNFS.exists(`${FILEPATH}/${newFolderName}`);

  if (!existingNewName) {
    await RNFS.mkdir(`${FILEPATH}/${newFolderName}`);
  }
  const contents = await RNFS.readDir(`${FILEPATH}/${oldFolderName}`);
  await Promise.all(
    contents.map(({ path, name }) => RNFS.moveFile(path, `${FILEPATH}/${newFolderName}/${name}`)),
  );
  await RNFS.unlink(`${FILEPATH}/${oldFolderName}`);
};

export const createFile = ({
  path,
  contents,
  encoding = 'base64',
}: {
  path: string;
  contents: any;
  encoding?: string;
}) => RNFS.writeFile(`${FILEPATH}/${path}`, contents, encoding);

export const readFile = ({
  filePath,
  encoding = 'base64',
}: {
  filePath: string;
  encoding?: string;
}) => {
  return RNFS.readFile(filePath, encoding);
};

export const deleteFile = (filePath: string) => RNFS.unlink(filePath);

export const copyFile = ({
  originPath,
  destFolderName,
}: {
  originPath: string;
  destFolderName: string;
}) => RNFS.copyFile(originPath, `${FILEPATH}/${destFolderName}/${extractFileNameFrom(originPath)}`);
