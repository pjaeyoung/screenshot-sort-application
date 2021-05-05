import BackgroundService from 'react-native-background-actions';
import { addScreenshotListener } from 'react-native-detector';
import * as RNFS from 'react-native-fs';
import storage from '@/shared/utils/handleAsyncStorage';

import { openApp } from 'rn-openapp';
import * as RootNavigation from '@/RootNavigation';

const packageId = 'com.sccap.sccap';

let screenshotPath = '';
export function setScreenshotPath(string: string) {
  screenshotPath = string;
}

export function getScreenshotPath() {
  return screenshotPath;
}

const userDidScreenshot = (): void => {
  openApp(packageId)
    .then(isOpenedApp => {
      if (isOpenedApp) {
        // FIXME : 모든 안드로이드 기기에 대응할 수 있도록 파일 경로를 수정해야 합니다.
        RootNavigation.navigate('Sort', {});
        return RNFS.readDir(`${RNFS.ExternalStorageDirectoryPath}/DCIM/Screenshots`);
      } else {
        throw new Error('ScCap 앱 실행이 실패했습니다.');
      }
    })
    .then(async result => {
      const lastIndex = result.length - 1;
      setScreenshotPath(result[lastIndex].path);
      await storage.storeCurrentScreenshot(result[lastIndex]);
    })
    .catch(e => console.warn(e));
};

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

function monitorScreenCapture() {
  BackgroundService.start(registerScreenCaptureEvent, options);
}

export { monitorScreenCapture };
