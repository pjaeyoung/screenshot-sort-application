import React from 'react';
import { BasicFolderSvg } from '@/shared/components';
import { userFolderLayoutData } from '../constants';
import { useUserFolders } from '@/redux/store';
import MainHeader from './MainHeader';
import FolderSvgs from './FolderSvgs';
import styled from '@emotion/native';

const MainScreen: React.FC<Object> = () => {
  const { userFolders } = useUserFolders();

  // 유저가 생성한 폴더 개수에 맞는 레이아웃 결정
  const layout = userFolderLayoutData[userFolders.length - 1];

  return (
    <Wrapper>
      <MainHeader />
      <FolderList>
        {userFolders.map(({ id, folderName, borderColor }, index) => {
          const FolderSvg = FolderSvgs[index];
          return (
            <FolderSvg key={id} style={layout[index]} borderColor={borderColor}>
              <FolderName>{folderName}</FolderName>
            </FolderSvg>
          );
        })}
      </FolderList>
      <BasicFolderSvg style={{ bottom: 100, left: -100 }} />
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

const FolderName = styled.Text({
  flex: 1,
  fontSize: 15,
  position: 'absolute',
});
