import * as React from 'react';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';
import styled from '@emotion/native';
import BtnGoFolderSvg from '@/assets/icons/btn-go-folder.svg';
import BtnSettingSvg from '@/assets/icons/btn-setting.svg';
interface IMainHeaderProps {
  onPressBtnGoFolder: (event: GestureResponderEvent) => void;
}

const MainHeader: React.FC<IMainHeaderProps> = ({ onPressBtnGoFolder }) => {
  return (
    <Wrapper>
      <TouchableOpacity onPress={onPressBtnGoFolder}>
        <BtnGoFolderSvg width={50} height={50} />
      </TouchableOpacity>
      <TouchableOpacity style={{ marginLeft: 20 }}>
        <BtnSettingSvg width={50} height={50} />
      </TouchableOpacity>
    </Wrapper>
  );
};

export default MainHeader;

const Wrapper = styled.View({
  flexDirection: 'row',
  height: 50,
  width: '100%',
  justifyContent: 'flex-end',
  alignItems: 'center',
  marginTop: 40,
  marginBottom: 30,
  paddingHorizontal: 30,
  zIndex: 1,
});
