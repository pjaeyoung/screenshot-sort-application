import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import MakeFolderScreen from './MakeFolderScreen';
import FloatButton from './FloatButton'
/** ActionButton type 에서 에러 나지만 없으면 아이콘이 ? 가 뜸 */

function onButtonMakeFolder(props: any){
  console.log(`${props} 렌더`)
}

const MainScreen: React.FC<Object> = () => {
  // 여기서 폴더 설정 버튼 클릭여부를 state로 관리 
  // 예) isButtonClicked ? MakeFolderScreen 화면 : 메인-00 화면 

  
  return (
    <>
    <View style={styles.container}>
      <Text>MainScreen</Text>
      <View style={styles.floatbutton}>
      <FloatButton/>
      </View>
    </View>
    </>
  );
};

export default MainScreen;


const styles = StyleSheet.create({
  container:{
   flex:1,
  }
  ,
  floatbutton:{
    flex:1,
    backgroundColor:"transparent"
  }
})