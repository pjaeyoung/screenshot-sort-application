import * as React from 'react';
import styled from '@emotion/native';

import CreateFolderButton from '@/folderSetting/components/CreateFolderButton';
import CompleteButton from '@/folderSetting/components/CompleteButton';

import useUserFolders from '@/shared/hooks/useUserFolders';
import { RemovableFolderDisplayType } from '@/shared/types';
import { defaultFolderData } from '@/shared/constants';
import userFolderLayoutData from '@/folderSetting/constants/folderLayoutData';
import { View, Text } from 'react-native';
import Folder from '@/sort/components/Folder';

const FolderSettingScreen: React.FC<void> = () => {
  const { userFolders, removeUserFolder } = useUserFolders();
  const folders: RemovableFolderDisplayType[] = [
    ...userFolders.map((folder, index) => ({
      ...folder,
      ...userFolderLayoutData[index],
      component: 'text',
    })),
    { ...defaultFolderData, removeButtonHorizontalDirection: { left: -1000 } },
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
            <RemoveButton
              onPress={() => removeUserFolder(folder.id)}
              {...folder.removeButtonHorizontalDirection}>
              <RemoveButtonItem>-</RemoveButtonItem>
            </RemoveButton>
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

const RemoveButton = styled.TouchableOpacity((props: { left?: number; right?: number }) => ({
  position: 'absolute',
  top: 60,
  left: props.left,
  right: props.right,
  width: 25,
  height: 25,
  borderRadius: 25,
  backgroundColor: '#2699fb',
}));

const RemoveButtonItem = styled.Text({
  color: '#fff',
  fontSize: 30,
  textAlign: 'center',
  position: 'absolute',
  bottom: -6,
  left: 8,
});

export default FolderSettingScreen;
