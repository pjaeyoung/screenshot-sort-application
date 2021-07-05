import { requestMultiple, PERMISSIONS, RESULTS, checkMultiple } from 'react-native-permissions';
import { monitorScreenCapture } from './backgroundService';

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
export function requestPermissions(): Promise<void> {
  return requestMultiple(permissions)
    .then(grantedAllPermissions)
    .then(granted => {
      if (granted) {
        return monitorScreenCapture();
      }
    });
}

// 폴더 접근권한 상태값 반환
export function getPermissionsStatus(): Promise<boolean> {
  return checkMultiple(permissions).then(grantedAllPermissions);
}
