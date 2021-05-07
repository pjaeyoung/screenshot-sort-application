import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';
import { navigate } from '@/RootNavigation';
import KeyBoardAcc from './KeyBoardAcc';
const FolderDesignScreen: React.FC<Object> = () => {
  const [folderObject, setFolder] = useState({
    name: '',
    colorcode: '',
  });
  useEffect(() => console.log('update!', folderObject.name, folderObject.colorcode));

  const enterButton = () => {
    if (folderObject.name == '' || folderObject.colorcode == '') {
      if (folderObject.name.length === 0) {
        console.log('폴더 이름을 선택해주세요!');
      }
      if (folderObject.colorcode.length === 0) {
        console.log('폴더 색상을 지정해주세요!');
      }
    } else {
      console.log('폴더가 만들어졌어요!');
      navigate('Main', {});
    }
  };
  return (
    <>
      <View style={styles.container}>
        <Text>FolderDesignScreen</Text>
        <View style={styles.keyboardacc}>
          <KeyBoardAcc
            folderObject={folderObject}
            setFolder={setFolder}
            enterButton={enterButton}></KeyBoardAcc>
        </View>
      </View>
    </>
  );
};

export default FolderDesignScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardacc: {
    flex: 1,
  },
});
