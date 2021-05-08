import * as React from 'react';

import ActionButton from '@/shared/utils/react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

import { navigate } from '@/RootNavigation';

const CompleteButton: React.FC = () => {
  return (
    <ActionButton
      onPress={onPress}
      buttonColor="#2699fb"
      renderIcon={() => (
        <Icon name="checkmark" style={{ fontSize: 25, height: 22, color: 'white' }} />
      )}
    />
  );
};

export default CompleteButton;

const onPress = () => {
  navigate('Main', {});
};
