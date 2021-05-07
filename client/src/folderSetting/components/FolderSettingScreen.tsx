import * as React from 'react';
import styled from '@emotion/native';

import CreateFolderButton from '@/folderSetting/components/CreateFolderButton';
import CompleteButton from '@/folderSetting/components/CompleteButton';

import useUserFolders from '@/shared/hooks/useUserFolders';
import { FolderDisplayType } from '@/shared/types';
import { defaultFolderData } from '@/shared/constants';
import { userFolderLayoutData } from '@/sort/constants/folderLayoutData';
import { View, Text } from 'react-native';
import Folder from '@/sort/components/Folder';

const FolderSettingScreen: React.FC<void> = () => {
  const { userFolders } = useUserFolders();
  const folders: FolderDisplayType[] = [
    ...userFolders.map((folder, index) => ({
      ...folder,
      ...userFolderLayoutData[index],
      component: 'text',
    })),
    defaultFolderData,
  ];

  return (
    <Wrapper>
      <View style={{ flex: 1 }}>
        {folders.map((folder, index) => (
          <Folder
            key={index}
            borderColor={folder.borderColor}
            borderDashed={folder.borderDashed}
            positions={folder.positions}
            height={folder.height}
            width={folder.width}>
            <Text>{folder.name}</Text>
          </Folder>
        ))}
      </View>
      <CreateFolderButton />
      <CompleteButton />
    </Wrapper>
  );
};

const Wrapper = styled.View({
  flex: 1,
});

export default FolderSettingScreen;
