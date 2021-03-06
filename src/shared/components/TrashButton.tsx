import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import RoundButton from './RoundButton';

//import TrashIcon from '@/assets/icons/trash.svg';

const TrashButton: React.FC<{ onPress: Function }> = ({ onPress }) => {
  return (
    <RoundButton onPress={onPress}>
      <Icon name="trash-alt" size={30} color="white" />
    </RoundButton>
  );
};

export default TrashButton;
