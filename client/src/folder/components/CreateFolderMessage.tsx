import * as React from 'react';
import { Dimensions } from 'react-native';
import styled from '@emotion/native';

interface ICreateFolderMessageProps {
  isOnboardng?: boolean;
}

const CreateFolderMessage: React.FC<ICreateFolderMessageProps> = ({ isOnboardng = false }) => {
  return (
    <Wrapper>
      <BoldText>{isOnboardng ? messages.onboarding : messages.default}</BoldText>
      <GreyText>+버튼을 탭하여 폴더를 생성해주세요</GreyText>
    </Wrapper>
  );
};

export default CreateFolderMessage;

const messages = {
  default: '분류 가능한 폴더가 없습니다 :(',
  onboarding: '즉시 분류를 위한 폴더가 필요해요! 🗂',
};

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
