import React from 'react';
import { Text, TextInput, View } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import Folder from '@/sort/components/Folder';
import { folderLayoutData } from '@/main/constants/folderLayoutData';
import useUserFolders from '@/shared/hooks/useUserFolders';
import FloatButton from './FloatButton';

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
        <FontAwesomeIcon
          icon={faSearch}
          style={{ position: 'absolute', color: '#55ACF9', left: 20 }}
        />
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
          const { positions, height, width } = folderLayoutData[index];
          return (
            <Folder
              key={folder.id}
              borderColor={folder.borderColor}
              positions={positions}
              height={height}
              width={width}>
              <Text>{folder.name}</Text>
            </Folder>
          );
        })}
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: 'transparent',
        }}>
        <FloatButton />
      </View>
    </View>
  );
};

export default MainScreen;
