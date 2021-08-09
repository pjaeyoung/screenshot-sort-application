import * as React from 'react';
import styled from '@emotion/native';
import { Dimensions } from 'react-native';

const CreateFolderMessage: React.FC = () => {
  return (
    <Wrapper>
      <MessageContainer>
        <BoldText>분류 가능한 폴더가 없습니다 :(</BoldText>
        <GreyText>오른쪽 상단의 +버튼을 탭하여 폴더를 생성하세요</GreyText>
      </MessageContainer>
    </Wrapper>
  );
};

export default CreateFolderMessage;

const Wrapper = styled.View({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: Dimensions.get('screen').height,
  justifyContent: 'center',
  alignItems: 'center',
});

const MessageContainer = styled.View({
  marginBottom: 150,
  backgroundColor: '#fff',
  borderWidth: 4,
  borderColor: '#00388A',
  borderRadius: 80,
  borderStyle: 'dashed',
  padding: 25,
  alignItems: 'center',
});

const BoldText = styled.Text({
  fontWeight: 'bold',
});

const GreyText = styled.Text({
  color: 'grey',
});
