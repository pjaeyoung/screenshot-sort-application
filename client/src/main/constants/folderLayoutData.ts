// 폴더 개수별 레이아웃
const countOne = [{ top: 120, left: 40 }];
const countTwo = [...countOne, { top: 60, right: 50 }];
const countThree = [...countTwo, { top: 220, right: 80 }];
const countFour = [
  { top: 100, left: 42 },
  { top: 50, right: 60 },
  { top: 250, left: 70 },
  { top: 200, right: 40 },
];
const countFive = [...countFour, { top: 340, right: 60 }];

const countSix = [
  { top: 120, left: 70 },
  { top: -40, left: 90 },
  { top: 270, left: 40 },
  { top: 20, right: 30 },
  { top: 160, right: 40 },
  { top: 320, right: 50 },
];
const countSeven = [...countSix, { top: 450, right: 70 }];

export default [countOne, countTwo, countThree, countFour, countFive, countSix, countSeven];
