import React from 'react';
import styled from '@emotion/native';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';

interface IKeyboardAccessoryItemProps {
  isLast: boolean;
  name: string;
  onPress: (event: GestureResponderEvent) => void;
}

const KeyboardAccessoryItem: React.FC<IKeyboardAccessoryItemProps> = ({
  isLast,
  name,
  onPress,
}) => {
  return (
    <Wrapper>
      <TouchableOpacity onPress={onPress}>
        <KeyWord>{name}</KeyWord>
      </TouchableOpacity>
      <Division isVisible={!isLast}>|</Division>
    </Wrapper>
  );
};

export default KeyboardAccessoryItem;

const Wrapper = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
});

const KeyWord = styled.Text({
  height: '100%',
  marginLeft: 15,
  marginRight: 15,
  fontSize: 18,
  textAlignVertical: 'center',
  textAlign: 'center',
});

const Division = styled.Text((props: { isVisible: boolean }) => ({
  display: props.isVisible ? 'flex' : 'none',
  fontSize: 18,
  color: '#B1B1B1',
}));
