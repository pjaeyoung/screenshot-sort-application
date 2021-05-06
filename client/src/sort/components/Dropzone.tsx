import * as React from 'react';
import { LayoutChangeEvent } from 'react-native';
import * as Collision from '@/sort/utils/collision';
interface DropzoneProps {
  id: string;
  path: string;
  addDropzones: (dimensions: Collision.Dropzone) => void;
  children: React.ReactElement;
}

const Dropzone: React.FC<DropzoneProps> = ({ id, path, addDropzones, children }) => {
  const onLayout = React.useCallback((event: LayoutChangeEvent) => {
    const { height, width, x, y } = event.nativeEvent.layout;

    addDropzones({
      id,
      path,
      dimensions: {
        height: Math.round(height),
        width: Math.round(width),
        x: Math.round(x),
        y: Math.round(y),
      },
    });
  }, []);

  return <>{React.cloneElement(children, { onLayout })}</>;
};

export default Dropzone;
