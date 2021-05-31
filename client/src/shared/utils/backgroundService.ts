import BackgroundService from 'react-native-background-actions';
import { addScreenshotListener } from 'react-native-detector';
import * as RNFS from 'react-native-fs';

import { openApp } from 'rn-openapp';
import { navigate } from './RootNavigation';

const packageId = 'com.sccap.sccap';

// 스크린샷 감지 시 호출하는 콜백함수
// 앱을 열고 스크린샷 폴더에 접근하여 가장 마지막 스크린샷 이미지 path를 가져와
// SORT 화면 이동 시 props로 전달
const userDidScreenshot = (): void => {
  openApp(packageId)
    .then(isOpenedApp => {
      if (isOpenedApp) {
        // FIXME : 모든 안드로이드 기기에 대응할 수 있도록 파일 경로를 수정해야 합니다.
        return RNFS.readDir(`${RNFS.ExternalStorageDirectoryPath}/DCIM/Screenshots`);
      } else {
        throw new Error('ScCap 앱 실행이 실패했습니다.');
      }
    })
    .then(async result => {
      const lastIndex = result.length - 1;
      navigate('Sort', { screenshotPath: `file://${result[lastIndex].path}` });
    })
    .catch(e => console.warn(e));
};

// 스크린샷 감지 이벤트 등록
const registerScreenCaptureEvent = () => {
  return new Promise<void>(() => {
    addScreenshotListener(userDidScreenshot);
  }).catch(err => {
    console.warn(err);
  });
};

const options = {
  taskName: 'ScCap Screenshot Monitoring',
  taskTitle: 'Screenshot Monitoring',
  taskDesc: '화면을 캡쳐하면 ScCap이 실행될 수 있도록 모니터링 중입니다',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: '#ff00ff',
  parameters: {
    delay: 1000,
  },
};

// 스크린샷 감지 서비스 실행
function monitorScreenCapture() {
  BackgroundService.start(registerScreenCaptureEvent, options);
}

export { monitorScreenCapture };
