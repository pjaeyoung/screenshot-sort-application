import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RoundButton } from '@/shared/components';
import { monitorScreenCapture } from '@/shared/utils/backgroundService';
import requestPermissions from '@/shared/utils/requestPermissions';
import storage from '@/shared/utils/handleAsyncStorage';

const PermissionScreen: React.FC = () => {
  const navigation = useNavigation();

  const onPressLikeButton = async () => {
    try {
      const granted = await requestPermissions();
      if (granted) {
        await monitorScreenCapture();
        await storage.setGrantedPermissions(true);
      } else {
        await storage.setGrantedPermissions(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      navigation.navigate('SmartCaptureGuide');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.message}>
        <Text style={styles.smallText}>뒤죽박죽 섞인 스크린샷은 그만!✋{`\n`}</Text>
        스캡으로 쉽게 정리하세요!
      </Text>
      <View style={styles.buttonContainer}>
        <RoundButton
          buttonStyle={styles.likeButton}
          textStyle={{ color: 'white', fontSize: 17 }}
          onPress={onPressLikeButton}>
          좋아요
        </RoundButton>
      </View>
    </View>
  );
};

export default PermissionScreen;

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
  smallText: {
    fontSize: 17,
    fontWeight: '300',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  likeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 146,
    height: 48,
    color: 'white',
  },
});
