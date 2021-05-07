import React from 'react';
import { GestureResponderHandlers, View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { KeyboardAccessoryView } from '@flyerhq/react-native-keyboard-accessory-view';

import FolderInput from '@/folderDesign/components/FolderInput';

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
    <View style={{ flex: 1 }}>
      <KeyboardAccessoryView renderScrollable={renderScrollable}>
        <ScrollView horizontal style={{ backgroundColor: '#e4e7e8', height: 50 }}>
          {recommendedFolderNames.map((name, index) => (
            <TouchableOpacity key={index} onPress={() => setFolderName(name)}>
              <Text
                style={{
                  width: 40,
                  height: '100%',
                  marginLeft: 10,
                  marginRight: 10,
                  textAlignVertical: 'center',
                  textAlign: 'center',
                }}>
                {name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <ScrollView horizontal style={{ backgroundColor: '#e4e7e8', height: 50 }}>
          {pallet.map((color, index) => (
            <TouchableOpacity key={index} onPress={() => setBorderColor(color)}>
              <View
                style={{
                  backgroundColor: color,
                  width: 40,
                  height: '80%',
                  borderRadius: 50,
                  marginLeft: 10,
                  marginRight: 10,
                }}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </KeyboardAccessoryView>
    </View>
  );
};

export default FolderDesignScreen;
