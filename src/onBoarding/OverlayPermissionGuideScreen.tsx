import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { RoundButton } from '@/shared/components';
import { usePermissions } from '@/shared/hooks';

const SmartCaptureGuideScreen: React.FC = () => {
  const navigation = useNavigation();
  const { requestPermssionsAgain } = usePermissions();
  const onPressLikeButton = async () => {
    requestPermssionsAgain()
      .catch(console.error)
      .finally(() =>
        navigation.reset({
          index: 0,
          routes: [{ name: 'Folder', params: { isOnboarding: true } }],
        }),
      );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.message}>스캡은 다른 앱 위에{'\n'}표시되는 앱이에요!📲</Text>
      <View style={styles.imageWrapper}>
        <Image source={require('../assets/images/onBoarding/overlay-permission.png')} />
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
