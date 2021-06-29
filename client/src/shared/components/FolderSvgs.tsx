import * as React from 'react';
import FolderSvg from './FolderSvg';
import { folderSvgsData } from '../constants';
import { IFolderSvgProps } from '../types';
import { StyleProp, ViewStyle } from 'react-native';

const FolderSvgCurry = (
  svgData: IFolderSvgProps,
): React.FC<{ borderColor: string; style?: StyleProp<ViewStyle> }> => ({
  borderColor,
  style,
  children,
}) => (
  <FolderSvg borderColor={borderColor} style={style} {...svgData}>
    {children}
  </FolderSvg>
);

export default folderSvgsData.map(svgData => FolderSvgCurry(svgData));
