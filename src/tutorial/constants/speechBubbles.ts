import { ISpeechBubbleProps } from '../components/SpeechBubble';

export const speechBubbles: ISpeechBubbleProps[] = [
  {
    color: '#2699FB',
    emoticonText: 'ππ»',
    text: 'μ€ν¬λ¦°μ·μ λλκ·Έν΄μ μ¦μ λΆλ₯ν  μ μμ΄μ!',
    style: { top: -10, left: -40 },
    tailStyle: {
      top: 90,
      left: 40,
    },
  },
  {
    color: '#223DF1',
    emoticonText: 'π',
    text: 'λΆλ₯ μμ΄ μ€ν¬λ¦°μ·μ μ μ₯ν  μ μμ΄μ!',
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
    emoticonText: 'π',
    text: 'μλͺ» μ°ν μ€ν¬λ¦°μ·μ λ°λ‘ μ­μ νμΈμ!',
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
