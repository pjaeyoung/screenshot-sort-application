import { requestMultiple, PERMISSIONS } from 'react-native-permissions';
import { monitorScreenCapture } from '@/shared/utils/backgroundService';

// 폴더 접근권한 요청 및 요청 수락 시 스크린샷 감지 서비스 실행
export default function requestPermissions() {
  requestMultiple([
    PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
  ]).then(status => {
    const readStatus = status[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE];
    const writeStatus = status[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE];

    if (readStatus === 'granted' && writeStatus === 'granted') {
      monitorScreenCapture();
    }
  });
}
