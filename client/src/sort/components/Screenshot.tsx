import * as React from 'react';
import { GestureResponderEvent, PanResponderGestureState } from 'react-native';
import Draggable from 'react-native-draggable';
import styled from '@emotion/native';

interface ScreenshotProps {
  onDrag: (event: GestureResponderEvent, gestureState: PanResponderGestureState) => void;
  onDragRelease: (event: GestureResponderEvent) => void;
  filePath: string;
}

// TODO: 드롭 실패시에만 reverse하도록 변경
const Screenshot: React.FC<ScreenshotProps> = ({ onDrag, onDragRelease, filePath }) => {
  return (
    <Wrapper>
      <Draggable onDrag={onDrag} onDragRelease={onDragRelease}>
        <ScreenshotContainer>
          <ScreenshotImage source={{ uri: filePath }} />
        </ScreenshotContainer>
      </Draggable>
    </Wrapper>
  );
};

export default Screenshot;

// TODO: 다양한 기기에 대응할 수 있도록 크기 조정을 Dimensions 로 적용할 것
const Wrapper = styled.View({
  width: '100%',
  height: 150,
  position: 'absolute',
  left: '40%',
  bottom: '15%',
});

const ScreenshotContainer = styled.View({
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
});

const ScreenshotImage = styled.Image({
  width: '100%',
  height: '100%',
  resizeMode: 'contain',
});
