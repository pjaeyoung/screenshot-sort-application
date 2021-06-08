import { StyleProp, ViewStyle } from 'react-native';
export interface IFolderSvgProps {
  width: number;
  height: number;
  style?: StyleProp<ViewStyle>;
  bg_d: string;
  border_d: string;
  borderColor?: string;
  borderDashed?: boolean;
}
