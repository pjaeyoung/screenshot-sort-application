import * as React from 'react';
import styled from '@emotion/native';
import ColorAccessoryItem from './ColorAccessoryItem';
import { pallet } from '../constants';
import { useEditModeState, useColorDispatch, useColorState } from '../context';

const ColorAccessoryGroup: React.FC = () => {
  const selectedColor = useColorState();
  const setColor = useColorDispatch();
  const onPressColorItem = (color: string) => () => {
    setColor(color);
  };

  const canEdit = useEditModeState();
  if (!canEdit) {
    return null;
  }
  return (
    <KeyboardAccessoryItem keyboardShouldPersistTaps="handled" horizontal>
      {pallet.map((color, index) => (
        <ColorAccessoryItem
          key={index}
          color={color}
          isClicked={selectedColor === color}
          onPress={onPressColorItem(color)}
        />
      ))}
    </KeyboardAccessoryItem>
  );
};

export default ColorAccessoryGroup;

const KeyboardAccessoryItem = styled.ScrollView({
  backgroundColor: '#e4e7e8',
  height: 45,
});
