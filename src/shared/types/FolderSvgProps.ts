import { StyleProp, ViewStyle } from 'react-native';
export interface IFolderSvgProps {
  width: number;
  height: number;
  style?: StyleProp<ViewStyle>;
  bgPath: string;
  borderPath: string;
  borderColor?: string;
  borderDashed?: boolean;
}
