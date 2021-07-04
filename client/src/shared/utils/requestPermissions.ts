import { requestMultiple, PERMISSIONS } from 'react-native-permissions';
<<<<<<< HEAD

=======
import { monitorScreenCapture } from '@/shared/utils/backgroundService';
import AndroidPermissions from 'react-native-android-permissions';
>>>>>>> 25817e0 (feat: 자체 제작모듈 react-native-android-permission을적용)
// 폴더 접근권한 요청 및 요청 수락 시 스크린샷 감지 서비스 실행
export default function requestPermissions(): Promise<boolean> {
  return requestMultiple([
    PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
  ]).then(status => {
    const readStatus = status[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE];
    const writeStatus = status[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE];
    return readStatus === 'granted' && writeStatus === 'granted';
  });
  AndroidPermissions.overlaypermission();
}
