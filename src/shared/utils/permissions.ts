import { requestMultiple, PERMISSIONS, RESULTS, checkMultiple } from 'react-native-permissions';
import { monitorScreenCapture } from './backgroundService';
import storage from './handleAsyncStorage';

const permissions = [
  PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
  PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
];

function grantedAllPermissions(
  status: Record<
    'android.permission.READ_EXTERNAL_STORAGE' | 'android.permission.WRITE_EXTERNAL_STORAGE',
    'unavailable' | 'blocked' | 'denied' | 'granted' | 'limited'
  >,
): boolean {
  return permissions.every(aPermission => status[aPermission] === RESULTS.GRANTED);
}

// 폴더 접근권한 최초 요청
export async function requestPermissions(): Promise<void> {
  const results = await requestMultiple(permissions);
  const granted = await grantedAllPermissions(results);
  if (granted) {
    monitorScreenCapture();
  }
  await storage.setMonitorScreenshot(granted);
}

// 폴더 접근권한 상태값 반환
export function getPermissionsStatus(): Promise<boolean> {
  return checkMultiple(permissions).then(grantedAllPermissions);
}
