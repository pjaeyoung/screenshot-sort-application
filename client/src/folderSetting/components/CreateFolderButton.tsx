import * as React from 'react';
import { Dimensions } from 'react-native';
import styled from '@emotion/native';
import Icon from 'react-native-vector-icons/Ionicons';

import { navigate } from '@/RootNavigation';

const CreateFolderButton: React.FC = () => {
  return (
    <Wrapper>
      <Button onPress={onPress}>
        <Icon name="add" color="#fff" size={25} />
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
});
