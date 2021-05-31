import React from 'react';
import { GestureResponderHandlers, ScrollView, TouchableOpacity } from 'react-native';
// 키보드 상단에 색상지정 및 폴더명 추천 기능 추가를 위한 라이브러리
import { KeyboardAccessoryView } from '@flyerhq/react-native-keyboard-accessory-view';

import FolderInput from '@/folderDesign/components/FolderInput';
import styled from '@emotion/native';

import { recommendedFolderNames, pallet } from '@/folderDesign/constants';

const FolderDesignScreen: React.FC = () => {
  const [folderName, setFolderName] = React.useState<string>('');
  const [borderColor, setBorderColor] = React.useState<string>('#0CC2C2');

  // 키보드 아래 화면에 렌더링할 생성/수정모드 상태(input창 노출)인 폴더 이미지 컴포넌트
  // TODO : 고정된 위치(좌측 상단)가 아닌 생성할 폴더 위치에서 생성/수정모드가 되어야 함
  // TODO : 키보드 아래 화면 스크롤 가능하게 만들기 => 키보드 가려짐 막기 위함
  const renderScrollable = (panHandlers: GestureResponderHandlers) => (
    <FolderInput
      panHandlers={panHandlers}
      borderColor={borderColor}
      folderName={folderName}
      setFolderName={setFolderName}
    />
  );

  return (
    <KeyboardAccessoryView style={{ flex: 1 }} renderScrollable={renderScrollable}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        horizontal
        style={{ backgroundColor: '#e4e7e8', height: 70 }}>
        {recommendedFolderNames.map((name, index) => (
          <TouchableOpacity key={index} onPress={() => setFolderName(name)}>
            <KeyWord>{name}</KeyWord>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        horizontal
        style={{ backgroundColor: '#e4e7e8', height: 60 }}>
        {pallet.map((color, index) => (
          <TouchableOpacity key={index} onPress={() => setBorderColor(color)}>
            <Color isClicked={color === borderColor} color={color} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </KeyboardAccessoryView>
  );
};

export default FolderDesignScreen;

const KeyWord = styled.Text({
  width: 60,
  height: '100%',
  marginLeft: 10,
  marginRight: 10,
  fontSize: 18,
  textAlignVertical: 'center',
  textAlign: 'center',
});

const Color = styled.View((props: { color: string; isClicked: boolean }) => ({
  backgroundColor: props.color,
  width: 50,
  height: '80%',
  borderRadius: 50,
  marginLeft: 15,
  marginRight: 10,
  borderWidth: props.isClicked ? 2 : 0,
}));
