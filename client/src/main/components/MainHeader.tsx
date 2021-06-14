import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from '@emotion/native';
import BtnGoFolderSvg from '@/assets/btn-go-folder.svg';
import BtnSettingSvg from '@/assets/btn-setting.svg';
import { useNavigation } from '@react-navigation/native';

const MainHeader: React.FC = () => {
  const navigation = useNavigation();
  return (
    <Wrapper>
      <TouchableOpacity onPress={() => navigation.navigate('Folder')}>
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
});
