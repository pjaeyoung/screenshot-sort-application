import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, Button, Alert, PermissionsAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { unwrapResult } from '@reduxjs/toolkit';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { loadAllFolders, useUserFolders } from '@/redux/folderSlice';
import { storeDataCurry, getDataCurry } from '@/shared/utils/handleAsyncStorage';
import { createFolderAsync, readFolderAsync, deleteFileAsync } from '@/shared/utils/fsFunctions';
import { IPhotosInStorage } from '@/shared/types';
import { getPhotosInStorage, storePhotoInStorage } from '@/redux/photosSlice';

const { photos } = require('@/fakeData.json');

const TestFolder: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { getUserAllFolders } = useUserFolders();
  const userFolders = getUserAllFolders();
  const [storage, setStorage] = useState(null);

  const onPressMove = (folderId: number | string) => {
    navigation.navigate('Category', {
      folderId,
    });
  };

  const setPhotosDataInStorage = storeDataCurry<IPhotosInStorage | null>('photos');
  const getPhotosDataInStorage = getDataCurry('photos');

  const onPressStorePhotosInStorage = async () => {
    try {
      for (let i = 0; i < photos.length; i++) {
        const resultAction = await dispatch(storePhotoInStorage(photos[i]));
        unwrapResult(resultAction);
      }

      const photosInStorage = await getDataCurry('photos')();
      setStorage(photosInStorage);
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const onPressRemovePhotosInStorage = async () => {
    await setPhotosDataInStorage(null);

    await Promise.all(
      photos.map(async photo => {
        const filePath = `${photo.folderId === 1 ? 'folder1' : 'folder2'}/${photo.photoName}`;
        console.log('path: ', filePath);
        try {
          await deleteFileAsync({ filePath });
        } catch (error) {
          console.error(error.message);
        }
      }),
    );

    const photosData = await getPhotosDataInStorage();
    setStorage(photosData);
  };

  const requestStoragePermission = async onSuccess => {
    console.log('권한 요청');
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: '권한 요청',
          message: '스토리지 권한 요청',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        onSuccess();
      } else {
        Alert.alert('permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    const loadFoldersData = async () => {
      const { folders } = require('@/fakeData.json'); //실제로는 async storage에서 가져와야 함

      const onSuccess = folderName => async () => {
        const folder = await readFolderAsync({ folderName });
        console.log('folder:', folder);
      };

      const onFailure = async () => {
        console.error('failed');
      };

      try {
        const folderNames = [];

        folders?.map(folder => folderNames.push(folder.folderName));

        await Promise.all([
          ...folderNames.map(folderName =>
            createFolderAsync({ folderName, onSuccess: onSuccess(''), onFailure }),
          ),
          dispatch(loadAllFolders(folders)),
        ]);
      } catch (error) {
        Alert.alert(error.message);
      }
    };

    requestStoragePermission(loadFoldersData);
  }, []);

  console.log('storage: ', storage);

  return (
    <View style={{ padding: 30 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button title="사진 파일 생성" onPress={onPressStorePhotosInStorage} />
        <Button title="사진 파일 삭제" color="red" onPress={onPressRemovePhotosInStorage} />
      </View>

      <FlatList
        data={userFolders}
        renderItem={({ item }) => {
          const { id, folderName, borderColor } = item;
          return (
            <View
              style={{
                marginTop: 25,
                borderColor: borderColor,
                borderStyle: 'solid',
                borderWidth: 1,
              }}
              key={id}>
              <Text>id: {id}</Text>
              <Text>folder name: {folderName}</Text>
              <Button title="이동" onPress={() => onPressMove(id)} />
            </View>
          );
        }}
      />

      <View style={{ marginTop: 100 }}>
        <Text>current storage : {JSON.stringify(storage)}</Text>
      </View>
    </View>
  );
};

export default TestFolder;
