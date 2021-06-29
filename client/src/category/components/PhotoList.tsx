import React, { useEffect, useCallback } from 'react';
import { View, FlatList, ListRenderItem, StyleSheet } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';

import PhotoItem from './PhotoItem';
import { IPhoto } from '@/shared/types';
import { useAppDispatch } from '@/redux/hooks';
import { ErrorView } from '@/shared/components';
import { useUserFolders } from '@/redux/folderSlice';
import { getPhotosInStorage, usePhotosInFolder } from '@/redux/photosSlice';

const PhotoList: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { params } = useRoute();
  const { folderId } = params;
  const { getUserFolderById } = useUserFolders();
  const { getAllPhotosInFolder, getPhotosError } = usePhotosInFolder();
  const { folderName } = getUserFolderById(folderId);
  const photosData = getAllPhotosInFolder();
  const error = getPhotosError();

  const renderItem: ListRenderItem<IPhoto> = ({ item }) => <PhotoItem {...item} />;

  useEffect(
    function setInitialScreenOptions() {
      navigation.setOptions({
        title: folderName,
      });
    },
    [folderId],
  );

  useFocusEffect(
    useCallback(
      function loadPhotosData() {
        if (folderId) {
          dispatch(getPhotosInStorage(folderId));
        }
      },
      [folderId],
    ),
  );

  if (error || photosData?.length === 0) {
    return <ErrorView message={error} />;
  }

  return (
    <View style={styles.container}>
      {photosData && (
        <FlatList
          style={styles.photos}
          data={photosData}
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
