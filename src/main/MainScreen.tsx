import React from 'react';
import styled from '@emotion/native';
import { TouchableOpacity, StyleSheet } from 'react-native';

import { userFolderLayoutData } from './constants';
import { useUserFolders } from '@/redux/store';
import { FolderSvgs } from '@/shared/components';

import { BasicFolderSvg } from '@/shared/components';
import { CreateFolderMessage, MainHeader } from './components';

import { useNavigation } from '@react-navigation/native';

const MainScreen: React.FC = () => {
  const { userFolders } = useUserFolders();
  // 유저가 생성한 폴더 개수에 맞는 레이아웃 결정
  const layouts = userFolderLayoutData[userFolders.length - 1];

  const navigation = useNavigation();
  const navigateToCategory = (folderId: string) => () => {
    navigation.navigate('Category', { folderId });
  };
  const navigateToFolderScreen = () => navigation.navigate('Folder');

  return (
    <Wrapper>
      <MainHeader onPressBtnGoFolder={navigateToFolderScreen} />
      {userFolders.length === 0 && <CreateFolderMessage />}
      <FolderList>
        {userFolders.map(({ id, folderName, borderColor }, index) => {
          const FolderSvg = FolderSvgs[index];
          return (
            <TouchableOpacity
              key={id}
              style={[{ position: 'absolute' }, layouts[index]]}
              onPress={navigateToCategory(id)}>
              <FolderSvg key={id} borderColor={borderColor}>
                <FolderName top={index === 1 ? '58%' : '45%'}>{folderName}</FolderName>
              </FolderSvg>
            </TouchableOpacity>
          );
        })}
      </FolderList>
      <TouchableOpacity
        style={styles.basicFolderContainer}
        onPress={navigateToCategory('basicFolder')}>
        <BasicFolderSvg />
      </TouchableOpacity>
    </Wrapper>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  basicFolderContainer: {
    position: 'absolute',
    bottom: 100,
    left: 50,
  },
});

const Wrapper = styled.View({
  flex: 1,
  backgroundColor: '#F7F7F7',
});

const FolderList = styled.View({
  flex: 1,
});

const FolderName = styled.Text(({ top }: { top: number | string }) => ({
  flex: 1,
  fontSize: 15,
  position: 'absolute',
  top,
}));
