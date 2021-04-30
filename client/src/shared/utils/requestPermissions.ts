import { requestMultiple, PERMISSIONS } from 'react-native-permissions';
import { monitorScreenCapture } from '@/shared/utils/backgroundService';

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
