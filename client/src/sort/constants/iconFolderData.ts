import { defaultBorderColors } from '@/shared/constants';
import { FolderDisplayType } from '@/shared/types';

// SORT 화면에 폴더 이미지 배치할 위치를 담은 데이터
// Folder 컴포넌트의 composition하는 자식 컴포넌트로 Icon 태그를 사용함
const iconFolderData: FolderDisplayType[] = [
  {
    id: 'folder-share',
    component: 'fontawesome',
    name: 'share-alt',
    borderColor: defaultBorderColors[6],
    borderDashed: false,
    positions: {
      right: 130,
      bottom: -40,
    },
    width: 150,
    height: 150,
  },
  {
    id: 'folder-trash',
    component: 'fontawesome',
    name: 'trash',
    borderColor: defaultBorderColors[7],
    borderDashed: false,
    positions: { right: -30, bottom: -20 },
    height: 150,
    width: 150,
  },
];

export default iconFolderData;
