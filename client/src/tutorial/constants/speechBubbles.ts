import { ISpeechBubbleProps } from '../components/SpeechBubble';

export const speechBubbles: ISpeechBubbleProps[] = [
  {
    color: '#2699FB',
    emoticonText: '👆🏻',
    text: '스크린샷을 드래그해서 즉시 분류할 수 있어요!',
    style: { top: -10, left: -40 },
    tailStyle: {
      top: 90,
      left: 40,
    },
  },
  {
    color: '#223DF1',
    emoticonText: '😉',
    text: '분류 없이 스크린샷을 저장할 수 있어요!',
    style: {
      top: 130,
      left: -90,
    },
    tailStyle: {
      top: 80,
      transform: [{ rotate: '20deg' }],
    },
  },
  {
    color: '#7556DD',
    emoticonText: '😆',
    text: '잘못 찍힌 스크린샷은 바로 삭제하세요!',
    style: {
      top: 170,
      left: -10,
    },
    tailStyle: {
      top: 80,
      right: 0,
      transform: [{ rotate: '-50deg' }],
    },
  },
];
