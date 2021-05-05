import * as React from 'react';
import { View, LayoutRectangle, BackHandler, ImageBackground } from 'react-native';

import Dropzone from '@/sort/components/Dropzone';
import Screenshot from '@/sort/components/Screenshot';

import useScreenshotPath from '@/sort/hooks/useScreenshotPath';
import * as Collision from '@/sort/utils/collision';

const Sort: React.FC<Object> = () => {
  const [screenshotPath] = useScreenshotPath();

  const [dropzoneDimensions, setDropzoneDimensions] = React.useState<Array<LayoutRectangle>>([]);
  const addDropzoneDimensions = (dimensions: LayoutRectangle) => {
    setDropzoneDimensions(prev => [...prev, dimensions]);
  };

  const onDrag = Collision.onIntersectDropzones({
    dropzoneDimensions,
    cb: intersectOnDragging,
  });

  const onDragRelease = Collision.onIntersectDropzones({
    dropzoneDimensions,
    cb: intersectOnDropped,
  });

  return (
    <View
      style={{
        flex: 1,
      }}>
      <ImageBackground
        style={{ flex: 1 }}
        imageStyle={{ opacity: 0.2 }}
        source={{ uri: screenshotPath }}>
        <Dropzone addDropzoneDimensions={addDropzoneDimensions}>
          <View
            style={{
              width: 100,
              height: 100,
              backgroundColor: 'blue',
              position: 'absolute',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              top: 10,
              left: 10,
            }}></View>
        </Dropzone>
        <Screenshot onDrag={onDrag} onDragRelease={onDragRelease} filePath={screenshotPath} />
      </ImageBackground>
    </View>
  );
};

export default Sort;

const intersectOnDropped = () => {
  // TODO: 폴더 경로에 스크린샷이미지 저장하기
  // setIsScreenCapture(false);
  console.log('Drop!');
  // TODO: 폴더 경로 저장 완료 후 앱 닫기
  BackHandler.exitApp();
};

const intersectOnDragging = () => {
  // TODO: 폴더 이미지 크기 애니메이션 추가
  console.log('drag');
};
