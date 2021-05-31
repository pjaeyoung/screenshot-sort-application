import * as React from 'react';
import { Dimensions } from 'react-native';
import styled from '@emotion/native';

import { navigate } from '@/shared/utils/RootNavigation';

const CreateFolderButton: React.FC = () => {
  return (
    <Wrapper>
      <Button onPress={onPress}>
        <PlusIcon>+</PlusIcon>
      </Button>
    </Wrapper>
  );
};

export default CreateFolderButton;

const onPress = () => {
  navigate('FolderDesign', {});
};

const Wrapper = styled.View({
  position: 'absolute',
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Button = styled.TouchableOpacity({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 80,
  height: 80,
  borderRadius: 50,
  backgroundColor: '#2699fb',
  shadowOpacity: 0.35,
  shadowOffset: {
    width: 0,
    height: 5,
  },
  shadowColor: '#000000',
  shadowRadius: 3,
  elevation: 5,
});

const PlusIcon = styled.Text({ color: '#fff', fontSize: 30 });
