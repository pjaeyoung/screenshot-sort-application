import { GestureResponderEvent } from 'react-native';

export interface IAlertButton {
  name: string;
  onPress: (event: GestureResponderEvent) => void;
}
