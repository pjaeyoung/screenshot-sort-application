import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { PhotoData } from '@/shared/types';

const PhotoItem: React.FC<PhotoData> = ({ id, folderName, photoName, source }) => {
  const navigation = useNavigation();

  const onPressMoveToPhoto = () => {
    navigation.navigate('Photo', {
      id,
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPressMoveToPhoto}>
      <Image style={styles.photoImage} source={{ uri: 'data:image/*;base64,' + source }} />
    </TouchableOpacity>
  );
};

export default PhotoItem;

const styles = StyleSheet.create({
  container: {
    padding: 7,
  },
  photoImage: {
    width: 98,
    height: 98,
  },
});
