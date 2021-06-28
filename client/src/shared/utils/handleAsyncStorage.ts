import AsyncStorage from '@react-native-async-storage/async-storage';

export function storeDataCurry<T>(key: string) {
  return async function storeData(value: T) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.warn(e);
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
      console.warn(e);
      console.warn(`AsyncStorage에서 key(${key})로 value를 불러오지 못했습니다.`);
    }
  };
}
