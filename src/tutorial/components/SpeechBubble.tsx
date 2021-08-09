import * as React from 'react';
import Svg, { Ellipse, Path } from 'react-native-svg';
import styled from '@emotion/native';
import { StyleProp, ViewStyle } from 'react-native';

export interface ISpeechBubbleProps {
  style: StyleProp<ViewStyle>;
  tailStyle: StyleProp<ViewStyle>;
  emoticonText: string;
  text: string;
  color: string;
}

const SpeechBubble: React.FC<ISpeechBubbleProps> = ({
  style,
  tailStyle,
  emoticonText,
  text,
  color = 'green',
}) => {
  return (
    <Wrapper style={style}>
      <Tail style={tailStyle} width="30" height="39" viewBox="0 0 30 39" fill="none">
        <Path
          d="M13.3463 34.8393C12.3551 36.5477 9.75063 35.938 9.62077 33.9671L7.61114 3.46845C7.52282 2.12802 8.75476 1.08339 10.0627 1.38961L27.4117 5.45135C28.7197 5.75757 29.3599 7.2405 28.6857 8.40241L13.3463 34.8393Z"
          fill={color}
        />
      </Tail>
      <BubbleContainer>
        <Bubble width="139" height="96" viewBox="0 0 139 96" fill="none">
          <Ellipse cx="69.5" cy="48" rx="69.5" ry="48" fill={color} />
        </Bubble>
        <TextContainer>
          <EmoticonText>{emoticonText}</EmoticonText>
          <Text>{text}</Text>
        </TextContainer>
      </BubbleContainer>
    </Wrapper>
  );
};

export default SpeechBubble;

const Wrapper = styled.View({
  position: 'absolute',
});

const Tail = styled(Svg)({
  position: 'absolute',
});

const Bubble = styled(Svg)({
  position: 'absolute',
  transform: [{ scale: 1.2 }],
});

const BubbleContainer = styled.View({
  height: 96,
  width: 139,
  alignItems: 'center',
});

const TextContainer = styled.View({
  position: 'absolute',
  width: '100%',
  height: '100%',
  paddingVertical: 10,
});

const EmoticonText = styled.Text({
  fontSize: 13,
  textAlign: 'center',
  color: '#fff',
});

const Text = styled.Text({
  fontSize: 13,
  textAlign: 'center',
  lineHeight: 20,
  marginTop: 5,
  color: '#fff',
});
