import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { IFolderSvgProps } from '@/shared/types';

const FolderSvg: React.FC<IFolderSvgProps> = ({
  width,
  height,
  style,
  bg_d,
  border_d,
  borderColor,
  borderDashed = false,
  children,
}) => {
  return (
    <View
      style={[
        style,
        { justifyContent: 'center', alignItems: 'center', transform: [{ scale: 1.1 }] },
      ]}>
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
        <Path d={bg_d} fill="white" />
        <Path
          d={border_d}
          stroke={borderColor}
          strokeDasharray={borderDashed ? 8 : 0}
          strokeLinecap="round"
          strokeWidth="4"
        />
      </Svg>
      {children}
    </View>
  );
};

export default FolderSvg;
