import React from 'react';
import styled from '@emotion/native';
import { BasicFolderSvg } from '@/shared/components';
import { userFolderLayoutData } from '../constants';
import { useUserFolders } from '@/redux/store';
import CreateFolderMessage from './CreateFolderMessage';
import MainHeader from './MainHeader';
import { FolderSvgs } from '@/shared/components';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// TODO : asyncStorage => redux 동기화 처리
const MainScreen: React.FC<Object> = () => {
  const navigation = useNavigation();
  const { userFolders } = useUserFolders();

  // 유저가 생성한 폴더 개수에 맞는 레이아웃 결정
  const layout = userFolderLayoutData[userFolders.length - 1];

  return (
    <Wrapper>
      <MainHeader />
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
      <BasicFolderSvg style={{ position: 'absolute', bottom: 100, left: 50 }} />
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
