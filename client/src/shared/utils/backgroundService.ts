import BackgroundService from 'react-native-background-actions';
import { addScreenshotListener, removeScreenshotListener } from 'react-native-detector';
import * as RNFS from 'react-native-fs';
import storage from './handleAsyncStorage';

import { openApp } from 'rn-openapp';
import { navigate } from './RootNavigation';
const packageId = 'com.sccap.sccap';

const pendingRegex = /pending/;

// FIXME: openApp 작동 에러 - 앱이 foreground 상태가 아닐 경우 감지가 안 되는 현상

const isPendingScreenshotPath = (path: string) => {
  return pendingRegex.test(path);
};

// 스크린샷 감지 시 호출하는 콜백함수
const userDidScreenshot = (path: string): void => {
  if (isPendingScreenshotPath(path)) return;
  openApp(packageId)
    .then(async () => {
      return Promise.all([path, RNFS.readFile(path, 'base64'), storage.getCompletedTutorial()]);
    })
    .then(([screenshotPath, screenshotBase64, completedTutorial]) => {
      navigate(completedTutorial ? 'Sort' : 'Tutorial', { screenshotPath, screenshotBase64 });
    })
    .catch(e => console.error(e));
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
  taskName: 'SCCAP Screenshot Monitoring',
  taskTitle: 'Screenshot Monitoring',
  taskDesc: '화면을 캡쳐하면 SCCAP이 실행될 수 있도록 모니터링 중입니다',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: '#ff00ff',
};

// 스크린샷 감지 서비스 실행
function monitorScreenCapture() {
  if (BackgroundService.isRunning()) return;
  return BackgroundService.start(registerScreenCaptureEvent, options);
}

export { monitorScreenCapture };
