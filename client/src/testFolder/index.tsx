import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { loadAllFolders, useUserFolders } from '@/redux/folderSlice';

const TestFolder: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { getUserAllFolders } = useUserFolders();
  const userFolders = getUserAllFolders();

  const onPressMove = (folderId: number | string) => {
    navigation.navigate('Category', {
      folderId,
    });
  };

  useEffect(function loadFoldersData() {
    const { folders } = require('@/fakeData.json'); //실제로는 async storage에서 가져와야 함

    dispatch(loadAllFolders(folders));
  }, []);

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
      <FlatList
        data={userFolders}
        renderItem={({ item }) => {
          const { id, folderName, borderColor } = item;
          return (
            <View
              style={{
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
    </View>
  );
};

export default TestFolder;
