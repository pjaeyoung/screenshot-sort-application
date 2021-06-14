// 폴더 개수별 레이아웃
const countOne = [{ top: 120, left: -70 }];
const countTwo = [...countOne, { top: -60, left: 70 }];
const countThree = [...countTwo, { top: -24, left: 50 }];
const countFour = [...countTwo, { top: 40, left: -80 }, { top: -150, left: 60 }];
const countFive = [
  ...countOne,
  { top: -130, left: -40 },
  { top: 50, left: -80 },
  { top: -150, left: 60 },
  { left: 80, top: -400 },
];

const countSix = [...countFive, { top: -220, left: 70 }];
const countSeven = [...countSix, { top: -180, left: 50 }];

export default [countOne, countTwo, countThree, countFour, countFive, countSix, countSeven];
