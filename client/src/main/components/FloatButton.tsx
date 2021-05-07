

import React , { useState }from 'react';
import ActionButton from '../../shared/utils/react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons'
import {StyleSheet} from 'react-native'
import {navigate} from '@/RootNavigation'
const FloatButton = (props : any) => {

  // const [buttonClicked, setButton] = useState(0); // 1이면 on, 0 : off


    return (
        <ActionButton buttonColor="rgba(0,0,255,1)" >
          <ActionButton.Item
            buttonColor="rgba(0,0,255,1)"
            title="폴더 설정"
            onPress={() => {
              //props.ButtonClicked
              navigate('AddingFolder',{});
            }}>
            <Icon name="folder" type="material" style={styles.actionButtonIcon} /> 
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#rgba(0,0,255,1)"
            title="정리 하기"
            onPress={() => {}}>
            <Icon name="search" type="material" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
     );
  };
  
  export default FloatButton;
  
  
  
  const styles = StyleSheet.create({
    actionButtonIcon: {
      fontSize: 20,
      height: 22,
      color: 'white',
    },
  });