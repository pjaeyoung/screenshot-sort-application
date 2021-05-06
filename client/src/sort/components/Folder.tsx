import * as React from 'react';
import { LayoutChangeEvent } from 'react-native';
import styled from '@emotion/native';

interface Positions {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
}

interface FolderStyle {
  borderColor: string;
  borderDashed?: boolean;
  width: number;
  height: number;
  positions: Positions; // 폴더 생성 위치
  transform?: [];
}

interface FolderProps extends FolderStyle {
  onLayout?: (event: LayoutChangeEvent) => void;
}

const Folder: React.FC<FolderProps> = ({
  borderColor,
  borderDashed,
  positions = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  width,
  height,
  transform = [],
  onLayout,
  children,
}) => {
  return (
    <Wrapper
      onLayout={onLayout}
      width={width}
      height={height}
      positions={positions}
      borderColor={borderColor}
      borderDashed={borderDashed}
      transform={transform}>
      {children}
    </Wrapper>
  );
};

export default Folder;

const Wrapper = styled.View<FolderStyle>(props => ({
  position: 'absolute',
  ...props.positions,
  width: props.width,
  height: props.height,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 3,
  borderStyle: props.borderDashed ? `dashed` : 'solid',
  borderRadius: props.width * 0.5,
  borderColor: props.borderColor,
  backgroundColor: '#fff',
  transform: props.transform,
}));
