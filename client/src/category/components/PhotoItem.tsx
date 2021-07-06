import React from 'react';
import { StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface IPhotoItemProps {
  id: string;
  source: string;
}

const PhotoItem: React.FC<IPhotoItemProps> = ({ id, source }) => {
  const navigation = useNavigation();

  const onPressMoveToPhoto = () => {
    navigation.navigate('Photo', {
      id,
      source,
    });
  };

  const uri = `file://${source}`;

  return (
    <TouchableOpacity style={styles.container} onPress={onPressMoveToPhoto}>
      <Image style={styles.photoImage} source={{ uri }} />
    </TouchableOpacity>
  );
};

export default PhotoItem;

const styles = StyleSheet.create({
  container: {
    padding: 7,
    width: Dimensions.get('window').width * 0.33 - 7,
    height: Dimensions.get('window').width * 0.33 - 7,
  },
  photoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
