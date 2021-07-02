import React from 'react';
import { TouchableHighlight, Text, StyleSheet } from 'react-native';

import theme from '@/shared/theme';

const RoundButton: React.FC<{ buttonStyle?: object; textStyle?: object; onPress?: Function }> = ({
  children,
  buttonStyle,
  textStyle,
  onPress,
}) => {
  return (
    <TouchableHighlight
      style={{
        ...styles.Button,
        ...buttonStyle,
      }}
      onPress={onPress}>
      <Text style={{ ...textStyle }}>{children}</Text>
    </TouchableHighlight>
  );
};

export default RoundButton;

const styles = StyleSheet.create({
  Button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 64,
    height: 64,
    backgroundColor: theme.colors.BLUE_1,
    borderRadius: 50,
  },
});
