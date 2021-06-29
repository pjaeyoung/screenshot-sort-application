import { StyleProp, ViewStyle } from 'react-native';
interface IUserFolderLayout {
  folderLayout: StyleProp<ViewStyle>;
  deleteButtonLayout: StyleProp<ViewStyle>;
}

export type UserFolderLayoutDataType = IUserFolderLayout[];

export const userFolderLayoutData: UserFolderLayoutDataType = [
  {
    folderLayout: { position: 'absolute', top: 10, left: 0 },
    deleteButtonLayout: { position: 'absolute', left: 135, top: 20 },
  },
  {
    folderLayout: { position: 'absolute', top: 0, right: 0 },
    deleteButtonLayout: { position: 'absolute', top: 40, right: 120 },
  },
  {
    folderLayout: { position: 'absolute', top: 180, left: 0 },
    deleteButtonLayout: { position: 'absolute', left: 140, top: 220 },
  },
  {
    folderLayout: { position: 'absolute', top: 200, right: 0 },
    deleteButtonLayout: { position: 'absolute', right: 130, top: 240 },
  },
  {
    folderLayout: { position: 'absolute', top: 380, left: 0 },
    deleteButtonLayout: { position: 'absolute', left: 120, top: 400 },
  },
  {
    folderLayout: { position: 'absolute', top: 350, right: 0 },
    deleteButtonLayout: { position: 'absolute', right: 120, top: 360 },
  },
  {
    folderLayout: { position: 'absolute', top: 500, right: 0 },
    deleteButtonLayout: { position: 'absolute', top: 530, right: 130 },
  },
];
