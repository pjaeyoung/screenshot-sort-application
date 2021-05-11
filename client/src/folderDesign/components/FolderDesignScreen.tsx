import React from 'react';
import { GestureResponderHandlers, ScrollView, TouchableOpacity } from 'react-native';
import { KeyboardAccessoryView } from '@flyerhq/react-native-keyboard-accessory-view';

import FolderInput from '@/folderDesign/components/FolderInput';
import styled from '@emotion/native';

import { recommendedFolderNames, pallet } from '@/folderDesign/constants';

const FolderDesignScreen: React.FC = () => {
  const [folderName, setFolderName] = React.useState<string>('');
  const [borderColor, setBorderColor] = React.useState<string>('#0CC2C2');

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
