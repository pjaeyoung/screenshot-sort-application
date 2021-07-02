import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Text, PermissionsAndroid } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { RoundButton, Permissions } from '@/shared/components';

const { READ_EXTERNAL_STORAGE, WRITE_EXTERNAL_STORAGE } = PermissionsAndroid.PERMISSIONS;

const PermissionScreen: React.FC = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const onPressLikeButton = () => {
    setModalVisible(true);
  };

  useFocusEffect(
    useCallback(() => {
      setModalVisible(false);
    }, []),
  );

  const onRejectCallback = () => {
    //TO DO: [ONBAORDING-05]로 이동
    //navigation.navigate('')
  };

  const onAcceptCallback = () => {
    navigation.navigate('SmartCaptureGuide');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.message}>
        <Text style={styles.smallText}>뒤죽박죽 섞인 스크린샷은 그만!✋{`\n`}</Text>
        스캡으로 쉽게 정리하세요!
      </Text>
      <Permissions
        permissions={[READ_EXTERNAL_STORAGE, WRITE_EXTERNAL_STORAGE]}
        modalMessage="SCCAP 이(가) 기기의 사진, 미디어, 파일에 접근할 수 있도록 허용하시겠습니까?"
        modalVisible={modalVisible}
        onAcceptCallback={onAcceptCallback}
        onRejectCallback={onRejectCallback}
      />
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
