import * as React from 'react';
import { StyleSheet, GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';
import { FAB, Icon } from 'react-native-elements';

interface IFloatingButtonProps {
  loading?: boolean;
  onPress: (event: GestureResponderEvent) => void;
  iconName: string;
  positionStyle: StyleProp<ViewStyle>;
}

const FloatingButton: React.FC<IFloatingButtonProps> = ({
  loading,
  onPress,
  iconName,
  positionStyle,
}) => {
  return (
    <FAB
      loading={loading}
      style={[styles.fab, positionStyle]}
      buttonStyle={styles.button}
      title={
        <Icon name={iconName} type="material" color="#fff" size={30} containerStyle={styles.icon} />
      }
      onPress={onPress}></FAB>
  );
};

export default FloatingButton;

const styles = StyleSheet.create({
  fab: {
    zIndex: 99,
    position: 'absolute',
    width: 57,
    height: 57,
  },
  button: {
    width: 57,
    height: 57,
    backgroundColor: '#2699FB',
  },
  icon: {
    width: 57,
  },
});
