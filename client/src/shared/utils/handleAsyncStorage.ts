import AsyncStorage from '@react-native-async-storage/async-storage';
import { IStoredFolder } from '@/redux/folderSlice';

// FIXME: error를 상위 try-catch로 전달하기 - redux 에서 비동기 처리 결과에 따른 제어가 어렵기 때문
export function storeDataCurry<T>(key: string) {
  return async function storeData(value: T) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.error(e);
      console.warn(`AsyncStorage에 key(${key}), value(${value}) 를 저장하지 못했습니다.`);
    }
  };
}

export function getDataCurry<T>(key: string) {
  return async function getData(): Promise<T | null | undefined> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error(e);
      console.warn(`AsyncStorage에서 key(${key})로 value를 불러오지 못했습니다.`);
    }
  };
}

const storageKeys = {
  USER_FOLDERS: 'userFolders',
  COMPLETED_TUTORIAL: 'completedTutorial',
};

const storage = {
  getUserFolders: getDataCurry<IStoredFolder>(storageKeys.USER_FOLDERS),
  setUserFolders: storeDataCurry<IStoredFolder>(storageKeys.USER_FOLDERS),
  getCompletedTutorial: getDataCurry<boolean>(storageKeys.COMPLETED_TUTORIAL),
  setCompletedTutorial: storeDataCurry<boolean>(storageKeys.COMPLETED_TUTORIAL),
};

export default storage;
