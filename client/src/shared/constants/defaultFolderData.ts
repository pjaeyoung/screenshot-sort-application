import defaultBorderColors from './defaultBorderColors';
import { FolderDisplayType } from '@/shared/types';

// 기본 폴더 정보
const defaultFolderData: FolderDisplayType = {
  id: 'folder-default',
  component: 'text',
  name: '기본',
  borderColor: defaultBorderColors[8],
  borderDashed: true,
  positions: { left: -30, bottom: 20 },
  width: 150,
  height: 150,
};

export default defaultFolderData;
