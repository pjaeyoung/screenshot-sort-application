import * as React from 'react';
import { Dimensions, GestureResponderHandlers, ScrollView, View, Text } from 'react-native';
import { useEditModeState } from '../context';

import styled from '@emotion/native';
import { useUserFolders } from '@/shared/hooks';

interface IFolderScrollViewProps {
  panHandlers: GestureResponderHandlers;
}

const FolderScrollView: React.FC<IFolderScrollViewProps> = ({ panHandlers }) => {
  const canEdit = useEditModeState();
  const { userFolders } = useUserFolders();

  return (
    <ScrollView
      {...panHandlers}
      scrollEnabled={canEdit}
      keyboardDismissMode="none"
      keyboardShouldPersistTaps="always">
      {userFolders.map((folder) => {
        return (
          <View style={{ backgroundColor: 'red', width: 100, height: 100 }} key={folder.id}>
            <Text>{folder.name}</Text>
          </View>
        );
      })}
      <Scrollable />
    </ScrollView>
  );
};

export default FolderScrollView;

// 생성/수정모드 상태에서 스크롤 가능하도록 해주는 용도
const Scrollable = styled.View({ height: Dimensions.get('screen').height * 1.5 });
