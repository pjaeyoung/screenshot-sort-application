import React, { useState, useEffect } from 'react';
import { View, FlatList, ListRenderItem, StyleSheet } from 'react-native';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';

import PhotoItem from './PhotoItem';
import { IPhoto } from '@/shared/types';
import { ErrorView } from '@/shared/components';
import { useUserFolders } from '@/redux/folderSlice';

import * as RNFS from '@/shared/utils/fsFunctions';

const renderItem: ListRenderItem<IPhoto> = ({ item }) => <PhotoItem {...item} />;
const keyExtractor = (_, index) => `${index}`;

const PhotoList: React.FC = () => {
  const navigation = useNavigation();
  const { getUserFolderById } = useUserFolders();
  const {
    params: { folderId },
  } = useRoute();

  const [photosData, setPhotosData] = useState([]);
  const [error, setError] = useState<string>('');

  let folderName = folderId === 'basicFolder' ? '기본' : getUserFolderById(folderId)?.folderName;

  const isFocused = useIsFocused();
  useEffect(() => {
    async function setPhotosDataAsync() {
      const images = await RNFS.readFolder(
        folderId === 'basicFolder' ? RNFS.BASICFOLDER_FILEPATH : `${RNFS.FILEPATH}/${folderName}`,
      );
      if (images.length === 0) {
        setError('정리된 사진이 아직 없습니다 :( \n 스캡으로 스크린샷을 즉시 분류해보세요!');
        return;
      }

      isFocused && setPhotosData(images.map(aImage => ({ id: folderId, source: aImage.path })));
    }

    setPhotosDataAsync();
  }, [isFocused]);

  useEffect(
    function setInitialScreenOptions() {
      navigation.setOptions({
        title: folderName,
      });
    },
    [folderId],
  );

  if (error || photosData?.length === 0) {
    return <ErrorView message={error} />;
  }

  return (
    <View style={styles.container}>
      {photosData && (
        <FlatList
          data={photosData}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          numColumns={3}
        />
      )}
    </View>
  );
};

export default PhotoList;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
