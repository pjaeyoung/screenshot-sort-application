import { userFolderLayoutData } from '@/sort/constants/folderLayoutData';

function isOdd(number: number): boolean {
  return number % 2 === 0;
}

// 삭제 버튼 위치 지정 : 홀수면 우측, 짝수면 좌측에 위치
export default userFolderLayoutData.map((folder, index) => ({
  ...folder,
  removeButtonHorizontalDirection: isOdd(index) ? { right: -10 } : { left: -10 },
}));
