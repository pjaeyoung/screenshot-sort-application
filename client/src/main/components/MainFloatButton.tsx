import React from 'react';
import ActionButton from '@/shared/utils/react-native-action-button';
import styled from '@emotion/native';
import { navigate } from '@/RootNavigation';

const MainFloatButton = () => {
  return (
    <ActionButton
      buttonColor="#2699fb"
      style={{
        marginBottom: 80,
      }}>
      <ActionButtonItem
        onPress={() => {
          navigate('FolderSetting', {});
        }}>
        <ActionButtonText>폴더 설정</ActionButtonText>
      </ActionButtonItem>
      <ActionButtonItem>
        <ActionButtonText>폴더 정리</ActionButtonText>
      </ActionButtonItem>
    </ActionButton>
  );
};

export default MainFloatButton;

const ActionButtonItem = styled.TouchableOpacity({
  backgroundColor: '#2699fb',
  width: 120,
  height: 40,
  borderRadius: 40,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 20,
  marginRight: 40,
});

const ActionButtonText = styled.Text({
  color: '#fff',
});
