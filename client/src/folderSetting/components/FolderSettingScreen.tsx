import * as React from 'react';
import styled from '@emotion/native';

import CreateFolderButton from '@/folderSetting/components/CreateFolderButton';
import CompleteButton from '@/folderSetting/components/CompleteButton';

import { RemovableFolderDisplayType } from '@/shared/types';
import { defaultFolderData } from '@/shared/constants';
import userFolderLayoutData from '@/folderSetting/constants/folderLayoutData';

import { View, Text, Alert } from 'react-native';
import Folder from '@/sort/components/Folder';

import { useFolderRedux } from '@/store';

const FolderSettingScreen: React.FC<void> = () => {
  const { userFolders, removeUserFolder } = useFolderRedux();

  const onPressRemoveButtonCallbback = (id: string) => {
    removeUserFolder(id);
  };

  let folders: RemovableFolderDisplayType[] = [
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
              onPress={onPressRemoveButton(folder, onPressRemoveButtonCallbback)}
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

const onPressRemoveButton = (
  folder: RemovableFolderDisplayType,
  removeUserFolder: (id: string) => void,
) => {
  return () => {
    Alert.alert('폴더를 삭제하시겠습니까?', undefined, [
      {
        text: '취소',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: '삭제',
        onPress: () => removeUserFolder(folder.id),
        style: 'destructive',
      },
    ]);
  };
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
