import React, { useEffect } from 'react';
import { View, FlatList, ListRenderItem, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import PhotoItem from './PhotoItem';
import { IPhoto } from '@/shared/types';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useUserFolders } from '@/redux/folderSlice';
import { loadPhotosInFolder, usePhotosInFolder } from '@/redux/photosSlice';
import { parseToPhotosInFolder } from '@/shared/utils/parser';

const PhotoList: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { params } = useRoute();
  const { folderId } = params;
  const { getUserFolderById } = useUserFolders();
  const { getAllPhotosInFolder } = usePhotosInFolder();
  const photos = getAllPhotosInFolder();

  const renderItem: ListRenderItem<IPhoto> = ({ item }) => <PhotoItem {...item} />;

  useEffect(
    function setInitialScreenOptions() {
      const folder = getUserFolderById(folderId);

      if (!folder) return;

      navigation.setOptions({
        title: folder.folderName,
      });
    },
    [folderId],
  );

  useEffect(
    function loadPhotosData() {
      //To do: thunk에서 처리
      const { photos } = require('@/fakeData.json');
      const { idsInFolder, entitiesInFolder } = parseToPhotosInFolder(folderId, photos);

      dispatch(
        loadPhotosInFolder({
          folderId: folderId,
          ids: idsInFolder,
          entities: entitiesInFolder,
        }),
      );
    },
    [folderId],
  );

  return (
    <View style={styles.container}>
      {photos && (
        <FlatList
          style={styles.photos}
          data={photos}
          renderItem={renderItem}
          keyExtractor={item => (item as IPhoto).id.toString()}
          numColumns={3}
        />
      )}
    </View>
  );
};

export default PhotoList;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  photos: {},
});
