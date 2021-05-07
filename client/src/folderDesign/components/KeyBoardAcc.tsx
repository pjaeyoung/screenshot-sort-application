import { KeyboardAccessoryView } from '@flyerhq/react-native-keyboard-accessory-view';
import React, { useState } from 'react';
import {
  FlatList,
  View,
  GestureResponderHandlers,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import backgroundServer from 'react-native-background-actions';
import { Value } from 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Circle } from 'react-native-svg';



const renderScrollable = (panHandlers: GestureResponderHandlers) => (
<ScrollView keyboardDismissMode='interactive' {...panHandlers} /> // 따로 페이지 안만들게 하는
//폴더 버블이 올라오는 페이지가 되야할 것 같다 
)


interface Item{

    id:Number,
    name : string
}
interface ColorNames{
    id:Number,
    name : string,
    code : string
}

const idxnames = ['중요', '짤', '코디', '글', '꿀팁', '뉴스', '덕질', 'WishList', '귀여운거', '기타'] 

const colornames = ['mint,#2699FB', 'twitterblue,#0CC2C2', 'navy,#00388C', 'aliceblue,#BCE0FD', 'CeruleanBlue,#223DF1', 'MajorelleBlue,#7556DD', "white,#ffffff"]

const indexData : Item[] = idxnames.map((value,idx)=>({
    key : idx,
    id: idx + 1,
    name : `${value}`
}
));

const colorData : ColorNames[] = colornames.map((value, idx)=>{
    let [name, code] = value.split(",");
    
    return{
        key: idx,
        id: idx+1,
        name : name,
        code : code
    }
})

const KeyBoardAcc = (props: any) =>{

    const [isPressed, setPressed] = useState(false);

      return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <KeyboardAccessoryView
          renderScrollable={renderScrollable}
          style={styles.keyboardAccessoryView}
        >
          <View style={styles.selectIndexBackground}> 
          <ScrollView horizontal={true}>
            {indexData.map(value =>{
                return(
                    <TouchableOpacity style={styles.idxButton} onPress={()=>props.setFolder((prevFolder:any)=>({...prevFolder,name:value.name}))}><Text>{value.name}</Text></TouchableOpacity>
                )
            })}
          </ScrollView>
          
          </View>
          <View style={styles.selectColorBackground}> 
          <ScrollView horizontal={true}>
            {colorData.map(value =>{
                return(
                    <TouchableOpacity style={styles.colorButton} onPress={()=>{props.setFolder((prevFolder:any)=>({...prevFolder,colorcode:value.code})); setPressed(true); }}>
                        <View style={[{flex:1,borderRadius:50, backgroundColor:`${value.code}`}]}/>
                    </TouchableOpacity>
                )
            })}
            
          </ScrollView>
          <TouchableOpacity onPress={()=>props.enterButton()}><Text style={styles.enterButton}>확인</Text></TouchableOpacity>
          </View>
          <TextInput style={styles.textInput} />
       
        </KeyboardAccessoryView>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 20
  },
  keyboardAccessoryView: {
    backgroundColor: 'black',
  },
  text: {
    padding: 24,
  },
  textInput: {
    color: 'white',
    flex: 1,
    height: 50,
    paddingHorizontal: 16,
  },
  selectIndexBackground:{
      flex: 1,
      flexDirection: "row",
      justifyContent:"space-between",
      height : 40,
      backgroundColor: "pink"
  },
  idxButton:{
      width : 60,
      backgroundColor: "yellow",
      justifyContent: "space-evenly"
  },
  selectColorBackground:{
    flexGrow: 1,
    flexDirection: "row",
    justifyContent:"space-between",
    height : 55,
    backgroundColor: "aliceblue"
  },
  colorButton:{
      width:50,
      height:50
  },
  enterButton:{
      height:50,
      width:60
  }
})

export default KeyBoardAcc