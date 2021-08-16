import * as React from 'react';
import styled from '@emotion/native';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';

interface IColorAccessoryItemProps {
  isClicked: boolean;
  color: string;
  onPress: (e: GestureResponderEvent) => void;
}

const ColorAccessoryItem: React.FC<IColorAccessoryItemProps> = ({ isClicked, color, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <ColorBorder isClicked={isClicked}>
        <Color color={color} isClicked={isClicked} />
      </ColorBorder>
    </TouchableOpacity>
  );
};

export default ColorAccessoryItem;

const ColorBorder = styled.View((props: { isClicked: boolean }) => ({
  width: 35,
  height: 35,
  marginLeft: 15,
  marginRight: 10,
  borderWidth: 2,
  borderRadius: 35,
  borderColor: props.isClicked ? 'black' : 'transparent',
}));

const Color = styled.View((props: { color: string; isClicked: boolean }) => ({
  backgroundColor: props.color,
  width: '100%',
  height: '100%',
  borderRadius: 32,
  borderWidth: 2,
  borderColor: props.isClicked ? '#fff' : props.color,
}));
