import * as React from 'react';
import { View, Image } from 'react-native';

import storage from '@/shared/utils/handleAsyncStorage';

import Draggable from 'react-native-draggable';

// FIXME: App이 닫힌 상태에만 스샷이미지를 가져옴. App이 실행 중일 때는 리렌더링을 하지 않는 까닭
const Sort: React.FC<void> = () => {
  const [screenshotUri, setScreenshotUri] = React.useState<string>();

  React.useEffect(() => {
    async function getCurrentData() {
      const currentScreenshot = await storage.getCurrentScreenshot();
      setScreenshotUri(currentScreenshot?.path || '');
    }

    getCurrentData();
  }, []);

  return (
    <View
      style={{
        flex: 1,
      }}>
      <View
        style={{
          width: '100%',
          height: 150,
          position: 'absolute',
          bottom: 50,
          left: 30,
        }}>
        <Draggable>
          <View
            style={{
              width: 100,
              height: 150,
              paddingTop: 5,
              paddingBottom: 5,
              backgroundColor: '#ffffff',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}>
            <Image
              style={{
                width: 100,
                height: 150,
              }}
              source={{ uri: `file://${screenshotUri}` }}
            />
          </View>
        </Draggable>
      </View>
    </View>
  );
};

export default Sort;
