import * as React from 'react';
import { LayoutChangeEvent } from 'react-native';
import * as Collision from '@/sort/utils/collision';
interface DropzoneProps {
  id: string;
  path: string;
  addDropzones: (dimensions: Collision.Dropzone) => void;
  children: React.ReactElement;
}

// FIXME: HOC으로 Folder 컴포넌트 감싸기
// TODO:  Animation 기능 추가
const Dropzone: React.FC<DropzoneProps> = ({ id, path, addDropzones, children }) => {
  // 폴더 이미지 크기와 위치값 계산
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
  // 자식컴포넌트에 onLayout를 props로 전달
  return <>{React.cloneElement(children, { onLayout })}</>;
};

export default Dropzone;
