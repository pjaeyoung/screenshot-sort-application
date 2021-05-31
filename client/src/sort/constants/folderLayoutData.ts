// SORT 화면에 폴더 이미지 배치할 위치를 담은 데이터
// Folder 컴포넌트의 composition하는 자식 컴포넌트로 Text 태그를 사용함
// FIXME: 다양한 디바이스 크기에 대응할 수 있도록 해야 합니다.
export const userFolderLayoutData = [
  {
    positions: { left: -40, top: -20 },
    height: 200,
    width: 200,
  },
  {
    positions: { right: -30, top: -20 },
    height: 150,
    width: 150,
  },
  {
    positions: { left: -30, top: 230 },
    height: 150,
    width: 150,
  },
  {
    positions: { right: -30, top: 150 },
    height: 120,
    width: 120,
  },
  {
    positions: { left: -30, top: 420 },
    height: 120,
    width: 120,
  },
  {
    positions: { right: -30, top: 300 },
    height: 110,
    width: 110,
  },
];
