import * as React from 'react';
import styled from '@emotion/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { navigate } from '@/shared/utils/RootNavigation';

const CompleteButton: React.FC = () => {
  return (
    <Button onPress={onPress}>
      <Icon name="check" size={15} color="#ffffff" />
    </Button>
  );
};

export default CompleteButton;

const onPress = () => {
  navigate('Main', {});
};

const Button = styled.TouchableOpacity({
  position: 'absolute',
  right: 50,
  bottom: 50,
  justifyContent: 'center',
  alignItems: 'center',
  width: 50,
  height: 50,
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

const CheckIcon = styled.Text({
  color: '#fff',
  fontSize: 20,
  fontWeight: 'bold',
});
