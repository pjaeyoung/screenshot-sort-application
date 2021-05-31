import React from 'react';
import { Text, TextInput, View } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import Folder from '@/sort/components/Folder';
import { folderLayoutData } from '@/main/constants/folderLayoutData';
import { useUserFolders } from '@/redux/store';
import MainFloatButton from './MainFloatButton';

const MainScreen: React.FC<Object> = () => {
  const { userFolders } = useUserFolders();

  return (
    <View style={{ flex: 1, paddingHorizontal: 40, backgroundColor: '#F7F7F7' }}>
      <View
        style={{
          position: 'relative',
          marginTop: 40,
          display: 'flex',
          justifyContent: 'center',
        }}>
        <Icon name="search" color="#55ACF9" size={18} style={{ position: 'absolute', left: 20 }} />
        <TextInput
          style={{
            height: 50,
            borderWidth: 1.5,
            borderColor: '#55ACF9',
            borderRadius: 40,
            paddingHorizontal: 20,
            paddingLeft: 45,
          }}
        />
      </View>
      <View style={{ flex: 1 }}>
        {userFolders.map((folder, index) => {
          // TODO: 개수에 따라 다른 folderLayoutData 들고오기
          // TODO: 폴더 클릭시 CATEGORY 스크린 이동
          const { positions, height, width } = folderLayoutData[index];
          return (
            <Folder
              key={index}
              borderColor={folder.borderColor}
              positions={positions}
              height={height}
              width={width}>
              <Text>{folder.name}</Text>
            </Folder>
          );
        })}
      </View>
      <MainFloatButton />
    </View>
  );
};

export default MainScreen;
