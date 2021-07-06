import * as React from 'react';
import { ToastAndroid, TouchableOpacity } from 'react-native';
import styled from '@emotion/native';
import { Switch } from 'react-native-elements';
import {
  isRunningMonitorScreenCapture,
  monitorScreenCapture,
  stopMonitorScreenCapture,
} from '@/shared/utils/backgroundService';
import storage from '@/shared/utils/handleAsyncStorage';
import { useNavigation } from '@react-navigation/native';

import InAppReview from 'react-native-in-app-review';

import Mailer from 'react-native-mail';

const SettingScreen: React.FC = () => {
  const navigation = useNavigation();
  const navigateToOnboarding = () => navigation.navigate('Guides');

  const sendFeedbackMail = () => {
    Mailer.mail(mailOptions, (error, event) => {
      if (error) {
        console.error(error);
        ToastAndroid.show('피드백 보내기 실패', ToastAndroid.SHORT);
      } else if (event === 'sent') {
        ToastAndroid.show('피드백 보내기 성공', ToastAndroid.SHORT);
      }
    });
  };

  const [detecterCaptureOn, setDetecterCaptureOn] = React.useState<boolean>(
    isRunningMonitorScreenCapture(),
  );

  const toggleDetecterCaptureOn = async (value: boolean) => {
    const backgroundServiceFunc = value ? monitorScreenCapture : stopMonitorScreenCapture;
    try {
      await backgroundServiceFunc();
      await storage.setMonitorScreenshot(value);
      setDetecterCaptureOn(value);
    } catch (error) {
      console.error(error);
      ToastAndroid.show('캡쳐 감지 끄기/켜기 실패', ToastAndroid.SHORT);
    }
  };

  const openReview = async () => {
    try {
      if (InAppReview.isAvailable()) {
        const hasFlowFinishedSuccessfully = await InAppReview.RequestInAppReview();
        if (hasFlowFinishedSuccessfully) return;

        ToastAndroid.show('리뷰 작성하기 실패', ToastAndroid.SHORT);

        return;
      }

      ToastAndroid.show('리뷰 작성하기 기능 미지원', ToastAndroid.SHORT);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Wrapper>
      <Header>
        <IconContainer>
          <IconImage source={require('../assets/images/setting/sccap-icon.png')} />
        </IconContainer>
        <TitleText>SCCAP : 찍는 순간, 정리하세요.</TitleText>
      </Header>
      <SettingItemGroupContainer>
        <SettingItemGroup>
          <SettingItemGroupTitle>
            <BoldText>어플</BoldText>
          </SettingItemGroupTitle>
          <SettingItems>
            <SettingItem visibleBorder>
              <TouchableOpacity hitSlop={hitSlop} onPress={navigateToOnboarding}>
                <SettingItemText>사용 방법</SettingItemText>
              </TouchableOpacity>
            </SettingItem>
            <SettingItem visibleBorder>
              <DetectorCaptureSettingItem>
                <SettingItemText>캡쳐 감지 끄기</SettingItemText>
                <Switch
                  value={detecterCaptureOn}
                  onValueChange={toggleDetecterCaptureOn}
                  color="#3B99FB"
                />
              </DetectorCaptureSettingItem>
            </SettingItem>
            <SettingItem>
              <TouchableOpacity onPress={sendFeedbackMail} hitSlop={hitSlop}>
                <SettingItemText>피드백 보내기</SettingItemText>
              </TouchableOpacity>
            </SettingItem>
          </SettingItems>
        </SettingItemGroup>
        <SettingItemGroup>
          <SettingItemGroupTitle>
            <BoldText>추천하기</BoldText>
          </SettingItemGroupTitle>
          <SettingItems>
            <SettingItem visibleBorder>
              <TouchableOpacity hitSlop={hitSlop}>
                <SettingItemText>친구에게 공유하기</SettingItemText>
              </TouchableOpacity>
            </SettingItem>
            <SettingItem>
              <TouchableOpacity hitSlop={hitSlop} onPress={openReview}>
                <SettingItemText>리뷰 작성하기</SettingItemText>
              </TouchableOpacity>
            </SettingItem>
          </SettingItems>
        </SettingItemGroup>
        <SettingItemGroup>
          <SettingItemGroupTitle>
            <BoldText>정보</BoldText>
          </SettingItemGroupTitle>
          <SettingItems>
            <SettingItem>
              <SettingItemText>버전 1.0</SettingItemText>
            </SettingItem>
          </SettingItems>
        </SettingItemGroup>
      </SettingItemGroupContainer>
    </Wrapper>
  );
};

export default SettingScreen;

const mailOptions = {
  subject: '스캡팀에게 피드백을 보내요!',
  recipients: ['sccap0506@gmail.com'],
  ccRecipients: ['devdodose@gmail.com'],
  bccRecipients: ['lwd432@gmail.com'],
  body: ' ',
  isHTML: true,
};

const hitSlop = { top: 10, left: 10, bottom: 10, right: 10 };

const Wrapper = styled.View({
  flex: 1,
  backgroundColor: '#F7F7F7',
});

const Header = styled.View({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
});

const IconContainer = styled.View({
  width: 60,
  height: 60,
  marginBottom: 10,
});

const IconImage = styled.Image({
  width: '100%',
  height: '100%',
  resizeMode: 'cover',
});

const TitleText = styled.Text({
  fontSize: 20,
  color: '#636363',
});

const BoldText = styled.Text({
  fontWeight: 'bold',
  fontSize: 15,
});

const SettingItemGroupContainer = styled.View({
  flex: 3,
});

const SettingItemGroup = styled.View({
  marginBottom: 20,
});

const SettingItemGroupTitle = styled.View({
  flex: 0,
  paddingLeft: 20,
  marginBottom: 10,
});

const SettingItems = styled.View({
  backgroundColor: '#fff',
  paddingLeft: 20,
});

const SettingItem = styled.View(({ visibleBorder = false }: { visibleBorder?: boolean }) => ({
  width: '80%',
  justifyContent: 'center',
  borderBottomWidth: 2,
  borderBottomColor: visibleBorder ? '#E6E6E6' : 'transparent',
}));

const DetectorCaptureSettingItem = styled.View({
  flex: 0,
  flexDirection: 'row',
  justifyContent: 'space-between',
});

const SettingItemText = styled.Text({
  fontSize: 15,
  color: '#636363',
  paddingVertical: 15,
});
