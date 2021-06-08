import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { DraxDragWithReceiverEventData, DraxView } from 'react-native-drax';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { IFolderSvgProps } from '@/shared/types';

interface ScaleAnimatedDropzoneProps {
  style?: StyleProp<ViewStyle>;
  onDrop: Function;
  borderColor?: string;
}

interface withScaleAnimatedDropzoneProps {
  Component: React.FC<any>;
  defaultSvgData?: IFolderSvgProps;
  maxScale?: number;
}

// Scale 애니메이션과 DragDrop 이벤트를 등록하는 HOC
const withScaleAnimatedDropzone = ({
  Component,
  defaultSvgData,
  maxScale = 1.2,
}: withScaleAnimatedDropzoneProps) => {
  const ScaleAnimatedDropzone: React.FC<ScaleAnimatedDropzoneProps> = ({
    style,
    children,
    borderColor,
    onDrop,
  }) => {
    const scale = useSharedValue(1);
    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));

    const onReceiveDragDrop = ({ dragged: { payload } }: DraxDragWithReceiverEventData) => {
      scale.value = withSpring(1);
      onDrop(payload);
    };

    const onReceiveDragOver = () => {
      scale.value = withSpring(maxScale);
    };

    const onReceiveDragExit = () => {
      scale.value = withSpring(1);
    };

    return (
      <DraxView
        style={[
          {
            position: 'absolute',
          },
          style,
        ]}
        onReceiveDragOver={onReceiveDragOver}
        onReceiveDragExit={onReceiveDragExit}
        onReceiveDragDrop={onReceiveDragDrop}>
        <Animated.View style={[animatedStyle]}>
          <Component {...defaultSvgData} borderColor={borderColor}>
            {children}
          </Component>
        </Animated.View>
      </DraxView>
    );
  };

  return ScaleAnimatedDropzone;
};

export default withScaleAnimatedDropzone;
