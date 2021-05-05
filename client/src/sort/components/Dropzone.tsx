import * as React from 'react';
import { LayoutChangeEvent, LayoutRectangle } from 'react-native';

interface DropzoneProps {
  addDropzoneDimensions: (dimensions: LayoutRectangle) => void;
  children: React.ReactElement;
}

const Dropzone: React.FC<DropzoneProps> = ({ addDropzoneDimensions, children }) => {
  const onLayout = React.useCallback((event: LayoutChangeEvent) => {
    const { height, width, x, y } = event.nativeEvent.layout;

    addDropzoneDimensions({
      height: Math.round(height),
      width: Math.round(width),
      x: Math.round(x),
      y: Math.round(y),
    });
  }, []);

  return <>{React.cloneElement(children, { onLayout })}</>;
};

export default Dropzone;
