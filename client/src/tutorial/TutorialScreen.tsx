import * as React from 'react';
import styled from '@emotion/native';
import { StyleSheet, ToastAndroid } from 'react-native';
import { SortScreen } from '@/sort/components';
import { Overlay } from 'react-native-elements';
import { SpeechBubble } from './components';
import { speechBubbles } from './constants';
import storage from '@/shared/utils/handleAsyncStorage';

const TutorialScreen: React.FC = () => {
  const [overlayVisible, setOverlayVisible] = React.useState<boolean>(true);
  const [screenNumber, setScreenNumber] = React.useState<number>(0);
  const incrementScreenNumber = async () => {
    if (screenNumber + 1 >= speechBubbles.length) {
      try {
        await storage.setCompletedTutorial(true);
        setOverlayVisible(false);
      } catch {
        ToastAndroid.show('튜토리얼 완료 실패', ToastAndroid.SHORT);
      } finally {
        return;
      }
    }
    setScreenNumber(prev => prev + 1);
  };
  return (
    <Wrapper>
      <Overlay
        onBackdropPress={incrementScreenNumber}
        isVisible={overlayVisible}
        overlayStyle={styles.overlayStyle}>
        <SpeechBubble {...speechBubbles[screenNumber]} />
      </Overlay>
      <SortScreen />
    </Wrapper>
  );
};

export default TutorialScreen;

const Wrapper = styled.View({
  flex: 1,
});

const styles = StyleSheet.create({
  overlayStyle: { backgroundColor: 'transparent', borderWidth: 0, elevation: 0 },
});
