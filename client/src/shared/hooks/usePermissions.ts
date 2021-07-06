import * as React from 'react';
import { AppStateStatus, AppState } from 'react-native';
import { openSettings } from 'react-native-permissions';
import { getPermissionsStatus } from '../utils/permissions';
import { monitorScreenCapture } from '../utils/backgroundService';
import storage from '../utils/handleAsyncStorage';

type UsePermissionsPropsType = {
  onRejected?: Function;
};

const usePermissions = (props?: UsePermissionsPropsType) => {
  const [grantedPermissions, setGrantedPermissions] = React.useState<boolean>(false);

  const checkPermissionsStatus = async () => {
    try {
      const granted = await getPermissionsStatus();
      setGrantedPermissions(granted);
      const isRunningMonitorScreenshot = await storage.getMonitorScreenshot();
      if (granted && isRunningMonitorScreenshot) {
        await monitorScreenCapture();
      }
      return granted;
    } catch (error) {
      console.error(error);
    }
  };

  // 앱 권한설정화면을 보여주는 openSettings에서 사용자가 어떤 선택을 했는지 값을 받아올 수 없기 때문에
  // 앱 권한설정화면을 끄고 스캡앱을 실행할 때 권한허용여부를 받아와 처리함
  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (nextAppState === 'active')
      checkPermissionsStatus().then(granted => {
        if (!granted) {
          props?.onRejected && props.onRejected();
        }
      });
  };

  React.useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  React.useEffect(() => {
    checkPermissionsStatus();
  }, []);

  // 사용자가 최초 권한 허용 거부 후 재요청
  const requestPermssionsAgain = () => {
    return openSettings();
  };

  return { grantedPermissions, requestPermssionsAgain };
};

export default usePermissions;
