import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { RoundButton } from '@/shared/components';
import storage from '@/shared/utils/handleAsyncStorage';

const SmartCaptureGuideScreen: React.FC = () => {
  const navigation = useNavigation();

  const onPressLikeButton = async () => {
    await storage.setCompletedOnBoarding(true);
    //FIXME: [ONBOARDING-05]로 이동하도록 수정할 것
    navigation.navigate('Main');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.message}>스크린샷은 앞으로{'\n'}스캡에 맡겨주세요!🤝</Text>
      <View style={styles.imageWrapper}>
        <Image source={require('../assets/images/onBoarding/smartcapture.png')} />
      </View>
      <View style={styles.buttonWrapper}>
        <RoundButton
          buttonStyle={styles.nextButton}
          textStyle={{ color: 'white', fontSize: 17 }}
          onPress={onPressLikeButton}>
          좋아요
        </RoundButton>
      </View>
    </View>
  );
};

export default SmartCaptureGuideScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'space-between',
    paddingTop: '40%',
    paddingBottom: '20%',
  },
  message: {
    color: '#00388A',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
  },
  imageWrapper: {
    alignItems: 'center',
  },
  buttonWrapper: {
    alignItems: 'center',
  },
  nextButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 146,
    height: 48,
    color: 'white',
  },
});
