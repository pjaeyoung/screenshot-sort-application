import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, View, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';

import { TrashButton } from '@/shared/components';
import { usePhotosInFolder } from '@/redux/photosSlice';
import { useUserFolders } from '@/redux/folderSlice';

const Photo: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params; //redux store에 데이터 저장하고 가져오는 방식으로 교체할 예정
  const [isControlMode, setIsControlMode] = useState<boolean>(true);
  const { getUserFolderById } = useUserFolders();
  const { getPhotoById } = usePhotosInFolder();
  const { folderId, source } = getPhotoById(id) || {};
  const { folderName } = getUserFolderById(folderId) || {};

  const onPressToggleControlMode = () => {
    setIsControlMode(!isControlMode);
  };

  useEffect(function setInitialScreenOptions() {
    navigation.setOptions({
      title: folderName,
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

  return (
    <TouchableWithoutFeedback style={styles.container} onPress={onPressToggleControlMode}>
      <ImageBackground style={styles.Image} source={{ uri: `data:image/*;base64,${source}` }}>
        <View style={styles.Bottom}>{isControlMode && <TrashButton />}</View>
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
