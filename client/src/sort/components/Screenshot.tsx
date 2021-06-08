import * as React from 'react';
import { DraxView } from 'react-native-drax';
import styled from '@emotion/native';
import { Dimensions } from 'react-native';

interface ScreenshotProps {
  screenshotPath: string;
}

// TODO: 드롭 실패시에만 reverse하도록 변경
const Screenshot: React.FC<ScreenshotProps> = ({ screenshotPath }) => {
  return (
    <ScreenshotContainer
      draggingStyle={{ opacity: 0 }}
      dragReleasedStyle={{ opacity: 0 }}
      payload={screenshotPath}>
      <ScreenshotImage
        source={{ uri: `file://${screenshotPath}` }}
        style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
      />
    </ScreenshotContainer>
  );
};

export default Screenshot;

const ScreenshotContainer = styled(DraxView)({
  position: 'absolute',
  left: Dimensions.get('screen').width * 0.4,
  bottom: Dimensions.get('screen').height * 0.2,
  width: 100,
  height: 150,
  paddingTop: 5,
  paddingBottom: 5,
  backgroundColor: '#fff',
  elevation: 5,
});

const ScreenshotImage = styled.Image({
  width: '100%',
  height: '100%',
  resizeMode: 'contain',
});
