import * as React from 'react';
import { Dimensions } from 'react-native';
import styled from '@emotion/native';

const CreateFolderMessage: React.FC = () => {
  return (
    <Wrapper>
      <BoldText>분류 가능한 폴더가 없습니다 :(</BoldText>
      <GreyText>+버튼을 탭하여 폴더를 생성해주세요</GreyText>
    </Wrapper>
  );
};

export default CreateFolderMessage;

const Wrapper = styled.View({
  position: 'absolute',
  bottom: Dimensions.get('screen').height * 0.6,
  width: '100%',
  height: 100,
  justifyContent: 'center',
  alignItems: 'center',
});

const BoldText = styled.Text({
  fontWeight: 'bold',
});

const GreyText = styled.Text({
  color: 'grey',
});
