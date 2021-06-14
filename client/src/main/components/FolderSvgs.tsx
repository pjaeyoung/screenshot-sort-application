import * as React from 'react';
import { FolderSvg } from '@/shared/components';
import { folderSvgsData } from '@/shared/constants';
import { IFolderSvgProps } from '@/shared/types';
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
