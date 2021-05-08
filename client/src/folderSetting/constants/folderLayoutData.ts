import { userFolderLayoutData } from '@/sort/constants/folderLayoutData';

function isOdd(number: number): boolean {
  return number % 2 === 0;
}

export default userFolderLayoutData.map((folder, index) => ({
  ...folder,
  removeButtonHorizontalDirection: isOdd(index) ? { right: -10 } : { left: -10 },
}));
