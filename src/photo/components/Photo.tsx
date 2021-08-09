import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { TrashButton, Alert } from '@/shared/components';
import { useUserFolders } from '@/redux/folderSlice';

import * as RNFS from '@/shared/utils/fsFunctions';

const Photo: React.FC = () => {
  const {
    params: { id, source },
  } = useRoute();
  const navigation = useNavigation();

  const [isControlMode, setIsControlMode] = useState<boolean>(true);
  const onPressToggleControlMode = () => {
    setIsControlMode(!isControlMode);
  };

  const [visibleAlert, setVisibleAlert] = useState<boolean>(false);
  const onDismissAlert = () => setVisibleAlert(false);
  const onPressTrashButton = async () => {
    setVisibleAlert(true);
  };

  const { getUserFolderById } = useUserFolders();
  const folderName = getUserFolderById(id)?.folderName || '기본';

  useEffect(function setInitialScreenOptions() {
    navigation.setOptions({
      title: folderName,
      headerShown: true,
    });
  }, []);

  useEffect(
    function toggleControlMode() {
      navigation.setOptions({
        headerShown: isControlMode,
      });
    },
    [isControlMode],
  );

  const alertButtons = [
    {
      name: '취소',
      onPress: onDismissAlert,
    },
    {
      name: '삭제',
      onPress: async () => {
        try {
          await RNFS.deleteFile(source);
          navigation.goBack();
        } catch (error) {
          console.error(error.message);
        }
      },
    },
  ];

  const uri = `file://${source}`;

  return (
    <TouchableWithoutFeedback style={styles.container} onPress={onPressToggleControlMode}>
      <ImageBackground style={styles.Image} source={{ uri }}>
        <Alert
          title="사진을 삭제하시겠습니까?"
          body={id === 'basicFolder' ? '(원본이 삭제됩니다.)' : ''}
          isVisible={visibleAlert}
          buttons={alertButtons}
        />
        <View style={styles.Bottom}>
          {isControlMode && <TrashButton onPress={onPressTrashButton} />}
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default Photo;

const styles = StyleSheet.create({
  container: {},
  Image: {
    width: '100%',
    height: '100%',
  },
  Bottom: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    marginRight: 30,
    marginBottom: 30,
  },
});
