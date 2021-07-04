import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from '@emotion/native';

import { userFolderLayoutData } from '../constants';
import { useUserFolders } from '@/redux/store';
import { FolderSvgs } from '@/shared/components';
import storage from '@/shared/utils/handleAsyncStorage';

import { BasicFolderSvg } from '@/shared/components';
import CreateFolderMessage from './CreateFolderMessage';
import MainHeader from './MainHeader';

import { useNavigation } from '@react-navigation/native';
import { useCheckCompletedOnBoarding, usePermissions } from '@/shared/hooks';

import { ExternalStorageDirectoryPath } from 'react-native-fs';

const MainScreen: React.FC<Object> = () => {
  const { userFolders, setUserAllFolders } = useUserFolders();
  // 유저가 생성한 폴더 개수에 맞는 레이아웃 결정
  const layout = userFolderLayoutData[userFolders.length - 1];

  // asyncStorage에 저장된 userFolders를 redux와 동기화 처리
  React.useEffect(() => {
    async function synchronizeStorageAndRedux() {
      setUserAllFolders(await storage.getUserFolders());
    }
    synchronizeStorageAndRedux();
  }, []);

  const navigation = useNavigation();
  const completedOnBoarding = useCheckCompletedOnBoarding();
  React.useEffect(() => {
    completedOnBoarding !== null && !completedOnBoarding && navigation.navigate('Guides');
  }, [completedOnBoarding]);

  const navigateToFolderScreen = () => navigation.navigate('Folder');

  const { grantedPermissions, requestPermssionsAgain } = usePermissions();
  const onPressBtnGoFolder = grantedPermissions ? navigateToFolderScreen : requestPermssionsAgain;

  return (
    <Wrapper>
      <MainHeader onPressBtnGoFolder={onPressBtnGoFolder} />
      {userFolders.length === 0 && <CreateFolderMessage />}
      <FolderList>
        {userFolders.map(({ id, folderName, borderColor }, index) => {
          const FolderSvg = FolderSvgs[index];
          return (
            <TouchableOpacity
              key={id}
              style={[{ position: 'absolute' }, layout[index]]}
              onPress={() => navigation.navigate('Category', { folderId: id })}>
              <FolderSvg key={id} borderColor={borderColor}>
                <FolderName top={index === 1 ? '58%' : '45%'}>{folderName}</FolderName>
              </FolderSvg>
            </TouchableOpacity>
          );
        })}
      </FolderList>
      <TouchableOpacity style={{ position: 'absolute', bottom: 100, left: 50 }}>
        <BasicFolderSvg />
      </TouchableOpacity>
    </Wrapper>
  );
};

export default MainScreen;

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
