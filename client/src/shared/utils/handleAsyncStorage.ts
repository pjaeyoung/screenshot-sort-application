import AsyncStorage from '@react-native-async-storage/async-storage';
import { IStoredFolder } from '@/redux/folderSlice';

export function storeDataCurry<T>(key: string) {
  return async function storeData(value: T) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.error(e);
      console.warn(`AsyncStorage에 key(${key}), value(${value}) 를 저장하지 못했습니다.`);
      throw e;
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
      throw e;
    }
  };
}

const storageKeys = {
  USER_FOLDERS: 'userFolders',
  COMPLETED_TUTORIAL: 'completedTutorial',
  COMPLETED_ONBOARDING: 'completedOnBoarding',
};

const storage = {
  getUserFolders: getDataCurry<IStoredFolder[]>(storageKeys.USER_FOLDERS),
  setUserFolders: storeDataCurry<IStoredFolder[]>(storageKeys.USER_FOLDERS),
  getCompletedTutorial: getDataCurry<boolean>(storageKeys.COMPLETED_TUTORIAL),
  setCompletedTutorial: storeDataCurry<boolean>(storageKeys.COMPLETED_TUTORIAL),
  getCompletedOnBoarding: getDataCurry<boolean>(storageKeys.COMPLETED_ONBOARDING),
  setCompletedOnBoarding: storeDataCurry<boolean>(storageKeys.COMPLETED_ONBOARDING),
};

export default storage;
